<?php

namespace App\Http\Controllers;

use App\Http\Resources\QuizItemResource;
use App\Models\Quiz;
use App\Models\QuizLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\QuizLogResultResource;

class QuizResultController extends Controller {
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
