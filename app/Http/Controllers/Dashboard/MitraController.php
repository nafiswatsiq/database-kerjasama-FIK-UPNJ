<?php

namespace App\Http\Controllers\Dashboard;

use Carbon\Carbon;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Mitra;
use Illuminate\Http\Request;
use App\Models\AgreementArchives;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\DurasiKerjasamas;
use App\Models\IsiPasal;
use App\Models\JenisKegiatan;
use App\Models\JenisKerjasama;
use App\Models\KriteriaMitra;
use App\Models\Pasal;
use App\Notifications\ExpiredMitra;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Notification;

class MitraController extends Controller
{
    public function create()
    {
        $jenis_kerjasama = JenisKerjasama::all();
        $kriteria_mitra = KriteriaMitra::all();
        $jenis_kegiatan = JenisKegiatan::all();
        $durasi_kerjasama = DurasiKerjasamas::all();

        return Inertia::render('Mitra/Create', [
            'jenis_kerjasama' => $jenis_kerjasama,
            'kriteria_mitra' => $kriteria_mitra,
            'jenis_kegiatan' => $jenis_kegiatan,
            'durasi_kerjasama' => $durasi_kerjasama
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama_mitra' => 'required',
            'logo' => 'nullable|mimes:jpg,png,jpeg',
            'tentang_mitra' => 'required',
            'bidang_kerjasama' => 'required',
            'jenis_kerjasama' => 'required',
            'no_pks_fik' => 'required',
            'no_pks_mitra' => 'required',
            'kriteria_mitra' => 'required',
            'asal_mitra' => 'required',
            'pic_fik' => 'required',
            'jabatan_pic_fik' => 'required',
            'pic_mitra' => 'required',
            'jabatan_pic_mitra' => 'required',
            'lokasi' => 'required',
            'hari_tanggal' => 'required',
            'waktu_kerjasama_mulai' => 'required',
            'waktu_kerjasama_selesai' => 'required',
        ]);

        if ($request->file('logo')) {
            $fileDokumenPks = $request->file('logo');
            $nameDokumenPks = $fileDokumenPks->getClientOriginalName();
            $pathDokumenPks = $fileDokumenPks->storeAs('/', $nameDokumenPks, 'public');
        }

        // dd($request->all());
        $mitra = Mitra::create([
            'nama_mitra' => $request->nama_mitra,
            'logo' => $nameDokumenPks ?? null,
            'tentang_mitra' => $request->tentang_mitra,
            'bidang_kerjasama' => $request->bidang_kerjasama,
            'jenis_kerjasama' => $request->jenis_kerjasama,
            'no_pks_fik' => $request->no_pks_fik,
            'no_pks_mitra' => $request->no_pks_mitra,
            'kriteria_mitra' => $request->kriteria_mitra,
            'asal_mitra' => $request->asal_mitra,
            'pic_fik' => $request->pic_fik,
            'jabatan_pic_fik' => $request->jabatan_pic_fik,
            'pic_mitra' => $request->pic_mitra,
            'jabatan_pic_mitra' => $request->jabatan_pic_mitra,
            'lokasi' => $request->lokasi,
            'hari_tanggal' => $request->hari_tanggal,
            'waktu_kerjasama_mulai' => $request->waktu_kerjasama_mulai,
            'waktu_kerjasama_selesai' => $request->waktu_kerjasama_selesai,
        ]);

        // Simpan data Pasal dan Isi Pasal
        foreach ($request->pasals as $pasalData) {
            $pasal = Pasal::create([
                'mitra_id' => $mitra->id,
                'judul_pasal' => $pasalData['judul_pasal'],
            ]);

            foreach ($pasalData['isi_pasals'] as $isiData) {
                IsiPasal::create([
                    'pasal_id' => $pasal->id,
                    'isi_pasal' => $isiData['isi'],
                ]);
            }
        }

        // $users = User::all();

        // Notification::send($users, new ExpiredMitra($mitra->nama_instansi, $mitra->waktu_kerjasama_selesai));

        return redirect()->route('dashboard');
    }

