<?php

namespace App\Http\Controllers;

use App\Models\User;
use \Firebase\JWT\JWT;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;

class AuthController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        
        $user = User::where('email', $request->get('email'))->first();
        if (!$user || !Hash::check($request->get('password'),$user->password)) {
            return response([
                'message' => 'Tài khoản hoặc mật khẩu không chính xác!'
            ], 401);
        }
        else
        {
            $token = JWTAuth::fromUser($user);
            return response()->json([
                'token' => $token,
                'user' => $user
            ]);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreUserRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function register(StoreUserRequest $request)
    {
        $body = $request->all();

        $user = User::where('email', $request->get('email'))->first();
        if ($user) {
            return response([
                'message' => 'Email này đã được đăng ký!'
            ], 409);
        }

        $body['password'] = bcrypt($body['password']);
        $user = User::create($body);

        return response()->json([], 204);
    }

    public function verify(Request $request)
    {

        $email = $request->get("email");

        $user = User::where('email', $email)->first();

        if (!$user) {
            return response()->json([
                'message' => "Xác thực tài khoản không thành công!",
            ], 409);
        }

        DB::table('users')->where('email', $email)
        ->update(['emailVerified' => true, 'updated_at' => now()]);

        return response()->json([], 204);
    }

    public function reset(Request $request)
    {
        $email = $request->get("email");
        $user = User::where('email', $email)->first();

        if (!$user) {
            return response()->json([
                'message' => "Có lỗi khi đặt lại mật khẩu!",
            ], 410);
        }

        DB::table('users')->where('email', $email)
        ->update(['password' => bcrypt($request->get('password')), 'updated_at' => now()]);

        return response()->json([], 204);
    }
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        $token = $request->header('Authorization');
        $user = JWTAuth::user();

        return response()->json([
            'data' => $user
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateUserRequest  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        //
    }
}
