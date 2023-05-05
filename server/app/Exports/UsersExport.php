<?php

namespace App\Exports;

use App\Models\User;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
class UsersExport implements FromCollection, WithHeadings
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return User::select('fullName', 'username', 'email', 'gender', 'dob', 'phoneNumber')
                    ->where('roleId', '<>', 'r0')->get();
    }

    public function headings():array{
        return ["Họ và Tên", "Username", "Email", "Giới tính", "Ngày sinh", "Số điện thoại"];
    }
}
