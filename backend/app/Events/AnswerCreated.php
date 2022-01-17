<?php

namespace App\Events;

use App\Models\Answer;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class AnswerCreated {
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public function __construct(public Answer $answer) {
    }

    public function broadcastOn() {
        return new PrivateChannel('channel-name');
    }
}
