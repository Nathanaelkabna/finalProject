<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\OrderProductController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\userProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::apiResource('categories', CategoryController::class);
Route::get('/getProducts/{id}', [userProductController::class, 'getProducts']);
Route::get('/paginateProducts/{id}', [userProductController::class, 'PaginateProducts']);
Route::apiResource('products', ProductController::class);
Route::get('/users', [UserController::class, 'getUsers']);
Route::apiResource('orders', OrderProductController::class);
Route::post('order', [OrderController::class, 'storeOrder']);