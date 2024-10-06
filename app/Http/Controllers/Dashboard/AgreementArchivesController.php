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

        return Inertia::render('AgreementArchives/Index', [
            'agreementArchives' => $agreementArchives->orderBy('id', 'desc')->paginate(20),
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
            'dokumenKerjasama' => 'required|mimes:pdf,doc,docx',
            'dokumentasi.*' => 'nullable|mimes:jepg,png,jpg',
        ]);

        $pathDokumenKerjasama = $request->file('dokumenKerjasama')->store('/', 'public');
        
        $agreementArchive = AgreementArchives::create([
            'nama_instansi' => $request->namaInstansi,
            'deskripsi_kerjasama' => $request->deskripsiKerjasama,
            'bidang_kerjasama' => $request->bidangKerjasama,
            'kriteria_mitra' => $request->kriteriaMitra,
            'asal_mitra' => $request->asalMitra,
            'durasi_kerjasama' => $request->durasiKerjasama,
            'waktu_kerjasama_mulai' => $request->waktuKerjasamaMulai,
            'waktu_kerjasama_selesai' => $request->waktuKerjasamaSelesai,
            'dokumen_kerjasama' => $pathDokumenKerjasama,
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
                'dokumenKerjasama' => 'required|mimes:pdf,doc,docx',
            ]);

            Storage::disk('public')->delete($agreementArchive->dokumen_kerjasama);
            $pathDokumenKerjasama = $request->file('dokumenKerjasama')->store('/', 'public');
            $agreementArchive->update([
                'dokumen_kerjasama' => $pathDokumenKerjasama,
            ]);
        }

        if ($request->file('dokumentasi')) {
            $request->validate([
                'dokumentasi.*' => 'required|mimes:jepg,png,jpg',
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
