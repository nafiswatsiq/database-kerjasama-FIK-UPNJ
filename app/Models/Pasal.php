<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Pasal extends Model
{
    use HasFactory;

    protected $table = 'pasals';

    protected $fillable = [
        'mitra_id',
        'judul_pasal',
    ];

    public function isiPasal(): HasMany
    {
        return $this->hasMany(IsiPasal::class);
    }
}
