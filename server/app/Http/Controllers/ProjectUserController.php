<?php

namespace App\Http\Controllers;

use App\Models\ProjectUser;
use Illuminate\Http\Request;

class ProjectUserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $projectUser = ProjectUser::with('user', 'project')->get();
        return response()->json([
            'data' => $projectUser
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $body['projectId'] = $request->projectId;
        if ($request->has('users')) {
            $users = $request->users;
            foreach ($users as $key => $value) {
                $body['userId'] = $value;
                ProjectUser::where('projectId', $request->projectId)->where('userId', $value)->delete();
                ProjectUser::create($body);
            }
            return response()->json([], 204);
        }
        return response()->json([
            'message' => 'Yêu cầu của bạn không hợp lệ do thiếu thông tin cần thiết.',
        ], 422);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ProjectUser  $projectUser
     * @return \Illuminate\Http\Response
     */
    public function show(ProjectUser $projectUser)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ProjectUser  $projectUser
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ProjectUser $projectUser)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ProjectUser  $projectUser
     * @return \Illuminate\Http\Response
     */
    public function destroy(ProjectUser $projectUser)
    {
        //
    }
}
