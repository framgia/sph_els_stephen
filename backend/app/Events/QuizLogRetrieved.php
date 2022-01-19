<?php

namespace App\Events;

use App\Models\QuizLog;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class QuizLogRetrieved {
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(public QuizLog $quiz_log) {
    }

    public function broadcastOn() {
        return new PrivateChannel('channel-name');
    }
}
