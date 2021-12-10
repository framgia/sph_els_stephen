<?php

namespace Database\Factories;

use App\Models\QuizItem;
use Illuminate\Database\Eloquent\Factories\Factory;

class ChoiceFactory extends Factory {
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition() {
        return [
            'quiz_item_id' => QuizItem::all()->random(),
            'choice' => $this->faker->word(),
            'is_correct' => false
        ];
    }
}
