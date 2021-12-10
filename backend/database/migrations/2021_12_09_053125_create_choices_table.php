<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateChoicesTable extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create('choices', function (Blueprint $table) {
            $table->id();

            $table->foreignId('quiz_item_id')->constrained()->cascadeOnDelete();
            $table->string('choice');
            $table->boolean('is_correct');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::dropIfExists('choices');
    }
}
