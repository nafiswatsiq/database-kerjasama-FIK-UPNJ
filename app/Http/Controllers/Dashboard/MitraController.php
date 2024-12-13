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
use App\Notifications\ExpiredMitra;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Notification;

class MitraController extends Controller
{
    public function create()
    {
        return Inertia::render('Mitra/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama_instansi' => 'required',
            'deskripsi_instansi' => 'required',
            'no_pks_pihak_1' => 'required',
            'no_pks_pihak_2' => 'required',
            'pihak_1' => 'required',
            'pihak_2' => 'required',
            'kriteria_mitra' => 'required',
            'asal_mitra' => 'required',
            'ruang_lingkup_kerjasama' => 'required',
            'waktu_kerjasama_mulai' => 'required',
            'waktu_kerjasama_selesai' => 'required',
            'dokumen_pks' => 'nullable|mimes:pdf,doc,docx',
        ]);

        if($request->file('dokumen_pks')) {
            $fileDokumenPks = $request->file('dokumen_pks');
            $nameDokumenPks = $fileDokumenPks->getClientOriginalName();
            $pathDokumenPks = $fileDokumenPks->storeAs('/', $nameDokumenPks, 'public');
        }

        $mitra = Mitra::create([
            'nama_instansi' => $request->nama_instansi,
            'deskripsi_instansi' => $request->deskripsi_instansi,
            'no_pks_pihak_1' => $request->no_pks_pihak_1,
            'no_pks_pihak_2' => $request->no_pks_pihak_2,
            'pihak_1' => $request->pihak_1,
            'pihak_2' => $request->pihak_2,
            'kriteria_mitra' => $request->kriteria_mitra,
            'asal_mitra' => $request->asal_mitra,
            'ruang_lingkup_kerjasama' => $request->ruang_lingkup_kerjasama,
            'waktu_kerjasama_mulai' => $request->waktu_kerjasama_mulai,
            'waktu_kerjasama_selesai' => $request->waktu_kerjasama_selesai,
            'dokumen_pks' => $pathDokumenPks ?? null,
        ]);

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
        $countsBidangKerjasama = AgreementArchives::where('mitra_id', $mitraId)->select('bidang_kerjasama', DB::raw('count(*) as total'))
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
        if ($request->get('search'))
        {
            $agreementArchives->where('nama_instansi', 'like', '%'.$request->get('search').'%')
                ->orWhere('deskripsi_kerjasama', 'like', '%'.$request->get('search').'%')
                ->orWhere('bidang_kerjasama', 'like', '%'.$request->get('search').'%')
                ->orWhere('kriteria_mitra', 'like', '%'.$request->get('search').'%')
                ->orWhere('asal_mitra', 'like', '%'.$request->get('search').'%');
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
                $agreementArchives->where('waktu_kerjasama_selesai', '>', now())
                    ->orWhere('waktu_kerjasama_selesai', '<', now());
            }
        }else{
            $agreementArchives->orderBy('waktu_kerjasama_mulai', 'desc');
        }
        $documentNull = AgreementArchives::where('mitra_id', $mitraId)->whereNull('dokumen_kerjasama')->count();
        
        return Inertia::render('Mitra/Index', [
            'agreementArchives' => $agreementArchives->limit(5)->get(),
            'mitra' => $mitra,
            'totalAgreement' => $totalAgreement,
            'activeAgreement' => $activeAgreement,
            'inactiveAgreement' => $inactiveAgreement,
            'documentNull' => $documentNull,
            'seriesBidangKerjasama' => $seriesBidangKerjasama,
            'galleries' => $galleries,
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
            'nama_instansi' => 'required',
            'deskripsi_instansi' => 'required',
            'no_pks_pihak_1' => 'required',
            'no_pks_pihak_2' => 'required',
            'pihak_1' => 'required',
            'pihak_2' => 'required',
            'kriteria_mitra' => 'required',
            'asal_mitra' => 'required',
            'ruang_lingkup_kerjasama' => 'required',
            'waktu_kerjasama_mulai' => 'required',
            'waktu_kerjasama_selesai' => 'required',
        ]);

        $mitra = Mitra::findOrFail($id);

        if($request->file('dokumen_pks')) {
            $fileDokumenPks = $request->file('dokumen_pks');
            $nameDokumenPks = $fileDokumenPks->getClientOriginalName();
            $pathDokumenPks = $fileDokumenPks->storeAs('/', $nameDokumenPks, 'public');
        }

        $mitra->update([
            'nama_instansi' => $request->nama_instansi,
            'deskripsi_instansi' => $request->deskripsi_instansi,
            'no_pks_pihak_1' => $request->no_pks_pihak_1,
            'no_pks_pihak_2' => $request->no_pks_pihak_2,
            'pihak_1' => $request->pihak_1,
            'pihak_2' => $request->pihak_2,
            'kriteria_mitra' => $request->kriteria_mitra,
            'asal_mitra' => $request->asal_mitra,
            'ruang_lingkup_kerjasama' => $request->ruang_lingkup_kerjasama,
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

        return response()->download('storage/'.$file);
    }
}
