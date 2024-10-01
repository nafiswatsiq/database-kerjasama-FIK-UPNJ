<?php

namespace App\Models;

use App\Models\AgreementArchives;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Documentation extends Model
{
    use HasFactory;

    protected $fillable = [
        'agreement_archives_id',
        'path',
    ];

    public function agreementArchive(): BelongsTo
    {
        return $this->belongsTo(AgreementArchives::class);
    }
}
