<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\AsalKerjasama;
use App\Models\DurasiKegiatan;
use App\Models\DurasiKerjasamas;
use App\Models\JenisKegiatan;
use App\Models\JenisKerjasama;
use App\Models\KriteriaMitra;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ListMasterController extends Controller
{
    public function index()
    {
        $kriteria_mitra = KriteriaMitra::all();
        $jenis_kegiatan = JenisKegiatan::all();
        $durasi_kerjasama = DurasiKerjasamas::all();
        $jenis_kerjasama = JenisKerjasama::all();
        $asal_kerjasama = AsalKerjasama::all();

        return Inertia::render('ListMaster/Index', [
            'kriteria_mitra' => $kriteria_mitra,
            'jenis_kegiatan' => $jenis_kegiatan,
            'durasi_kerjasama' => $durasi_kerjasama,
            'jenis_kerjasama' => $jenis_kerjasama,
            'asal_kerjasama' => $asal_kerjasama,
        ]);
    }

    // Kriteria Mitra
    public function kriteria_mitra_store(Request $request)
    {
        $request->validate([
            'kriteria_mitra' => 'required',
        ]);

        $kriteria_mitra = KriteriaMitra::create([
            'kriteria_mitra' => $request->kriteria_mitra,
        ]);

        return redirect()->back();
    }

    public function kriteria_mitra_destroy($id)
    {
        $kriteria_mitra = KriteriaMitra::findOrFail($id);
        $kriteria_mitra->delete();

        return redirect()->back();
    }

    public function kriteria_mitra_edit($id)
    {
        $datas = DB::table('kriteria_mitras')->where('id', $id)->first();
        return Inertia::render('ListMaster/EditKriteriaMitra', [
            'datas' => $datas
        ]);
    }

    public function kriteria_mitra_update(Request $request, $id)
    {
        $kriteriaMitra = KriteriaMitra::findOrFail($id);
        $data = $kriteriaMitra->update([
            'kriteria_mitra' => $request->kriteria_mitra
        ]);

        return redirect()->route('list-master.index');
    }

    public function kriteria_mitra_qs_store(Request $request, $id)
    {
        $kriteriaMitra = KriteriaMitra::findOrFail($id);
        $kriteriaMitra->update([
            'peringkat' => $request->kriteria_mitra_qs,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Data updated successfully',
        ]);
    }


    // Jenis Kegiatan
    public function jenis_kegiatan_store(Request $request)
    {
        $request->validate([
            'jenis_kegiatan' => 'required',
        ]);

        $jenis_kegiatan = JenisKegiatan::create([
            'jenis_kegiatan' => $request->jenis_kegiatan,
        ]);

        return redirect()->back();
    }

    public function jenis_kegiatan_destroy($id)
    {
        $jenis_kegiatan = JenisKegiatan::findOrFail($id);
        $jenis_kegiatan->delete();

        return redirect()->back();
    }

    public function jenis_kegiatan_edit($id)
    {
        $datas = DB::table('jenis_kegiatans')->where('id', $id)->first();
        return Inertia::render('ListMaster/EditJenisKegiatan', [
            'datas' => $datas
        ]);
    }

    public function jenis_kegiatan_update(Request $request, $id)
    {
        $jenisKegiatan = JenisKegiatan::findOrFail($id);
        $data = $jenisKegiatan->update([
            'jenis_kegiatan' => $request->jenis_kegiatan
        ]);

        return redirect()->route('list-master.index');
    }

    // Durasi Kerjasama
    public function durasi_kerjasama_store(Request $request)
    {
        $request->validate([
            'durasi_kerjasama' => 'required',
        ]);

        $durasi_kerjasama = DurasiKerjasamas::create([
            'durasi_kerjasama' => $request->durasi_kerjasama,
        ]);

        return redirect()->back();
    }

    public function durasi_kerjasama_destroy($id)
    {
        $durasi_kerjasama = DurasiKerjasamas::findOrFail($id);
        $durasi_kerjasama->delete();

        return redirect()->back();
    }

    public function durasi_kerjasama_edit($id)
    {
        $datas = DB::table('durasi_kerjasamas')->where('id', $id)->first();
        return Inertia::render('ListMaster/EditDurasiKerjasama', [
            'datas' => $datas
        ]);
    }

    public function durasi_kerjasama_update(Request $request, $id)
    {
        $durasiKerjasama = DurasiKerjasamas::findOrFail($id);
        $data = $durasiKerjasama->update([
            'durasi_kerjasama' => $request->durasi_kerjasama
        ]);

        return redirect()->route('list-master.index');
    }

    // Jenis Kerjasama
    public function jenis_kerjasama_store(Request $request)
    {
        $request->validate([
            'jenis_kerjasama' => 'required',
        ]);

        $jenis_kerjasama = JenisKerjasama::create([
            'jenis_kerjasama' => $request->jenis_kerjasama,
        ]);

        return redirect()->back();
    }

    public function jenis_kerjasama_destroy($id)
    {
        $jenis_kerjasama = JenisKerjasama::findOrFail($id);
        $jenis_kerjasama->delete();

        return redirect()->back();
    }

    public function jenis_kerjasama_edit($id)
    {
        $datas = DB::table('jenis_kerjasamas')->where('id', $id)->first();
        return Inertia::render('ListMaster/EditJenisKerjasama', [
            'datas' => $datas
        ]);
    }

    public function jenis_kerjasama_update(Request $request, $id)
    {
        $jenisKerjasama = JenisKerjasama::findOrFail($id);
        $data = $jenisKerjasama->update([
            'jenis_kerjasama' => $request->jenis_kerjasama
        ]);

        return redirect()->route('list-master.index');
    }

    // Asal Kerjasama
    public function asal_kerjasama_store(Request $request)
    {
        $request->validate([
            'asal_kerjasama' => 'required',
        ]);

        $asal_kerjasama = AsalKerjasama::create([
            'asal_kerjasama' => $request->asal_kerjasama,
        ]);

        return redirect()->back();
    }

    public function asal_kerjasama_destroy($id)
    {
        $asal_kerjasama = AsalKerjasama::findOrFail($id);
        $asal_kerjasama->delete();

        return redirect()->back();
    }

    public function asal_kerjasama_edit($id)
    {
        $datas = DB::table('asal_kerjasamas')->where('id', $id)->first();
        return Inertia::render('ListMaster/EditAsalKerjasama', [
            'datas' => $datas
        ]);
    }

    public function asal_kerjasama_update(Request $request, $id)
    {
        $jenisKerjasama = AsalKerjasama::findOrFail($id);
        $data = $jenisKerjasama->update([
            'asal_kerjasama' => $request->asal_kerjasama
        ]);

        return redirect()->route('list-master.index');
    }
}
