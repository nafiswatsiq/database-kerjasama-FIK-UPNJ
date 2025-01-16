<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Mitra extends Model
{
    use HasFactory;

    protected $table = 'mitras';

    protected $fillable = [
        'nama_mitra',
        'logo',
        'tentang_mitra',
        'bidang_kerjasama',
        'jenis_kerjasama',
        'no_pks_fik',
        'no_pks_mitra',
        'kriteria_mitra',
        'asal_mitra',
        'pic_fik',
        'jabatan_pic_fik',
        'pic_mitra',
        'jabatan_pic_mitra',
        'lokasi',
        'hari_tanggal',
        'waktu_kerjasama_mulai',
        'waktu_kerjasama_selesai',
    ];

    public function agreementArchives(): HasMany
    {
        return $this->hasMany(AgreementArchives::class);
    }

    public function pasal(): HasMany
    {
        return $this->hasMany(Pasal::class);
    }
}
