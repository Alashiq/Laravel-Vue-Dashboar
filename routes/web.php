<?php

use Illuminate\Support\Facades\Route;

// =====> Home Page

Route::middleware('visitor')->group(function () {

Route::view(uri:'/',view:'web.home');


Route::get('/Contact', function () {
    return view('web.contact');
});

});








// =====> Dashboard
Route::view(uri:'/admin',view:'dash.admin');
Route::view(uri:'/admin/{a?}/{b?}/{c?}/{d?}/{e?}',view:'dash.admin');
