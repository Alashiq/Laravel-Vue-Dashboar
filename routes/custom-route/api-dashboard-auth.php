<?php

use App\Http\Controllers\Dash\Api\AdminDashApiController;
use App\Http\Controllers\Dash\Api\AuthDashApiController;
use App\Http\Controllers\Dash\Api\HomeDashApiController;
use App\Http\Controllers\Dash\Api\MessageDashApiController;
use App\Http\Controllers\Web\Api\MessageWebApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;


// Admin AUTH
Route::middleware(['auth:sanctum', 'type.admin'])->group(function () {
    // Auth Dash Route
    Route::get('/auth', [AuthDashApiController::class, 'profile']);
    Route::get('/logout', [AuthDashApiController::class, 'logout']);
    Route::put('/', [AuthDashApiController::class, 'update']);
    Route::post('/photo', [AuthDashApiController::class, 'updatePhoto']);
    //  Home Dash Route 
    Route::get('/home', [HomeDashApiController::class, 'index']);

    // Message Route
    Route::get('/message', [MessageDashApiController::class, 'index']);
    Route::delete('/message/{message}', [MessageDashApiController::class, 'delete']);
    Route::put('/message/{message}', [MessageDashApiController::class, 'edit']);
    Route::get('/message/{message}', [MessageDashApiController::class, 'show']);
    // Admin Route
    Route::get('/admin', [AdminDashApiController::class, 'index']);
    Route::put('/admin/{admin}/active', [AdminDashApiController::class, 'active']);
    Route::put('/admin/{admin}/disActive', [AdminDashApiController::class, 'disActive']);
    Route::put('/admin/{admin}/banned', [AdminDashApiController::class, 'banned']);
    Route::put('/admin/{admin}/reset', [AdminDashApiController::class, 'resetPassword']);
    Route::get('/admin/{admin}', [AdminDashApiController::class, 'show']);
    Route::post('/admin', [AdminDashApiController::class, 'create']);
});

