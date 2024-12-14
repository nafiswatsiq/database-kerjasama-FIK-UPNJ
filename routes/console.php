<?php

use Carbon\Carbon;
use App\Models\Mitra;
use App\Models\User;
use App\Notifications\ExpiredMitra;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('monthly', function () {
    // $this->comment(Inspiring::quote());
    // logger()->info('Inspiring quote displayed');
    $mitra = Mitra::where('waktu_kerjasama_selesai', '<', Carbon::now()->addMonths(6))->get();
    foreach ($mitra as $item) {
        logger()->info($item);
        $users = User::where('is_admin', 1)->get();
        // $users->each(function ($user) use ($item) {
        //     $user->notify(new ExpiredMitra($item->id, $item->nama_instansi, $item->waktu_kerjasama_selesai));
        // });
    }
})->purpose('Display an inspiring quote')
->monthly(); // ganti everyMinute() untuk testing
// run: php artisan schedule:work

Artisan::command('yearly', function () {
    // $this->comment(Inspiring::quote());
    // logger()->info('Inspiring quote displayed');
    $mitra = Mitra::where('waktu_kerjasama_selesai', '<', Carbon::now()->year(1))->get();
    foreach ($mitra as $item) {
        logger()->info($item);
        $users = User::where('is_admin', 1)->get();
        // $users->each(function ($user) use ($item) {
        //     $user->notify(new ExpiredMitra($item->id, $item->nama_instansi, $item->waktu_kerjasama_selesai));
        // });
    }
})->purpose('Display an inspiring quote')
->yearly(); // ganti everyMinute() untuk testing

