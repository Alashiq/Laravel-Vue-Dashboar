<?php

namespace App\Http\Controllers\Web\Api;

use App\Http\Controllers\Controller;
use App\Models\Message;
use Illuminate\Http\Request;

class MessageWebApiController extends Controller
{
        // Add New Admin
        public function create(Request $request)
        {
    
            $message = Message::create([
                'name' => $request['name'],
                'email' => $request['email'],
                'phone' => $request['phone'],
                'receiver_id' => $request['receiver_id'],
                'content' => $request['content'],
            ]);
            return response()->json(['success' => true, 'message' => 'تم إرسال الرسالة بنجاح'], 200);
        }

}
