<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class QuizLogController extends Controller {
    public function index() {
    }

    public function store(Request $request) {
    }

    public function show($id) {
    }

    public function update(Request $request, $id) {
    }

    public function destroy($id) {
    }

    protected function getUserWithQuizLogs($id) {
        return response()->json([
            "data" => User::where('id', $id)->with('quiz_logs')->first()
        ]);
    }
}
