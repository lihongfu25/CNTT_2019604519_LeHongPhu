import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactSVG } from "react-svg";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import axiosClient from "../../config/api";
import notify from "../../config/toast";
import { setProjects } from "../../redux/store/projectSlice";
import { setUsers } from "../../redux/store/usersSlice";
import Loading from "../../screen/Loading";
import ProjectItem from "./ProjectItem";
import SelectStatus from "./SelectStatus";
import SelectUser from "./SelectUser";
import "./project.scss";
import { Link } from "react-router-dom";
const Project = () => {
    const [isCreate, setIsCreate] = React.useState(false);
    const [isNext, setIsNext] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [statusSelecteds, setStatusSelecteds] = React.useState([]);
    const [userSelecteds, setUserSelecteds] = React.useState([]);
    const [statuses, setStatuses] = React.useState(null);
    const [userList, setUserList] = React.useState(null);
    const projects = useSelector((state) => state.project);
    const user = useSelector((state) => state.user);

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
            setValue("shortName", "");
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
        setUserSelecteds([]);
    };

    const handleValidateValue = () => {
        if (statusSelecteds.length === 0) {
            setError("status", {
                type: "required",
                message: "Vui lòng chọn trạng thái sử dụng trong dự án của bạn",
            });
        }
        if (userSelecteds.length === 0) {
            setError("user", {
                type: "required",
                message: "Vui lòng chọn người tham gia vào dự án của bạn",
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

    const handleSelectUser = (user, type) => {
        clearErrors("user");
        if (type === "REMOVE")
            setUserSelecteds((prev) =>
                prev.filter((item) => item.userId !== user.userId),
            );
        else if (type === "ADD") setUserSelecteds((prev) => [...prev, user]);
    };

    const onSubmitProject = () => {
        handleOpenSelectStatusAndUserModal();
    };
    const onSubmitStatusAndUser = (data) => {
        data.statuses = statusSelecteds.map((status) => status.statusId);
        data.users = userSelecteds.map((user) => user.userId);
        const createProject = async () => {
            setIsLoading(true);
            try {
                await axiosClient.post("project", {
                    projectId: uuidv4(),
                    ...data,
                    leaderId: user.userId,
                });
                const fetchData = await axiosClient.get(
                    `project?userId=${user.userId}`,
                );
                dispatch(setProjects(fetchData.data.data));
                notify("success", "Thêm dự án thành công!");
                setIsNext(false);
            } catch (error) {
                notify("error", error.response.data.message);
            }
            setIsLoading(false);
        };
        createProject();
    };

    return (
        <div className='project h-100'>
            <div className='project__heading d-flex justify-content-between mb-3'>
                <div className='project__heading__title'>
                    <p className='fs-4 fw-2 color-10 mb-2'>Dự án</p>
                </div>
                <div className='project__heading__btn'>
                    <button
                        className='btn btn--color-1 px-3 d-flex align-items-center'
                        onClick={handleOpenCreateProjectModal}
                    >
                        <ReactSVG src='/images/icon/add.svg' />
                        <span className='ms-2 fs-7'>Thêm</span>
                    </button>
                </div>
            </div>
            <div className='row g-3'>
                {projects.map((project) => (
                    <div className='col-4' key={project.projectId}>
                        <Link
                            to={`/project/${project.projectId}`}
                            className='text-decoration-none'
                        >
                            <ProjectItem data={project} />
                        </Link>
                    </div>
                ))}
            </div>
            {isCreate && (
                <div className='position-absolute top-0 bottom-0 start-0 end-0 '>
                    <div className='position-absolute top-0 bottom-0 start-0 end-0 bg-dark bg-opacity-50 z-2 appear'></div>
                    <div className='d-flex justify-content-center my-5'>
                        <div className='container fade-in z-2 my-3'>
                            <div className='px-4 py-3 mx-auto col-6 z-3 shadow-lg rounded-3 bg-color-5'>
                                <form
                                    action=''
                                    onSubmit={handleSubmit(onSubmitProject)}
                                    className='d-flex flex-column'
                                >
                                    <div className='modal__heading position-relative'>
                                        <p className='color-1 fs-3 text-center'>
                                            Thêm dự án
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
                                                Tên dự án:
                                            </label>
                                            <input
                                                type='text'
                                                className={`form-control ${
                                                    errors.name && "is-invalid"
                                                }`}
                                                id='name'
                                                placeholder='Nhập tên dự án...'
                                                {...register("name", {
                                                    required: true,
                                                })}
                                            />
                                            {errors.name?.type ===
                                                "required" && (
                                                <div className='form-text text-danger'>
                                                    Vui lòng nhập trường này
                                                </div>
                                            )}
                                        </div>
                                        <div className='mb-3'>
                                            <label
                                                htmlFor='shortName'
                                                className='form-label'
                                            >
                                                Tên rút gọn:
                                            </label>
                                            <input
                                                type='text'
                                                className={`form-control ${
                                                    errors.shortName &&
                                                    "is-invalid"
                                                }`}
                                                id='shortName'
                                                placeholder='Nhập tên rút gọn...'
                                                {...register("shortName", {
                                                    required: true,
                                                })}
                                            />
                                            {errors.shortName?.type ===
                                                "required" && (
                                                <div className='form-text text-danger'>
                                                    Vui lòng nhập trường này
                                                </div>
                                            )}
                                        </div>
                                        <div className='mb-3'>
                                            <label
                                                htmlFor='dueDate'
                                                className='form-label'
                                            >
                                                Ngày đáo hạn:
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
                                                Mô tả:
                                            </label>
                                            <textarea
                                                type='text'
                                                className={`form-control`}
                                                id='description'
                                                placeholder='Nhập nội dung...'
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
                                            Hủy
                                        </button>
                                        <button className='btn btn--color-1 px-5 ms-3'>
                                            Tiếp tục
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
                            <div className='px-4 py-3 mx-auto col-6 z-3 shadow-lg rounded-3 bg-color-5'>
                                <form
                                    action=''
                                    onSubmit={handleSubmit(
                                        onSubmitStatusAndUser,
                                    )}
                                    className='d-flex flex-column'
                                >
                                    <div className='modal__heading text-center position-relative'>
                                        <p className='color-1 fs-3'>
                                            Thêm dự án
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
                                                Trạng thái
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
                                    <div className='modal__content'>
                                        <div className='mb-3'>
                                            <label
                                                htmlFor='dueDate'
                                                className='form-label'
                                            >
                                                Người tham gia
                                            </label>
                                            <SelectUser
                                                data={userList}
                                                selected={userSelecteds}
                                                onChange={handleSelectUser}
                                                error={errors?.user}
                                                errorMessage={
                                                    errors.user?.message
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className='modal__action text-end'>
                                        <button
                                            className='btn btn--color-1--outline px-5'
                                            type='button'
                                            onClick={() => {
                                                setIsNext(false);
                                                setIsCreate(true);
                                            }}
                                        >
                                            Trở lại
                                        </button>
                                        <button
                                            className='btn btn--color-1 px-5 ms-3'
                                            onClick={handleValidateValue}
                                        >
                                            Thêm
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {isLoading && <Loading />}
        </div>
    );
};

export default React.memo(Project);
