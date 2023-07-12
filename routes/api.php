<?php

use App\Http\Controllers\CarRentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Car;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/cars', function (Request $request) {
    $cars = Car::all();
    return $cars;
})->name('cars');

Route::post('/rents', [CarRentController::class, 'store'])->name('rents');

Route::post('/cars', function (Request $request) {
    $car = Car::create([
        'name' => $request->name,
        'model' => $request->model,
        'license_plate' => $request->license_plate,
        'cost' => $request->cost,
    ]);

    return $car;
});