import React from "react";
import ProjectItem from "./ProjectItem";

import "./project.scss";
const ProjectList = ({ data }) => {
    return (
        <div className='project__list d-flex flex-column align-items-start h-100'>
            <div className=''>
                <p className='fs-5 color-5 mb-0'>Projects in progress</p>
            </div>
            <div className='w-100 flex-grow-1 p-3'>
                {/* {data.map((item) => (
                  <ProjectItem data={item} key={item.id} />
              ))} */}
                <ProjectItem data={data[0]} />
            </div>
        </div>
    );
};

export default React.memo(ProjectList);
