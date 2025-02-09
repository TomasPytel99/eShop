<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProduktController;
use App\Http\Controllers\ZakaznikController;
use Illuminate\Support\Facades\Route;


Route::get('/', [ZakaznikController::class, 'all']);
Route::middleware('auth:sanctum')->post('/addItem', [ProduktController::class, 'addItem']);
Route::middleware('auth:sanctum')->delete('/deleteItem/{id}', [ProduktController::class, 'deleteItem']);
Route::middleware('auth:sanctum')->post('/editItem', [ProduktController::class, 'editItem']);
Route::get('/items', [ProduktController::class, 'items']);
Route::get('/gitary', [ProduktController::class, 'items']);
Route::get('/husle', [ProduktController::class, 'items']);
Route::get('/klavesy', [ProduktController::class, 'items']);
Route::get('/bicie', [ProduktController::class, 'items']);
Route::get('/harfy', [ProduktController::class, 'items']);
Route::get('/dychy', [ProduktController::class, 'items']);
Route::get('/akordeony', [ProduktController::class, 'items']);
Route::get('/prislusenstvo', [ProduktController::class, 'items']);
Route::get('/categoryProperties', [ProduktController::class, 'categoryProperties']);

//
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->get('/user', [AuthController::class, 'getUser']);
Route::middleware('auth:sanctum')->put('/user', [AuthController::class, 'updateUser']);
Route::middleware('auth:sanctum')->delete('/user/{id}', [AuthController::class, 'destroy']);

