<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateActivityLogsTable extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up() {
        Schema::create('activity_logs', function (Blueprint $table) {
            $table->id();

            // json string, [doer, action, recipient] on frontend => wrap doer with anchor, recipient with anchor
            $table->string('message'); // i.e. [john, follows, marry] or [mike, answers, math69]
            $table->morphs('loggable');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down() {
        Schema::dropIfExists('activity_logs');
    }
}
