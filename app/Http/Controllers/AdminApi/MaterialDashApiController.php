<?php

namespace App\Http\Controllers\AdminApi;

use App\Http\Controllers\Controller;
use App\Models\Material;
use Illuminate\Http\Request;

class MaterialDashApiController extends Controller
{

    // GET Messages API =>Auth
    public function index()
    {
        $messages = Material::latest()->get();
        if ($messages->isEmpty())
            return response()->json(['success' => false, 'message' => 'لا يوجد اي مواد دراسية', 'data' => $messages], 204);
        return response()->json(['success' => true, 'message' => 'تم جلب المواد الدراسية بنجاح', 'data' => $messages], 200);
    }



    // GET One Messages API =>Auth
    public function show($message)
    {
        $message = Material::Find($message);
        if ($message == [])
            return response()->json([], 204);

        return response()->json(['success' => true, 'message' => 'تم جلب الرسالة بنجاح', 'data' => $message], 200);
    }

    
    // Add New Role
    public function create(Request $request)
    {
        $admin = Material::create([
            'name' => $request['name'],
            'description' => $request['description'],
            'admin_id' => $request['admin_id'],
            'year_id' => $request['year_id'],

        ]);
        return response()->json(['success' => true, 'message' => 'تم إضافة المادة بنجاح'], 200);
    }





}
