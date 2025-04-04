<?php

namespace Database\Factories;

use App\Models\Client;
use App\Models\Facture;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BonLivraison>
 */
class BonLivraisonFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'dateBonLivraison' => $this->faker->dateTimeBetween('-1 year', 'now')->format('Y-m-d'),
            'object' => $this->faker->sentence(3),
            'facture_id' => Facture::inRandomOrder()->first()->id ?? Facture::factory(),
        ];
    }
}
