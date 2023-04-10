import React from "react";

import { useSelector } from "react-redux";
import IssueList from "./IssueList/IssueList";
import "./dashboard.scss";
import NotificationList from "./NotificationList/NotificationList";
import ProjectList from "./ProjectList/ProjectList";
const Dashboard = () => {
    const issues = useSelector((state) => state.issue);
    const projects = useSelector((state) => state.project);
    const notifications = useSelector((state) => state.notification);
    React.useEffect(() => {}, []);
    return (
        <div className='dashboard h-100'>
            <div className='d-flex flex-column g-4 h-100'>
                <div className='h-50'>
                    <div className='shadow-sm h-100 rounded-10 p-3 text-center bg-color-5'>
                        <IssueList data={issues} />
                    </div>
                </div>
                <div className='h-50 mt-4 mb-3 sizing-border'>
                    <div className='row row-cols-1 row-cols-md-2 h-100'>
                        <div className='col'>
                            <div className='shadow-sm h-100 rounded-10 p-3 text-center bg-color-5'>
                                <NotificationList data={notifications} />
                            </div>
                        </div>
                        <div className='col'>
                            <div className='shadow-sm h-100 rounded-10 p-3 text-center bg-color-2'>
                                <ProjectList data={projects} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