    public function detail(Request $request, $mitraId)
    {
        $mitra = Mitra::with('agreementArchives')->findOrFail($mitraId);

        $totalAgreement = $mitra->agreementArchives->count();
        $activeAgreement = $mitra->agreementArchives->where('waktu_kerjasama_selesai', '>', now())->count();
        $inactiveAgreement = $mitra->agreementArchives->where('waktu_kerjasama_selesai', '<', now())->count();

        // Definisikan array dasar dengan nilai default
        $defaultBidangKerjasama = [
            'Pendidikan' => 0,
            'Pelatihan' => 0,
            'Abdimas' => 0,
        ];
        // Ambil data dari database dan hitung jumlah berdasarkan bidang_kerjasama
        $countsBidangKerjasama = Mitra::where('id', $mitraId)->select('bidang_kerjasama', DB::raw('count(*) as total'))
            ->groupBy('bidang_kerjasama')
            ->pluck('total', 'bidang_kerjasama')
            ->toArray();
        $seriesBidangKerjasama = $seriesBidangKerjasama = array_merge($defaultBidangKerjasama, $countsBidangKerjasama);

        $galleries = [];
        $getGallery = AgreementArchives::where('mitra_id', $mitraId)->with('documentations')->orderBy('id', 'desc')->limit(15)->get();
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

        // ------------------------------------------------------

        $agreementArchives = AgreementArchives::where('mitra_id', $mitraId);
        if ($request->get('search')) {
            $agreementArchives->where('nama_instansi', 'like', '%' . $request->get('search') . '%')
                ->orWhere('deskripsi_kerjasama', 'like', '%' . $request->get('search') . '%')
                ->orWhere('bidang_kerjasama', 'like', '%' . $request->get('search') . '%')
                ->orWhere('kriteria_mitra', 'like', '%' . $request->get('search') . '%')
                ->orWhere('asal_mitra', 'like', '%' . $request->get('search') . '%');
        }

        if ($request->get('sort')) {
            $agreementArchives->orderBy('id', $request->get('sort'));
        }

        if ($request->get('filter')) {
            $filter = $request->get('filter');
            if ($request->get('order')) {
                $order = $request->get('order');
                if ($filter == 'status') {
                    if ($order == 'asc') {
                        $agreementArchives->where('waktu_kerjasama_selesai', '>', now());
                    } elseif ($order == 'desc') {
                        $agreementArchives->where('waktu_kerjasama_selesai', '<', now());
                    }
                } else {
                    $agreementArchives->orderBy($filter, $order);
                }
            } elseif ($filter == 'nama-instansi') {
                $agreementArchives->orderBy('nama_instansi');
            } elseif ($filter == 'tgl-mulai') {
                $agreementArchives->orderBy('waktu_kerjasama_mulai');
            } elseif ($filter == 'tgl-selesai') {
                $agreementArchives->orderBy('waktu_kerjasama_selesai');
            } elseif ($filter == 'active') {
                $agreementArchives->where('waktu_kerjasama_selesai', '>', now());
            } elseif ($filter == 'inactive') {
                $agreementArchives->where('waktu_kerjasama_selesai', '<', now());
            } elseif ($filter == 'terbaru') {
                $agreementArchives->orderBy('id', 'desc');
            } elseif ($filter == 'terlama') {
                $agreementArchives->orderBy('id', 'asc');
            } elseif ($filter == 'no-document') {
                $agreementArchives->whereNull('dokumen_kerjasama');
            } else {
                $agreementArchives->where('waktu_kerjasama_selesai', '>', now())
                    ->orWhere('waktu_kerjasama_selesai', '<', now());
            }
        } else {
            $agreementArchives->orderBy('waktu_kerjasama_mulai', 'desc');
        }
        $documentNull = AgreementArchives::where('mitra_id', $mitraId)->whereNull('dokumen_kerjasama')->count();

        $defaultJenisKegiatan = [];
        foreach (JenisKegiatan::get() as $jenis) {
            $defaultJenisKegiatan[$jenis->jenis_kegiatan] = 0;
        }
        
        $countJenisKegiatan = AgreementArchives::where('mitra_id', $mitraId)->select('jenis_kegiatan', DB::raw('count(*) as total'))
            ->groupBy('jenis_kegiatan')
            ->pluck('total', 'jenis_kegiatan')
            ->toArray();

        $seriesJenisKegiatan = array_merge($defaultJenisKegiatan, $countJenisKegiatan);

        $seriesYears = AgreementArchives::where('mitra_id', $mitraId)
            ->select(DB::raw('YEAR(waktu_kerjasama_mulai) as year'), DB::raw('count(*) as total'))
            ->groupBy('year')
            ->pluck('total', 'year')
            ->toArray();
        
        $defaultDurasiKerjasama = [];
        foreach (DurasiKerjasamas::get() as $durasi) {
            $defaultDurasiKerjasama[$durasi->durasi_kerjasama] = 0;
        }

        $countDurasiKerjasama = AgreementArchives::where('id', $mitraId)->select('durasi_kerjasama', DB::raw('count(*) as total'))
            ->groupBy('durasi_kerjasama')
            ->pluck('total', 'durasi_kerjasama')
            ->toArray();

        $seriesDurasiKerjasama = array_merge($defaultDurasiKerjasama, $countDurasiKerjasama);
        
        return Inertia::render('Mitra/Index', [
            'agreementArchives' => $agreementArchives->get(),
            'mitra' => $mitra,
            'totalAgreement' => $totalAgreement,
            'activeAgreement' => $activeAgreement,
            'inactiveAgreement' => $inactiveAgreement,
            'documentNull' => $documentNull,
            'seriesBidangKerjasama' => $seriesBidangKerjasama,
            'galleries' => $galleries,
            'seriesJenisKegiatan' => $seriesJenisKegiatan,
            'seriesYears' => $seriesYears,
            'seriesDurasiKerjasama' => $seriesDurasiKerjasama,
        ]);
    }

