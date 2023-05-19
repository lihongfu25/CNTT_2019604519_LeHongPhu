<div>
    <p style="color: #1a1a1a; max-width: 1000px;">
        Xin chào <span style="font-weight: 600;">
            @if ($issue->assignee->fullName !== null)
                {{ $issue->assignee->fullName }}
            @else
                {{ $issue->assignee->email }}
            @endif
        </span>,
    </p>
    <p style="color: #1a1a1a; max-width: 1000px;">
        Đừng quên rằng bạn có một công việc cần hoàn thành trong ngày hôm nay.
    </p>
    <p style="color: #1a1a1a; max-width: 1000px;">
        Thông tin công việc:
    </p>
    <ul>
        <li>
            Mã công việc: {{ $issue->issueId }}
        </li>
        <li>
            Tên công việc: {{ $issue->name }}
        </li>
        <li>
            Ngày đáo hạn: {{ $issue->dueDate }}
        </li>
        <li>
            Mô tả: @if ($issue->description !== null)
                {{ $issue->description }}
            @else
                {{ "" }}
            @endif
        </li>
    </ul>

</div>
