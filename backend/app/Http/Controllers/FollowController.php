<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\FollowLog;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;
<<<<<<< Updated upstream
use Illuminate\Support\Facades\Auth;

class FollowController extends Controller {
    public function index(Request $request) {
        return $this->getUserWithFollows(Auth::id());
    }

    public function store(Request $request) {
        $id = Auth::id();
=======

class FollowController extends Controller {
    public function index(Request $request) {
        $id = $request->user()->id;
        return $this->getUserWithFollows($id);
    }

    public function store(Request $request) {
        $id = $request->user()->id;
>>>>>>> Stashed changes
        $request->merge(['from_id' => $id]);

        $attrs = $this->validateFollow($request);
        $followlog = FollowLog::create($attrs);
        return $this->getUserWithFollows($id);
    }

    public function destroy(Request $request) {
<<<<<<< Updated upstream
        $id = Auth::id();
=======
        $id = $request->user()->id;
>>>>>>> Stashed changes
        $request->merge(['from_id' => $id]);

        $attrs = $this->validateUnfollow($request);
        $follow = FollowLog::where('from_id', $attrs['from_id'])->where('to_id', $attrs['to_id'])->first();
        $follow->delete();
        return $this->getUserWithFollows($id);
    }

    public function show(Request $request, $id) {
        return $this->getUserWithFollows($id);
    }

    protected function getUserWithFollows($id) {
        return response()->json([
<<<<<<< Updated upstream
            'data' => User::where('id', $id)->with(['following', 'followers'])->first()
=======
            "data" => User::where('id', $id)->with('following', 'followers')->first()
>>>>>>> Stashed changes
        ]);
    }

    protected function validateFollow(Request $request) {
        return $this->validate($request, [
            'from_id' => ['required', Rule::exists('users', 'id')],
            'to_id' => ['required', Rule::exists('users', 'id')]
        ]);
    }

    protected function validateUnfollow(Request $request) {
        return $this->validate($request, [
            'from_id' => ['required', Rule::exists('follow_logs', 'from_id')],
            'to_id' => ['required', Rule::exists('follow_logs', 'to_id')]
        ]);
    }
}
