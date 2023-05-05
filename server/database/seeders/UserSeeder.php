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
                    'userId' => 'c9045732-c572-11ed-a7fb-00e04c2ca3a6',
                    'fullName' => 'Admin',
                    'email' => 'admin@vmms.com.vn',
                    'emailVerified' => true,
                    'photoUrl' => 'images/avatar.jpg',
                    'password' => bcrypt('phu123456'),
                    'roleId' => 'r0'
                ],
                [
                    'userId' => 'b5145732-c572-11ed-a7fb-00e04c2ca3a6',
                    'fullName' => 'Lê Hồng Phú',
                    'email' => 'phulh@vmms.com.vn',
                    'emailVerified' => true,
                    'photoUrl' => 'images/avatar.jpg',
                    'password' => bcrypt('phu123456'),
                    'roleId' => 'r1'
                ],
                [
                    'userId' => 'b1245733-c572-11ed-a7fb-00e04c2ca3a6',
                    'fullName' => 'Phú nè',
                    'email' => 'phune@vmms.com.vn',
                    'emailVerified' => false,
                    'photoUrl' => 'images/default.svg',
                    'password' => bcrypt('phu123456'),
                    'roleId' => 'r2'
                ]
            ]
        );
    }
}
