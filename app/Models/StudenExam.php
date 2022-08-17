<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudenExam extends Model
{
    use HasFactory;

    protected $fillable = [
        'exam_id',
        'user_id',
        'q1_answer',
        'q2_answer',
        'q3_answer',
        'degree',
    ];

    // public function material()
    // {
    //    // return $this->belongsTo(related: Role::class, foreignKey: 'role_id');
    //     return $this->belongsTo(Material::class);
    // }
}
