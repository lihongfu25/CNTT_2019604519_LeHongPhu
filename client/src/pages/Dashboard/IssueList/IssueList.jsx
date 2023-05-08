import React from "react";
import { useSelector } from "react-redux";
import IssueItem from "./IssueItem";
import "./issue.scss";
const TASK_DONE = "STT06";
const IssueList = () => {
    const issues = useSelector((state) => state.issue);
    return (
        <table className='table table-hover table-task issue__list mb-0'>
            <thead className='sticky-top bg-color-5 py-3'>
                <tr>
                    <th scope='col' className='col-4 text-start ps-3 py-3'>
                        Công việc
                    </th>
                    <th scope='col' className='col-3 text-start py-3'>
                        Phụ trách
                    </th>
                    <th scope='col' className='col-2 text-start py-3'>
                        Mức ưu tiên
                    </th>
                    <th scope='col' className='col-2 text-start py-3'>
                        Trạng thái
                    </th>
                    <th scope='col' className='col-2 text-start py-3'>
                        Đáo hạn
                    </th>
                </tr>
            </thead>
            <tbody className=''>
                {issues
                    .filter((item) => item.statusId !== TASK_DONE)
                    .map((item) => (
                        <IssueItem issue={item} key={item.issueId} />
                    ))}
            </tbody>
        </table>
    );
};

export default IssueList;
