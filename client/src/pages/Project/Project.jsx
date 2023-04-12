import React from "react";
import { ReactSVG } from "react-svg";
import { useDispatch, useSelector } from "react-redux";
import ProjectItem from "./ProjectItem";
import "./project.scss";
import { useForm } from "react-hook-form";
import axiosClient from "../../config/api";
import { setUsers } from "../../redux/store/usersSlice";
import SelectStatus from "./SelectStatus";
const Project = () => {
    const [isCreate, setIsCreate] = React.useState(false);
    const [isNext, setIsNext] = React.useState(false);
    const [statusSelecteds, setStatusSelecteds] = React.useState([]);
    const [statuses, setStatuses] = React.useState(null);
    const [userList, setUserList] = React.useState(null);
    const projects = useSelector((state) => state.project);

    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        clearErrors,
        setValue,
    } = useForm();

    const handleOpenCreateProjectModal = () => {
        const getData = async () => {
            setIsCreate(true);
            setValue("name", "");
            setValue("summary", "");
            setValue("dueDate", null);
            setValue("description", "");
            try {
                const res = await Promise.all([
                    axiosClient.get("status"),
                    axiosClient.get("user"),
                ]);
                setStatuses(res[0].data.data);
                setUserList(res[1].data.users);
                dispatch(setUsers(res[1].data.users));
            } catch (error) {
                console.log(error);
            }
        };
        getData();
    };

    const handleCloseCreateProjectModal = () => {
        setIsCreate(false);
        clearErrors();
    };

    const handleOpenSelectStatusAndUserModal = () => {
        setIsCreate(false);
        setIsNext(true);
    };

    const handleCloseSelectStatusAndUserModal = () => {
        setIsNext(false);
        clearErrors();
        setStatusSelecteds([]);
    };

    const handleValidateValue = () => {
        if (statusSelecteds.length === 0) {
            setError("status", {
                type: "required",
                message: "Please select the usage status in your project",
            });
        }
    };

    const handleSelectStatuses = (status) => {
        clearErrors("status");
        setStatusSelecteds((prev) => {
            if (prev.length === 0) return [status];
            else {
                if (
                    prev.map((item) => item.statusId).includes(status.statusId)
                ) {
                    return prev.filter(
                        (item) => item.statusId !== status.statusId,
                    );
                } else return [...prev, status];
            }
        });
    };

    const onSubmitProject = () => {
        handleOpenSelectStatusAndUserModal();
    };
    const onSubmitStatusAndUser = (data) => {
        data.statuses = statusSelecteds;
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
                <div className='position-absolute top-0 bottom-0 start-0 end-0 '>
                    <div className='position-absolute top-0 bottom-0 start-0 end-0 bg-dark bg-opacity-50 z-2 appear'></div>
                    <div className='d-flex justify-content-center my-5'>
                        <div className='container fade-in z-2 my-3'>
                            <div className='px-4 py-3 mx-auto col-6 z-3 shadow-lg rounded-3 bg-light'>
                                <form
                                    action=''
                                    onSubmit={handleSubmit(onSubmitProject)}
                                    className='d-flex flex-column'
                                >
                                    <div className='modal__heading position-relative'>
                                        <p className='color-1 fs-4'>
                                            Create new project
                                        </p>
                                        <button
                                            className='position-absolute top-0 end-0 border-0 bg-transparent'
                                            onClick={
                                                handleCloseCreateProjectModal
                                            }
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
                                            {errors.name?.type ===
                                                "required" && (
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
                                                    errors.summary &&
                                                    "is-invalid"
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
                                        <div className='mb-3'>
                                            <label
                                                htmlFor='description'
                                                className='form-label'
                                            >
                                                Description:
                                            </label>
                                            <textarea
                                                type='text'
                                                className={`form-control`}
                                                id='description'
                                                placeholder='Enter text'
                                                {...register("description", {})}
                                                rows={4}
                                            />
                                        </div>
                                    </div>
                                    <div className='modal__action text-end'>
                                        <button
                                            className='btn btn--color-1--outline px-5'
                                            type='button'
                                            onClick={
                                                handleCloseCreateProjectModal
                                            }
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
                </div>
            )}
            {isNext && (
                <div className='position-absolute top-0 bottom-0 start-0 end-0 '>
                    <div className='position-absolute top-0 bottom-0 start-0 end-0 bg-dark bg-opacity-50 z-2 appear'></div>
                    <div className='d-flex justify-content-center my-5'>
                        <div className='container fade-in z-2 my-3'>
                            <div className='px-4 py-3 mx-auto col-6 z-3 shadow-lg rounded-3 bg-light'>
                                <form
                                    action=''
                                    onSubmit={handleSubmit(
                                        onSubmitStatusAndUser,
                                    )}
                                    className='d-flex flex-column'
                                >
                                    <div className='modal__heading position-relative'>
                                        <p className='color-1 fs-4'>
                                            Choose status and user
                                        </p>
                                        <button
                                            className='position-absolute top-0 end-0 border-0 bg-transparent'
                                            onClick={
                                                handleCloseSelectStatusAndUserModal
                                            }
                                        >
                                            <ReactSVG src='/images/icon/close.svg' />
                                        </button>
                                    </div>
                                    <div className='modal__content'>
                                        <div className='mb-3'>
                                            <label
                                                htmlFor='dueDate'
                                                className='form-label'
                                            >
                                                Choose status:
                                            </label>
                                            <SelectStatus
                                                data={statuses}
                                                selected={statusSelecteds}
                                                onChange={handleSelectStatuses}
                                                error={errors?.status}
                                                errorMessage={
                                                    errors.status?.message
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className='modal__action text-end'>
                                        <button
                                            className='btn btn--color-1--outline px-5'
                                            type='button'
                                            onClick={
                                                handleCloseSelectStatusAndUserModal
                                            }
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            className='btn btn--color-1 px-5 ms-3'
                                            onClick={handleValidateValue}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default React.memo(Project);
