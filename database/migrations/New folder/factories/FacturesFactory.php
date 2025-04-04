<?php

namespace Database\Factories;

use App\Models\Clients;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class FacturesFactory extends Factory
{
    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'dateFacture'=>fake()->date(),
            'totalHT'=>fake()->randomFloat(2,100,99999),
            'totalTTC'=>fake()->randomFloat(2,100,99999),
            'id_Client'=>Clients::pluck('id_Client')->random(),
        ];
    }
}
