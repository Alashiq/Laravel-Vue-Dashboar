<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Exam extends Model
{
    use HasFactory;

    protected $fillable = [
        'material_id',
        'admin_id',
        'name',
        'description',
        'q1',
        'q1_a',
        'q1_b',
        'q1_c',
        'q1_true',
        'q1_point',
        'q2',
        'q2_a',
        'q2_b',
        'q2_c',
        'q2_true',
        'q2_point',
        'q3',
        'q3_a',
        'q3_b',
        'q3_c',
        'q3_true',
        'q3_point',
    ];

    public function material()
    {
       // return $this->belongsTo(related: Role::class, foreignKey: 'role_id');
        return $this->belongsTo(Material::class);
    }
}
