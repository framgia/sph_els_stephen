<?php

namespace App\Models;

use App\Events\AnswerCreated;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Answer extends Model {
    use HasFactory;

    protected $dispatchesEvents = [
        'created' => AnswerCreated::class,
    ];

    public function quiz_log() {
        return $this->belongsTo(QuizLog::class);
    }

    public function choice() {
        return $this->belongsTo(Choice::class);
    }
}
