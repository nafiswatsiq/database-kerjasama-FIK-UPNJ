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
        Route::post('/agreement-archives/{id}/update-dokumen-kerjasama', [AgreementArchivesController::class, 'updateDokumenKerjasama'])->name('aggreement.update.dokumen_kerjasama');

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

        // Kriteria Mitra
        Route::post('/list-master/kriteria_mitra/store', [ListMasterController::class, 'kriteria_mitra_store'])->name('list-master.kriteria_mitra_store');
        Route::post('/list-master/kriteria_mitra/{id}', [ListMasterController::class, 'kriteria_mitra_destroy'])->name('list-master.kriteria_mitra_destroy');
        Route::get('/list-master/kriteria_mitra/edit/{id}', [ListMasterController::class, 'kriteria_mitra_edit'])
            ->name('list-master.kriteria_mitra_edit');
        Route::patch('/list-master/kriteria_mitra/update/{id}', [ListMasterController::class, 'kriteria_mitra_update'])
            ->name('list-master.kriteria_mitra_update');

        Route::post('/list-master/kriteria_mitra/peringkat/{id}', [ListMasterController::class, 'kriteria_mitra_qs_store'])
            ->name('list-master.kriteria_mitra_qs');


        // Jenis Kegiatan
        Route::post('/list-master/jenis_kegiatan/store', [ListMasterController::class, 'jenis_kegiatan_store'])->name('list-master.jenis_kegiatan_store');
        Route::post('/list-master/jenis_kegiatan/{id}', [ListMasterController::class, 'jenis_kegiatan_destroy'])->name('list-master.jenis_kegiatan_destroy');
        Route::get('/list-master/jenis_kegiatan/edit/{id}', [ListMasterController::class, 'jenis_kegiatan_edit'])
            ->name('list-master.jenis_kegiatan_edit');
        Route::patch('/list-master/jenis_kegiatan/update/{id}', [ListMasterController::class, 'jenis_kegiatan_update'])
            ->name('list-master.jenis_kegiatan_update');

        // Durasi Kerjasama
        Route::post('/list-master/durasi_kerjasama/store', [ListMasterController::class, 'durasi_kerjasama_store'])->name('list-master.durasi_kerjasama_store');
        Route::post('/list-master/durasi_kerjasama/{id}', [ListMasterController::class, 'durasi_kerjasama_destroy'])->name('list-master.durasi_kerjasama_destroy');
        Route::get('/list-master/durasi_kerjasama/edit/{id}', [ListMasterController::class, 'durasi_kerjasama_edit'])
            ->name('list-master.durasi_kerjasama_edit');
        Route::patch('/list-master/durasi_kerjasama/update/{id}', [ListMasterController::class, 'durasi_kerjasama_update'])
            ->name('list-master.durasi_kerjasama_update');

        // Jenis Kerjasama
        Route::post('/list-master/jenis_kerjasama/store', [ListMasterController::class, 'jenis_kerjasama_store'])->name('list-master.jenis_kerjasama_store');
        Route::post('/list-master/jenis_kerjasama/{id}', [ListMasterController::class, 'jenis_kerjasama_destroy'])->name('list-master.jenis_kerjasama_destroy');
        Route::get('/list-master/jenis_kerjasama/edit/{id}', [ListMasterController::class, 'jenis_kerjasama_edit'])
            ->name('list-master.jenis_kerjasama_edit');
        Route::patch('/list-master/jenis_kerjasama/update/{id}', [ListMasterController::class, 'jenis_kerjasama_update'])
            ->name('list-master.jenis_kerjasama_update');

        Route::get('download-draft-pks/{id}', [MitraController::class, 'draftDocumentPks'])->name('download-draft-pks');
        Route::get('download-laporan-mitra/{id}', [MitraController::class, 'downloadLaporanMitra'])->name('download-laporan-mitra');
        Route::get('download-laporan-dashboard', [Dashboard::class, 'downloadLaporanDashboard'])->name('download-laporan-dashboard');
        Route::get('download-laporan-ia/{id}', [AgreementArchivesController::class, 'downloadLaporanIa'])->name('download-laporan-ia');


        Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
    });
});
