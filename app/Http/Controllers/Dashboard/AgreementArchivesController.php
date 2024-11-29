<?php

namespace App\Http\Controllers\Dashboard;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\AgreementArchives;
use App\Http\Controllers\Controller;
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
                ->orWhere('bidang_kerjasama', 'like', '%'.$request->get('search').'%')
                ->orWhere('kriteria_mitra', 'like', '%'.$request->get('search').'%')
                ->orWhere('asal_mitra', 'like', '%'.$request->get('search').'%');
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
        return Inertia::render('AgreementArchives/Create', [
            'mitraId' => $mitraId,
        ]);
    }  
    
    public function store(Request $request, $mitraId)
    {
        $request->validate([
            'nama_instansi' => 'required',
            'nama_kegiatan' => 'required',
            'no_ia_pihak_1' => 'required',
            'no_ia_pihak_2' => 'required',
            'pihak_1' => 'required',
            'pihak_2' => 'required',
            'bidang_kerjasama' => 'required',
            'durasi_kerjasama' => 'required',
            'waktu_kerjasama_mulai' => 'required',
            'waktu_kerjasama_selesai' => 'required',
            'dokumen_kerjasama' => 'nullable|mimes:pdf,doc,docx',
            'dokumentasi.*' => 'nullable|mimes:jepg,png,jpg',
        ]);

        if($request->file('dokumen_kerjasama')) {
            $filedokumen_kerjasama = $request->file('dokumen_kerjasama');
            $namedokumen_kerjasama = $filedokumen_kerjasama->getClientOriginalName();
            $pathdokumen_kerjasama = $filedokumen_kerjasama->storeAs('/', $namedokumen_kerjasama, 'public');
        }
        
        $agreementArchive = AgreementArchives::create([
            'mitra_id' => $mitraId,
            'nama_instansi' => $request->nama_instansi,
            'nama_kegiatan' => $request->nama_kegiatan,
            'no_ia_pihak_1' => $request->no_ia_pihak_1,
            'no_ia_pihak_2' => $request->no_ia_pihak_2,
            'pihak_1' => $request->pihak_1,
            'pihak_2' => $request->pihak_2,
            'bidang_kerjasama' => $request->bidang_kerjasama,
            'durasi_kerjasama' => $request->durasi_kerjasama,
            'waktu_kerjasama_mulai' => $request->waktu_kerjasama_mulai,
            'waktu_kerjasama_selesai' => $request->waktu_kerjasama_selesai,
            'dokumen_kerjasama' => $pathdokumen_kerjasama ?? null,
        ]);

        if ($request->file('dokumentasi')) {
            foreach ($request->file('dokumentasi') as $file) {
                $path = $file->store('/', 'public');
                $agreementArchive->documentations()->create([
                    'path' => $path,
                ]);
            }
        };

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
            'deskripsi_kerjasama' => $request->nama_kegiatan,
            'no_pks_pihak_1' => $request->no_ia_pihak_1,
            'no_pks_pihak_2' => $request->no_ia_pihak_2,
            'pihak_1' => $request->pihak_1,
            'pihak_2' => $request->pihak_2,
            'bidang_kerjasama' => $request->bidang_kerjasama,
            'kriteria_mitra' => $request->durasi_kerjasama,
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

    public function view($mitraId, $id)
    {
        $agreementArchive = AgreementArchives::with('documentations')->findOrFail($id);

        return Inertia::render('AgreementArchives/View', [
            'mitraId' => $mitraId,
            'agreementArchive' => $agreementArchive,
        ]);
    }
}
