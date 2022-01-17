<?php

namespace App\Http\Resources;

use App\Http\Resources\ChoiceResource;
use App\Models\QuizLog;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class QuizItemResource extends JsonResource {
    public function toArray($request) {
        $quiz_log = QuizLog::where([
            ['quiz_id', $this->quiz()->first()->id],
            ['user_id', Auth::id()]
        ])->first();
        $answers = $quiz_log->answers()->get();
        $choices = $this->choices()->get();
        $answers_ids = $answers->pluck('choice_id');
        $choices_ids = $choices->pluck('id');
        $filtered = $answers_ids->filter(function ($answer_id) use ($choices_ids) {
            return $choices_ids->contains($answer_id);
        });

        $jsonArr = [];
        foreach ($this->jsonKeyMap as $k => $v) {
            $jsonArr[$v] = $this->$k;
        }
        $jsonArr['choices'] = ChoiceResource::collection($this->choices);
        $jsonArr['quiz_title'] = $this->quiz->title;
        $jsonArr['answer'] = $this->when($filtered->count() > 0, $filtered->first());
        $jsonArr['correct'] = $choices->firstWhere('is_correct', true)['id'];

        return $jsonArr;
    }
}
