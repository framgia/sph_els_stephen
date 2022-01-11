<?php

namespace App\Http\Controllers;

use App\Models\QuizLog;
use App\Models\User;
use Illuminate\Http\Request;
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

    public function destroy($id) {
    }

    protected function getUserWithQuizLogs($id) {
        return response()->json([
            "data" => User::where('id', $id)->with('quiz_logs')->first()
        ]);
    }

    protected function validateQuizLog(Request $request) {
        $checkUnique = QuizLog::where('quiz_id', $request->quiz_id)->where('user_id', $request->user_id)->first();
        if ($checkUnique) {
            throw ValidationException::withMessages(["User already took the quiz"]);
        }

        return $this->validate($request, [
            'quiz_id' => ['required', Rule::exists('quizzes', 'id')],
            'user_id' => ['required', Rule::exists('users', 'id')]
        ]);
    }
}
