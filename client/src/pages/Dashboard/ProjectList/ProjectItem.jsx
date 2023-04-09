import moment from "moment";
import React from "react";
import ProjectUser from "./ProjectUser";

const dueDate = {
    TODAY: 0,
    URGENT: 3,
    NEAR_DUE: 7,
};
const ProjectItem = ({ data }) => {
    return (
        <div className='project__list__item col-3 h-100 bg-color-5 rounded-10'>
            <div className='d-flex flex-column align-items-start p-3 h-100'>
                <div className='project__list__item__heading'>
                    <p className='fs-5 color-1 mb-2'>
                        {data.name + " - " + data.shortName}
                    </p>
                </div>
                <div className='project__list__item__desc flex-grow-1'>
                    <p className='fs-7 color-1 mb-2'>{data.description}</p>
                </div>
                <div className='project__list__item__progress w-100 mb-3'>
                    <div className='text-end'>
                        <p className='fs-7 mb-1'>
                            {Math.floor(
                                (data.doneIssue / data.totalIssue) * 100,
                            ) + "%"}
                        </p>
                    </div>
                    <div className='project__list__item__progress__progress-bar project__list__item__progress__base position-relative'>
                        <div
                            className='project__list__item__progress__progress-bar project__list__item__progress__active position-absolute top-0 bottom-0 start-0'
                            style={{
                                width: `${Math.floor(
                                    (data.doneIssue / data.totalIssue) * 100,
                                )}%`,
                            }}
                        ></div>
                    </div>
                </div>
                <div className='project__list__item__other d-flex align-items-center w-100'>
                    {data.dueDate && (
                        <div className='flex-grow-1 text-start'>
                            <span
                                className={
                                    moment(data.dueDate).diff(
                                        moment(),
                                        "days",
                                    ) <= dueDate.URGENT
                                        ? "due-date-1"
                                        : moment(data.dueDate).diff(
                                              moment(),
                                              "days",
                                          ) <= dueDate.NEAR_DUE
                                        ? "due-date-2"
                                        : "due-date-3"
                                }
                            >
                                {moment(data.dueDate).diff(moment(), "days") ===
                                dueDate.TODAY
                                    ? "TODAY"
                                    : moment(data.dueDate).format("MMM D")}
                            </span>
                        </div>
                    )}
                    <div className='flex-grow-1 project__list__item__user'>
                        <ProjectUser data={data.users} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(ProjectItem);
