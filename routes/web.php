<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\DepenseController;
use App\Http\Controllers\DevisController;
use App\Http\Controllers\FactureController;
use App\Http\Controllers\FournisseurController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\RevenueController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Your original routes

// Breeze-authentication routes (don't override your routes)
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});



Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::resource('/imagine/factures', FactureController::class)->except(['show']);

    Route::resource('imagine/fournisseurs',FournisseurController::class)->except(['show']);


    Route::resource('/', HomeController::class);
    Route::resource('imagine/articles', ArticleController::class)->except(['show']);
    Route::resource('imagine/revenues', RevenueController::class)->except(['show', 'create']);
    Route::resource('imagine/depenses', DepenseController::class)->except(['show']);
    Route::resource('imagine/clients', ClientController::class)->except(['show']);
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('imagine/factures/{facture}/print', [FactureController::class, 'printFacture'])->name('imagine.factures.printFacture');
    Route::get('imagine/recues/{facture}/print', [FactureController::class, 'printRecu'])->name('imagine.factures.printRecu');
    Route::get('imagine/bonLivraisons/{facture}/print', [FactureController::class, 'printBL'])->name('imagine.factures.printBL');
});



require __DIR__.'/auth.php';
