<!DOCTYPE html>
<html>
<head>
    <title>Laravel 9 Import Export Excel & CSV File to Database Example - LaravelTuts.com</title>
</head>
<body>
     
<div class="container">
    <div class="card mt-3 mb-3">
        <div class="card-header text-center">
            <h4>Laravel 9 Import Export Excel & CSV File to Database Example - LaravelTuts.com</h4>
        </div>
        <div class="card-body">
  
            <table class="table table-bordered mt-3">
                <tr>
                    <th colspan="3">
                        List Of Users
                        <a class="btn btn-danger float-end" href="{{ route('users.export') }}">Export User Data</a>
                    </th>
                </tr>
                <tr>
                    <th>ID</th>
                    <th>Họ Tên</th>
                    <th>Email</th>
                    <th>Username</th>
                    <th>Số Điện Thoại</th>
                    <th>Mật Khẩu</th>
                </tr>
                @foreach($users as $user)
                <tr>
                    <td>{{ $user->userId }}</td>
                    <td>{{ $user->fullName }}</td>
                    <td>{{ $user->email }}</td>
                    <td>{{ $user->username }}</td>
                    <td>{{ $user->phoneNumber }}</td>
                    <td>{{ $user->password }}</td>
                </tr>
                @endforeach
            </table>
  
        </div>
    </div>
</div>
     
</body>
</html>