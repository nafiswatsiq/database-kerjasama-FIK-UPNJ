<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class laporanIa extends Model
{
    use HasFactory;

    protected $fillable = [
        'agreement_archives_id',
        'tanggal',
        'log_kegiatan_id',
        'nip' ,
        'hasil',
    ];
    protected $casts = [
        'log_kegiatan_id' => 'array'
    ];

    public function agreementArchives()
    {
        return $this->belongsTo(AgreementArchives::class);
    }
}