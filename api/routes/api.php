<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use Laravel\Sanctum\Http\Controllers\CsrfCookieController;
use Laravel\Sanctum\Http\Controllers\SanctumController;
use App\Http\Controllers\ScoreController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

use App\Http\Controllers\UserController;

Route::post('/register', [UserController::class, 'register']);

Route::post('/scoreSave', [ScoreController::class, 'store']);

Route::get('/test', [UserController::class, 'test']);

Route::get('/scores', [ScoreController::class, 'scores']);

Route::post('/login', [UserController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    // Your authenticated routes here
    Route::post('/logout', [UserController::class, 'logout']);
    Route::get('/getUserData', [UserController::class, 'getUserData']);
    Route::put('/updateUserData', [UserController::class, 'updateUserData']);
    Route::put('/updateUserPassword', [UserController::class, 'updateUserPassword']);
});

