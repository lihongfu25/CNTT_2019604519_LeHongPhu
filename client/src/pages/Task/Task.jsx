import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TaskItem from "./TaskItem";

const Task = () => {
    const issues = useSelector((state) => state.issue);
    const projects = useSelector((state) => state.project);
    const [data, setData] = React.useState(null);
    const [filter, setFilter] = React.useState({
        projectId: "",
        priority: "",
    });

    React.useEffect(() => {
        let issueArr = issues.filter((issue) => issue.statusId !== "STT06");
        if (!!filter.projectId) {
            issueArr = issueArr.filter(
                (issue) => issue.projectId === filter.projectId,
            );
        }

        if (!!filter.priority) {
            issueArr = issueArr.filter(
                (issue) => issue.priority.toString() === filter.priority,
            );
        }
        setData(issueArr);
    }, [filter, issues]);
    const handleChangeFilterProject = (e) => {
        setFilter((prev) => ({
            ...prev,
            projectId: e.target.value,
        }));
    };

    const handleChangeFilterPriority = (e) => {
        setFilter((prev) => ({
            ...prev,
            priority: e.target.value,
        }));
    };
    return (
        <div className='task h-100'>
            <div className='project__heading mb-3'>
                <div className='project__heading__title'>
                    <p className='fs-4 fw-2 color-10 mb-2'>Công việc</p>
                </div>
                <div className='project__heading__filter'>
                    <div className='col-6'>
                        <div className='d-flex'>
                            <div className='col-6 me-2'>
                                <div className='d-flex'>
                                    <label
                                        htmlFor='select-project'
                                        className='col-form-label fs-7 me-2'
                                    >
                                        Dự án:
                                    </label>
                                    <div className='flex-grow-1'>
                                        <select
                                            className='form-select fs-7'
                                            value={filter.projectId}
                                            onChange={(e) =>
                                                handleChangeFilterProject(e)
                                            }
                                            id='select-project'
                                            name='projectId'
                                        >
                                            <option value=''>Tất cả</option>
                                            {projects.map((project) => (
                                                <option
                                                    value={project.projectId}
                                                    key={project.projectId}
                                                >
                                                    {project.name +
                                                        " - " +
                                                        project.shortName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className='col-4 me-2'>
                                <div className='d-flex'>
                                    <label
                                        htmlFor='select-priority'
                                        className='col-form-label fs-7 me-2 text-nowrap'
                                    >
                                        Mức ưu tiên:
                                    </label>
                                    <div className=''>
                                        <select
                                            className='form-select fs-7'
                                            value={filter.priority}
                                            onChange={(e) =>
                                                handleChangeFilterPriority(e)
                                            }
                                            name='priority'
                                        >
                                            <option value=''>All</option>
                                            <option value='1'>Lowest</option>
                                            <option value='2'>Low</option>
                                            <option value='3'>Medium</option>
                                            <option value='4'>High</option>
                                            <option value='5'>Highest</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <DndProvider backend={HTML5Backend}>
                <div className='row g-3'>
                    {data?.map((task) => (
                        <div className='col-3' key={task.issueId}>
                            <Link
                                to={`/task/${task.issueId}`}
                                className='text-decoration-none'
                            >
                                <TaskItem data={task} isDrag={false} />
                            </Link>
                        </div>
                    ))}
                </div>
            </DndProvider>
        </div>
    );
};

export default Task;
