<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;
    

    protected $with =[
        'receiver'
    ];
    public function receiver(){
        return $this->belongsTo(Receiver::class);
    }


    protected $fillable = [
        'name',
        'phone',
        'phone',
        'email',
        'receiver_id',
        'content',
    ];
}
