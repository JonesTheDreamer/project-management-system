<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $status = ["ONGOING", "FINISHED"];
        $index = array_rand($status);
        $item = $status[$index];
        return [
            "title" => $this->faker->sentence(4),
            "description" => $this->faker->sentence(),
            "status" => $item
        ];
    }
}