<?php

namespace App\Models;

use App\Models\Documentation;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class AgreementArchives extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama_instansi',
        'deskripsi_kerjasama',
        'bidang_kerjasama',
        'kriteria_mitra',
        'asal_mitra',
        'durasi_kerjasama',
        'waktu_kerjasama_mulai',
        'waktu_kerjasama_selesai',
        'dokumen_kerjasama',
    ];

    public function documentations(): HasMany
    {
        return $this->hasMany(Documentation::class);
    }
}
