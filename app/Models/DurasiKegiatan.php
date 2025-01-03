<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DurasiKegiatan extends Model
{
    use HasFactory;

    protected $table = 'durasi_kegiatans';

    protected $fillable = [
        'id',

        'durasi_kegiatan',
    ];
}