    public function edit($id)
    {
        $mitra = Mitra::findOrFail($id);

        return Inertia::render('Mitra/Edit', [
            'mitra' => $mitra,
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'nama_mitra' => 'required',
            'tentang_mitra' => 'required',
            'no_pks_fik' => 'required',
            'no_pks_mitra' => 'required',
            'pic_fik' => 'required',
            'pic_mitra' => 'required',
            'kriteria_mitra' => 'required',
            'asal_mitra' => 'required',
            'waktu_kerjasama_mulai' => 'required',
            'waktu_kerjasama_selesai' => 'required',
        ]);

        $mitra = Mitra::findOrFail($id);

        if ($request->file('dokumen_pks')) {
            $fileDokumenPks = $request->file('dokumen_pks');
            $nameDokumenPks = $fileDokumenPks->getClientOriginalName();
            $pathDokumenPks = $fileDokumenPks->storeAs('/', $nameDokumenPks, 'public');
        }

        $mitra->update([
            'nama_mitra' => $request->nama_mitra,
            'tentang_mitra' => $request->tentang_mitra,
            'no_pks_fik' => $request->no_pks_fik,
            'no_pks_mitra' => $request->no_pks_mitra,
            'pic_fik' => $request->pic_fik,
            'pic_mitra' => $request->pic_mitra,
            'kriteria_mitra' => $request->kriteria_mitra,
            'asal_mitra' => $request->asal_mitra,
            'waktu_kerjasama_mulai' => $request->waktu_kerjasama_mulai,
            'waktu_kerjasama_selesai' => $request->waktu_kerjasama_selesai,
            'dokumen_pks' => $pathDokumenPks ?? $mitra->dokumen_pks,
        ]);

        return redirect()->route('dashboard');
    }

    public function delete($id)
    {
        $mitra = Mitra::findOrFail($id);
        $mitra->delete();

        return redirect()->route('dashboard');
    }

    public function download($file)
    {
        $check = Storage::disk('public')->get($file);

        return response()->download('storage/' . $file);
    }
}