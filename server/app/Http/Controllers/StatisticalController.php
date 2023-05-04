<?php

namespace App\Http\Controllers;

use App\Models\Issue;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StatisticalController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $startDate = $request->get('from');
        $endDate = $request->get('to');
        $issueCreate = Issue::whereRaw("created_at BETWEEN '$startDate' AND '$endDate'")
                        ->where('issues.projectId', $request->projectId)->get();
        $issueDone = DB::table('issues')
                        ->join('notifications', 'notifications.issueId', '=', 'issues.issueId')
                        ->select('issues.*', 'notifications.*')
                        ->whereRaw("notifications.created_at BETWEEN '$startDate' AND '$endDate'")
                        ->where('notifications.content', 'like', '%DONE')
                        ->where('issues.projectId', $request->projectId)
                        ->get();
        $issueProgress = Issue::whereRaw("created_at BETWEEN '$startDate' AND '$endDate'")
                        ->whereRaw("statusId = 'STT02' OR statusId = 'STT03'")
                        ->where('issues.projectId', $request->projectId)
                        ->get();
        $issueReview = Issue::whereRaw("created_at BETWEEN '$startDate' AND '$endDate'")
                        ->whereRaw("statusId = 'STT05'")
                        ->where('issues.projectId', $request->projectId)->get();
        $project = Project::with('statuses.status', 'issues.status')
                        ->where('projectId', $request->projectId)->first();

        $result['issueCreate'] = $issueCreate;
        $result['issueDone'] = $issueDone;
        $result['issueProgress'] = $issueProgress;
        $result['issueReview'] = $issueReview;
        $result['project'] = $project;

        return response()->json([
            'data' => $result
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Issue  $issue
     * @return \Illuminate\Http\Response
     */
    public function show(Issue $issue)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Issue  $issue
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Issue $issue)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Issue  $issue
     * @return \Illuminate\Http\Response
     */
    public function destroy(Issue $issue)
    {
        //
    }
}
