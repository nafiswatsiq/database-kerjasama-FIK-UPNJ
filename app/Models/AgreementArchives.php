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
        'deskripsi_kegiatan',
        'no_ia',
        'waktu_kerjasama_mulai',
        'waktu_kerjasama_selesai',
        'durasi_kerjasama',
        'tahun_ajaran',
        'tahun_ajaran_1',
        'tahun_ajaran_2',
        'jenis_kegiatan',
        'pihak_1',
        'pihak_2',
        'jabatan_pihak_1',
        'jabatan_pihak_2',
        'bentuk_kegiatan',
        'ringkasan_luaran',
        'draft',
        'dokumen_kerjasama',
        'dokumen_laporan'
    ];

    public function documentations(): HasMany
    {
        return $this->hasMany(Documentation::class);
    }

    public function mitra()
    {
        return $this->belongsTo(Mitra::class);
    }
}