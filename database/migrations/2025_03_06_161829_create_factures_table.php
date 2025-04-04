<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('factures', function (Blueprint $table) {
            $table->id();
            $table->date('dateFacture')->default(now());
            $table->string('object');
            $table->boolean('etatPayement');
            $table->enum('source', ['facture', 'devis']);
            $table->foreignId('client_id')->constrained('clients')->cascadeOnDelete();
            $table->softDeletes();
            $table->timestamps();
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('factures');
    }
};
