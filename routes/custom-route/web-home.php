<?php

use App\Models\Receiver;
use Illuminate\Support\Facades\Route;

Route::middleware('visitor')->group(function () {

    Route::view('/', 'home.home');

    Route::get('/contact', function () {
        $receivers = Receiver::all();
        return view('home.contact', ['receivers' => $receivers]);
    });
});
