<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pasal extends Model
{
    use HasFactory;

    protected $table = 'pasals';

    protected $fillable = [
        'id',
        'id_mitra',
        'judul_pasal',
    ];
}
