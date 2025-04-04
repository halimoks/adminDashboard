<?php

namespace Database\Factories;

use App\Models\Factures;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Bon_de_liv>
 */
class Bon_de_livFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'date_bon'=>fake()->date(),
            'facture_id'=>Factures::pluck('id_Facture')->random()
        ];
    }
}
