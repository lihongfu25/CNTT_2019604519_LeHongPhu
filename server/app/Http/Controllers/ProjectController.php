<?php

namespace App\Http\Controllers;

use App\Models\Issue;
use App\Models\Status;
use App\Models\Project;
use App\Models\ProjectUser;
use App\Models\ProjectStatus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $userId = request()->userId;
        $projectIds = ProjectUser::where('userId', $userId)->get()->pluck('projectId')->toArray();
        $projects = Project::with('users.user')->whereIn('projectId', $projectIds)->orderBy('created_at', 'desc')->get();
        foreach ($projects as $key => $value) {
            $totalIssue = Issue::where('projectId', $value->projectId)->count();
            $doneStatus = Status::where('name', 'DONE')->first();
            $doneIssue = Issue::with('status')->where('projectId', $value->projectId)->where('statusId', $doneStatus->statusId)->count();
            $value->doneIssue = $doneIssue;
            $value->totalIssue = $totalIssue;
        }
        return response()->json([
            'data' => $projects
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
        $body = $request->all();
        $project = Project::where('name', $body['name'])->first();
        if ($project)
        {
            return response()->json([
                'message' => 'Dự án đã tồn tại!'
            ],  409);
        }

        try {
            DB::beginTransaction();
            $project = Project::create($body);
            $projectUser['projectId'] = $project->projectId;
            $projectStatus['projectId'] = $project->projectId;
            if ($request->has('statuses')) {
                $statuses = $request->statuses;
                foreach ($statuses as $key => $value) {
                    $projectStatus['statusId'] = $value;
                    ProjectStatus::where('projectId', $request->projectId)->where('statusId', $value)->delete();
                    ProjectStatus::create($projectStatus);
                }
            }
            if ($request->has('users')) {
                $users = $request->users;
                foreach ($users as $key => $value) {
                    $projectUser['userId'] = $value;
                    ProjectUser::where('projectId', $request->projectId)->where('userId', $value)->delete();
                    ProjectUser::create($projectUser);
                }
            }
            DB::commit();
            return response()->json([], 204);
        } catch (\Exception $e){
            DB::rollBack();

            return response()->json([
                'message' => 'Có lỗi trong quá trình tạo dự án!',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function show($projectId)
    {
        $project = Project::with('issues.assignee', 'issues.status', 'users.user')->where('projectId', $projectId)->first();

        if (!$project) {
            return response()->json([
                'message' => "Không tìm thấy dự án!",
            ], 404);
        }

        return response()->json([
            'data' => $project
        ], 200);
    }

    public function getUsers($projectId)
    {
        $project = Project::with('users.user')->where('projectId', $projectId)->first();
        
        if (!$project) {
            return response()->json([
                'message' => "Không tìm thấy dự án!",
            ], 404);
        }

        return response()->json([
            'data' => $project
        ], 200);
    }

    public function getIssues($projectId)
    {
        $project = Project::with('issues')->where('projectId', $projectId)->first();
        
        if (!$project) {
            return response()->json([
                'message' => "Không tìm thấy dự án!",
            ], 404);
        }

        return response()->json([
            'data' => $project
        ], 200);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $projectId)
    {
        $body = $request->all();
        $project = Project::where('projectId', $projectId)->first();
        if (!$project)
        {
            return response()->json([
                'message' => 'Không tìm thấy dự án!'
            ],  404);
        }
        DB::table('projects')->where('projectId', $projectId)
        ->update($body);
        return response()->json([], 204);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function destroy($projectId)
    {
        $project = Project::where('projectId', $projectId)->first();

        if (!$project)
        {
            return response()->json([
                'message' => 'Không tìm thấy dự án!'
            ],  404);
        }
        Project::where('projectId', $projectId)->delete();
        return response()->json([], 204);
    }
}
