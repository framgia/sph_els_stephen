<?php

namespace Database\Seeders;

use App\Models\Choice;
use App\Models\User;
use App\Models\Quiz;
use App\Models\QuizItem;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder {
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run() {
        Quiz::factory()
            ->count(10)
            ->has(
                QuizItem::factory()
                    ->count(10)
                    ->has(
                        Choice::factory()
                            ->count(4)
                            ->state(new Sequence(
                                ['is_correct' => true],
                                ['is_correct' => false],
                                ['is_correct' => false],
                                ['is_correct' => false],
                            ))
                    )
            )
            ->create();

        User::factory()
            ->count(10)
            ->create();
    }
}
