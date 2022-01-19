<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class ActivityLogController extends Controller {
    public function index() {
        return $this->getUserWithActivityLogs(Auth::id());
    }

    public function show($id) {
        return $this->getUserWithActivityLogs($id);
    }

    protected function getUserWithActivityLogs($id) {
        return response()->json([
            "data" => User::where('id', $id)->with([
                'quiz_logs.log',
                'quiz_logs.user',
                'following.log',
                'following.following',
                'followers.log',
                'followers.follower',
                'following.following.quiz_logs.log',
                'following.following.following.log',
                'following.following.followers.log',
            ])->first()
        ]);
    }
}
