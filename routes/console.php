<?php

use Carbon\Carbon;
use App\Models\Mitra;
use App\Models\User;
use App\Notifications\ExpiredMitra;
use App\Notifications\NullDokumenMitra;
use App\Notifications\NullLaporanIa;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('nulledDokumen', function () {
    $mitra = Mitra::whereNull('dokumen_pks')->get();

    foreach ($mitra as $item) {
        logger()->info('null' . $item);
        $users = User::where('is_admin', 1)->get();
        $users->each(function ($user) use ($item) {
            $notif = $user?->unreadNotifications ?? [];
            foreach ($notif as $n) {
                if ($n->data['type'] === 'null-dokumen-'.$item->id) {
                    logger()->info('notif sudah ada');
                    return;
                }
            }
            $user->notify(new NullDokumenMitra($item->id, $item->nama_mitra));
        });
    }
})->purpose('Display an inspiring quote')
->everyFiveSeconds(); // ganti everyMinute() untuk testing

Artisan::command('laporanIA', function () {
    $mitra = Mitra::get();
    
    foreach ($mitra as $item) {
        $item->agreementArchives->each(function ($archive) use ($item) {
            if ($archive->laporanIa === null) {
                logger()->info('null' . $item);
                $users = User::where('is_admin', 1)->get();
                $users->each(function ($user) use ($item, $archive) {
                    $notif = $user?->unreadNotifications ?? [];
                    foreach ($notif as $n) {
                        if ($n->data['type'] === 'null-laporan-ia-'.$item->id) {
                            logger()->info('notif sudah ada');
                            return;
                        }
                    }
                    $user->notify(new NullLaporanIa($item->id, $item->nama_mitra, $archive->nama_instansi));
                });
            }
        });
    }
})->purpose('Display an inspiring quote')
->everyFiveSeconds(); // ganti everyMinute() untuk testing

Artisan::command('sixMonth', function () {
    $mitra = Mitra::where('waktu_kerjasama_selesai', '<', Carbon::now()->addMonths(6))->get();

    foreach ($mitra as $item) {
        logger()->info($item);
        $users = User::where('is_admin', 1)->get();
        $users->each(function ($user) use ($item) {
            $notif = $user?->unreadNotifications ?? [];
            foreach ($notif as $n) {
                if ($n->data['type'] === 'expired-'.$item->id) {
                    logger()->info('notif sudah ada');
                    return;
                }
            }
            $user->notify(new ExpiredMitra($item->id, $item->nama_mitra, $item->waktu_kerjasama_selesai));
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

