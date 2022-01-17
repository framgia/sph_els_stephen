<?php

namespace App\Http\Controllers;

use App\Models\QuizItem;
use App\Http\Resources\QuizItemResource;
use App\Models\Quiz;
use App\Models\QuizLog;
use Illuminate\Support\Facades\Auth;

class QuizQuizItemController extends Controller {
    public function index(Quiz $quiz) {
        QuizLog::where([
            ['quiz_id', $quiz->id],
            ['user_id', Auth::id()]
        ])->firstOrFail();

        return QuizItemResource::collection(
            $quiz
                ->quizItems()
                ->get()
        );
    }
}
