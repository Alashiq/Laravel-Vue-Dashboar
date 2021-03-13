<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    use HasApiTokens;
    protected $fillable = [
        'username',
        'name',
        'password',
    ];


        /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    
}
