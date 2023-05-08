<div>
    <p style="color: #1a1a1a; max-width: 1000px;">
        Xin chào <span style="font-weight: 600;">
            @if ($issue->reporter->fullName !== null)
                {{ $issue->reporter->fullName }}
            @else
                {{ $issue->reporter->email }}
            @endif
        </span>,
    </p>
    <p style="color: #1a1a1a; max-width: 1000px;">
        <span style="font-weight: 600;">
            @if ($requester->fullName !== null)
                {{ $requester->fullName }}
            @else
                {{ $requester->email }}
            @endif
        </span> vừa cập nhật trạng thái
        <span style="font-weight: 600;">{{ $status->name }}</span> cho
        <span style="font-weight: 600;">{{ $issue->issueId }} - {{ $issue->name }}</span>
    </p>
</div>
