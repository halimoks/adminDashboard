<?php

namespace Database\Factories;

use App\Models\Fournisseur;
use FFI;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Article>
 */
class ArticleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nomProduit' => $this->faker->word,
            'quantity' => $this->faker->numberBetween(1, 100),
            'fournisseur_id' => Fournisseur::inRandomOrder()->first()->id ?? Fournisseur::factory(),
        ];
    }
}
