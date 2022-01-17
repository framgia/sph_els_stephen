<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Nette\NotImplementedException;

class Choice extends Model {
    use HasFactory;

    public $jsonKeyMap = [
        'id' => 'id',
        'quiz_item_id' => 'quiz_item_id',
        'choice' => 'choice',
    ];

    public function quizItem() {
        return $this->belongsTo(QuizItem::class);
    }

    public function quiz() {
        throw new NotImplementedException();
    }
}
