<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('roles')->insert(
            [
                [
                    'roleId' => 'r0',
                    'roleName' => 'Quản trị viên',
                    'roleSlug' => 'admin',
                ],
                [
                    'roleId' => 'r1',
                    'roleName' => 'Nhân viên',
                    'roleSlug' => 'user',
                ]
            ]
        );
    }
}
