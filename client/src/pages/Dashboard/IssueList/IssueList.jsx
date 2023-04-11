import React from "react";
import { useSelector } from "react-redux";
import IssueItem from "./IssueItem";
import "./issue.scss";

const IssueList = () => {
    const issues = useSelector((state) => state.issue);
    return (
        <table className='table table-hover table-task'>
            <thead>
                <tr>
                    <th scope='col' className='col-4 text-start ps-3'>
                        Task
                    </th>
                    <th scope='col' className='col-3 text-start'>
                        Assignee
                    </th>
                    <th scope='col' className='col-2 text-start'>
                        Priority
                    </th>
                    <th scope='col' className='col-2 text-start'>
                        Status
                    </th>
                    <th scope='col' className='col-2 text-start'>
                        Due Date
                    </th>
                </tr>
            </thead>
            <tbody>
                {issues.map((item) => (
                    <IssueItem issue={item} key={item.issueId} />
                ))}
            </tbody>
        </table>
    );
};

export default IssueList;
