<?php

namespace App\Http\Controllers\AdminApi;

use App\Http\Controllers\Controller;
use App\Models\Exam;
use App\Models\Admin;
use App\Models\StudenExam;
use Illuminate\Http\Request;

class ExamDashApiController extends Controller
{

    // GET Messages API =>Auth
    public function index()
    {
        $messages = Exam::with('material:id,name')->latest()->get();
        if ($messages->isEmpty())
            return response()->json(['success' => false, 'message' => 'لا يوجد اي اختبارات', 'data' => $messages], 204);
        return response()->json(['success' => true, 'message' => 'تم جلب الاختبارات بنجاح', 'data' => $messages], 200);
    }


        // GET Messages API =>Auth
        public function myExams(Request $request)
        {
            $exams = Exam::with('material:id,name')->latest()->get();
            $i=0;
            foreach ($exams as $item){ 
                $exam = StudenExam::where('user_id',$request->user()->id)->where('exam_id',$item->id)->first();
                if($exam==[]){
                    $exams[$i]['state']=false;
                    $exams[$i]['degree']=0;
                }else{
                    $exams[$i]['state']=true;
                    $exams[$i]['degree']=$exam->degree;
                }
                $i++;
                }
            if ($exams->isEmpty())
                return response()->json(['success' => false, 'message' => 'لا يوجد اي اختبارات', 'data' => $exams], 204);
            return response()->json(['success' => true, 'message' => 'تم جلب الاختبارات بنجاح', 'data' => $exams], 200);
        }




        // GET Messages API =>Auth
        public function loadAns(Request $request)
        {

            // $exams = Exam::with('material:id,name')->latest()->get();
            // $i=0;
            // foreach ($exams as $item){ 
            //     $exam = StudenExam::where('user_id',$request->user()->id)->where('exam_id',$item->id)->first();
            //     if($exam==[]){
            //         $exams[$i]['state']=false;
            //         $exams[$i]['degree']=0;
            //     }else{
            //         $exams[$i]['state']=true;
            //         $exams[$i]['degree']=$exam->degree;
            //     }
            //     $i++;
            //     }
            // if ($exams->isEmpty())
            //     return response()->json(['success' => false, 'message' => 'لا يوجد اي اختبارات', 'data' => $exams], 204);
            // return response()->json(['success' => true, 'message' => 'تم جلب الاختبارات بنجاح', 'data' => $exams], 200);


            $exams = StudenExam::get();
            $i=0;

            foreach ($exams as $item){ 
                $exam = Exam::with('material:id,name')->where('id',$item->exam_id)->first();
                $student = Admin::where('id',$item->user_id)->first();

                if($exam==[]){
                    $exams[$i]['title']="";
                    $exams[$i]['material']="";
                    $exams[$i]['full']=0;
                    $exams[$i]['student']="";
                }else{
                    $exams[$i]['title']=$exam->name;
                    $exams[$i]['material']=$exam->material->name;
                    $exams[$i]['full']=$exam->q1_point+$exam->q2_point+$exam->q3_point;
                    $exams[$i]['student']=$student->name;
                }
                $i++;
                }

            if ($exams->isEmpty())
                return response()->json(['success' => false, 'message' => 'لا يوجد اي اختبارات', 'data' => $exams], 204);
            return response()->json(['success' => true, 'message' => 'تم جلب الاختبارات بنجاح', 'data' => $exams], 200);
        }



    // GET One Messages API =>Auth
    public function show($message)
    {
        $message = Exam::with('material:id,name')->Find($message);
        if ($message == [])
            return response()->json([], 204);

        return response()->json(['success' => true, 'message' => 'تم جلب الرسالة بنجاح', 'data' => $message], 200);
    }

    // Delete Team Member
    public function delete($team)
    {
        $team = Exam::Find($team);
        if (!$team)
            return response()->json(['success' => false, 'message' => 'هذا العضو غير موجود'], 204);
        $delete = $team->delete();
        if ($delete)
            return response()->json(['success' => true, 'message' => 'تم حذف العضو بنجاح', 'data' => $team], 200);
        return response()->json(['success' => true, 'message' => 'حدث خطأ ما'], 400);
    }
    
    // Add New Role
    public function create(Request $request)
    {
        $admin = Exam::create([
            'material_id' => $request['material_id'],
            'admin_id' => $request->user()->id,
            'name' => $request['name'],
            'description' => $request['description'],
            'q1' => $request['q1'],
            'q1_a' => $request['q1_a'],
            'q1_b' => $request['q1_b'],
            'q1_c' => $request['q1_c'],
            'q1_true' => $request['q1_true'],
            'q1_point' => $request['q1_point'],
            'q2' => $request['q2'],
            'q2_a' => $request['q2_a'],
            'q2_b' => $request['q2_b'],
            'q2_c' => $request['q2_c'],
            'q2_true' => $request['q2_true'],
            'q2_point' => $request['q2_point'],
            'q3' => $request['q3'],
            'q3_a' => $request['q3_a'],
            'q3_b' => $request['q3_b'],
            'q3_c' => $request['q3_c'],
            'q3_true' => $request['q3_true'],
            'q3_point' => $request['q3_point'],

        ]);
        return response()->json(['success' => true, 'message' => 'تم إضافة الاختبار بنجاح'], 200);
    }




        // Add New Role
        public function createAnswer(Request $request)
        {
            $admin = StudenExam::create([
                'exam_id' => $request['exam_id'],
                'user_id' => $request->user()->id,
                'q1_answer' => $request['q1_answer'],
                'q2_answer' => $request['q2_answer'],
                'q3_answer' => $request['q3_answer'],
                'degree' => $request['degree'],
            ]);
            return response()->json(['success' => true, 'message' => 'تم إضافة الاجابة بنجاح بنجاح'], 200);
        }





}
