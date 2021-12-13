<?php

namespace Database\Factories;

use App\Models\Quiz;
use Illuminate\Database\Eloquent\Factories\Factory;

class QuizItemFactory extends Factory {
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition() {
        return [
            'quiz_id' => Quiz::all()->random(),
            'question' => $this->faker->word()
        ];
    }
}
