<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class FournisseurFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nomFournisseur'=>$this->faker->firstName,
            'nomSC'=>$this->faker->company,
            'tel'=>$this->faker->phoneNumber,
            'email'=>$this->faker->email,
            'fax'=>$this->faker->phoneNumber,
            'adresse'=>$this->faker->address,
        ];
    }
}
