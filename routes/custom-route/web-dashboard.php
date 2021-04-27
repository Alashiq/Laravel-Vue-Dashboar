<?php

use App\Models\Receiver;
use Illuminate\Support\Facades\Route;


Route::view(uri:'/',view:'admin.admin');
Route::view(uri:'/{a?}/{b?}/{c?}/{d?}/{e?}',view:'admin.admin');
