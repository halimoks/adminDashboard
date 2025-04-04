<?php

namespace Database\Factories;

use App\Models\DetailsFacture;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Revenue>
 */
class RevenueFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'object' => $this->faker->words(3, true),
            'prix' => $this->faker->numberBetween(100, 10000),
            'details_factures_id' => DetailsFacture::inRandomOrder()->first()->id ?? DetailsFacture::factory(),
        ];
    }
}
