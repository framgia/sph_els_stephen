<?php

namespace App\Models;

use App\Models\Quiz;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Nette\NotImplementedException;

class User extends Authenticatable {
    use HasApiTokens, HasFactory, Notifiable;

    public $jsonKeyMap = [
        'id' => 'id',

        'name' => 'name',
        'email' => 'email',
        'avatar' => 'avatar',
        'is_admin' => 'is_admin',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function quiz_logs() {
        return $this->hasMany(QuizLog::class);
    }

    public function quizzes() {
        return $this->belongsToMany(Quiz::class, 'quiz_logs');
    }

    public function following() {
        return $this->hasMany(FollowLog::class, 'to_id');
    }

    public function followers() {
        return $this->hasMany(FollowLog::class, 'from_id');
    }
}
