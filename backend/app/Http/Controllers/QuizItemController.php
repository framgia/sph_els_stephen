<?php

namespace App\Http\Controllers;

use App\Models\QuizItem;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Http\Resources\QuizItemResource;

class QuizItemController extends Controller {
    public function index() {
        return QuizItemResource::collection(QuizItem::paginate(5));
    }

    public function store(Request $request) {
        $attrs = $this->validateQuizItem($request);

        $qi = QuizItem::create($attrs);
        return new QuizItemResource($qi);
    }

    public function show($id) {
        return new QuizItemResource(QuizItem::findOrFail($id));
    }

    public function update(Request $request, $id) {
        $qi = QuizItem::findOrFail($id);
        $attrs = $this->validateQuizItem($request, $qi);
        $qi->fill($attrs);

        if ($qi->isClean()) {
            return $this->errorResponse("No changes detected");
        }
        $qi->save();
        return new QuizItemResource($qi);
    }

    public function destroy($id) {
        $qi = QuizItem::findOrFail($id);
        $qi->delete();
        return response()->json(
            ['data' => ["message" => "Quiz '{$qi->question}' deleted successfully."], "code" => 200],
            200
        );
    }

    protected function validateQuizItem(Request $request, ?QuizItem $quizItem = null) {
        $quizItem ??= new QuizItem();

        return $this->validate($request, [
            'quiz_id' => ['required', Rule::exists('quizzes', 'id')],
            'question' => ['required', 'max:255'],
        ]);
    }
}
