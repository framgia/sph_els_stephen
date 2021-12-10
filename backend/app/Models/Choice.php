<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Nette\NotImplementedException;

class Choice extends Model {
    use HasFactory;

    public function quizItem() {
        return $this->belongsTo(QuizItem::class);
    }

    public function quiz() {
        throw new NotImplementedException();
    }
}
