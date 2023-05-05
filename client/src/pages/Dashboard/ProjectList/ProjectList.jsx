import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { EffectCards } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { Swiper, SwiperSlide } from "swiper/react";
import ProjectItem from "../../Project/ProjectItem";
import "./projectList.scss";
const ProjectList = () => {
    const projects = useSelector((state) => state.project);

    return (
        <div className='project__list d-flex flex-column align-items-start h-100 position-relative'>
            <Swiper
                effect={"cards"}
                grabCursor={true}
                className='mySwiper'
                modules={[EffectCards]}
            >
                {projects.map((project) => (
                    <SwiperSlide key={project.projectId}>
                        <Link
                            to={`/project/${project.projectId}`}
                            className='text-decoration-none d-block h-100'
                        >
                            <ProjectItem data={project} className={"h-215"} />
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default React.memo(ProjectList);
