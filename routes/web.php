<?php

use Illuminate\Support\Facades\Route;

// =====> Home Page
Route::get('/', function () {return view('web/home');});
