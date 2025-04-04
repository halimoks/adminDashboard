<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Bon_de_liv;
use App\Models\Clients;
use App\Models\Designation;
use App\Models\Devis;
use App\Models\Facture_designation;
use App\Models\Factures;
use App\Models\Fournisseur;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create Clients
        Clients::factory(10)->create();
    
        // Create Fournisseurs
        Fournisseur::factory(5)->create();
    
        // Create Designations
        Designation::factory(20)->create();
    
        // Create Factures with foreign key constraints
        Factures::factory(10)->create();
    
        // Create Devis with foreign key constraints
        Devis::factory(10)->create()->each(function ($devis) {
            $devis->id_Client = Clients::inRandomOrder()->first()->id;
            $devis->save();
        });
        
    
        // Create Bon de livraisons with foreign key constraints
        Bon_de_liv::factory(10)->create()->each(function ($bon) {
            $bon->update(['id_Facture' => Factures::inRandomOrder()->first()->id]);
        });
    
        // Create Facture Designations with foreign key constraints
        Facture_designation::factory(30)->create()->each(function ($factureDesignation) {
            $factureDesignation->update([
                'id_Facture' => Factures::inRandomOrder()->first()->id,
                'id_Designation' => Designation::inRandomOrder()->first()->id
            ]);
        });
    }
    

}
