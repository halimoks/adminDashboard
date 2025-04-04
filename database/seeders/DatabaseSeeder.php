<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\{
    DetailsBonLivraison,
    DetailsDevis,
    DetailsFacture,
    DetailsRecu,
    Devis,
    Facture,
    Fournisseur,
    Recu,
    Revenue,
    Article,
    BonLivraison,
    Client,
    Depense
};

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        Client::factory()->count(6)->create();
        Fournisseur::factory()->count(2)->create();
        Article::factory()->count(6)->create();

        Devis::factory()->count(12)->create()->each(function () {
            $facture = Facture::factory()->create(['source' => 'devis','etatPayement'=>0]);
            DetailsDevis::factory()->count(4)->create(['facture_id' => $facture->id]);
        });

        // Create Factures and corresponding Devis
        $factures = Facture::factory()->count(6)->create()->each(function ($facture) {
            DetailsFacture::factory()->count(3)->create(['facture_id' => $facture->id]);
        });

        // Create BonLivraison and link with Factures
        $bonLivraisons = BonLivraison::factory()->count(2)->create([
            'facture_id' => function () use ($factures) {
                return $factures->random()->id;
            }
        ]);

        foreach ($bonLivraisons as $bonLivraison) {
            DetailsBonLivraison::factory()->count(4)->create([
                'facture_id' => $bonLivraison->id,
            ]);
        }

        // Create Recus and Revenues
        foreach ($factures as $facture) {
            DetailsRecu::factory()->count(3)->create(['facture_id' => $facture->id]);
            Revenue::factory()->count(2)->create([
                'details_factures_id' => DetailsFacture::where('facture_id', $facture->id)->inRandomOrder()->first()->id
            ]);
        }

        Recu::factory()->count(4)->create();
        Depense::factory()->count(10)->create();
    }
}
