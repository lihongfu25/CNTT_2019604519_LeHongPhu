<?php

namespace App\Http\Controllers;

use App\Models\Issue;
use App\Models\Notification;
use App\Models\ProjectUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
        $notifications = Notification::with('user', 'issue')->whereIn('issueId', $issueIds)
                        ->where('isSeen', false)->orWhereDate('created_at', '=', date('Y-m-d'))
                        ->orWhereDate('updated_at', '=', date('Y-m-d'))
                        ->orderBy('notifications.created_at', 'desc')->get();
        
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
    public function update(Request $request, $notificationId)
    {
        $notification = Notification::find($notificationId);

        if (!$notification)
        {
            return response()->json(['Không tìm thấy thông báo'], 409);
        }

        DB::table('notifications')->where('id', $notificationId)
        ->update(['isSeen' => true, 'updated_at' => now()]);

        return response()->json([], 204);
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
