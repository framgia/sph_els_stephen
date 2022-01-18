<?php

use App\Http\Controllers\ActivityLogController;
use App\Http\Controllers\FollowController;
use App\Http\Controllers\LearnedWordsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\QuizItemController;
use App\Http\Controllers\QuizLogController;
use App\Http\Controllers\QuizQuizItemController;
use App\Http\Controllers\QuizResultController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('quizzes', QuizController::class);
Route::apiResource('quiz_items', QuizItemController::class);
Route::apiResource('users', UserController::class);
Route::post('login', [UserController::class, 'login']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('logout', [UserController::class, 'logout']);
    Route::apiResource('follows', FollowController::class)->only('index', 'store', 'show');
    Route::delete('follows', [FollowController::class, 'destroy']);
    Route::apiResource('quiz_logs', QuizLogController::class)->only('index', 'store', 'show');
    Route::post('quiz_logs/{quiz}/submit', [QuizLogController::class, 'submit']);
    Route::apiResource('activity_logs', ActivityLogController::class)->only('index', 'show');
    Route::apiResource('quizzes.quiz_items', QuizQuizItemController::class)->only('index');
    Route::apiResource('quizzes.results', QuizResultController::class)->only('index');
    Route::apiResource('learned_words', LearnedWordsController::class)->only('index');
});
