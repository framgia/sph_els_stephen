<?php

namespace App\Models;

use App\Events\QuizLogCreated;
use App\Events\QuizLogRetrieved;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuizLog extends Model {
    use HasFactory;

    protected $dispatchesEvents = [
        'created' => QuizLogCreated::class,
        'retrieved' => QuizLogRetrieved::class,
    ];

    public function quiz() {
        return $this->belongsTo(Quiz::class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function answers() {
        return $this->hasMany(Answer::class);
    }

    public function log() {
        return $this->morphMany(ActivityLog::class, 'loggable');
    }
}
