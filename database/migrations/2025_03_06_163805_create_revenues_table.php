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
        Schema::create('revenues', function (Blueprint $table) {
            $table->id();
            $table->string('object');
            $table->float('prix',10,2);
            $table->foreignId('details_factures_id')->constrained()->cascadeOnDelete();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('revenues');
    }
};
