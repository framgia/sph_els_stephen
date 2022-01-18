<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use Illuminate\Validation\Rule;
use App\Http\Resources\QuizResource;

class QuizController extends Controller {
    public function index() {
        return QuizResource::collection(
            Quiz::filter(request(['search']))->get()
        );
    }

    public function store() {
        $attrs = $this->validateQuiz();

        $q = Quiz::create($attrs);
        return new QuizResource($q);
    }

    public function show($id) {
        return new QuizResource(Quiz::findOrFail($id));
    }

    public function update(Quiz $quiz) {
        $attrs = $this->validateQuiz($quiz);
        $quiz->fill($attrs);
        if ($quiz->isClean()) {
            return $this->errorResponse("No changes detected");
        }
        $quiz->save();
        return new QuizResource($quiz);
    }

    public function destroy(Quiz $quiz) {
        $quiz->delete();
        return response()->json(
            ['data' => ["message" => 'Quiz "$quiz->title" deleted successfully.'], "code" => 200],
            200
        );
    }

    protected function validateQuiz(?Quiz $quiz = null) {
        $quiz ??= new Quiz();

        return request()->validate([
            'title' => [!$quiz->exists ? 'required' : '', Rule::unique('quizzes')->ignore($quiz)],
            'description' => [!$quiz->exists ? 'required' : '', 'max:255']
        ]);
    }
}
