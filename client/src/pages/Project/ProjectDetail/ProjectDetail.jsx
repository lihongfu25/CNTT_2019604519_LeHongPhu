import React from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../../../config/api";
import { Spinner } from "../../../components";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import StatusSection from "./StatusSection";

const ProjectDetail = () => {
    const { projectId } = useParams();
    const [project, setProject] = React.useState(null);
    const [issues, setIssues] = React.useState(null);
    React.useEffect(() => {
        const callApi = async (projectId) => {
            try {
                const response = await axiosClient.get(`project/${projectId}`);
                setProject(response.data.data);
                setIssues(response.data.data.issues);
            } catch (error) {
                console.log(error);
            }
        };
        callApi(projectId);
    }, [projectId]);
    return (
        <div
            className={`project-detail h-100 d-flex flex-column ${
                !project && "align-items-center justify-content-center"
            }`}
        >
            {!project ? (
                <Spinner />
            ) : (
                <div className='flex-grow-1 d-flex flex-column'>
                    <div>
                        <p className='fs-4 fw-2 color-10 mb-2'>
                            {project.name} - {project.shortName}
                        </p>
                    </div>
                    <hr />
                    <DndProvider backend={HTML5Backend}>
                        <div className='row gx-2 flex-grow-1'>
                            {project.statuses.map((status) => (
                                <div className='col' key={status.id}>
                                    <div
                                        name={status.statusId}
                                        className='h-100 d-flex flex-column'
                                    >
                                        <div className='mb-1'>
                                            <p className='fs-7 px-2 mb-0'>
                                                {status.status.name}
                                            </p>
                                        </div>
                                        <StatusSection
                                            storage={issues}
                                            setStorage={setIssues}
                                            status={status}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </DndProvider>
                </div>
            )}
        </div>
    );
};

export default ProjectDetail;
