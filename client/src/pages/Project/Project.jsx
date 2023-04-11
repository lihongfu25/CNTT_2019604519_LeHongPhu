import React from "react";
import { useSelector } from "react-redux";
import ProjectItem from "./ProjectItem";
import "./project.scss";
const Project = () => {
    const projects = useSelector((state) => state.project);

    return (
        <div className='project__list row g-3'>
            {projects.map((project) => (
                <div className='col-4' key={project.id}>
                    <ProjectItem data={project} />
                </div>
            ))}
        </div>
    );
};

export default React.memo(Project);
