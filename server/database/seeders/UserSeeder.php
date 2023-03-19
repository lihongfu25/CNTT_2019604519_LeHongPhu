<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert(
            [
                [
                    'userId' => 'b5145732-c572-11ed-a7fb-00e04c2ca3a6',
                    'fullName' => 'Lê Hồng Phú',
                    'email' => 'phulh@vmms.com.vn',
                    'password' => bcrypt('phu123456')
                ]
            ]
        );
    }
}
