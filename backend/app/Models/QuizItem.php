<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuizItem extends Model {
    use HasFactory;

    public $jsonKeyMap = [
        'id' => 'id',

        'quiz_id' => 'quiz_id',
        'question' => 'question',
    ];

    public function quiz() {
        return $this->belongsTo(Quiz::class);
    }

    public function choices() {
        return $this->hasMany(Choice::class);
    }
}
