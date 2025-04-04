<?php

namespace Database\Factories;

use App\Models\Clients;
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
            'date_Devis'=>fake()->date(),
            'Montant_Total'=>fake()->randomFloat(2,100,10000),
            'id_Client'=>Clients::query()->inRandomOrder()->first()->id_Client,
            

        ];
    }
}
