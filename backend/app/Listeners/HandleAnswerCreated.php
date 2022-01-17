<?php

namespace App\Listeners;

use App\Models\ActivityLog;
use App\Events\AnswerCreated;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;

class HandleAnswerCreated {
    public function __construct() {
    }

    public function handle(AnswerCreated $event) {
        $answer = $event->answer;
        $quiz_log = $answer->quiz_log;
        $quiz = $quiz_log->quiz;
        $quiz_items = $quiz->quizItems;
        $answers = $quiz_log->answers;

        if ($answers->count() == $quiz_items->count()) {
            $quiz_items_choice = $quiz->quizItems()->with('choices')->get();
            $choices = $quiz_items_choice->pluck('choices')->collapse();
            $correct_choices = $choices->filter(fn ($choice) => $choice->is_correct);

            $answers_id = $answers->pluck('choice_id');
            $correct_choices_id = $correct_choices->pluck('id');

            $score = $answers_id->filter(
                fn ($answer) => $correct_choices_id->contains($answer)
            )->count();
            $total = $answers->count();
            $user_name = $quiz_log->user->name;
            $quiz_title = $quiz->title;

            ActivityLog::create([
                'loggable_type' => 'App\Models\QuizLog',
                'loggable_id' => $quiz_log->id,
                'message' => "[\"${user_name}\", \"scored ${score} of ${total}\", \"${quiz_title}\"]"
            ]);
        }
    }
}
