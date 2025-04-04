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
        Schema::create('details_factures', function (Blueprint $table) {
            $table->id();
            $table->string('designation');
            $table->string('prixUnitaire');
            $table->string('quantity');
            $table->foreignId('facture_id')->constrained('factures')->cascadeOnDelete();
            $table->foreignId('article_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('details_factures');
    }
};
