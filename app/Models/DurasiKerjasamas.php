<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DurasiKerjasamas extends Model
{
    use HasFactory;

    protected $table = 'durasi_kerjasamas';

    protected $fillable = [
        'durasi_kerjasama',
    ];
}
