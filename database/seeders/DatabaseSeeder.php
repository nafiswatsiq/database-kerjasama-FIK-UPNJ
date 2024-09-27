<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::create([
            'name' => 'Test User',
            'email' => 'admin@gmail.com',
            'jabatan' => 'Tester',
            'nip' => '1234567890',
            'password' => bcrypt('123'),
            'is_admin' => true,
        ]);
    }
}
