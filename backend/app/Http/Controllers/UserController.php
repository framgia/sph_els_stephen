<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Nette\NotImplementedException;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class UserController extends Controller {
    public function index() {
        return UserResource::collection(User::all());
    }

    public function store(Request $request) { // register
        $attrs = $this->validateUser($request);

        $user = User::create($attrs);
        $token = $user->createToken('login')->plainTextToken;

        return response()->json([
            'data' => $this->toArray($user, $user->jsonKeyMap),
            'token' => $token
        ], 200);
    }

    public function login(Request $request) {
        $attrs = $this->validate($request, [
            'email' => ['required', Rule::exists('users', 'email')],
            'password' => ['required'],
        ]);

        if (!Auth::attempt($attrs)) {
            throw ValidationException::withMessages([
                'email' => 'Your provided credentials could not be verified.'
            ]);
        }

        $user = User::where('email', $attrs['email'])->first();
        $user->tokens()->delete();
        $token = $user->createToken('login')->plainTextToken;

        return response()->json([
            'data' => $this->toArray($user, $user->jsonKeyMap),
            'token' => $token
        ], 200);
    }

    public function logout(Request $request) {
        $user = User::findOrFail(Auth::id());
        $user->tokens()->delete();

        return response()->json([
            'data' => [
                'message' => 'Logged out successfully.'
            ]
        ], 200);
    }

    public function show($id) {
        return new UserResource(User::findOrFail($id));
    }

    public function update(Request $request, $id) {
        $u = User::findOrFail($id);
        $attrs = $this->validateUser($request, $u);

        if ($attrs['avatar'] ?? false) {
            $attrs['avatar'] = env('BACKEND_APP_URL') . '/storage/' . $request->file('avatar')->store('avatars');
        }

        $u->fill($attrs);

        if ($u->isClean()) {
            return $this->errorResponse("No changes detected");
        }

        $u->save();

        return new UserResource($u);
    }

    public function destroy($id) {
        $u = User::findOrFail($id);
        $u->delete();

        return response()->json(
            ['data' => ["message" => "User '{$u->name}' deleted successfully."], "code" => 200],
            200
        );
    }

    public function update_password(Request $request) {
        $user = User::find(Auth::id());

        $attrs = $this->validate($request, [
            'password' => ['required', 'string', 'min:6'],
            'new_password' => ['required', 'string', 'min:6', 'confirmed']
        ]);

        if (!Hash::check($attrs['password'], $user->password)) {
            throw ValidationException::withMessages(['Incorrect credentials.']);
        }

        if ($attrs['password'] == $attrs['new_password']) {
            throw ValidationException::withMessages(['Same Password Detected.']);
        }

        $user->update(['password' => $attrs['new_password']]);

        return new UserResource($user);
    }

    protected function validateUser(Request $request, ?User $user = null) {
        $user ??= new User();

        return $this->validate($request, [
            'name' => [!$user->exists ? 'required' : '', 'min:10'],
            'email' => [!$user->exists ? 'required' : '', 'email', Rule::unique('users', 'email')->ignore($user)],
            'password' => !$user->exists ? ['required', 'min:6', 'confirmed']
                : ['confirmed'],
            'is_admin' => !$user->exists ? [] : [Rule::in([true, false])],
            'avatar' => ['image']
        ]);
    }
}
