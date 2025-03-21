<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\KategoriaController;
use App\Http\Controllers\ObjednavkaController;
use App\Http\Controllers\ProduktController;
use App\Http\Controllers\StatisticsController;
use App\Http\Controllers\ZakaznikController;
use Illuminate\Support\Facades\Route;


Route::get('/', [ZakaznikController::class, 'all']);
Route::middleware('auth:sanctum')->post('/addItem', [ProduktController::class, 'addItem']);
Route::middleware('auth:sanctum')->delete('/deleteItem/{id}', [ProduktController::class, 'deleteItem']);
Route::middleware('auth:sanctum')->post('/editItem', [ProduktController::class, 'editItem']);
Route::get('/items', [ProduktController::class, 'items']);
Route::get('/categoryProperties', [ProduktController::class, 'categoryProperties']);
Route::middleware('auth:sanctum')->post('/likeItem', [ProduktController::class, 'likeItem']);
Route::middleware('auth:sanctum')->delete('/dislikeItem/{id}', [ProduktController::class, 'dislikeItem']);
Route::middleware('auth:sanctum')->get('/isItemLiked', [ProduktController::class, 'isItemLiked']);
Route::post('/newOrder', [ObjednavkaController::class, 'newOrder']);
Route::get('/advertisedItems', [ProduktController::class, 'advertisedItems']);
Route::get('/item/{id}', [ProduktController::class, 'getitem']);
Route::middleware('auth:sanctum')->get('/handleRelevant', [ProduktController::class, 'handleRelevant']);

Route::middleware('auth:sanctum')->delete('/dislikeCategory/{name}', [KategoriaController::class, 'dislikeCategory']);
Route::middleware('auth:sanctum')->post('/likeCategory', [KategoriaController::class, 'likeCategory']);
Route::middleware('auth:sanctum')->get('/isCategoryLiked', [KategoriaController::class, 'isCategoryLiked']);
Route::get('/search', [ProduktController::class, 'search']);

//
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->get('/user', [AuthController::class, 'getUser']);
Route::middleware('auth:sanctum')->put('/user', [AuthController::class, 'updateUser']);
Route::middleware('auth:sanctum')->delete('/user/{id}', [AuthController::class, 'destroy']);
Route::middleware('auth:sanctum')->get('/myOrders', [ObjednavkaController::class, 'getOrders']);


Route::middleware('auth:sanctum')->get('/categoryStats', [StatisticsController::class, 'getCategoryStats']);
Route::middleware('auth:sanctum')->get('/orderStats', [StatisticsController::class, 'getOrderStats']);
