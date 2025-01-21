<?php

namespace App\Services;

use Illuminate\Support\Facades\Log;
use PhpOffice\PhpWord\TemplateProcessor;

class DocumentGenerator
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function generateFromTemplatePks(
        $templatePath,
        $outputPath,
        array $data,
        $logoPath, $pasal = [],
        $tableJenisIa = [],
        $tableTahunIa = [],
        $tableLamaIa = []
    )
    {
        try {
            // Load template
            $templateProcessor = new TemplateProcessor($templatePath);

            $templateProcessor->setImageValue('logo_mitra', [
                'path' => $logoPath,
                'width' => 100,
                'height' => 150,
                'ratio' => false,
            ]);

            // Replace variables in template
            foreach ($data as $key => $value) {
                $templateProcessor->setValue($key, $value);
            }

            if (count($pasal) > 0) {
                $templateProcessor->cloneBlock('block_pasal', count($pasal), true, false, $pasal);
            }

            if (count($tableJenisIa) > 0) {
                $templateProcessor->cloneRowAndSetValues('no_jenis_ia', $tableJenisIa);
            }

            if (count($tableTahunIa) > 0) {
                $templateProcessor->cloneRowAndSetValues('no_tahun_ia', $tableTahunIa);
            }

            if (count($tableLamaIa) > 0) {
                $templateProcessor->cloneRowAndSetValues('no_lama_ia', $tableLamaIa);
            }

            // Save generated document
            $templateProcessor->saveAs($outputPath);

            return true;
        } catch (\Exception $e) {
            Log::error('Error generating document: ' . $e->getMessage());
            return false;
        }
    }

    public function generateFromTemplateIa($templatePath, $outputPath, array $data , $logoMitra){
        try {
            $templateProcessor = new TemplateProcessor($templatePath);
            foreach ($data as $key => $value) {
                $templateProcessor->setValue($key, $value);
            }
            $templateProcessor->setImageValue('logo_mitra', [
                'path' => $logoMitra,
                'width' => 100,
                'height' => 150,
                'ratio' => false,
            ]);

            $templateProcessor->saveAs($outputPath);

            return true;
        } catch (\Exception $e) {
            Log::error('Error generating document: ' . $e->getMessage());
            return false;
        }
    }

    public function generateDraftLapIa($templatePath , $outputPath , array $data)
    {
        try {
            $templateProcessor = new TemplateProcessor($templatePath);
            foreach ($data as $key => $value) {
                $templateProcessor->setValue($key, $value);
            }
            $templateProcessor->saveAs($outputPath);

            return true;
        } catch (\Exception $e) {
            Log::error('Error generating document: ' . $e->getMessage());
            return false;
        }
    }

    public function generateFromTemplateRecapIa($templatePath , $outputPath , array $data , $kegiatans = []){
        try {
            $templateProcessor = new TemplateProcessor($templatePath);
            foreach ($data as $key => $value) {
                $templateProcessor->setValue($key, $value);
            }
            if(count($kegiatans) > 0){
                $replacements = [];
                foreach($kegiatans as $index => $kegiatan) {
                    $pathGambar = public_path('storage/' . $kegiatan['dokumentasi']);
                    $replacements[] = [
                        'nama_kegiatan' => $kegiatan['nama_kegiatan'],
                        'tanggal_kegiatan' => $kegiatan['tanggal_kegiatan'],
                        'dokumentasi' => [
                            'path' => $pathGambar,
                            'width' => 100, // sesuaikan ukuran yang diinginkan
                            'height' => 100,
                            'ratio' => false
                        ]
                    ];
                }
                $templateProcessor->cloneBlock('block_log_kegiatan', count($kegiatans), true, true);
                foreach($replacements as $index => $replacement) {
                    $templateProcessor->setImageValue(
                        'dokumentasi#' . ($index + 1),
                        $replacement['dokumentasi']
                    );
                    $templateProcessor->setValue(
                        'nama_kegiatan#' . ($index + 1),
                        $replacement['nama_kegiatan']
                    );
                    $templateProcessor->setValue(
                        'tanggal_kegiatan#' . ($index + 1),
                        $replacement['tanggal_kegiatan']
                    );
                }
            }
            $templateProcessor->saveAs($outputPath);
            return true;
        } catch (\Exception $e) {
            Log::error('Error generating document: ' . $e->getMessage());
            return false;
        }
    }

    public function draftDocumentPks($logoMitra, $data, $pasal)
    {
        // Path ke template RTF Anda
        // $templatePath = storage_path('templates/template.rtf');
        $templatePath = 'templates/template_pks.docx';

        // Path untuk menyimpan file hasil
        $name = 'generated_draft_pks_' . time() . '.docx';
        $storagePath = storage_path('app/public/' . $name);

        $generated = $this->generateFromTemplatePks(
            $templatePath,
            $storagePath,
            $data,
            $logoMitra,
            $pasal
        );

        if ($generated) {
            return 'storage/'.$name;
        }

        return response()->json(['message' => 'Failed to generate document'], 500);
    }

    public function laporanMitra($logoMitra, $data, $tableJenisIa, $tableTahunIa, $tableLamaIa)
    {
        // Path ke template RTF Anda
        // $templatePath = storage_path('templates/template.rtf');
        $templatePath = 'templates/laporan_mitra.docx';

        // Path untuk menyimpan file hasil
        $name = 'generated_laporan_mitra_' . time() . '.docx';
        $storagePath = storage_path('app/public/' . $name);

        $generated = $this->generateFromTemplatePks(
            $templatePath,
            $storagePath,
            $data,
            $logoMitra,
            $pasal = [],
            $tableJenisIa,
            $tableTahunIa,
            $tableLamaIa
        );

        if ($generated) {
            return 'storage/'.$name;
        }

        return response()->json(['message' => 'Failed to generate document'], 500);
    }

    public function draftDocumentIa($logoMitra , $data ){
        $templatePath = 'templates/template_draft_ia.docx';
        $name = 'generated_draft_ia_' . time() . '.docx';
        $storagePath = storage_path('app/public/' . $name);
        $generated = $this->generateFromTemplateIa($templatePath, $storagePath, $data, $logoMitra);

        if ($generated) {
            return 'storage/'.$name;
        }
        return response()->json(['message' => 'Failed to generate document'], 500);
    }

    public function rekapIa($data, $kegiatans){
        $templatePath = 'templates/recap_ia.docx';
        $name = 'recap_ia.docx';
        $storagePath = storage_path('app/public/' . $name);
        $generated = $this->generateFromTemplateRecapIa($templatePath, $storagePath, $data , $kegiatans);
        if($generated){
            return 'storage/'.$name;
        }
        return response()->json(['message' => 'Failed to generate document'], 500);
    }

    public function draftLapIa($data){
        $templatePath = 'templates/template_lap_ia.docx';
        $name = 'draft_lap_ia.docx';
        $storagePath = storage_path('app/public/' . $name);
        $generated = $this->generateDraftLapIa($templatePath, $storagePath, $data);
        if($generated){
            return 'storage/'.$name;
        }
        return response()->json(['message' => 'Failed to generate document'], 500);
    }

}