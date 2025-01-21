<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class LogKegiatan extends Model
{
    use HasFactory;

    protected $fillable = [
        'mitra_id',
        'agreement_archives_id',
        'nama_kegiatan',
        'tanggal_kegiatan',
        'dokumentasi',
        'laporan',
    ];

    public function mitra()
    {
        return $this->belongsTo(Mitra::class);
    }

    public function agreementArchive()
    {
        return $this->belongsTo(AgreementArchives::class);
    }
}