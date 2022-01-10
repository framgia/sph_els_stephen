<?php

namespace App\Events;

use App\Models\FollowLog;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class FollowLogCreated {
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(public FollowLog $followlog) {
    }

    public function broadcastOn() {
        return new PrivateChannel('channel-name');
    }
}
