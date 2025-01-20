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
                'height' => 100,
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
}
