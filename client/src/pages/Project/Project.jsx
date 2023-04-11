import React from "react";
import { ReactSVG } from "react-svg";
import { useSelector } from "react-redux";
import ProjectItem from "./ProjectItem";
import "./project.scss";
import { useForm } from "react-hook-form";
const Project = () => {
    const [isCreate, setIsCreate] = React.useState(true);
    const [isConfirm, setIsConfirm] = React.useState(false);
    const projects = useSelector((state) => state.project);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        clearErrors,
    } = useForm();

    const handleOpenCreateProjectModal = () => {
        setIsCreate(true);
    };

    const handleCloseCreateProjectModal = () => {
        setIsCreate(false);
        clearErrors();
    };

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div className='project h-100'>
            <div className='project__heading d-flex justify-content-between mb-3'>
                <div className='project__heading__title'>
                    <p className='fs-3 fw-3 color-10 mb-0'>Projects</p>
                </div>
                <div className='project__heading__btn'>
                    <button
                        className='btn btn--color-1 px-3 d-flex align-items-center'
                        onClick={handleOpenCreateProjectModal}
                    >
                        <ReactSVG src='/images/icon/add.svg' />
                        <span className='ms-2 fs-7'>Create</span>
                    </button>
                </div>
            </div>
            <div className='row g-3'>
                {projects.map((project) => (
                    <div className='col-4' key={project.id}>
                        <ProjectItem data={project} />
                    </div>
                ))}
            </div>
            {isCreate && (
                <div className='position-absolute top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center'>
                    <div className='position-absolute top-0 bottom-0 start-0 end-0 bg-dark bg-opacity-50 z-2'></div>
                    <div className='container fade-in z-2'>
                        <div className='p-4 mx-auto col-6 z-3 shadow-lg rounded-3 bg-light'>
                            <form action='' onSubmit={handleSubmit(onSubmit)}>
                                <div className='modal__heading position-relative'>
                                    <p className='color-1 fs-4'>
                                        Create new project
                                    </p>
                                    <button
                                        className='position-absolute top-0 end-0 border-0 bg-transparent'
                                        onClick={handleCloseCreateProjectModal}
                                    >
                                        <ReactSVG src='/images/icon/close.svg' />
                                    </button>
                                </div>
                                <div className='modal__content'>
                                    <div className='mb-3'>
                                        <label
                                            htmlFor='name'
                                            className='form-label'
                                        >
                                            Name:
                                        </label>
                                        <input
                                            type='text'
                                            className={`form-control ${
                                                errors.name && "is-invalid"
                                            }`}
                                            id='name'
                                            placeholder='Enter project name'
                                            {...register("name", {
                                                required: true,
                                            })}
                                        />
                                        {errors.name?.type === "required" && (
                                            <div className='form-text text-danger'>
                                                This field is required
                                            </div>
                                        )}
                                    </div>
                                    <div className='mb-3'>
                                        <label
                                            htmlFor='summary'
                                            className='form-label'
                                        >
                                            Summary:
                                        </label>
                                        <input
                                            type='text'
                                            className={`form-control ${
                                                errors.summary && "is-invalid"
                                            }`}
                                            id='summary'
                                            placeholder='Enter summary'
                                            {...register("summary", {
                                                required: true,
                                            })}
                                        />
                                        {errors.summary?.type ===
                                            "required" && (
                                            <div className='form-text text-danger'>
                                                This field is required
                                            </div>
                                        )}
                                    </div>
                                    <div className='mb-3'>
                                        <label
                                            htmlFor='description'
                                            className='form-label'
                                        >
                                            Description:
                                        </label>
                                        <input
                                            type='text'
                                            className={`form-control`}
                                            id='description'
                                            placeholder='Enter text'
                                            {...register("description", {})}
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <label
                                            htmlFor='dueDate'
                                            className='form-label'
                                        >
                                            Due date:
                                        </label>
                                        <input
                                            type='date'
                                            className={`form-control`}
                                            id='dueDate'
                                            {...register("dueDate", {})}
                                        />
                                    </div>
                                    <div className='mb-3'></div>
                                </div>

                                <div className='modal__action text-end'>
                                    <button
                                        className='btn btn--color-1--outline px-5'
                                        onClick={handleCloseCreateProjectModal}
                                    >
                                        Cancel
                                    </button>
                                    <button className='btn btn--color-1 px-5 ms-3'>
                                        Create
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default React.memo(Project);
