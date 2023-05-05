<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Issue;
use App\Models\Project;
use App\Models\ProjectUser;
use App\Models\Notification;
use Illuminate\Http\Request;
use App\Exports\UsersExport;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Hash;
use Maatwebsite\Excel\Facades\Excel;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        
        $users = User::where('roleId', '<>', 'r0')->get();

        return response()->json([
            'users' => $users,
        ], 200);
    }
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show($userId)
    {
        $user = User::with('role')->where('userId', $userId)->first();

        if (!$user) {
            return response()->json([
                'message' => "Không tìm thấy người dùng!",
            ], 404);
        }

        return response()->json([
            'data' => $user
        ], 200);
    }

    public function update(Request $request, $userId)
    {
        $user = User::where('userId', $userId)->first();
        if (!$user)
        {
            return response()->json([
                'message' => 'Không tìm thấy người dùng'
            ], 409);
        }
        
        $userUniqueEmail = User::where('email', $request->get('email'))
                            ->where('userId', '<>', $userId)->first();
        if ($userUniqueEmail)
        {
            return response()->json([
                'message' => 'Email này đã được đăng ký'
            ], 409);
        }

        $userUniqueUsername = User::where('userId', '<>', $userId)
                            ->where('username', $request->get('username'))
                            ->where('username', '<>', null)->first();
                            
        if ($userUniqueUsername)
        {
            return response()->json([
                'message' => 'Username đã được sử dụng'
            ], 409);
        }

        try {
            DB::beginTransaction();
            $body = $request->all();
            if ($request->has('gender') && $body['gender'] === 'other') {
                $body['gender'] = null;
            }

            if ($request->hasFile('photoUrl')) {
                $ext = $request->file('photoUrl')->extension();
                $generate_unique_file_name = md5(time()) . '.' . $ext;
                $request->file('photoUrl')->move('images', $generate_unique_file_name, 'local');
                $body['photoUrl'] = 'images/' . $generate_unique_file_name;
            }
            DB::table('users')->where('userId', $userId)
            ->update($body);
            DB::commit();
            $userNew = User::where('userId', $userId)->first();
            return response()->json([
                'user' => $userNew,
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'Có lỗi trong quá trình cập nhật!',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function update_password(Request $request, $userId)
    {
        $user = User::where('userId', $userId)->first();
        if (!$user || !Hash::check($request->get('oldPassword'), $user->password)) {
            return response([
                'message' => 'Mật khẩu cũ không chính xác',
                'user' => $user
            ], 409);
        }
        DB::table('users')->where('userId', $userId)
        ->update(['password' => bcrypt($request->get('newPassword')), 'updated_at' => now()]);
        return response([], 204);
    }

    public function update_role(Request $request, $userId)
    {

        $requester = JWTAuth::user();

        $user = User::where('userId', $userId)->first();
        if (!$user)
        {
            return response()->json([
                'message' => 'Không tìm thấy người dùng'
            ], 404);
        }
        if ($user->roleId === 'r1' && $requester->roleId !== 'r0')
        {
            return response()->json([
                'message' => 'Bạn không có quyền thực hiện thao tác này'
            ], 403);
        }

        DB::table('users')->where('userId', $userId)
        ->update(['roleId' => $request->get('roleId'), 'updated_at' => now()]);

        return response()->json([], 204);
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy($userId)
    {
        $user = User::where('userId', $userId)->first();
        $requester = JWTAuth::user();
        if (!$user) {
            return response()->json([
                'message' => 'Không tìm thấy người dùng'
            ], 404);
        }

        if ($user->roleId === 'r1' && $requester->roleId !== 'r0') {
            return response()->json([
                'message' => 'Bạn không có quyền thực hiện thao tác này'
            ], 403);
        }

        User::where('userId', $userId)->delete();
        return response()->json([], 204);
    }

    public function export()
    {
        return Excel::download(new UsersExport, 'users.xlsx');
    }
}
