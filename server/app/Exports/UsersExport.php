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
        return User::select('userId', "fullName", 'email', 'username','phoneNumber', 'password')->get();
    }

    public function headings():array{
        return ['Mã Nhân Viên', "Họ Tên", "Email", "Username", "Số Điện Thoại", "Mật Khẩu"];
    }
}
