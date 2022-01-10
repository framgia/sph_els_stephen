<?php

namespace App\Listeners;

use App\Events\FollowLogCreated;
use App\Models\ActivityLog;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class HandleFollowLogCreated {
    public function __construct() {
    }

    public function handle(FollowLogCreated $event) {
        $followlog = $event->followlog;
        $follower_name = $followlog->follower()->first()->name;
        $following_name = $followlog->following()->first()->name;

        ActivityLog::create([
            'loggable_type' => 'App\Models\FollowLog',
            'loggable_id' => $followlog->id,
            'message' => "[${follower_name}, follows, ${following_name}]"
        ]);
    }
}
