<?php

use App\Http\Controllers\API\Auth\AdminAuthController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;





Route::get('/notAuth', function (Request $request) {
    return response()->json(["success"=>false,"message"=>"انت لم تسجل دخولك أو انتهت الجلسة الخاصة بك"],401);
});



Route::post('/admin', [AdminAuthController::class, 'new']);
Route::post('/admin/login', [AdminAuthController::class, 'login']);

Route::prefix('admin')->middleware(['auth:sanctum', 'type.admin'])->group(function () {
    Route::get('/auth', [AdminAuthController::class, 'profile']);
    Route::get('/logout', [AdminAuthController::class, 'logout']);
    Route::put('/', [AdminAuthController::class, 'update']);
});
