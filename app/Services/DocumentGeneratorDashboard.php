<?php

namespace App\Services;

use App\Models\Mitra;
use App\Models\KriteriaMitra;
use App\Models\AgreementArchives;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use PhpOffice\PhpWord\TemplateProcessor;

class DocumentGeneratorDashboard
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function generateFromTemplate(
        $templatePath, 
        $outputPath, 
        array $data, 
        $tableKriteriaMitra, 
        $tableAsalMitra, 
        $tableStatusAktif, 
        $tableByYearMitra,
        $tableIaByPks
    )
    {
        try {
            // Load template
            $templateProcessor = new TemplateProcessor($templatePath);
            
            // Replace variables in template
            foreach ($data as $key => $value) {
                $templateProcessor->setValue($key, $value);
            }

            $templateProcessor->cloneRowAndSetValues('no_kriteria_mitra', $tableKriteriaMitra);
            $templateProcessor->cloneRowAndSetValues('no_asal_mitra', $tableAsalMitra);
            $templateProcessor->cloneRowAndSetValues('no_status_mitra', $tableStatusAktif);
            $templateProcessor->cloneRowAndSetValues('no_tahun_mitra', $tableByYearMitra);
            $templateProcessor->cloneRowAndSetValues('no_ia_by_pks', $tableIaByPks);
            
            // Save generated document
            $templateProcessor->saveAs($outputPath);
            
            return true;
        } catch (\Exception $e) {
            Log::error('Error generating document: ' . $e->getMessage());
            return false;
        }
    }

    public function generateDocument()
    {

        $templatePath = 'templates/laporan_dashboard.docx';

        // Path untuk menyimpan file hasil
        $name = 'generated_laporan_dashboard_' . time() . '.docx';
        $storagePath = storage_path('app/public/' . $name);
        
        $mitra = Mitra::query();
        $activeMitra = Mitra::where('waktu_kerjasama_selesai', '>', now())->count();
        $inactiveMitra = Mitra::where('waktu_kerjasama_selesai', '<', now())->count();
        $mitraEndingInSixMonths = Mitra::whereBetween('waktu_kerjasama_selesai', [now(), now()->addMonths(6)])->count();
        $mitraEndingInOneYear = Mitra::whereBetween('waktu_kerjasama_selesai', [now(), now()->addYear()])->count();
        $totalIa = AgreementArchives::count();

        // Data yang akan dimasukkan ke template
        $data = [
            'total_mitra' => $mitra->count(),
            'active' => $activeMitra,
            'inactive' => $inactiveMitra,
            'mitra_ending_in_six_months' => $mitraEndingInSixMonths,
            'mitra_ending_in_one_year' => $mitraEndingInOneYear,
            'jumlah_ia' => $totalIa,
            // Tambahkan data lain sesuai kebutuhan
        ];
        // dd($data);

        $tableKriteriaMitra = [];
        foreach (KriteriaMitra::all() as $key => $kriteria) {
            $totalIa = 0;
            $mitraByKriteria = Mitra::where('kriteria_mitra', $kriteria->kriteria_mitra)->count();
            $mitraByKriteriaCollection = Mitra::where('kriteria_mitra', $kriteria->kriteria_mitra)->get();

            $tableKriteriaMitra[] = [
                'no_kriteria_mitra' => $key + 1,
                'kriteria_mitra' => $kriteria->kriteria_mitra,
                'jumlah' => $mitraByKriteria,
                'total_ia' => $mitraByKriteriaCollection->count(),
            ];
        }

        $mitraNasional = Mitra::where('asal_mitra', 'Nasional')->count();
        $mitraInternasional = Mitra::where('asal_mitra', 'Internasional')->count();
        $tableAsalMitra = [
            ['no_asal_mitra' => 1, 'asal_mitra' => 'Nasional', 'jumlah' => $mitraNasional],
            ['no_asal_mitra' => 2, 'asal_mitra' => 'Internasional', 'jumlah' => $mitraInternasional],
        ];

        $tableStatusAktif = [
            ['no_status_mitra' => 1, 'status' => 'Aktif', 'jumlah' => $activeMitra],
            ['no_status_mitra' => 2, 'status' => 'Inaktif', 'jumlah' => $inactiveMitra],
        ];

        $tableByYearMitra = [];
        $seriesYears = Mitra::select(DB::raw('YEAR(waktu_kerjasama_mulai) as year'), DB::raw('count(*) as total'))
            ->groupBy('year')
            ->get();
        foreach ($seriesYears as $key => $dataYear) {
            $tableByYearMitra[] = [
                'no_tahun_mitra' => $key + 1,
                'tahun_mitra' => $dataYear->year,
                'jumlah' => $dataYear->total,
            ];
        }

        $tableIaByPks = [];
        foreach (KriteriaMitra::all() as $key => $kriteria) {
            $totalIa = 0;
            $mitraByKriteriaCollection = Mitra::where('kriteria_mitra', $kriteria->kriteria_mitra)->get();
            foreach ($mitraByKriteriaCollection as $ia) {
                $totalIa += $ia->agreementArchives()->count();
            }

            $tableIaByPks[] = [
                'no_ia_by_pks' => $key + 1,
                'kriteria_mitra' => $kriteria->kriteria_mitra,
                'total_ia' => $totalIa,
            ];
        }
        
        $generated = $this->generateFromTemplate(
            $templatePath,
            $storagePath,
            $data,
            $tableKriteriaMitra,
            $tableAsalMitra,
            $tableStatusAktif,
            $tableByYearMitra,
            $tableIaByPks
        );
        
        if ($generated) {
            return 'storage/'.$name;
        }
        
        return response()->json(['error' => 'Gagal generate dokumen'], 500);
    }
}
