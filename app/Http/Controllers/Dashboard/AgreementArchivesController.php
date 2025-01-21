<?php

namespace App\Http\Controllers\Dashboard;

use Carbon\Carbon;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Mitra;
use App\Models\LogKegiatan;
use Illuminate\Http\Request;
use App\Models\JenisKegiatan;
use App\Models\JenisKerjasama;
use App\Models\DurasiKerjasamas;
use App\Models\AgreementArchives;
use App\Notifications\ExpiredMitra;
use App\Services\DocumentGenerator;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class AgreementArchivesController extends Controller
{
    public function index(Request $request, $mitraId)
    {
        $agreementArchives = AgreementArchives::query()->where('mitra_id', $mitraId);
        if ($request->get('search'))
        {
            $agreementArchives->where(function($query) use ($request) {
            $query->where('nama_instansi', 'like', '%'.$request->get('search').'%')
                ->orWhere('nama_kegiatan', 'like', '%'.$request->get('search').'%')
                ->orWhere('no_ia_pihak_1', 'like', '%'.$request->get('search').'%')
                ->orWhere('no_ia_pihak_2', 'like', '%'.$request->get('search').'%')
                ->orWhere('pihak_1', 'like', '%'.$request->get('search').'%')
                ->orWhere('pihak_2', 'like', '%'.$request->get('search').'%')
                ->orWhere('bidang_kerjasama', 'like', '%'.$request->get('search').'%');
                // ->orWhere('kriteria_mitra', 'like', '%'.$request->get('search').'%')
                // ->orWhere('asal_mitra', 'like', '%'.$request->get('search').'%');
            });
        }

        if ($request->get('sort'))
        {
            $agreementArchives->orderBy('id', $request->get('sort'));
        }

        if ($request->get('filter'))
        {
            $filter = $request->get('filter');
            if ($request->get('order')) {
                $order = $request->get('order');
                if($filter == 'status') {
                    if($order == 'asc') {
                        $agreementArchives->where('waktu_kerjasama_selesai', '>', now());
                    } elseif($order == 'desc') {
                        $agreementArchives->where('waktu_kerjasama_selesai', '<', now());
                    }
                }else {
                    $agreementArchives->orderBy($filter, $order);
                }
            } elseif ($filter == 'nama-instansi'){
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
                $agreementArchives->where(function($query) use ($request) {
                    $query->where('waktu_kerjasama_selesai', '>', now())
                        ->orWhere('waktu_kerjasama_selesai', '<', now());
                });
            }
        }

        return Inertia::render('AgreementArchives/Index', [
            'mitraId' => $mitraId,
            'agreementArchives' => $agreementArchives->paginate(20),
        ]);
    }

    public function create($mitraId)
    {
        $mitra = Mitra::findOrFail($mitraId);
        $durasi = DurasiKerjasamas::get()
            ->map(function($item) {
                return [
                    'value' => $item->durasi_kerjasama,
                    'label' => $item->durasi_kerjasama,
                ];
            });

        $jenisKegiatan = JenisKegiatan::get()
            ->map(function($item) {
                return [
                    'value' => $item->jenis_kegiatan,
                    'label' => $item->jenis_kegiatan,
                ];
            });

        return Inertia::render('AgreementArchives/Create', [
            'mitraId' => $mitraId,
            'mitra' => $mitra,
            'durasi' => $durasi,
            'jenisKegiatan' => $jenisKegiatan,
        ]);
    }

    public function store(Request $request, $mitraId)
    {
        $request->validate([
            'nama_instansi' => 'required',
            'nama_kegiatan' => 'required',
            'deskripsi_kegiatan' => 'required',
            'no_ia' => 'required',
            'waktu_kerjasama_mulai' => 'required',
            'waktu_kerjasama_selesai' => 'required',
            'durasi_kerjasama' => 'required',
            'tahun_ajaran' => 'required',
            'tahun_ajaran1' => 'required',
            'tahun_ajaran2' => 'required',
            'jenis_kegiatan' => 'required',
            'pihak_1' => 'required',
            'pihak_2' => 'required',
            'jabatan_pihak_1' => 'required',
            'jabatan_pihak_2' => 'required',
            'bentuk_kegiatan' => 'required',
            'ringkasan_luaran' => 'required',
            // 'dokumen_kerjasama' => 'nullable|mimes:pdf,doc,docx',
            // 'dokumen_laporan' => 'nullable|mimes:pdf,doc,docx',
            // 'dokumentasi.*' => 'nullable|mimes:jepg,png,jpg',
        ]);

        // if($request->file('dokumen_kerjasama')) {
        //     $filedokumen_kerjasama = $request->file('dokumen_kerjasama');
        //     $namedokumen_kerjasama = $filedokumen_kerjasama->getClientOriginalName();
        //     $pathdokumen_kerjasama = $filedokumen_kerjasama->storeAs('/', $namedokumen_kerjasama, 'public');
        // }
        // if($request->file('dokumen_laporan')) {
        //     $filedokumen_laporan = $request->file('dokumen_laporan');
        //     $namedokumen_laporan = $filedokumen_laporan->getClientOriginalName();
        //     $pathdokumen_laporan = $filedokumen_laporan->storeAs('/', $namedokumen_laporan, 'public');
        // }

        $agreementArchive = AgreementArchives::create([
            'mitra_id' => $mitraId,
            'nama_instansi' => $request->nama_instansi,
            'nama_kegiatan' => $request->nama_kegiatan,
            'deskripsi_kegiatan' => $request->deskripsi_kegiatan,
            'no_ia' => $request->no_ia,
            'waktu_kerjasama_mulai' => $request->waktu_kerjasama_mulai,
            'waktu_kerjasama_selesai' => $request->waktu_kerjasama_selesai,
            'durasi_kerjasama' => $request->durasi_kerjasama,
            'tahun_ajaran' => $request->tahun_ajaran,
            'tahun_ajaran_1' => $request->tahun_ajaran1,
            'tahun_ajaran_2' => $request->tahun_ajaran2,
            'jenis_kegiatan' => $request->jenis_kegiatan,
            'pihak_1' => $request->pihak_1,
            'pihak_2' => $request->pihak_2,
            'jabatan_pihak_1' => $request->jabatan_pihak_1,
            'jabatan_pihak_2' => $request->jabatan_pihak_2,
            'bentuk_kegiatan' => $request->bentuk_kegiatan,
            'ringkasan_luaran' => $request->ringkasan_luaran,
            // 'dokumen_kerjasama' => $pathdokumen_kerjasama ?? null,
            // 'dokumen_laporan' => $pathdokumen_laporan ?? null,
        ]);

        // if ($request->file('dokumentasi')) {
        //     foreach ($request->file('dokumentasi') as $file) {
        //         $path = $file->store('/', 'public');
        //         $agreementArchive->documentations()->create([
        //             'path' => $path,
        //         ]);
        //     }
        // };

        return redirect()->route('agreementarchives.index', $mitraId);
    }

    public function destroy($id)
    {
        $agreementArchive = AgreementArchives::findOrFail($id);
        $agreementArchive->delete();

        return redirect()->route('agreementarchives.index', $agreementArchive->mitra_id);
    }

    public function download($file)
    {
        $check = Storage::disk('public')->get($file);

        return response()->download('storage/'.$file);
    }

    public function edit($mitraId, $id)
    {
        $agreementArchive = AgreementArchives::with('documentations')->findOrFail($id);

        return Inertia::render('AgreementArchives/Edit', [
            'mitraId' => $mitraId,
            'agreementArchive' => $agreementArchive,
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'nama_instansi' => 'required',
            'nama_kegiatan' => 'required',
            'deskripsi_kegiatan' => 'required',
            'no_ia_pihak_1' => 'required',
            'no_ia_pihak_2' => 'required',
            'pihak_1' => 'required',
            'pihak_2' => 'required',
            'bidang_kerjasama' => 'required',
            'durasi_kerjasama' => 'required',
            // 'asalMitra' => 'required',
            // 'ruangLingkupKerjasama' => 'required',
            // 'durasi_kerjasama' => 'required',
            'waktu_kerjasama_mulai' => 'required',
            'waktu_kerjasama_selesai' => 'required'
        ]);

        $agreementArchive = AgreementArchives::findOrFail($request->id);

        $agreementArchive->update([
            'nama_instansi' => $request->nama_instansi,
            'nama_kegiatan' => $request->nama_kegiatan,
            'deskripsi_kegiatan' => $request->deskripsi_kegiatan,
            'no_ia_pihak_1' => $request->no_ia_pihak_1,
            'no_ia_pihak_2' => $request->no_ia_pihak_2,
            'pihak_1' => $request->pihak_1,
            'pihak_2' => $request->pihak_2,
            'bidang_kerjasama' => $request->bidang_kerjasama,
            // 'kriteria_mitra' => $request->durasi_kerjasama,
            // 'asal_mitra' => $request->asalMitra,
            // 'ruang_lingkup_kerjasama' => $request->ruangLingkupKerjasama,
            'durasi_kerjasama' => $request->durasi_kerjasama,
            'waktu_kerjasama_mulai' => $request->waktu_kerjasama_mulai,
            'waktu_kerjasama_selesai' => $request->waktu_kerjasama_selesai,
        ]);

        if ($request->file('dokumen_kerjasama')) {
            $request->validate([
                'dokumen_kerjasama' => 'nullable|mimes:pdf,doc,docx',
            ]);

            $filedokumen_kerjasama = $request->file('dokumen_kerjasama');
            $namedokumen_kerjasama = $filedokumen_kerjasama->getClientOriginalName();
            $pathdokumen_kerjasama = $filedokumen_kerjasama->storeAs('/', $namedokumen_kerjasama, 'public');

            $agreementArchive->update([
                'dokumen_kerjasama' => $pathdokumen_kerjasama,
            ]);
        }

        if($request->file('dokumen_laporan')) {
            $request->validate([
                'dokumen_laporan' => 'nullable|mimes:pdf,doc,docx',
            ]);
            $filedokumen_laporan = $request->file('dokumen_laporan');
            $namedokumen_laporan = $filedokumen_laporan->getClientOriginalName();
            $pathdokumen_laporan = $filedokumen_laporan->storeAs('/', $namedokumen_laporan, 'public');

            $agreementArchive->update([
                'dokumen_laporan' => $pathdokumen_laporan,
            ]);
        }

        if ($request->file('dokumentasi')) {
            $request->validate([
                'dokumentasi.*' => 'nullable|mimes:jepg,png,jpg',
            ]);

            $agreementArchive->documentations()->delete();

            foreach ($request->file('dokumentasi') as $file) {
                $path = $file->store('/', 'public');
                $agreementArchive->documentations()->create([
                    'path' => $path,
                ]);
            }
        }

        return redirect()->route('agreementarchives.index', $agreementArchive->mitra_id);
    }

    public function draftDocumentIa($id)
    {
        $agreementArchives = AgreementArchives::findOrFail($id);
        $mitra = Mitra::findOrFail($agreementArchives->mitra_id);
        $logoMitra = public_path('storage/' . $mitra->logo);
        $data = [
            'nama_mitra' => $mitra->nama_mitra,
            'no_ia' => $agreementArchives->no_ia,
            'status' => $agreementArchives->waktu_kerjasama_selesai > now() ? 'Aktif' : 'Tidak Aktif',
            'tanggal_awal' => Carbon::parse($agreementArchives->waktu_kerjasama_mulai)->locale('id')->isoFormat('D MMMM Y'),
            'tanggal_akhir' => Carbon::parse($agreementArchives->waktu_kerjasama_selesai)->locale('id')->isoFormat('D MMMM Y'),
            'judul_ia' => $agreementArchives->jenis_kegiatan,
            'deskripsi_ia' => $agreementArchives->deskripsi_kegiatan,
            'pihak_1' => $agreementArchives->pihak_1,
            'pihak_2' => $agreementArchives->pihak_2,
            'jabatan_pihak_1' => $agreementArchives->jabatan_pihak_1,
            'jabatan_pihak_2' => $agreementArchives->jabatan_pihak_2,
            'bentuk_kegiatan' => $agreementArchives->bentuk_kegiatan,
            'ringkasan_luaran' => $agreementArchives->ringkasan_luaran,
        ];

        $generated = (new DocumentGenerator())->draftDocumentIa($logoMitra, $data);
        if($generated){
            $agreementArchives->update([
                'draft' => $generated,
            ]);
            return response()->download($generated);
        }

    }

    public function downloadRekapIa($id)
    {
        $agreementArchives = AgreementArchives::findOrFail($id);
        $mitra = Mitra::findOrFail($agreementArchives->mitra_id);
        $logKegiatans = LogKegiatan::where('mitra_id' , $mitra->id)->where('agreement_archives_id' , $agreementArchives->id)->get();
        $data = [
            'nama_mitra' => $mitra->nama_mitra,
            'jenis_ia' => $agreementArchives->jenis_kegiatan,
            'no_pks' => $mitra->no_pks_mitra,
            'no_ia' => $agreementArchives->no_ia,
            'ruang_lingkup' => $mitra->jenis_kerjasama,
            'waktu_pelaksanaan' => $agreementArchives->durasi_kerjasama . " " . $agreementArchives->tahun_ajaran . " " . $agreementArchives->tahun_ajaran_1 . "/" . $agreementArchives->tahun_ajaran_2,
        ];

        $kegiatans= [];
        foreach($logKegiatans as $kegiatan){
            $kegiatans[] = [
                'nama_kegiatan' => $kegiatan->nama_kegiatan,
                'tanggal_kegiatan' => Carbon::parse($kegiatan->tanggal_kegiatan)->locale('id')->isoFormat('D MMMM Y'),
                'dokumentasi' => $kegiatan->dokumentasi,
            ];
        }

        $generated = (new DocumentGenerator())->rekapIa($data , $kegiatans);
        if($generated){
            return response()->download($generated);
        }
    }

    public function downloadDraftLaporan($id){
        $agreementArchive = AgreementArchives::findOrFail($id);
        $data = [
            'nama_mitra' => $agreementArchive->nama_mitra,
            'jenis_ia' => $agreementArchive->nama_kegiatan,
            'durasi' => $agreementArchive->durasi_kerjasama,
            'tahun_ajaran' => $agreementArchive->tahun_ajaran,
            'tahun_ajaran_1' => $agreementArchive->tahun_ajaran_1,
            'tahun_ajaran_2' => $agreementArchive->tahun_ajaran_2,
            'no_pks' => $agreementArchive->mitra->no_pks_mitra,
            'no_ia' => $agreementArchive->no_ia,
            'ruang_lingkup' => $agreementArchive->mitra->jenis_kerjasama,
            'tanggal_pelaksanaan' => Carbon::parse($agreementArchive->created_at)->locale('id')->isoFormat('D MMMM Y'),
            'pihak_1' => $agreementArchive->pihak_1,
            'jabatan_ia_pihak_1' => $agreementArchive->jabatan_pihak_1,
            'jabatan_pic_mitra' => $agreementArchive->mitra->jabatan_pic_mitra,
            'pic_mitra' => $agreementArchive->mitra->pic_mitra,
        ];

        $generated = (new DocumentGenerator())->draftLapIa($data);
        if($generated){
            return response()->download($generated);
        }
    }

    public function view($mitraId, $id)
    {
        $agreementArchive = AgreementArchives::with('documentations')->findOrFail($id);
        $logKegiatans = LogKegiatan::where('agreement_archives_id', $id)->where('mitra_id' , $mitraId)->get();
        return Inertia::render('AgreementArchives/View', [
            'mitraId' => $mitraId,
            'agreementArchive' => $agreementArchive,
            'logKegiatan' => $logKegiatans,
        ]);
    }

    public function logKegiatan($mitraId, $id)
    {
        $mitra = Mitra::findOrFail($mitraId);
        $agreementArchive = AgreementArchives::findOrFail($id);
        $logKegiatans = LogKegiatan::where('agreement_archives_id', $id)->where('mitra_id' , $mitraId)->get();
        return Inertia::render('AgreementArchives/LogKegiatan' , [
            'mitra' => $mitra,
            'agreementArchive' => $agreementArchive,
            'logKegiatans' => $logKegiatans,
        ]);
    }

    public function createLogKegiatan(Request $request , $mitraId  ,$agreementArchiveId)
    {
        $request->validate([
            'kegiatans.*.nama_kegiatan' => 'required|string',
            'kegiatans.*.tanggal_kegiatan' => 'required|date',
            'kegiatans.*.dokumentasi' => 'nullable|file|max:2048',
        ]);
        foreach ($request->kegiatans as $kegiatan) {
            $filePath = null;
            if (isset($kegiatan['dokumentasi'])) {
                $nameImage = $kegiatan['dokumentasi']->getClientOriginalName();
                $filePath = $kegiatan['dokumentasi']->storeAs('log-kegiatan', $nameImage, 'public');
            }

            LogKegiatan::create([
                'mitra_id' => $mitraId,
                'agreement_archives_id' => $agreementArchiveId,
                'nama_kegiatan' => $kegiatan['nama_kegiatan'],
                'tanggal_kegiatan' => $kegiatan['tanggal_kegiatan'],
                'dokumentasi' => $filePath,
            ]);
        }
        return redirect()->back()->with('success', 'Log kegiatan berhasil disimpan');

    }


}
