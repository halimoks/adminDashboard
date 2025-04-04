<?php

namespace Database\Factories;

use App\Models\Client;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class FactureFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'dateFacture'=>$this->faker->date(),
            'object'=>$this->faker->sentence(3),
            'source'=>$this->faker->randomElement(['facture', 'devis']),
            'etatPayement'=>$this->faker->boolean(),
            'client_id'=>Client::inRandomOrder()->first()->id ?? Client::factory()
        ];
    }
}
