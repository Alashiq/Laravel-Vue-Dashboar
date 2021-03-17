<?php

namespace App\Http\Controllers\API\Dash;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use GrahamCampbell\ResultType\Success;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;


class AdminDashController extends Controller
{

    // Register Admin
    public function new(Request $request)
    {
        $admin = Admin::create([
            'username' => $request['username'],
            'name' => $request['name'],
            'password' => Hash::make($request['password']),
        ]);
        return 'success';
    }


    // Login Admin
    public function login(Request $request)
    {
        $customer = Admin::where('username', $request->username)->first();

        if (!$customer || !Hash::check($request->password, $customer->password)) {

            return response()->json(['success' => false, 'message' => 'your email or password wrong'], 400);
        }


        return response()->json([
            'success' => true,
            'message' => 'تم تسجيل الدخول بنجاح',
            'user' => [
                'id' => $customer->id,
                'name' => $customer->name,
                'username' => $customer->username,
                'photo' => $customer->photo,
                'token' => $customer->createToken('website', ['role:admin'])->plainTextToken

            ]
        ]);
    }

    //  Get Admin Info
    public function profile(Request $request)
    {
        return response()->json(["success" => true, "message" => "مرحبا بالمستخدم", "user" => $request->user()]);
    }


    //  Logout Admin
    public function logout(Request $request)
    {
        $user = $request->user();
        $user->tokens()->delete();
        return response()->json(["success" => true, "message" => "تم تسجيل الخروج بنجاح"]);
    }


    //  Change Admin Name
    public function update(Request $request)
    {
        if ($request->name) {
            $user = $request->user()->update($request->only(
                "name"
            ));
            return response()->json(["success" => true, "message" => "تم تحديث الإسم بنجاح", "user" => $request->user()]);
        } elseif ($request->oldPassword && $request->newPassword) {

            if (!Hash::check($request->oldPassword, $request->user()->password)) {

                return response()->json(['success' => false, 'message' => 'كلمة المرور القديمة غير صحيحة'], 400);
            }
            $request->user()->password = Hash::make($request->newPassword);
            $request->user()->save();
            return response()->json(["success" => true, "message" => "تم تغيير كلمة المرور بنجاح"], 200);
        } else {
            return response()->json(["success" => false, "message" => "لم تقم بإرسال اي حقول لتعديلها"], 400);
        }
    }



    //  Change Password Name
    public function changePassword(Request $request)
    {
        $user = $request->user()->update($request->only(
            "name"
        ));
        return response()->json(["success" => true, "message" => "تم تحديث الإسم بنجاح", "user" => $request->user()]);
    }
}
