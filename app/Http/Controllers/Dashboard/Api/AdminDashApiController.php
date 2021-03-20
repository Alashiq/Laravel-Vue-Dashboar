<?php

namespace App\Http\Controllers\Dashboard\Api;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use GrahamCampbell\ResultType\Success;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class AdminDashApiController extends Controller
{

  
    // GET All Admins
    public function index()
    {
        $admins = Admin::latest()->get();
        if ($admins->isEmpty())
            return response()->json(['success' => false, 'message' => 'لا يوجد اي مشرفين في الموقع', 'data' => $admins], 204);
        return response()->json(['success' => true, 'message' => 'تم جلب  المشرفين بنجاح', 'data' => $admins], 200);
    }



    // Activate Admin
    public function active($admin)
    {
        $admin = Admin::Find($admin);
        if (!$admin)
            return response()->json(['success' => false, 'message' => 'هذه الحساب غير موجود'], 204);

        if ($admin->state == 1)
            return response()->json(['success' => false, 'message' => 'هذا الحساب مفعل مسبقا'], 400);

        if ($admin->state == 2)
            return response()->json(['success' => false, 'message' => 'هذا الحساب محظور ولا يمكن تفعيله'], 400);

        $admin->state = 1;
        $edit = $admin->save();
        if ($edit)
            return response()->json(['success' => true, 'message' => 'تم تفعيل هذا الحساب'], 200);
        return response()->json(['success' => true, 'message' => 'حدث خطأ ما'], 400);
    }


    // DisActivate Admin
    public function disActive($admin)
    {
        $admin = Admin::Find($admin);
        if (!$admin)
            return response()->json(['success' => false, 'message' => 'هذه الحساب غير موجود'], 204);

        if ($admin->state == 0)
            return response()->json(['success' => false, 'message' => 'هذا الحساب غير مفعل مسبقا'], 400);

        if ($admin->state == 2)
            return response()->json(['success' => false, 'message' => 'هذا الحساب محظور ولا يمكن تفعيله'], 400);

        $admin->state = 0;
        $edit = $admin->save();
        if ($edit)
            return response()->json(['success' => true, 'message' => 'تم إلغاء تفعيل هذا الحساب'], 200);
        return response()->json(['success' => true, 'message' => 'حدث خطأ ما'], 400);
    }


    // Banned Admin
    public function banned($admin)
    {
        $admin = Admin::Find($admin);
        if (!$admin)
            return response()->json(['success' => false, 'message' => 'هذه الحساب غير موجود'], 204);

        if ($admin->state == 2)
            return response()->json(['success' => false, 'message' => 'هذا الحساب محظور مسبقا'], 400);

        $admin->state = 2;
        $edit = $admin->save();
        if ($edit)
            return response()->json(['success' => true, 'message' => 'تم حظر هذا الحساب ولا يمكنم استخدامه مجددا'], 200);
        return response()->json(['success' => true, 'message' => 'حدث خطأ ما'], 400);
    }
}
