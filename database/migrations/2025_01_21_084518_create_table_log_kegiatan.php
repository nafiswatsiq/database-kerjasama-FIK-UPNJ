<?php

use App\Models\AgreementArchives;
use App\Models\Mitra;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('log_kegiatans', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Mitra::class)->constrained()->cascadeOnDelete();
            $table->foreignIdFor(AgreementArchives::class)->constrained()->cascadeOnDelete();
            $table->string('nama_kegiatan');
            $table->date('tanggal_kegiatan');
            $table->string('dokumentasi');
            $table->string('laporan')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('log_kegiatans');
    }
};