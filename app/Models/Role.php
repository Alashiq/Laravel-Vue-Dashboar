<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    public $timestamps = FALSE;

    protected $fillable = [
        'name',
        'permissions',
    ];


    public function admins()
    {
        $this->hasMany(related:Admin::class);
    }

    public function getPermissionsAttribute($permessions){
        return json_decode($permessions,associative:true);
    }


    public function scopeWithoutTimestamps()
    {
        $this->timestamps = false;
        return $this;
    }


}
