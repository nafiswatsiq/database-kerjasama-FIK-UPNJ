<?php

namespace App\Http\Controllers;

use App\Models\Documentation;
use App\Models\KriteriaMitra;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\AgreementArchives;
use App\Models\JenisKerjasama;
use App\Models\Mitra;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class Dashboard extends Controller
{
    public function index()
    {
        $mitra = Mitra::query();
        if (request('search')) {
            $mitra = $mitra->where('nama_instansi', 'like', '%' . request('search') . '%');
        }
        if (request('asal_mitra')) {
            $mitra = $mitra->where('asal_mitra', request('asal_mitra'));
        }
        if (request('kriteria_mitra')) {
            $mitra = $mitra->where('kriteria_mitra', request('kriteria_mitra'));
        }
        if (request('status')) {
            if(request('status') == 'active') {
                $mitra = $mitra->where('waktu_kerjasama_selesai', '>', now());
            } elseif(request('status') == 'inactive') {
                $mitra = $mitra->where('waktu_kerjasama_selesai', '<', now());
            }
        }
        $mitra = $mitra->orderBy('id', 'desc')->get()
            ->map(function($item) {
                return [
                    'id' => $item->id,
                    'nama_instansi' => $item->nama_instansi,
                    'logo' => $item->logo,
                    'tentang_mitra' => $item->tentang_mitra,
                    'bidang_kerjasama' => $item->bidang_kerjasama,
                    'jenis_kerjasama' => $item->jenis_kerjasama,
                    'no_pks_fik' => $item->no_pks_fik,
                    'no_pks_mitra' => $item->no_pks_mitra,
                    'kriteria_mitra' => $item->kriteria_mitra,
                    'asal_mitra' => $item->asal_mitra,
                    'pic_fik' => $item->pic_fik,
                    'jabatan_pic_fik' => $item->jabatan_pic_fik,
                    'pic_mitra' => $item->pic_mitra,
                    'jabatan_pic_mitra' => $item->jabatan_pic_mitra,
                    'lokasi' => $item->lokasi,
                    'hari_tanggal' => $item->hari_tanggal,
                    'waktu_kerjasama_mulai' => $item->waktu_kerjasama_mulai,
                    'waktu_kerjasama_selesai' => $item->waktu_kerjasama_selesai,
                    'active' => $item->waktu_kerjasama_selesai > now() ? 'true' : 'false',
                ];
            });

        $totalAgreement = AgreementArchives::count();
        $activeAgreement = AgreementArchives::where('waktu_kerjasama_selesai', '>', now())->count();
        $inactiveAgreement = AgreementArchives::where('waktu_kerjasama_selesai', '<', now())->count();
        $documentNull = AgreementArchives::whereNull('dokumen_kerjasama')->count();
        $userRegistered = User::count();

        $defaultKriteriaMitra = [
            'Perguruan Tinggi Negeri' => 0,
            'Perguruan Tinggi Swasta' => 0,
            'Dunia Industri/Dunia Usaha' => 0,
            'Pemerintahan' => 0,
            'Perusahaan Multinasional' => 0,
            'Perusahaan Teknologi' => 0,
            'Perusahaan Startup' => 0,
            'Organisasi Nirlaba' => 0,
            'Lembaga Riset' => 0,
            'Lembaga Kebudayaan' => 0,
        ];
        $countKriteriaMitra = Mitra::select('kriteria_mitra', DB::raw('count(*) as total'))
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
            'Domestik' => 0,
            'Internasional' => 0,
        ];
        $countAsalMitra = Mitra::select('asal_mitra', DB::raw('count(*) as total'))
            ->groupBy('asal_mitra')
            ->pluck('total', 'asal_mitra')
            ->toArray();
        $seriesAsalMitra = array_merge($defaultAsalMitra, $countAsalMitra);

        $galleries = [];
        $getGallery = AgreementArchives::with('documentations')->orderBy('id', 'desc')->limit(15)->get();
        foreach ($getGallery as $gallery) {
            foreach ($gallery->documentations as $documentation) {
                $galleries[] = [
                    'nama_instansi' => $gallery->nama_instansi,
                    'date' => Carbon::parse($gallery->waktu_kerjasama_mulai)->format('d F Y'),
                    'path' => asset('storage/' . $documentation->path),
                ];
            }
        }
        $galleries = collect($galleries)->slice(0, 15);

        $totalMitra = Mitra::count();
        $activeMitra = Mitra::where('waktu_kerjasama_selesai', '>', now())->count();
        $inactiveMitra = Mitra::where('waktu_kerjasama_selesai', '<', now())->count();

        $kriteriaMitra = KriteriaMitra::get()->pluck('kriteria_mitra')->toArray();
        $jenisKerjasama = JenisKerjasama::get()->pluck('jenis_kerjasama')->toArray();

        return Inertia::render('Dashboard', [
            'mitra' => $mitra,
            'totalAgreement' => $totalAgreement,
            'activeAgreement' => $activeAgreement,
            'inactiveAgreement' => $inactiveAgreement,
            'documentNull' => $documentNull,
            'userRegistered' => $userRegistered,
            'seriesKriteriaMitra' => $seriesKriteriaMitra,
            'seriesBidangKerjasama' => $seriesBidangKerjasama,
            'seriesAsalMitra' => $seriesAsalMitra,
            'galleries' => $galleries,
            'totalMitra' => $totalMitra,
            'activeMitra' => $activeMitra,
            'inactiveMitra' => $inactiveMitra,
            'kriteriaMitra' => $kriteriaMitra,
            'jenisKerjasama' => $jenisKerjasama,
        ]);
    }
}
