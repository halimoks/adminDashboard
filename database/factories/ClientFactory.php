<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class ClientFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nomClient' => $this->faker->firstName,
            'nomSociete' => $this->faker->company,
            'telephone' => $this->faker->phoneNumber,
            'email' => $this->faker->safeEmail,
            'adresse' => $this->faker->address,
            'ICE' => $this->faker->numerify('##########'),
            'IF' => $this->faker->numerify('########'),
        ];
    }
}
