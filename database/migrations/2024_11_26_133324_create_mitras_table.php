<?php

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
        Schema::create('mitras', function (Blueprint $table) {
            $table->id();
            $table->string('nama_mitra');
            $table->string('logo');
            $table->text('tentang_mitra');
            $table->text('bidang_kerjasama');
            $table->string('jenis_kerjasama');
            $table->string('no_pks_fik');
            $table->string('no_pks_mitra');
            $table->string('kriteria_mitra');
            $table->string('asal_mitra');
            $table->string('pic_fik');
            $table->string('jabatan_pic_fik');
            $table->string('pic_mitra');
            $table->string('jabatan_pic_mitra');
            $table->string('lokasi');
            $table->date('hari_tanggal');
            $table->date('waktu_kerjasama_mulai');
            $table->date('waktu_kerjasama_selesai');
            // $table->string('dokumen_pks')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mitras');
    }
};
