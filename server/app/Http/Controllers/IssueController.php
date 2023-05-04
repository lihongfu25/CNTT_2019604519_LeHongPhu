<?php

namespace App\Http\Controllers;

use App\Models\Issue;
use App\Models\Project;
use App\Models\Comment;
use App\Models\ProjectUser;
use App\Models\Notification;
use App\Models\ProjectStatus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class IssueController extends Controller
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
        $issues = Issue::with('assignee', 'status')->whereIn('projectId', $projectIds)->get();
        
        return response()->json([
            'data' => $issues
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
        $project = Project::where('projectId', $body['projectId'])->first();
        $countByProjectId = Issue::where('projectId', $body['projectId'])->count();
        $projectStatus = ProjectStatus::where('projectId', $body['projectId'])->orderBy("statusId")->first();
        $body['issueId'] = $project->shortName . "-" . ($countByProjectId + 1);
        $body['statusId'] = $projectStatus->statusId;
        Issue::create($body);
        return response()->json([
        ], 204);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Issue  $issue
     * @return \Illuminate\Http\Response
     */
    public function show($issueId)
    {
        $issue = Issue::with('assignee', 'status', 'reporter', 'comments.user', 'project')->where('issueId', $issueId)->first();

        if (!$issue) {
            return response()->json([
                'message' => "Không tìm thấy công việc!",
            ], 404);
        }

        return response()->json([
            'data' => $issue
        ], 200);
    }

    public function getIssueByStatus($statusId)
    {
        $issues = Issue::where('statusId', $statusId)
                        ->where('projectId', request()->projectId)->get();

        return response()->json([
            'data' => $issues
        ], 201);
    }

    public function changeIssueStatus(Request $request, $issueId)
    {
        $issue = Issue::where('issueId', $issueId)->first();

        if (!$issue)
        {
            return response()->json([
                'message' => 'Không tìm thấy công việc'
            ], 409);
        }

        DB::table('issues')->where('issueId', $issueId)
        ->update(['statusId' => $request->get('statusId'), 'updated_at' => now()]);

        return response()->json([], 204);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Issue  $issue
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $issueId)
    {
        $issue = Issue::where('issueId', $issueId)->first();

        if (!$issue)
        {
            return response()->json([
                'message' => 'Không tìm thấy công việc'
            ], 409);
        }
        $body = $request->all();
        DB::table('issues')->where('issueId', $issueId)
        ->update($body);

        return response()->json([], 204);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Issue  $issue
     * @return \Illuminate\Http\Response
     */
    public function destroy($issueId)
    {
        $issue = Issue::where('issueId', $issueId)->first();

        if (!$issue)
        {
            return response()->json([
                'message' => 'Không tìm thấy công việc!'
            ],  404);
        }

        Comment::where('issueId', $issueId)->delete();
        Notification::where('issueId', $issueId)->delete();
        Issue::where('issueId', $issueId)->delete();
        return response()->json([], 204);
    }
}
