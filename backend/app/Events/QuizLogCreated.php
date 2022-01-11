<?php

namespace App\Events;

use App\Models\QuizLog;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class QuizLogCreated {
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(public QuizLog $quiz_log) {
    }

    public function broadcastOn() {
        return new PrivateChannel('channel-name');
    }
}
