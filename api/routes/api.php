<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PaymentController;
use Laravel\Sanctum\Http\Controllers\CsrfCookieController;
use Laravel\Sanctum\Http\Controllers\SanctumController;
use App\Http\Controllers\ScoreController;
use App\Http\Controllers\UserController;


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

Route::post('/register', [UserController::class, 'register']);

Route::post('/scoreSave', [ScoreController::class, 'store']);

Route::get('/test', [UserController::class, 'test']);

Route::get('/scores', [ScoreController::class, 'scores']);

Route::post('/login', [UserController::class, 'login']);

Route::post('/asdasdasd', [PaymentController::class, 'makeMargungijs']);


Route::get('/testtest', [PaymentController::class, 'returnCoins']);

Route::post('/123123123', [UserController::class, 'makeMargungijsHearts']);

Route::middleware('auth:sanctum')->group(function () {
    // Your authenticated routes here
    Route::post('/logout', [UserController::class, 'logout']);
    Route::get('/getUserData', [UserController::class, 'getUserData']);
    Route::put('/updateUserData', [UserController::class, 'updateUserData']);
    Route::put('/updateUserPassword', [UserController::class, 'updateUserPassword']);
    Route::get('/getUserCoin', [UserController::class, 'getUserCoin']);
    Route::get('/createPaymentIntent', [PaymentController::class, 'createPaymentIntent']);
    Route::get('/getUserHearts', [UserController::class, 'getUserHearts']);
    Route::put('/buyHearts', [PaymentController::class, 'buyHearts']);
});

