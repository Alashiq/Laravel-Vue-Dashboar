<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\Receiver;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use function PHPUnit\Framework\isEmpty;

class RoleController extends Controller
{



    // Add New Role
    public function create(Request $request)
    {
        if (Validator::make($request->all(), [
            'name' => 'required',
        ])->fails()) {
            return response()->json(["success" => false, "message" => "يجب عليك ادخال اسم الصلاحية"], 400);
        }
        if (Validator::make($request->all(), [
            'name' => 'unique:roles',
        ])->fails()) {
            return response()->json(["success" => false, "message" => "توجد صلاحية بهذا الإسم"], 400);
        }


        if (Validator::make($request->all(), [
            'permissions' => 'required|min:1',
        ])->fails()) {
            return response()->json(["success" => false, "message" => "يجب عليك ادخال وظئيفة واحدة على الأقل"], 400);
        }
        if (Validator::make($request->all(), [
            'permissions' => 'array',
        ])->fails()) {
            return response()->json(["success" => false, "message" => "نوع الوظائف غير صحيح"], 400);
        }


        $admin = Role::create([
            'name' => $request['name'],
            'permissions' => json_encode($request['permissions']),

        ]);
        return response()->json(['success' => true, 'message' => 'تم إنشاء الصلاحية بنجاح'], 200);
    }


    // Get All Roles
    public function index(Request $request)
    {
        $roles = Role::withCount('admins')->get();
        if ($roles->isEmpty())
            return response()->json(["success" => false, "message" => "لا يوجد اي رتب للمستخدمين حتى الان"], 204);
        return response()->json(["success" => true, "message" => "تم جل جميع الرتب بنجاح", "roleList" => $roles]);
    }




    // Get All Permissions
    public function permissions(Request $request)
    {
        //$permissions=config('global.permissions');
        $permissions = [];
        foreach (config('global.permissions') as $name => $value) {
            array_push($permissions, ["name" => $name, "description" => $value, "state" => false]);
        }
        return response()->json(["success" => true, "message" => "تم جل جميع الصلاحيات بنجاح", "permissions" => $permissions]);
    }



    // Delete One Role
    public function delete($role)
    {
        $roleRes = Role::withCount('admins')->Find($role);
        if (!$roleRes)
            return response()->json(['success' => false, 'message' => 'هذه الصلاحية غير موجودة'], 204);

        if ($roleRes->admins_count != 0) {
            return response()->json(['success' => false, 'message' => 'لا يمكنك حذف هذه الصلاحية, يوجد مشرفين لديهم هذه الصلاحية'], 400);
        }
        $delete = $roleRes->delete();
        if ($delete)
            return response()->json(['success' => true, 'message' => 'تم حذف الصلاحية بنجاح', 'data' => $roleRes], 200);
        return response()->json(['success' => true, 'message' => 'حدث خطأ ما'], 400);
    }
}
