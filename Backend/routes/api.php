<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProduktController;
use App\Http\Controllers\ZakaznikController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('/', [ZakaznikController::class, 'all']);
Route::post('/newItem', [ProduktController::class, 'newItem']);
Route::get('/gitary', [ProduktController::class, 'gitary']);
//
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->get('/user', [AuthController::class, 'getUser']);
Route::middleware('auth:sanctum')->put('/user', [AuthController::class, 'updateUser']);
Route::middleware('auth:sanctum')->delete('/user/{id}', [AuthController::class, 'destroy']);
