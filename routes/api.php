<?php

use App\Http\Controllers\API\Auth\AdminAuthController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;



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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    if(!$request->user())
    return response()->json(["success"=>false,"message"=>"youre not user"],401);
    return $request->user();
});



Route::post('/user/login', function (Request $request) {
    // $request->validate([
    //     'email' => 'required|email',
    //     'password' => 'required',
    //     'device_name' => 'required',
    // ]);

    $user = User::where('email', $request->email)->first();

    if (! $user || ! Hash::check($request->password, $user->password)) {
        return response()->json(['success'=>false,'message'=>'your email or password wrong'],400);
        // throw ValidationException::withMessages([
        //     'email' => ['The provided credentials are incorrect.'],
        // ]);
    }

    return $user->createToken('website', ['role:user'])->plainTextToken;
});


Route::middleware('auth:sanctum')->get('/user/logout', function (Request $request) {
    $user = $request->user();
    $user->tokens()->delete();
    return 'deleted token';
});


Route::get('/notAuth', function (Request $request) {
    return response()->json(["success"=>false,"message"=>"انت لم تسجل دخولك أو انتهت الجلسة الخاصة بك"],401);
});



Route::post('/admin', [AdminAuthController::class, 'new']);
Route::post('/admin/login', [AdminAuthController::class, 'login']);



Route::middleware(['auth:sanctum', 'type.admin'])->group(function () {
    Route::get('/admin/auth', [AdminAuthController::class, 'profile']);
});

