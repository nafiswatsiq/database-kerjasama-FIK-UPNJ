<?php

namespace App\Services;

use Illuminate\Support\Facades\Log;
use PhpOffice\PhpWord\TemplateProcessor;

class DocumentGeneratorIa
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function generateFromTemplate($templatePath, $outputPath, array $data, $logoMitra = '')
    {
        try {
            // Load template
            $templateProcessor = new TemplateProcessor($templatePath);
            
            if ($logoMitra) {
                $templateProcessor->setImageValue('logo_mitra', [
                    'path' => $logoMitra,
                    'width' => 100,
                    'height' => 100,
                    'ratio' => false,
                ]);
            }
            
            // Replace variables in template
            foreach ($data as $key => $value) {
                $templateProcessor->setValue($key, $value);
            }
            
            // Save generated document
            $templateProcessor->saveAs($outputPath);
            
            return true;
        } catch (\Exception $e) {
            Log::error('Error generating document: ' . $e->getMessage());
            return false;
        }
    }

    public function generateDocument($data)
    {
        // Path ke template RTF Anda
        $templatePath = 'templates/template_laporan_ia.docx';
        
        // Path untuk menyimpan file hasil
        $name = 'generated_laporan_ia_' . time() . '.docx';
        $outputPath = storage_path('app/public/' . $name);
        
        $generated = $this->generateFromTemplate(
            $templatePath,
            $outputPath,
            $data
        );
        
        if ($generated) {
            return 'storage/'.$name;
        }
        
        return response()->json(['error' => 'Gagal generate dokumen'], 500);
    }

    public function generateDocumentDraftIa($data)
    {
        // Path ke template RTF Anda
        $templatePath = 'templates/template_draft_ia.docx';
        
        // Path untuk menyimpan file hasil
        $name = 'generated_draft_ia_' . time() . '.docx';
        $outputPath = storage_path('app/public/' . $name);
        
        $generated = $this->generateFromTemplate(
            $templatePath,
            $outputPath,
            $data,
            $data['logo_mitra']
        );
        
        if ($generated) {
            return 'storage/'.$name;
        }
        
        return response()->json(['error' => 'Gagal generate dokumen'], 500);
    }
}
