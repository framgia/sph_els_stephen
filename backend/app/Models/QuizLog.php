<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuizLog extends Model {
    use HasFactory;

    public function log() {
        return $this->morphOne(ActivityLog::class, 'loggable');
    }
}
