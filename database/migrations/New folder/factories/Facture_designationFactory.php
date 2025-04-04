<?php

namespace Database\Factories;

use App\Models\Designation;
use App\Models\Factures;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Facture_designation>
 */
class Facture_designationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id_Facture'=>Factures::pluck('id_Facture')->random(),
            'id_Designation'=>Designation::pluck('id_Designation')->random(),
            'Qte'=>fake()->randomNumber(),
            'PrixHT'=>fake()->randomFloat(2,100,99999)
        ];
    }
}
