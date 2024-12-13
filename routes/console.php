<?php

use Carbon\Carbon;
use App\Models\Mitra;
use App\Models\User;
use App\Notifications\ExpiredMitra;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    // $this->comment(Inspiring::quote());
    // logger()->info('Inspiring quote displayed');
    $mitra = Mitra::where('waktu_kerjasama_selesai', '<', Carbon::now()->addMonth())->get();
    foreach ($mitra as $item) {
        $users = User::where('is_admin', 1)->get();
        $users->each(function ($user) use ($item) {
            $user->notify(new ExpiredMitra($item->id, $item->nama_instansi, $item->waktu_kerjasama_selesai));
        });
    }
})->purpose('Display an inspiring quote')
->monthly(); // ganti everyMinute() untuk testing
// run: php artisan schedule:work

