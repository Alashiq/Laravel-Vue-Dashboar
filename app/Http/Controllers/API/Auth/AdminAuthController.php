<?php

namespace App\Http\Controllers\API\Auth;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;


class AdminAuthController extends Controller
{

    public function new(Request $request)
    {
        $admin = Admin::create([
            'username' => $request['username'],
            'name' => $request['name'],
            'password' => Hash::make($request['password']),
        ]);
        return 'success';
    }

    public function login(Request $request)
    {
        // $request->validate([
        //     'username' => 'required|username',
        //     'password' => 'required',
        // ]);

        $customer = Admin::where('username', $request->username)->first();

        if (!$customer || !Hash::check($request->password, $customer->password)) {

            return response()->json(['success' => false, 'message' => 'your email or password wrong'], 400);
            // throw ValidationException::withMessages([
            //     'username' => ['The provided credentials are incorrect.'],
            // ]);
        }


        return response()->json([
            'customer' => $customer,
            'token' => $customer->createToken('website', ['role:admin'])->plainTextToken
        ]);
    }

    public function profile(Request $request)
    {
        return $request->user()->tokenCan('role:admin');
    }


    public function logout(Request $request)
    {
        $user = $request->user();
        $user->tokens()->delete();
        return response()->json(["success" => true, "message" => "تم تسجيل الخروج بنجاح"]);
    }


    public function update(Request $request)
    {
        $user = $request->user()->update($request->only(
            "name"
        ));

        return response()->json(["success"=>true,"message"=>"تم تحديث اسم المستخدم بنجاح","user"=>$request->user()]);
    }


}
