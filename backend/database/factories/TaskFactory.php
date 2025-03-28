<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
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
            "status" => $item,
            "project_id" => rand(1, 10)
        ];
    }
}