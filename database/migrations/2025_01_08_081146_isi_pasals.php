<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('isi_pasals', function (Blueprint $table) {
            $table->id(); // Auto-increment id
            $table->integer('id_pasal');
            $table->string('isi_pasal');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('isi_pasals');
    }
};
