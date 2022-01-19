<?php

namespace App\Listeners;

use App\Events\QuizLogRetrieved;
use Carbon\Carbon;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class HandleQuizLogRetrieved {
    public function __construct() {
    }

    public function handle(QuizLogRetrieved $event) {
        $quiz_log = $event->quiz_log;
        if (
            $quiz_log->answers()->get()->count() === 0 &&
            now()->diffInMinutes($quiz_log->created_at) >= 1
        ) {
            $quiz_log->delete();
        }
    }
}
