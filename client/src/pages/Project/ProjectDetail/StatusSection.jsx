import React from "react";
import TaskItem from "../../Task/TaskItem";
import { useDrop } from "react-dnd";
import axiosClient from "../../../config/api";
import notify from "../../../config/toast";

const StatusSection = ({ storage, setStorage, status }) => {
    const [issues, setIssues] = React.useState([]);
    React.useEffect(() => {
        const filterIssues = storage.filter(
            (issue) => issue.statusId === status.statusId,
        );
        setIssues(filterIssues);
    }, [storage, status]);
    const [{ isOver }, drop] = useDrop({
        accept: "task",
        drop: (item) => changeTaskStatus(item),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

    const changeTaskStatus = async (issue) => {
        setStorage((prev) => {
            return prev.map((item) => {
                if (item.issueId === issue.issueId)
                    return { ...item, statusId: status.statusId };
                else return item;
            });
        });
        try {
            notify("success", `${issue.issueId} đã được cập nhật trạng thái`);
            await axiosClient.post(`issue/${issue.issueId}/status`, {
                statusId: status.statusId,
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div
            className={`flex-grow-1 ${
                isOver ? "bg-color-13" : "bg-color-11"
            } p-1`}
            ref={drop}
        >
            <div>
                {issues.map((issue) => (
                    <TaskItem data={issue} key={issue.issueId} />
                ))}
            </div>
        </div>
    );
};

export default StatusSection;
