<?php

use App\Http\Controllers\Dash\Api\AdminDashApiController;
use App\Http\Controllers\Dash\Api\AuthDashApiController;
use App\Http\Controllers\Dash\Api\HomeDashApiController;
use App\Http\Controllers\Dash\Api\MessageDashApiController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\Web\Api\MessageWebApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;


Route::middleware(['auth:sanctum', 'type.admin'])->group(function () {


    # # # # # # # # # # # # # # # Auth # # # # # # # # # # # # # # # 
    Route::get('/auth', [AuthDashApiController::class, 'profile']);
    Route::get('/logout', [AuthDashApiController::class, 'logout']);
    Route::put('/', [AuthDashApiController::class, 'update']);
    Route::post('/photo', [AuthDashApiController::class, 'updatePhoto']);
    # # # # # # # # # # # # # # # End Auth # # # # # # # # # # # # # # # 


    # # # # # # # # # # # # # # # Home # # # # # # # # # # # # # # # 
    Route::get('/home', [HomeDashApiController::class, 'index'])->middleware('check.role:HomeChart');
    # # # # # # # # # # # # # # # End Home # # # # # # # # # # # # # # # 


    # # # # # # # # # # # # # # # Message # # # # # # # # # # # # # # # 
    Route::group(['prefix' => 'message'], function () {
        Route::get('/', [MessageDashApiController::class, 'index'])->middleware('check.role:ReadMessage');
        Route::delete('/{message}', [MessageDashApiController::class, 'delete'])->middleware('check.role:DeleteMessage');
        Route::put('/{message}', [MessageDashApiController::class, 'edit'])->middleware('check.role:EditMessage');
        Route::get('/{message}', [MessageDashApiController::class, 'show'])->middleware('check.role:ReadMessage');
    });
    # # # # # # # # # # # # # # # End Message # # # # # # # # # # # # # # # 


    # # # # # # # # # # # # # # # Admin # # # # # # # # # # # # # # # 
    Route::group(['prefix' => 'admin'], function () {
        Route::get('/', [AdminDashApiController::class, 'index'])->middleware('check.role:ReadAdmin');
        Route::get('/role', [AdminDashApiController::class, 'role'])->middleware('check.role:CreateAdmin');
        Route::get('/{admin}', [AdminDashApiController::class, 'show'])->middleware('check.role:ReadAdmin');
        Route::post('/', [AdminDashApiController::class, 'create'])->middleware('check.role:CreateAdmin');
        Route::put('/{admin}/active', [AdminDashApiController::class, 'active'])->middleware('check.role:ActiveAdmin');
        Route::put('/{admin}/disActive', [AdminDashApiController::class, 'disActive'])->middleware('check.role:DisActiveAdmin');
        Route::put('/{admin}/banned', [AdminDashApiController::class, 'banned'])->middleware('check.role:BannedAdmin');
        Route::put('/{admin}/reset', [AdminDashApiController::class, 'resetPassword'])->middleware('check.role:ResetPasswordAdmin');
        Route::put('/{admin}/role', [AdminDashApiController::class, 'changeAdminRole'])->middleware('check.role:EditRoleAdmin');
    });
    # # # # # # # # # # # # # # # End Admin # # # # # # # # # # # # # # # 



    # # # # # # # # # # # # # # # Roles # # # # # # # # # # # # # # # 
    Route::group(['prefix' => 'role'], function () {
        Route::get('/', [RoleController::class, 'index'])->middleware('check.role:ReadRole');
        Route::post('/', [RoleController::class, 'create'])->middleware('check.role:CreateRole');
        Route::delete('/{role}', [RoleController::class, 'delete'])->middleware('check.role:DeleteRole');
        Route::PUT('/{role}', [RoleController::class, 'edit'])->middleware('check.role:EditRole');
        Route::get('/permissions', [RoleController::class, 'permissions'])->middleware('check.role:CreateRole');
        Route::get('/{role}', [RoleController::class, 'show'])->middleware('check.role:ReadRole');
    });
    # # # # # # # # # # # # # # # End Roles # # # # # # # # # # # # # # # 


});
