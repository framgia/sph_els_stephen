<?php

use App\Http\Controllers\FollowController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\QuizItemController;

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
Route::post('logout', [UserController::class, 'logout']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::apiResource('follows', FollowController::class)->only('index', 'store');
    Route::delete('follows', [FollowController::class, 'destroy']);
});
