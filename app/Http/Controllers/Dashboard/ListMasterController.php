<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\KriteriaMitra;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ListMasterController extends Controller
{
    public function index()
    {
        $datas = KriteriaMitra::all();

        return Inertia::render('ListMaster/Index', [
            'datas' => $datas
        ]);
    }

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

    public function kriteria_mitra_update(Request $request, $id)
    {

        dd($request->all());
        $kriteriaMitra = KriteriaMitra::findOrFail($id);
        $kriteriaMitra->update([
            'kriteria_mitra' => $request->kriteria_mitra
        ]);

        return redirect()->back();
    }
}
