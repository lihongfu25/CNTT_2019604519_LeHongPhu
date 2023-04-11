<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use App\Models\Issue;
use App\Models\ProjectUser;
use Illuminate\Http\Request;

class NotificationController extends Controller
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
        $issueIds = Issue::whereIn('projectId', $projectIds)->get()->pluck('issueId')->toArray();
        $notifications = Notification::with('user', 'issue')->whereIn('issueId', $issueIds)->orderBy('notifications.created_at', 'desc')->limit(1)->get();
        
        return response()->json([
            'data' => $notifications
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
        Notification::create($body);
        return response()->json([], 204);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Notification  $notification
     * @return \Illuminate\Http\Response
     */
    public function show(Notification $notification)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Notification  $notification
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Notification $notification)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Notification  $notification
     * @return \Illuminate\Http\Response
     */
    public function destroy(Notification $notification)
    {
        //
    }
}
