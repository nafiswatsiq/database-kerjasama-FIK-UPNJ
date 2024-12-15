<?php

use Carbon\Carbon;
use App\Models\Mitra;
use App\Models\User;
use App\Notifications\ExpiredMitra;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('sixMonth', function () {
    $mitra = Mitra::where('waktu_kerjasama_selesai', '<', Carbon::now()->addMonths(6))->get();

    foreach ($mitra as $item) {
        logger()->info($item);
        $users = User::where('is_admin', 1)->get();
        $users->each(function ($user) use ($item) {
            $notif = $user?->unreadNotifications ?? [];
            foreach ($notif as $n) {
                if ($n->data['mitra_id'] == $item->id) {
                    logger()->info('notif sudah ada');
                    return;
                }
            }
            $user->notify(new ExpiredMitra($item->id, $item->nama_instansi, $item->waktu_kerjasama_selesai));
        });
    }
})->purpose('Display an inspiring quote')
->everyFiveSeconds(); // ganti everyMinute() untuk testing
// run: php artisan schedule:work

Artisan::command('yearly', function () {
    $mitra = Mitra::where('waktu_kerjasama_selesai', '<', Carbon::now()->addYear())->get();

    foreach ($mitra as $item) {
        logger()->info($item);
        $users = User::where('is_admin', 1)->get();
        $users->each(function ($user) use ($item) {
            $notif = $user?->unreadNotifications ?? [];
            foreach ($notif as $n) {
                if ($n->data['mitra_id'] == $item->id && $n->created_at > Carbon::now()->addMonths(6)) {
                    logger()->info('notif sudah ada');
                    return;
                }
            }
            $user->notify(new ExpiredMitra($item->id, $item->nama_instansi, $item->waktu_kerjasama_selesai));
        });
    }
})->purpose('Display an inspiring quote')
->monthly(); // ganti everyMinute() untuk testing

