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
        
        $users = User::all();

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
                'message' => 'Không tìm thấy người dùng!'
            ], 404);
        }

        DB::table('users')->where('userId', $userId)
        ->update($request->all());

        return response()->json([], 204);
    }

    public function update_role(Request $request, $userId)
    {
        $user = User::where('userId', $userId)->first();

        if (!$user)
        {
            return response()->json([
                'message' => 'Không tìm thấy người dùng!'
            ], 404);
        }

        $newUser = DB::table('users')->where('userId', $userId)
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

        if (!$user) {
            return response()->json([
                'message' => 'Không tìm thấy người dùng'
            ], 404);
        }

        if ($user->roleId === 'r0') {
            return response()->json([
                'message' => 'Bạn không có quyền thực hiện thao tác này'
            ], 403);
        }

        User::where('userId', $userId)->delete();
        return response()->json([], 204);
    }

    public function export(){
        return Excel::download(new UsersExport, 'users.xlsx');
    }
}
