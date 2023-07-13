<?php

use App\Http\Controllers\CarRentController;
use App\Http\Controllers\CarReturnController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Car;
use App\Models\CarRent;

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
Route::get('/rents', [CarRentController::class, 'index'])->name('rents');
Route::post('/returns', [CarReturnController::class, 'store'])->name('returns');
Route::get('/returns', [CarReturnController::class, 'index'])->name('returns.index');
Route::get('/users', [UserController::class, 'index'])->name('users');

Route::post('/cars', function (Request $request) {
    $car = Car::create([
        'name' => $request->name,
        'model' => $request->model,
        'license_plate' => $request->license_plate,
        'cost' => $request->cost,
    ]);

    return $car;
});

Route::get('/search-rent/{id}', function (Request $request, $id) {
    $license = $request->input('license');
    $rent = Car::with('car_rent')->with('car_rent', function ($query) use ($id) {
        $query->where('active', true);
        $query->where('user_id', $id);
    })->where('license_plate', $license)->first();

    return $rent;
});

Route::get('/rent-list/{id}', function (Request $request, $id) {
    $rents = CarRent::with('car')->where('active', true)->where('user_id', $id)->get();

    return $rents;
})->name('rent.list');
