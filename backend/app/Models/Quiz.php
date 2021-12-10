<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Nette\NotImplementedException;

class Quiz extends Model {
    use HasFactory;

    public function users() {
        throw new NotImplementedException();
    }

    public function quizItems() {
        return $this->hasMany(QuizItem::class);
    }

    public function choices() {
        return $this->hasManyThrough(Choice::class, QuizItem::class);
    }
}
