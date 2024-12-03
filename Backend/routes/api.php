<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ZakaznikController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Define routes for API
/*
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});*/

// Add more API routes below

Route::get('/', [ZakaznikController::class, 'all']);
//Route::post('/register', [ZakaznikController::class, 'register']);
Route::post('login', [ZakaznikController::class, 'login']);
Route::post('/newItem', [\App\Http\Controllers\ProduktController::class, 'newItem']);
Route::get('/gitary', [\App\Http\Controllers\ProduktController::class, 'gitary']);
//
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->get('/user', [AuthController::class, 'getUser']);
Route::middleware('auth:sanctum')->put('/user', [AuthController::class, 'updateUser']);
Route::post('/register', [AuthController::class, 'register']);
