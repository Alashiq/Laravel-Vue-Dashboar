<?php

use App\Models\Receiver;
use Illuminate\Support\Facades\Route;

// =====> Home Page

Route::middleware('visitor')->group(function () {

Route::view(uri:'/',view:'web.home');


Route::get('/Contact', function () {
    $receivers=Receiver::all();
    return view('web.contact', ['receivers' => $receivers]);
});

});


