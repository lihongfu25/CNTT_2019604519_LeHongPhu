import React from "react";
import { useDrag } from "react-dnd";

const TaskItem = ({ data }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "task",
        item: data,
        collect: (monitor) => ({
            isDragging: !monitor.isDragging(),
        }),
    }));
    return (
        <div
            ref={drag}
            style={{
                opacity: isDragging ? 1 : 0.5,
                cursor: "pointer",
            }}
        >
            <div className='bg-color-5 rounded-4 shadow-sm p-2'>
                <div>
                    <p className='mb-0 fs-7'>{data.issueId}</p>
                </div>
                <div>
                    <p className='mb-0 fs-7'>{data.name}</p>
                </div>
            </div>
        </div>
    );
};

export default TaskItem;
