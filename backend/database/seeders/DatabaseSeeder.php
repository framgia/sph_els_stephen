<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Quiz;
use App\Models\QuizItem;
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
                    ->hasChoices(4)
            )
            ->create();

        User::factory()
            ->count(10)
            ->create();
    }
}
