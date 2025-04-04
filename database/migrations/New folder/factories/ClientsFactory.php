<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Clients>
 */
class ClientsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'Nom_Cl'=>fake()->firstName(),
            'NomSCo'=>fake()->company(),
            'Tel'=>fake()->phoneNumber(),
            'Email'=>fake()->email(),
            'Adresse'=>fake()->address(),
            'ICE'=>rand(10000000,99999999)
        ];
    }
}
