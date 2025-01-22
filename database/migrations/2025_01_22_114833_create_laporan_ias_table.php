<?php

use App\Models\LogKegiatan;
use App\Models\AgreementArchives;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('laporan_ias', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(AgreementArchives::class)->constrained('agreement_archives')->cascadeOnDelete()->cascadeOnUpdate();
            $table->json('log_kegiatan_id');
            $table->date('tanggal');
            $table->string('nip');
            $table->string('hasil');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('laporan_ias');
    }
};