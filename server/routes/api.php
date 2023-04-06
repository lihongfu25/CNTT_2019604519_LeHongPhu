<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\IssueController;
use App\Http\Controllers\StatusController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\ProjectUserController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ProjectStatusController;
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

Route::middleware('jwt.auth', 'role:admin')->get('/user', [UserController::class, 'index']);
Route::middleware('jwt.auth')->get('/user/{userId}', [UserController::class, 'show']);
Route::middleware('jwt.auth')->get('/user/{userId}/project', [UserController::class, 'getProjects']);
Route::middleware('jwt.auth')->get('/user/{userId}/notification', [UserController::class, 'getNotifications']);
Route::middleware('jwt.auth')->put('/user/{userId}', [UserController::class, 'update']);
Route::middleware('jwt.auth', 'role:admin')->delete('/user/{userId}', [UserController::class, 'destroy']);

Route::middleware('jwt.auth')->get('/status', [StatusController::class, 'index']);

Route::middleware('jwt.auth')->get('/project', [ProjectController::class, 'index']);
Route::middleware('jwt.auth')->get('/project/{projectId}', [ProjectController::class, 'show']);
Route::middleware('jwt.auth', 'role:admin')->get('/project/{projectId}/user', [ProjectController::class, 'getUsers']);
Route::middleware('jwt.auth', 'role:admin')->post('/project', [ProjectController::class, 'store']);
Route::middleware('jwt.auth', 'role:admin')->put('/project/{projectId}', [ProjectController::class, 'update']);
Route::middleware('jwt.auth', 'role:admin')->delete('/project/{projectId}', [ProjectController::class, 'destroy']);

Route::middleware('jwt.auth')->get('/project-status', [ProjectStatusController::class, 'index']);
Route::middleware('jwt.auth', 'role:admin')->post('/project-status', [ProjectStatusController::class, 'store']);

Route::middleware('jwt.auth')->get('/project-user', [ProjectUserController::class, 'index']);
Route::middleware('jwt.auth', 'role:admin')->post('/project-user', [ProjectUserController::class, 'store']);

Route::middleware('jwt.auth')->get('/issue/{issueId}', [IssueController::class, 'show']);
Route::middleware('jwt.auth')->post('/issue', [IssueController::class, 'store']);

Route::middleware('jwt.auth')->post('/comment', [CommentController::class, 'store']);

Route::middleware('jwt.auth')->post('/notification', [NotificationController::class, 'store']);
