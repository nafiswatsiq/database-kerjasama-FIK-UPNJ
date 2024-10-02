<?php

namespace App\Http\Controllers;

use App\Models\Documentation;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\AgreementArchives;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class Dashboard extends Controller
{
    public function index()
    {
        $totalAgreement = AgreementArchives::count();
        $activeAgreement = AgreementArchives::where('waktu_kerjasama_selesai', '>', now())->count();
        $userRegistered = User::count();

        $defaultKriteriaMitra = [
            'Perguruan Tinggi Negeri' => 0,
            'Perguruan Tinggi Swasta' => 0,
            'Dunia Industri/Dunia Usaha' => 0,
            'Pemerintahan' => 0,
        ];
        $countKriteriaMitra = AgreementArchives::select('kriteria_mitra', DB::raw('count(*) as total'))
            ->groupBy('kriteria_mitra')
            ->pluck('total', 'kriteria_mitra')
            ->toArray();
        $seriesKriteriaMitra = array_merge($defaultKriteriaMitra, $countKriteriaMitra);

        // Definisikan array dasar dengan nilai default
        $defaultBidangKerjasama = [
            'Pendidikan' => 0,
            'Pelatihan' => 0,
            'Abdimas' => 0,
        ];
        // Ambil data dari database dan hitung jumlah berdasarkan bidang_kerjasama
        $countsBidangKerjasama = AgreementArchives::select('bidang_kerjasama', DB::raw('count(*) as total'))
                    ->groupBy('bidang_kerjasama')
                    ->pluck('total', 'bidang_kerjasama')
                    ->toArray();
        $seriesBidangKerjasama = $seriesBidangKerjasama = array_merge($defaultBidangKerjasama, $countsBidangKerjasama);
            
        $defaultAsalMitra = [
            'Domestic' => 0,
            'International' => 0,
        ];
        $countAsalMitra = AgreementArchives::select('asal_mitra', DB::raw('count(*) as total'))
            ->groupBy('asal_mitra')
            ->pluck('total', 'asal_mitra')
            ->toArray();
        $seriesAsalMitra = array_merge($defaultAsalMitra, $countAsalMitra);

        $galleries = [];
        $getGallery = AgreementArchives::with('documentations')->orderBy('id', 'desc')->limit(5)->get();
        foreach ($getGallery as $gallery) {
            foreach ($gallery->documentations as $documentation) {
                $galleries[] = [
                    'nama_instansi' => $gallery->nama_instansi,
                    'date' => Carbon::parse($gallery->created_at)->format('d F Y'),
                    'path' => asset('storage/' . $documentation->path),
                ];
            }
        }

        return Inertia::render('Dashboard', [
            'totalAgreement' => $totalAgreement,
            'activeAgreement' => $activeAgreement,
            'userRegistered' => $userRegistered,
            'seriesKriteriaMitra' => $seriesKriteriaMitra,
            'seriesBidangKerjasama' => $seriesBidangKerjasama,
            'seriesAsalMitra' => $seriesAsalMitra,
            'galleries' => $galleries,
        ]);
    }
}
