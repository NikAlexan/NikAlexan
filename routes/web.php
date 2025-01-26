<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
})->name('main');

Route::get('/about', function () {
    return view('about');
})->name('about');

Route::get('/projects', function () {
    return view('projects');
})->name('projects');

Route::get('/resume', function () {
    return view('resume');
})->name('resume');


