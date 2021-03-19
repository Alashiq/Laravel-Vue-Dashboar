<?php

use App\Http\Controllers\API\Dash\AdminDashController;
use App\Http\Controllers\API\Dash\MessageApiDashController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;





Route::get('/notAuth', function (Request $request) {
    return response()->json(["success" => false, "message" => "انت لم تسجل دخولك أو انتهت الجلسة الخاصة بك"], 401);
});


// Login And Register Admin
Route::post('/admin', [AdminDashController::class, 'new']);
Route::post('/admin/login', [AdminDashController::class, 'login']);



// Admin AUTH
Route::prefix('admin')->middleware(['auth:sanctum', 'type.admin'])->group(function () {
    // Admin Route
    Route::get('/auth', [AdminDashController::class, 'profile']);
    Route::get('/logout', [AdminDashController::class, 'logout']);
    Route::put('/', [AdminDashController::class, 'update']);
    Route::post('/photo', [AdminDashController::class, 'updatePhoto']);
    // Message Route
    Route::get('/message', [MessageApiDashController::class, 'index']);
    Route::delete('/message/{message}', [MessageApiDashController::class, 'delete']);
    Route::put('/message/{message}', [MessageApiDashController::class, 'edit']);
    Route::get('/message/{message}', [MessageApiDashController::class, 'show']);

});
