<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LearnedWordsController extends Controller {
    public function index() {
        $id = Auth::id();

        $user = User::find($id);
        $quizzes = $user->quiz_logs()->with('quiz.quizItems.choices')->get()->pluck('quiz');
        $quiz_items = $quizzes->pluck('quizItems')->collapse();
        $choices = $quiz_items->pluck('choices')->collapse();
        $correct_choices = $choices->filter(fn ($choice) => $choice->is_correct);

        return response()->json([
            "data" => $correct_choices->pluck('choice')
        ]);
    }
}
