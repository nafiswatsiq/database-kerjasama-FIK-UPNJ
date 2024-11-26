<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Mitra extends Model
{
    use HasFactory;

    protected $fillable = [
        'nama_instansi',
        'deskripsi_instansi',
        'no_pks_pihak_1',
        'no_pks_pihak_2',
        'pihak_1',
        'pihak_2',
        'kriteria_mitra',
        'asal_mitra',
        'ruang_lingkup_kerjasama',
        'waktu_kerjasama_mulai',
        'waktu_kerjasama_selesai',
        'dokumen_pks',
    ];

    public function agreementArchives(): HasMany
    {
        return $this->hasMany(AgreementArchives::class);
    }
}
