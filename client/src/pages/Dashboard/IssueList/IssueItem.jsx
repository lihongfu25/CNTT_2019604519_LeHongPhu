import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import { Priority } from "../../../components";
import { BASE_URL } from "../../../config/api";
const statues = {
    BACKLOG: "STT01",
    REVIEW_FAILED: "STT04",
    DONE: "STT06",
};
const dueDate = {
    TODAY: 0,
    NEAR: 3,
};

const IssueItem = ({ issue }) => {
    return (
        <tr className='position-relative'>
            <td className='fs-7 align-middle text-start ps-3 color-10'>
                {issue.issueId + " - " + issue.name}
            </td>
            <td className='align-middle'>
                {issue.assignee && (
                    <div className='d-flex'>
                        <div className='ratio ratio-40x40 rounded-circle overflow-hidden'>
                            <img
                                src={BASE_URL + issue.assignee.photoUrl}
                                alt=''
                                className='w-100 object-fit-cover'
                            />
                        </div>
                        <div className='d-flex flex-column align-items-start flex-grow-1 ms-3'>
                            <span className='fs-7'>
                                {issue.assignee.fullName}
                            </span>
                            <span className='fs-8 color-3'>
                                {issue.assignee.email}
                            </span>
                        </div>
                    </div>
                )}
            </td>
            <td className='align-middle text-start'>
                <Priority level={issue.priority} />
            </td>
            <td
                className={`align-middle text-start fs-7 status-${
                    issue.statusId === statues.BACKLOG
                        ? "1"
                        : issue.statusId === statues.REVIEW_FAILED
                        ? "3"
                        : issue.statusId === statues.DONE
                        ? "4"
                        : "2"
                }`}
            >
                {issue.status.name}
            </td>
            <td className='align-middle text-start fs-7'>
                <span
                    className={
                        moment(issue.dueDate).diff(moment(), "days") ===
                        dueDate.TODAY
                            ? "due-date-1"
                            : moment(issue.dueDate).diff(moment(), "days") <=
                              dueDate.NEAR
                            ? "due-date-2"
                            : "due-date-3"
                    }
                >
                    {moment(issue.dueDate).diff(moment(), "days") ===
                    dueDate.TODAY
                        ? "TODAY"
                        : moment(issue.dueDate).format("MMM D")}
                </span>
            </td>
            <Link
                to={`/task/${issue.issueId}`}
                className='stretched-link p-0'
            ></Link>
        </tr>
    );
};

export default React.memo(IssueItem);
