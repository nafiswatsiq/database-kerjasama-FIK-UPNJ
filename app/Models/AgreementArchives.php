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
        'mitra_id',
        'nama_instansi',
        'nama_kegiatan',
        'no_ia_pihak_1',
        'no_ia_pihak_2',
        'pihak_1',
        'pihak_2',
        'bidang_kerjasama',
        'durasi_kerjasama',
        'waktu_kerjasama_mulai',
        'waktu_kerjasama_selesai',
        'dokumen_kerjasama',
        'dokumen_laporan'
    ];

    public function documentations(): HasMany
    {
        return $this->hasMany(Documentation::class);
    }
}
