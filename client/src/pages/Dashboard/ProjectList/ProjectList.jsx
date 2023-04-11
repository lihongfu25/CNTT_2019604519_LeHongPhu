import React from "react";
import { useSelector } from "react-redux";
const ProjectList = () => {
    const [currentSlide, setCurrentSlide] = React.useState(0);
    const projects = useSelector((state) => state.project);
    const handleNextSlide = () => {
        setCurrentSlide((prevSlide) => {
            if (prevSlide === projects.length - 1) {
                return 0;
            } else return prevSlide + 1;
        });
    };
    console.log(currentSlide);
    return (
        <div className='project__list d-flex flex-column align-items-start h-100 position-relative'>
            {/* <div className='d-flex flex-grow-1 p-3'>
                <ProjectItem
                    data={projects[currentSlide]}
                    key={projects[currentSlide].id}
                    className='active'
                />

                <ProjectItem
                    data={
                        projects[
                            currentSlide < projects.length - 1
                                ? currentSlide + 1
                                : 0
                        ]
                    }
                    key={
                        projects[
                            currentSlide < projects.length - 1
                                ? currentSlide + 1
                                : 0
                        ].id
                    }
                    className='next'
                />

                <div
                    className='project__list__btn__next bg-color-5 ratio ratio-40x40 d-flex align-items-center justify-content-center rounded-circle'
                    onClick={handleNextSlide}
                >
                    n
                </div>
            </div> */}
        </div>
    );
};

export default React.memo(ProjectList);
