<?php

namespace App\Providers;

use App\Events\AnswerCreated;
use App\Events\FollowLogCreated;
use App\Events\QuizLogCreated;
use App\Listeners\HandleAnswerCreated;
use App\Listeners\HandleFollowLogCreated;
use App\Listeners\HandleQuizLogCreated;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;

class EventServiceProvider extends ServiceProvider {
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
        FollowLogCreated::class => [
            HandleFollowLogCreated::class,
        ],
        QuizLogCreated::class => [
            HandleQuizLogCreated::class
        ],
        AnswerCreated::class => [
            HandleAnswerCreated::class
        ]
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot() {
        //
    }
}
