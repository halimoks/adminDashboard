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

        Schema::create('details__devis', function (Blueprint $table) {
            $table->id();
            $table->string('designation');
            $table->integer('prixUnitaire');
            $table->integer('quantity');
            $table->foreignId('facture_id')->constrained('factures')->cascadeOnDelete();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detail__devis');
    }
};
