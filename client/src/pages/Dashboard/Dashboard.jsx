import React from "react";
import IssueList from "./IssueList/IssueList";
import "./dashboard.scss";
import NotificationList from "./NotificationList/NotificationList";
import ProjectList from "./ProjectList/ProjectList";
const Dashboard = () => {
    React.useEffect(() => {}, []);
    return (
        <div className='dashboard h-100'>
            <div className='d-flex flex-column g-4 h-100'>
                <div className='h-50 mb-4'>
                    <div className='shadow-sm h-100 rounded-10 p-3 bg-color-5'>
                        <IssueList />
                    </div>
                </div>
                <div className='flex-grow-1 mb-3'>
                    <div className='row h-100'>
                        <div className='col-12 col-md-6'>
                            <div className='shadow-sm rounded-10 p-3 h-100 bg-color-5'>
                                <NotificationList />
                            </div>
                        </div>
                        <div className='col-12 col-md-6'>
                            <div className='shadow-sm d-flex flex-column rounded-10 p-3 h-100 bg-color-2'>
                                <div className=''>
                                    <p className='fs-5 color-5 mb-0'>
                                        Projects in progress
                                    </p>
                                </div>
                                <ProjectList />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
