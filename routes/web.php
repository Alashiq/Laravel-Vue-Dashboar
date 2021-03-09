<?php

use Illuminate\Support\Facades\Route;

// =====> Home Page
Route::get('/', function () {return view('web/home');});



// =====> Dashboard
Route::get('/admin', function () {return view('admin');});
Route::get('/admin/{a?}/{b?}/{c?}/{d?}', function () {return view('admin');});
