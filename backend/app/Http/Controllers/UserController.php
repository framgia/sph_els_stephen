<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Nette\NotImplementedException;

class UserController extends Controller {
    public function index() {
        return UserResource::collection(User::paginate(5));
    }

    public function store(Request $request) { // register
        $attrs = $this->validateUser($request);

        $user = User::create($attrs);
        return new UserResource($user);
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
        $token = $user->createToken('login')->plainTextToken;
        return response()->json([
            'data' => $this->toArray($user, $user->jsonKeyMap),
            'token' => $token
        ], 200);
    }

    public function logout(Request $request) {
        throw new NotImplementedException();
        // auth()->user()->tokens()->delete();
        // return response()->json([
        //     'data' => [
        //         'message' => 'Logged out successfully.'
        //     ]
        // ], 200);
    }

    public function show($id) {
        return new UserResource(User::findOrFail($id));
    }

    public function update(Request $request, $id) {
        $u = User::findOrFail($id);
        $attrs = $this->validateUser($request, $u);
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

    protected function validateUser(Request $request, ?User $user = null) {
        $user ??= new User();

        return $this->validate($request, [
            'name' => [!$user->exists ? 'required' : ''],
            'email' => [!$user->exists ? 'required' : '', 'email', Rule::unique('users', 'email')->ignore($user)],
            'password' => !$user->exists ? ['required', 'min:6', 'confirmed']
                : ['confirmed'],
            'is_admin' => !$user->exists ? [] : [Rule::in([true, false])],
            'avatar' => ['image']
        ]);
    }
}
