<?php

namespace App\Http\Controllers;

use App\Models\Issue;
use App\Models\Project;
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
        $keyword = request()->keyword;
        $projects = Project::where('name', 'LIKE', "%" . $keyword . "%")->paginate(12);
        foreach ($projects as $key => $value) {
            $totalIssue = Issue::where('projectId', $value->projectId)->count();
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
        Project::create($body);
        return response()->json([], 204);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function show(Project $project)
    {
        //
    }

    public function getUsers($projectId)
    {
        $project = Project::with('users')->where('projectId', $projectId)->first();
        
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
