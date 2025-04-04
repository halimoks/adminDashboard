<?php

namespace Database\Factories;

use App\Models\Client;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Devis>
 */
class DevisFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'dateDevis'=>$this->faker->date(),
            'object'=>$this->faker->sentence(3),
            'client_id'=>Client::inRandomOrder()->first()->id ?? Client::factory(),
        ];
    }
}
