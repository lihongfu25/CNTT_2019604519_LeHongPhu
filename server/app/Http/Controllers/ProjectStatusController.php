<?php

namespace App\Http\Controllers;

use App\Models\ProjectStatus;
use Illuminate\Http\Request;

class ProjectStatusController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $projectStatus = ProjectStatus::with('status', 'project')->get();
        return response()->json([
            'data' => $projectStatus
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
        if ($request->has('statuses')) {
            $statuses = $request->statuses;
            foreach ($statuses as $key => $value) {
                $body['statusId'] = $value;
                ProjectStatus::where('projectId', $request->projectId)->where('statusId', $value)->delete();
                ProjectStatus::create($body);
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
     * @param  \App\Models\ProjectStatus  $projectStatus
     * @return \Illuminate\Http\Response
     */
    public function show(ProjectStatus $projectStatus)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\ProjectStatus  $projectStatus
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ProjectStatus $projectStatus)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ProjectStatus  $projectStatus
     * @return \Illuminate\Http\Response
     */
    public function destroy(ProjectStatus $projectStatus)
    {
        //
    }
}
