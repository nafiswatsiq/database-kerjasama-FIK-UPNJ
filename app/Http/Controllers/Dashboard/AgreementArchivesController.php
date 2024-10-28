<?php

namespace App\Http\Controllers\Dashboard;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\AgreementArchives;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class AgreementArchivesController extends Controller
{
    public function index(Request $request)
    {
        $agreementArchives = AgreementArchives::query();

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
            // dd($filter);
            if ($filter == 'nama-instansi'){
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
        }

        return Inertia::render('AgreementArchives/Index', [
            'agreementArchives' => $agreementArchives->paginate(20),
        ]);
    }

    public function create()
    {
        return Inertia::render('AgreementArchives/Create');
    }  
    
    public function store(Request $request)
    {
        $request->validate([
            'namaInstansi' => 'required',
            'deskripsiKerjasama' => 'required',
            'bidangKerjasama' => 'required',
            'kriteriaMitra' => 'required',
            'asalMitra' => 'required',
            'durasiKerjasama' => 'required',
            'waktuKerjasamaMulai' => 'required',
            'waktuKerjasamaSelesai' => 'required',
            'dokumenKerjasama' => 'nullable|mimes:pdf,doc,docx',
            'dokumentasi.*' => 'nullable|mimes:jepg,png,jpg',
        ]);

        if($request->file('dokumenKerjasama')) {
            $fileDokumenKerjasama = $request->file('dokumenKerjasama');
            $nameDokumenKerjasama = $fileDokumenKerjasama->getClientOriginalName();
            $pathDokumenKerjasama = $fileDokumenKerjasama->storeAs('/', $nameDokumenKerjasama, 'public');
        }
        
        $agreementArchive = AgreementArchives::create([
            'nama_instansi' => $request->namaInstansi,
            'deskripsi_kerjasama' => $request->deskripsiKerjasama,
            'bidang_kerjasama' => $request->bidangKerjasama,
            'kriteria_mitra' => $request->kriteriaMitra,
            'asal_mitra' => $request->asalMitra,
            'durasi_kerjasama' => $request->durasiKerjasama,
            'waktu_kerjasama_mulai' => $request->waktuKerjasamaMulai,
            'waktu_kerjasama_selesai' => $request->waktuKerjasamaSelesai,
            'dokumen_kerjasama' => $pathDokumenKerjasama ?? null,
        ]);

        if ($request->file('dokumentasi')) {
            foreach ($request->file('dokumentasi') as $file) {
                $path = $file->store('/', 'public');
                $agreementArchive->documentations()->create([
                    'path' => $path,
                ]);
            }
        };

        return redirect()->route('agreementarchives.index');
    }

    public function destroy($id)
    {
        $agreementArchive = AgreementArchives::findOrFail($id);
        $agreementArchive->delete();

        return redirect()->route('agreementarchives.index');
    }

    public function download($file)
    {
        $check = Storage::disk('public')->get($file);
        
        return response()->download('storage/'.$file);
    }

    public function edit($id)
    {
        $agreementArchive = AgreementArchives::with('documentations')->findOrFail($id);

        return Inertia::render('AgreementArchives/Edit', [
            'agreementArchive' => $agreementArchive,
        ]);
    }

    public function update(Request $request) 
    {
        $request->validate([
            'namaInstansi' => 'required',
            'deskripsiKerjasama' => 'required',
            'bidangKerjasama' => 'required',
            'kriteriaMitra' => 'required',
            'asalMitra' => 'required',
            'durasiKerjasama' => 'required',
            'waktuKerjasamaMulai' => 'required',
            'waktuKerjasamaSelesai' => 'required'
        ]);

        $agreementArchive = AgreementArchives::findOrFail($request->id);

        $agreementArchive->update([
            'nama_instansi' => $request->namaInstansi,
            'deskripsi_kerjasama' => $request->deskripsiKerjasama,
            'bidang_kerjasama' => $request->bidangKerjasama,
            'kriteria_mitra' => $request->kriteriaMitra,
            'asal_mitra' => $request->asalMitra,
            'durasi_kerjasama' => $request->durasiKerjasama,
            'waktu_kerjasama_mulai' => $request->waktuKerjasamaMulai,
            'waktu_kerjasama_selesai' => $request->waktuKerjasamaSelesai,
        ]);

        if ($request->file('dokumenKerjasama')) {
            $request->validate([
                'dokumenKerjasama' => 'nullable|mimes:pdf,doc,docx',
            ]);

            $fileDokumenKerjasama = $request->file('dokumenKerjasama');
            $nameDokumenKerjasama = $fileDokumenKerjasama->getClientOriginalName();
            $pathDokumenKerjasama = $fileDokumenKerjasama->storeAs('/', $nameDokumenKerjasama, 'public');

            $agreementArchive->update([
                'dokumen_kerjasama' => $pathDokumenKerjasama,
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

        return redirect()->route('agreementarchives.index');
    }

    public function view($id)
    {
        $agreementArchive = AgreementArchives::with('documentations')->findOrFail($id);

        return Inertia::render('AgreementArchives/View', [
            'agreementArchive' => $agreementArchive,
        ]);
    }
}
