<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KriteriaMitra extends Model
{
    use HasFactory;

    protected $table = 'kriteria_mitras';

    protected $fillable = [
        'id',
        'kriteria_mitra',
        'peringkat'
    ];
}
