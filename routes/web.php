<?php

use App\Http\Controllers\Dashboard\MitraController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Dashboard\UsersController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Dashboard;
use App\Http\Controllers\Dashboard\AgreementArchivesController;
use App\Http\Controllers\Dashboard\ListMasterController;
use App\Models\Mitra;

Route::get('/', [AuthenticatedSessionController::class, 'create'])
    ->name('login')
    ->middleware('guest');
Route::get('/login', function () {
    return redirect()->route('login');
});

Route::post('/login', [AuthenticatedSessionController::class, 'login'])
    ->name('login.post')
    ->middleware('guest');

Route::middleware('auth')->group(function () {
    Route::prefix('dashboard')->group(function () {
        Route::get('/', [Dashboard::class, 'index'])->name('dashboard');
        Route::get('/mitra/create', [MitraController::class, 'create'])->name('mitra.create');
        Route::get('/mitra/{id}/edit', [MitraController::class, 'edit'])->name('mitra.edit');
        Route::get('/mitra/download/{file}', [MitraController::class, 'download'])->name('mitra.download');
        Route::post('/mitra/{id}/update', [MitraController::class, 'update'])->name('mitra.update');
        Route::delete('/mitra/{id}/delete', [MitraController::class, 'delete'])->name('mitra.delete');
        Route::get('/mitra/{mitraId}', [MitraController::class, 'detail'])->name('mitra.detail');
        Route::post('/mitra', [MitraController::class, 'store'])->name('mitra.store');
        Route::get('/mitra/{mitraId}/agreement-archives', [AgreementArchivesController::class, 'index'])->name('agreementarchives.index');
        Route::get('/mitra/{mitraId}/agreement-archives/create', [AgreementArchivesController::class, 'create'])->name('agreementarchives.create');
        Route::post('/mitra/{mitraId}/agreement-archives', [AgreementArchivesController::class, 'store'])->name('agreementarchives.store');
        Route::get('/agreement-archives/download/{file}', [AgreementArchivesController::class, 'download'])->name('agreementarchives.download');
        Route::delete('/agreement-archives/{id}', [AgreementArchivesController::class, 'destroy'])->name('agreementarchives.destroy');
        Route::get('/mitra/{mitraId}/agreement-archives/{id}/edit', [AgreementArchivesController::class, 'edit'])->name('agreementarchives.edit');
        Route::post('agreement-archives/{id}', [AgreementArchivesController::class, 'update'])->name('agreementarchives.update');
        Route::get('/mitra/{mitraId}/agreement-archives/{id}', [AgreementArchivesController::class, 'view'])->name('agreementarchives.view');

        Route::get('/users', [UsersController::class, 'index'])->name('users.index');
        Route::get('/users/create', [UsersController::class, 'create'])->name('users.create');
        Route::post('/users', [UsersController::class, 'store'])->name('users.store');
        Route::delete('/user/{id}', [UsersController::class, 'destroy'])->name('user.destroy');
        Route::get('/user/{id}/edit', [UsersController::class, 'edit'])->name('user.edit');
        Route::patch('/user/{id}', [UsersController::class, 'update'])->name('user.update');

        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

        // List Master
        Route::get('/list-master', [ListMasterController::class, 'index'])->name('list-master.index');
        Route::post('/list-master/kriteria_mitra/store', [ListMasterController::class, 'kriteria_mitra_store'])->name('list-master.kriteria_mitra_store');
        Route::post('/list-master/kriteria_mitra/{id}', [ListMasterController::class, 'kriteria_mitra_destroy'])->name('list-master.kriteria_mitra_destroy');
        Route::patch('/list-master/kriteria-mitra/update/{id}', [ListMasterController::class, 'kriteria_mitra_update'])
            ->name('list-master.kriteria_mitra_update');


        Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
    });
});
