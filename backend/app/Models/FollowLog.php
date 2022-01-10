<?php

namespace App\Models;

use App\Events\FollowLogCreated;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FollowLog extends Model {
    use HasFactory;

    public function log() {
        return $this->morphOne(ActivityLog::class, 'loggable');
    }

    protected $dispatchesEvents = [
        'created' => FollowLogCreated::class,
    ];

    public function follower() {
        return $this->belongsTo(User::class, 'from_id');
    }

    public function following() {
        return $this->belongsTo(User::class, 'to_id');
    }
}
