<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class IsiPasal extends Model
{
    use HasFactory;

    protected $table = 'isi_pasals';

    protected $fillable = [
        'id',
        'id_pasal',
        'isi_pasal',
    ];
}
