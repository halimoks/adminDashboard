<?php

namespace Database\Factories;

use App\Models\Article;
use App\Models\Facture;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\DetailsDevis>
 */
class DetailsDevisFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'designation' => $this->faker->sentence(3),
            'prixUnitaire' => $this->faker->randomFloat(2, 10, 1000),
            'quantity' => $this->faker->numberBetween(1, 100),
            'facture_id' => Facture::inRandomOrder()->first()->id ?? Facture::factory(),
            'article_id' => Article::inRandomOrder()->first()->id ?? Article::factory(),
        ];
    }
}
