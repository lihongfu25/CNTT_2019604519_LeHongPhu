<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\IssueController;
use App\Http\Controllers\StatusController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\StatisticalController;
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
Route::middleware('jwt.auth')->get('/auth/token', [AuthController::class, 'show']);

Route::middleware('jwt.auth', 'role:superadmin,admin')->get('/role', [RoleController::class, 'index']);

Route::middleware('jwt.auth', 'role:superadmin,admin')->get('/user', [UserController::class, 'index']);
Route::middleware('jwt.auth', 'role:superadmin,admin')->get('/user/export', [UserController::class, 'export']);
Route::middleware('jwt.auth')->get('/user/{userId}', [UserController::class, 'show']);
Route::middleware('jwt.auth')->post('/user/{userId}', [UserController::class, 'update']);
Route::middleware('jwt.auth', 'role:superadmin,admin')->put('/user/{userId}/role', [UserController::class, 'update_role']);
Route::middleware('jwt.auth')->put('/user/{userId}/password', [UserController::class, 'update_password']);
Route::middleware('jwt.auth', 'role:superadmin,admin')->delete('/user/{userId}', [UserController::class, 'destroy']);

Route::middleware('jwt.auth')->get('/status', [StatusController::class, 'index']);

Route::middleware('jwt.auth')->get('/project', [ProjectController::class, 'index']);
Route::middleware('jwt.auth')->get('/project/{projectId}', [ProjectController::class, 'show']);
Route::middleware('jwt.auth', 'role:superadmin,admin')->get('/project/{projectId}/complete', [ProjectController::class, 'complete']);
Route::middleware('jwt.auth')->get('/project/{projectId}/issue', [ProjectController::class, 'getIssues']);
Route::middleware('jwt.auth')->get('/project/{projectId}/user', [ProjectController::class, 'getUsers']);
Route::middleware('jwt.auth', 'role:superadmin,admin')->post('/project', [ProjectController::class, 'store']);
Route::middleware('jwt.auth', 'role:superadmin,admin')->put('/project/{projectId}', [ProjectController::class, 'update']);
Route::middleware('jwt.auth', 'role:superadmin,admin')->delete('/project/{projectId}', [ProjectController::class, 'destroy']);

Route::middleware('jwt.auth')->get('/project-status', [ProjectStatusController::class, 'index']);
Route::middleware('jwt.auth', 'role:superadmin,admin')->post('/project-status', [ProjectStatusController::class, 'store']);

Route::middleware('jwt.auth')->get('/project-user', [ProjectUserController::class, 'index']);
Route::middleware('jwt.auth', 'role:superadmin,admin')->post('/project-user', [ProjectUserController::class, 'store']);

Route::middleware('jwt.auth')->get('/issue', [IssueController::class, 'index']);
Route::middleware('jwt.auth')->get('/issue/{issueId}', [IssueController::class, 'show']);
Route::middleware('jwt.auth')->get('/issue/status/{statusId}', [IssueController::class, 'getIssueByStatus']);
Route::middleware('jwt.auth')->post('/issue', [IssueController::class, 'store']);
Route::middleware('jwt.auth')->post('/issue/{issueId}/status', [IssueController::class, 'changeIssueStatus']);
Route::middleware('jwt.auth')->put('/issue/{issueId}', [IssueController::class, 'update']);
Route::middleware('jwt.auth', 'role:superadmin,admin')->delete('/issue/{issueId}', [IssueController::class, 'destroy']);

Route::middleware('jwt.auth')->get('/comment', [CommentController::class, 'index']);
Route::middleware('jwt.auth')->post('/comment', [CommentController::class, 'store']);
Route::middleware('jwt.auth')->delete('/comment/{commentId}', [CommentController::class, 'destroy']);

Route::middleware('jwt.auth')->get('/notification', [NotificationController::class, 'index']);
Route::middleware('jwt.auth')->post('/notification', [NotificationController::class, 'store']);
Route::middleware('jwt.auth')->put('/notification/{notificationId}', [NotificationController::class, 'update']);

Route::middleware('jwt.auth')->post('/statistical', [StatisticalController::class, 'index']);

