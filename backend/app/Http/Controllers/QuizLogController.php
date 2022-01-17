<?php

namespace App\Http\Controllers;

use App\Http\Resources\QuizLogResource;
use App\Models\Quiz;
use App\Models\User;
use App\Models\QuizLog;
use Illuminate\Http\Request;
use Illuminate\Routing\Route;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class QuizLogController extends Controller {
    public function index() {
        return $this->getUserWithQuizLogs(Auth::id());
    }

    public function store(Request $request) {
        $id = Auth::id();
        $request->merge(['user_id' => $id]);

        $attrs = $this->validateQuizLog($request);
        $quizlog = QuizLog::create($attrs);

        return $this->getUserWithQuizLogs($id);
    }

    public function show($id) {
        return $this->getUserWithQuizLogs($id);
    }

    public function submit(Request $request, Quiz $quiz) {
        $user_id = Auth::id();
        $quiz_log = QuizLog::where([
            ['quiz_id', $quiz->id],
            ['user_id', $user_id]
        ])->firstOrFail();

        $attrs = $this->validate($request, [
            'choices_id' => [],
        ]);

        $anwers = is_array($attrs['choices_id'])
            ? $attrs['choices_id']
            : json_decode($attrs['choices_id']);
        $new_records = array_map(fn ($answer) => ['choice_id' => $answer], $anwers);

        $quiz_log->answers()->createMany($new_records);

        return response()->json([
            'data' => QuizLog::where('id', $quiz_log->id)->with('answers.choice')->first()
        ]);
    }

    protected function getUserWithQuizLogs($id) {
        return response()->json([
            "data" => User::where('id', $id)->with('quiz_logs')->first()
        ]);
    }

    protected function validateQuizLog(Request $request) {
        $checkUnique = QuizLog::where([
            ['quiz_id', $request->quiz_id],
            ['user_id', $request->user_id]
        ])->first();

        if ($checkUnique) {
            throw ValidationException::withMessages(["User already took the quiz"]);
        }

        return $this->validate($request, [
            'quiz_id' => ['required', Rule::exists('quizzes', 'id')],
            'user_id' => ['required', Rule::exists('users', 'id')]
        ]);
    }
}
