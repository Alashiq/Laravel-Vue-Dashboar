<?php

use Illuminate\Support\Facades\Route;

// =====> Home Page
Route::view(uri:'/',view:'web/home');


// =====> Dashboard
Route::view(uri:'/admin',view:'admin');
Route::view(uri:'/admin/{a?}/{b?}/{c?}/{d?}',view:'admin');
