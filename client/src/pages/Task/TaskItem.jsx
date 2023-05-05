import React from "react";
import { useDrag } from "react-dnd";
import { BASE_URL } from "../../config/api";
import "./task-item.scss";
import { Priority } from "../../components";
import { ReactSVG } from "react-svg";
import { Link } from "react-router-dom";

const DONE_STATUS = "STT06";
const TaskItem = ({ data, isDrag = true }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "task",
        item: data,
        collect: (monitor) => ({
            isDragging: !monitor.isDragging(),
        }),
    }));
    return (
        <div
            ref={isDrag ? drag : null}
            style={{
                opacity: isDragging ? 1 : 0.5,
                cursor: "pointer",
            }}
            className='mt-1'
        >
            <Link to={`/task/${data.issueId}`} className='text-decoration-none'>
                <div className=' bg-color-5 rounded-4 shadow-sm p-2'>
                    <div className='task-item d-flex justify-content-between'>
                        <div className='px-1 d-flex flex-column'>
                            <div className='task-item__id'>
                                <p
                                    className={`mb-0 fs-7 color-10 ${
                                        data.statusId === DONE_STATUS
                                            ? "text-decoration-line-through"
                                            : ""
                                    }`}
                                >
                                    {data.issueId}
                                </p>
                            </div>
                            <div className='task-item__name flex-grow-1 mb-2'>
                                <p className='mb-0 fs-7 color-10'>
                                    {data.name}
                                </p>
                            </div>
                            <div className='task-item__priority d-flex align-items-center'>
                                <ReactSVG
                                    src='/images/icon/check-box.svg'
                                    className='react-svg me-2'
                                />
                                <Priority
                                    level={data.priority}
                                    showText={false}
                                />
                            </div>
                        </div>
                        <div className='px-1'>
                            {data.assignee && (
                                <div className='ratio ratio-30x30 overflow-hidden rounded-circle'>
                                    <img
                                        src={BASE_URL + data.assignee?.photoUrl}
                                        alt=''
                                        className='object-fit-cover'
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default TaskItem;
