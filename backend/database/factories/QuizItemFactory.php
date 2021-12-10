<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class QuizItemFactory extends Factory {
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition() {
        return [
            'quiz_id' => $this->faker->numberBetween(1, 10),
            'question' => $this->faker->word()
        ];
    }
}
