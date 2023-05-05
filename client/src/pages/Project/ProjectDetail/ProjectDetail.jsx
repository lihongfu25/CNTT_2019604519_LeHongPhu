import React from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../../../config/api";
import { Spinner } from "../../../components";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import StatusSection from "./StatusSection";
import "./projectDetail.scss";
import { ReactSVG } from "react-svg";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import PickUser from "./PickUser";
import PickPriority from "./PickPriority";
import notify from "../../../config/toast";
import { Loading } from "../../../screen";
const USER_ROLE = "r2";
const ProjectDetail = () => {
    const { projectId } = useParams();
    const [isLoading, setIsLoading] = React.useState(false);
    const [isFinish, setIsFinish] = React.useState(false);
    const [isEdit, setIsEdit] = React.useState(false);
    const [isCreate, setIsCreate] = React.useState(false);
    const [project, setProject] = React.useState(null);
    const [issues, setIssues] = React.useState(null);
    const [fetchData, setFetchData] = React.useState(Math.random());
    const [userSelected, setUserSelected] = React.useState(null);
    const [priority, setPriority] = React.useState(3);

    const user = useSelector((state) => state.user);

    const {
        register,
        handleSubmit,
        formState: { errors },
        clearErrors,
        setValue,
    } = useForm();

    const {
        register: register2,
        handleSubmit: handleSubmit2,
        formState: { errors: errors2 },
        clearErrors: clearErrors2,
        setValue: setValue2,
    } = useForm();

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
    }, [projectId, fetchData]);

    const handleFinishProject = async () => {
        setIsLoading(true);
        try {
            await axiosClient.get(`project/${projectId}/complete`);
            setFetchData(Math.random());
            setIsFinish(false);
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    };

    const handleOpenCreateTaskModal = () => {
        setIsCreate(true);
        setValue("name", "");
        setValue("description", "");
        setValue("dueDate", "");
    };

    const handleCloseCreateTaskModal = () => {
        setIsCreate(false);
        setUserSelected(null);
        setPriority(3);
        clearErrors();
    };

    const handleOpenEditProjectModal = () => {
        setValue2("name", project.name);
        setValue2("shortName", project.shortName);
        setValue2("dueDate", project.dueDate);
        setValue2("description", project.description);
        setIsEdit(true);
    };

    const onSubmit = async (data) => {
        if (userSelected) {
            data.assigneeId = userSelected.userId;
        }
        data.priority = priority;
        data.projectId = projectId;
        data.reporterId = user.userId;
        setIsLoading(true);
        try {
            await axiosClient.post("issue", data);
            const response = await axiosClient.get(
                `project/${projectId}/issue`,
            );
            setIssues(response.data.data);
            setIsCreate(false);
            notify("success", "Thêm công việc thành công");
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    };

    const onUpdate = async (data) => {
        setIsLoading(true);
        try {
            await axiosClient.put(`project/${projectId}`, data);
            setFetchData(Math.random());
            setIsEdit(false);
            notify("success", "Cập nhật thông tin dự án thành công");
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    };

    return (
        <>
            <div
                className={`project-detail h-100 d-flex flex-column ${
                    !project && "align-items-center justify-content-center"
                }`}
            >
                {!project ? (
                    <Spinner />
                ) : (
                    <div className='flex-grow-1 d-flex flex-column'>
                        <div className='d-flex flex-column'>
                            <div className='d-flex justify-content-between mb-2'>
                                <div>
                                    <p className='fs-4 fw-2 color-10 mb-0'>
                                        {project.name} - {project.shortName}
                                    </p>
                                </div>
                                {user.roleId !== USER_ROLE &&
                                    project.active !== 0 && (
                                        <>
                                            <button
                                                className='border-0 px-2 py-1 bg-transparent rounded-circle'
                                                data-bs-toggle='dropdown'
                                                aria-expanded='false'
                                            >
                                                <ReactSVG
                                                    src='/images/icon/more.svg'
                                                    className='react-svg'
                                                />
                                            </button>
                                            <ul className='dropdown-menu dropdown-menu-end'>
                                                <li>
                                                    <button
                                                        className='dropdown-item d-flex align-items-center'
                                                        onClick={
                                                            handleOpenEditProjectModal
                                                        }
                                                    >
                                                        <ReactSVG
                                                            src='/images/icon/edit.svg'
                                                            className='react-svg'
                                                        />
                                                        <span className='ms-2'>
                                                            Sửa
                                                        </span>
                                                    </button>
                                                </li>
                                                <li>
                                                    <button
                                                        className='dropdown-item d-flex align-items-center'
                                                        onClick={() =>
                                                            setIsFinish(true)
                                                        }
                                                    >
                                                        <ReactSVG
                                                            src='/images/icon/power.svg'
                                                            className='react-svg'
                                                        />
                                                        <span className='ms-2'>
                                                            Kết thúc
                                                        </span>
                                                    </button>
                                                </li>
                                            </ul>
                                        </>
                                    )}
                            </div>
                            {project.active === 1 && (
                                <div className='align-self-end d-flex'>
                                    <button
                                        className='btn--color-1 rounded-4 fs-7 px-3 py-1 me-3 d-flex align-items-center'
                                        onClick={handleOpenCreateTaskModal}
                                    >
                                        <ReactSVG
                                            src='/images/icon/plus.svg'
                                            className='react-svg me-2'
                                        />
                                        <span>Thêm task</span>
                                    </button>
                                </div>
                            )}
                        </div>
                        <hr className='border-dashed' />
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
                                                isActive={project.active === 0}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </DndProvider>
                    </div>
                )}
                {isFinish && (
                    <div className='position-absolute top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center'>
                        <div className='position-absolute top-0 bottom-0 start-0 end-0 bg-dark bg-opacity-25 z-2 appear'></div>
                        <div className='container z-2 fade-in'>
                            <div className='p-4 mx-auto col-5 z-3 shadow-lg rounded-3 bg-color-5'>
                                <div className='text-center mb-2'>
                                    <ReactSVG
                                        src='/images/icon/warning.svg'
                                        className='object-fit-cover'
                                    />
                                </div>
                                <div className='text-center'>
                                    <p className='color-7 fs-4'>
                                        Kết thúc dự án
                                    </p>
                                    <p className='color-3'>
                                        Hành động này không thể hoàn tác! Bạn có
                                        chắc chắn muốn kết thúc dự án{" "}
                                        <strong>{project.name}</strong> này
                                        không?
                                    </p>
                                </div>
                                <div className='text-center'>
                                    <button
                                        className='btn btn--color-1--outline col-3 mx-auto me-3'
                                        onClick={() => setIsFinish(false)}
                                    >
                                        Hủy
                                    </button>
                                    <button
                                        className='btn btn--color-1--outline col-3 mx-auto'
                                        onClick={handleFinishProject}
                                    >
                                        Kết thúc
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {isCreate && (
                    <div className='position-absolute top-0 bottom-0 start-0 end-0 '>
                        <div className='position-absolute top-0 bottom-0 start-0 end-0 bg-dark bg-opacity-50 z-2 appear'></div>
                        <div className='d-flex justify-content-center my-3'>
                            <div className='container fade-in z-2 my-3'>
                                <div className='px-4 py-3 mx-auto col-6 z-3 shadow-lg rounded-3 bg-color-5'>
                                    <form
                                        action=''
                                        onSubmit={handleSubmit(onSubmit)}
                                        className='d-flex flex-column'
                                    >
                                        <div className='modal__heading position-relative'>
                                            <p className='color-1 fs-3 text-center'>
                                                Thêm công việc
                                            </p>
                                            <button
                                                className='position-absolute top-0 end-0 border-0 bg-transparent'
                                                onClick={
                                                    handleCloseCreateTaskModal
                                                }
                                            >
                                                <ReactSVG src='/images/icon/close.svg' />
                                            </button>
                                        </div>
                                        <div className='modal__content'>
                                            <div className='mb-3'>
                                                <label
                                                    htmlFor='name'
                                                    className='form-label fs-7'
                                                >
                                                    Tên công việc:
                                                </label>
                                                <input
                                                    type='text'
                                                    className={`form-control fs-7 ${
                                                        errors.name &&
                                                        "is-invalid"
                                                    }`}
                                                    id='name'
                                                    placeholder='Nhập tên công việc'
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
                                                    htmlFor='description'
                                                    className='form-label fs-7'
                                                >
                                                    Mô tả:
                                                </label>
                                                <textarea
                                                    type='text'
                                                    className={`form-control fs-7`}
                                                    id='description'
                                                    placeholder='Nhập mô tả'
                                                    {...register(
                                                        "description",
                                                        {},
                                                    )}
                                                    rows={4}
                                                />
                                            </div>
                                            <div className='mb-3'>
                                                <label
                                                    htmlFor='dueDate'
                                                    className='form-label fs-7'
                                                >
                                                    Ngày đáo hạn:
                                                </label>
                                                <input
                                                    type='date'
                                                    className={`form-control fs-7`}
                                                    id='dueDate'
                                                    {...register("dueDate", {
                                                        required: true,
                                                    })}
                                                />
                                                {errors.dueDate?.type ===
                                                    "required" && (
                                                    <div className='form-text text-danger'>
                                                        Vui lòng chọn ngày đáo
                                                        hạn
                                                    </div>
                                                )}
                                            </div>
                                            <div className='mb-3'>
                                                <label
                                                    htmlFor='priority'
                                                    className='form-label fs-7'
                                                >
                                                    Mức ưu tiên:
                                                </label>
                                                <PickPriority
                                                    selected={priority}
                                                    onChange={setPriority}
                                                />
                                            </div>
                                            <div className='mb-3'>
                                                <label
                                                    htmlFor='assignee'
                                                    className='form-label fs-7'
                                                >
                                                    Người phụ trách:
                                                </label>
                                                <PickUser
                                                    data={project.users}
                                                    selected={userSelected}
                                                    onChange={setUserSelected}
                                                />
                                            </div>
                                        </div>
                                        <div className='modal__action text-end'>
                                            <button
                                                className='btn btn--color-1--outline px-5'
                                                type='button'
                                                onClick={
                                                    handleCloseCreateTaskModal
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
                {isEdit && (
                    <div className='position-absolute top-0 bottom-0 start-0 end-0 '>
                        <div className='position-absolute top-0 bottom-0 start-0 end-0 bg-dark bg-opacity-50 z-2 appear'></div>
                        <div className='d-flex justify-content-center my-5'>
                            <div className='container fade-in z-2 my-3'>
                                <div className='px-4 py-3 mx-auto col-6 z-3 shadow-lg rounded-3 bg-color-5'>
                                    <form
                                        action=''
                                        onSubmit={handleSubmit2(onUpdate)}
                                        className='d-flex flex-column'
                                    >
                                        <div className='modal__heading position-relative'>
                                            <p className='color-1 fs-3 text-center'>
                                                Cập nhật dự án
                                            </p>
                                            <button
                                                className='position-absolute top-0 end-0 border-0 bg-transparent'
                                                onClick={() => {
                                                    clearErrors2();
                                                    setIsEdit(false);
                                                }}
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
                                                        errors2.name &&
                                                        "is-invalid"
                                                    }`}
                                                    id='name'
                                                    placeholder='Nhập tên dự án...'
                                                    {...register2("name", {
                                                        required: true,
                                                    })}
                                                />
                                                {errors2.name?.type ===
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
                                                        errors2.shortName &&
                                                        "is-invalid"
                                                    }`}
                                                    id='shortName'
                                                    placeholder='Nhập tên rút gọn...'
                                                    {...register2("shortName", {
                                                        required: true,
                                                    })}
                                                />
                                                {errors2.shortName?.type ===
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
                                                    {...register2(
                                                        "dueDate",
                                                        {},
                                                    )}
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
                                                    {...register2(
                                                        "description",
                                                        {},
                                                    )}
                                                    rows={4}
                                                />
                                            </div>
                                        </div>
                                        <div className='modal__action text-end'>
                                            <button
                                                className='btn btn--color-1--outline px-5'
                                                type='button'
                                                onClick={() => {
                                                    clearErrors2();
                                                    setIsEdit(false);
                                                }}
                                            >
                                                Hủy
                                            </button>
                                            <button className='btn btn--color-1 px-5 ms-3'>
                                                Cập nhật
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {isLoading && <Loading />}
        </>
    );
};

export default ProjectDetail;
