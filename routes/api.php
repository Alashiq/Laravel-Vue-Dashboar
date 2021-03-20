<?php
use App\Http\Controllers\Dashboard\Api\AdminDashApiController;
use App\Http\Controllers\Dashboard\Api\AuthDashApiController;
use App\Http\Controllers\Dashboard\Api\MessageDashApiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;



Route::get('/notAuth', function (Request $request) {
    return response()->json(["success" => false, "message" => "انت لم تسجل دخولك أو انتهت الجلسة الخاصة بك"], 401);
});


// Login And Register Admin
Route::post('/admin', [AuthDashApiController::class, 'new']);
Route::post('/admin/login', [AuthDashApiController::class, 'login']);



// Admin AUTH
Route::prefix('admin')->middleware(['auth:sanctum', 'type.admin'])->group(function () {
    // Auth Dash Route
    Route::get('/auth', [AuthDashApiController::class, 'profile']);
    Route::get('/logout', [AuthDashApiController::class, 'logout']);
    Route::put('/', [AuthDashApiController::class, 'update']);
    Route::post('/photo', [AuthDashApiController::class, 'updatePhoto']);
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
});
