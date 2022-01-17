<?php

namespace App\Listeners;

use App\Models\ActivityLog;
use App\Events\QuizLogCreated;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class HandleQuizLogCreated {
    public function __construct() {
    }

    public function handle(QuizLogCreated $event) {
        $quiz_log = $event->quiz_log;
        $user_name = $quiz_log->user->name;
        $quiz_title = $quiz_log->quiz->title;

        ActivityLog::create([
            'loggable_type' => 'App\Models\QuizLog',
            'loggable_id' => $quiz_log->id,
            'message' => "[\"${user_name}\", \"started\", \"${quiz_title}\"]"
        ]);
    }
}
