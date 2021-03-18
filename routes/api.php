<?php

use App\Http\Controllers\API\Dash\AdminDashController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;





Route::get('/notAuth', function (Request $request) {
    return response()->json(["success"=>false,"message"=>"انت لم تسجل دخولك أو انتهت الجلسة الخاصة بك"],401);
});



Route::post('/admin', [AdminDashController::class, 'new']);
Route::post('/admin/login', [AdminDashController::class, 'login']);

Route::prefix('admin')->middleware(['auth:sanctum', 'type.admin'])->group(function () {
    Route::get('/auth', [AdminDashController::class, 'profile']);
    Route::get('/logout', [AdminDashController::class, 'logout']);
    Route::put('/', [AdminDashController::class, 'update']);
    Route::post('/photo', [AdminDashController::class, 'updatePhoto']);
});


