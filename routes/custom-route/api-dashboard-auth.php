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
    Route::get('/home', [HomeDashApiController::class, 'index']);
    # # # # # # # # # # # # # # # End Home # # # # # # # # # # # # # # # 


    # # # # # # # # # # # # # # # Message # # # # # # # # # # # # # # # 
    Route::group(['prefix' => 'message'], function () {
        Route::get('/', [MessageDashApiController::class, 'index']);
        Route::delete('/{message}', [MessageDashApiController::class, 'delete']);
        Route::put('/{message}', [MessageDashApiController::class, 'edit']);
        Route::get('/{message}', [MessageDashApiController::class, 'show']);
    });
    # # # # # # # # # # # # # # # End Message # # # # # # # # # # # # # # # 


    # # # # # # # # # # # # # # # Admin # # # # # # # # # # # # # # # 
    Route::group(['prefix' => 'admin'], function () {
        Route::get('/', [AdminDashApiController::class, 'index']);
        Route::get('/{admin}', [AdminDashApiController::class, 'show']);
        Route::post('/', [AdminDashApiController::class, 'create']);
        Route::put('/{admin}/active', [AdminDashApiController::class, 'active']);
        Route::put('/{admin}/disActive', [AdminDashApiController::class, 'disActive']);
        Route::put('/{admin}/banned', [AdminDashApiController::class, 'banned']);
        Route::put('/{admin}/reset', [AdminDashApiController::class, 'resetPassword']);
    });
    # # # # # # # # # # # # # # # End Admin # # # # # # # # # # # # # # # 



    // ,'middleware'=>'check.role:redm'
    # # # # # # # # # # # # # # # Roles # # # # # # # # # # # # # # # 
    Route::group(['prefix' => 'role','middleware'=>'check.role:ReadMessage'], function () {
        Route::get('/', [RoleController::class, 'index']);
        Route::post('/', [RoleController::class, 'create']);
        Route::get('/permissions', [RoleController::class, 'permissions']);
    });
    # # # # # # # # # # # # # # # End Roles # # # # # # # # # # # # # # # 


});
