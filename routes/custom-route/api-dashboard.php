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




// Login And Register Admin
Route::post('/admin/login', [AuthDashApiController::class, 'login']);

// Unauthorized
Route::get('/notAuth', function (Request $request) {
    return response()->json(["success" => false, "message" => "انت لم تسجل دخولك أو انتهت الجلسة الخاصة بك"], 401);
});