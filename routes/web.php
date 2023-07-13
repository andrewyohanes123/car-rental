<?php

use App\Http\Controllers\CarController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Car;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('welcome');

Route::get('/rents', function () {
    return Inertia::render('Rents/List', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('rent-list');

Route::get('/returns', function () {
    return Inertia::render('ReturnCar/Search', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('rent-list');

Route::get('/cars', function (Request $request) {
    $cars = Car::all();
    return $cars;
})->name('cars');

Route::get('/dashboard', function () {
    $user = Auth::user();
    // dd($user);
    if (Auth::check() && $user->type === "customer") {
       return redirect('/');
    } else {
        return redirect('/dashboard/cars');
    }
});

Route::group(['prefix' => '/dashboard', 'middleware' => ['auth', 'verified']], function () {

    // Route::get('/', function () {
    //     return Inertia::render('Dashboard');
    // });
    Route::get('/users', function () {
        return Inertia::render('Users/List');
    });
    Route::get('/cars', function () {
        return Inertia::render('Cars/Layout');
    });
    Route::get('/rents', function () {
        return Inertia::render('DashboardRents/List');
    });
    Route::get('/returns', function () {
        return Inertia::render('Returns/List');
    });
    Route::post('/cars', [CarController::class, 'store'])->name('car.store');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
