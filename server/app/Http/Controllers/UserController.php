<?php

namespace App\Http\Controllers;

use App\Models\User;
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
        $keyword = request()->keyword;
        $userFilterKeyword = User::where('fullName', 'LIKE', "%" . $keyword . "%")
                    ->orWhere('email', 'LIKE', "%" . $keyword . "%")
                    ->orWhere('username', 'LIKE', "%" . $keyword . "%")->get()->pluck('userId')->toArray();
        $users = User::whereIn('userId', $userFilterKeyword)->paginate(10);

        return response()->json([
            'data' => $users,
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

    public function getProjects($userId)
    {
        $user = User::with('projects')->where('userId', $userId)->first();
        
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
                'message' => 'Không tìm thấy người dùng!'
            ], 404);
        }

        User::where('userId', $userId)->delete();
        return response()->json([], 204);
    }

    public function export(){
        return Excel::download(new UsersExport, 'users.xlsx');
    }
}
