<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
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

Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/verify', [AuthController::class, 'verify']);
Route::post('/auth/reset', [AuthController::class, 'reset']);

// Route::get('/user', [UserController::class, 'getUsers']);
Route::get('/user/{userId}', [UserController::class, 'getUser']);
Route::get('/user', function () {
    $user = auth()->user();
    return response()->json(['user' => $user]);
})->middleware('jwt.auth');
