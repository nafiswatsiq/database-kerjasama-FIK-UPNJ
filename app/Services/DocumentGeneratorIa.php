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

    public function generateFromTemplate($templatePath, $outputPath, array $data)
    {
        try {
            // Load template
            $templateProcessor = new TemplateProcessor($templatePath);
            
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
}
