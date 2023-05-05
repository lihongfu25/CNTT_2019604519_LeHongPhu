import moment from "moment";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { Priority, Spinner } from "../../../components";
import axiosClient, { BASE_URL } from "../../../config/api";
import notify from "../../../config/toast";
import { Loading } from "../../../screen";

import "./task-detail.scss";
import { removeIssue } from "../../../redux/store/issueSlice";
import PickPriority from "../../Project/ProjectDetail/PickPriority";
import PickUser from "../../Project/ProjectDetail/PickUser";

const USER_ROLE = "r2";

const TaskDetail = () => {
    const { issueId } = useParams();
    const user = useSelector((state) => state.user);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isSending, setIsSending] = React.useState(false);
    const [isDelete, setIsDelete] = React.useState(false);
    const [isDeleteComment, setIsDeleteComment] = React.useState(false);
    const [isEdit, setIsEdit] = React.useState(false);
    const [issue, setIssue] = React.useState(null);
    const [commentTarget, setCommentTarget] = React.useState(null);
    const [userSelected, setUserSelected] = React.useState(null);
    const [priority, setPriority] = React.useState(3);
    const [userList, setUserList] = React.useState(null);
    const [fetchData, setFetchData] = React.useState(Math.random());

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        clearErrors,
        setValue,
    } = useForm();

    const {
        register: register2,
        handleSubmit: handleSubmit2,
        setValue: setValue2,
    } = useForm();

    React.useEffect(() => {
        const callApi = async (issueId) => {
            try {
                const response = await axiosClient.get(`issue/${issueId}`);
                console.log(response.data.data);
                setIssue(response.data.data);
            } catch (error) {
                console.log(error);
            }
        };
        callApi(issueId);
    }, [issueId, fetchData]);

    const handleOpenEditTaskModal = async () => {
        try {
            const res = await axiosClient.get(
                `project/${issue.projectId}/user`,
            );
            setUserList(res.data.data);
            setValue("name", issue.name);
            setValue("description", issue.description);
            setValue("dueDate", issue.dueDate);
            setPriority(issue.priority);
            setUserSelected(issue.assignee);
            setIsEdit(true);
        } catch (error) {
            notify("error", error.response.data.message);
        }
    };

    const handleCloseEditTaskModal = () => {
        setIsEdit(false);
        clearErrors();
    };

    const handleDeleteTask = async () => {
        setIsLoading(true);
        try {
            await axiosClient.delete(`issue/${issueId}`);
            dispatch(removeIssue(issueId));
            navigate(-1);
            notify("success", "Xóa công việc thành công");
        } catch (error) {
            notify("error", error.response.data.message);
        }
        setIsLoading(false);
    };
    const handleDeleteComment = async () => {
        setIsLoading(true);
        try {
            await axiosClient.delete(`comment/${commentTarget.id}`);
            setIsDeleteComment(false);
            setFetchData(Math.random());
        } catch (error) {
            notify("error", error.response.data.message);
        }
        setIsLoading(false);
    };

    const submitComment = async (data) => {
        data.issueId = issueId;
        data.userId = user.userId;
        setIsSending(true);
        try {
            await axiosClient.post("comment", data);
            setValue2("content", "");
            setFetchData(Math.random());
            axiosClient.post("notification", {
                issueId,
                userId: user.userId,
                content: "đã thêm một bình luận mới",
            });
        } catch (error) {
            notify("error", error.response.data.message);
        }
        setIsSending(false);
    };
    const onSubmit = async (data) => {
        if (userSelected) {
            data.assigneeId = userSelected.userId;
        }
        data.priority = priority;
        setIsLoading(true);
        try {
            await axiosClient.put(`issue/${issueId}`, data);
            setFetchData(Math.random());
            setIsEdit(false);
            notify("success", "Cập nhật công việc thành công");
        } catch (error) {
            notify("error", error.response.data.message);
        }
        setIsLoading(false);
    };
    return (
        <>
            <div
                className={`task-detail h-100 d-flex flex-column ${
                    !issue && "align-items-center justify-content-center"
                }`}
            >
                {!issue ? (
                    <Spinner />
                ) : (
                    <div className='flex-grow-1 d-flex flex-column'>
                        <div className='d-flex justify-content-between mb-4'>
                            <div className='d-flex align-items-center'>
                                <ReactSVG
                                    src='/images/logo-square.svg'
                                    className='react-svg me-2'
                                />
                                <div>
                                    <p className='fs-7 color-10 mb-0'>
                                        <Link
                                            to={`/project/${issue.projectId}`}
                                            className='hover-text--underline color-10'
                                        >
                                            {issue.project.name}
                                        </Link>{" "}
                                        /{" "}
                                        <span className='color-10'>
                                            {issue.issueId}
                                        </span>
                                    </p>
                                    <p className='fs-5 fw-2 color-10 mb-0'>
                                        {issue.name}
                                    </p>
                                </div>
                            </div>
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
                                        onClick={handleOpenEditTaskModal}
                                    >
                                        <ReactSVG
                                            src='/images/icon/edit.svg'
                                            className='react-svg'
                                        />
                                        <span className='ms-2 mt-1'>Sửa</span>
                                    </button>
                                </li>
                                {user.roleId !== USER_ROLE && (
                                    <li>
                                        <button
                                            className='dropdown-item d-flex align-items-center'
                                            onClick={() => setIsDelete(true)}
                                        >
                                            <ReactSVG
                                                src='/images/icon/trash.svg'
                                                className='react-svg'
                                            />
                                            <span className='ms-2 mt-1'>
                                                Xóa
                                            </span>
                                        </button>
                                    </li>
                                )}
                            </ul>
                        </div>
                        <div className='row gx-4 flex-grow-1'>
                            <div className='col-7'>
                                <div className='task-detail__info mb-4'>
                                    <div className='task-detail__info__heading'>
                                        <p className='color-10 fw-3 mb-1'>
                                            Chi tiết
                                        </p>
                                    </div>
                                    <div className='row g-2'>
                                        <div className='col-2'>
                                            <div>
                                                <p className='fs-7 color-10 mb-0 py-1'>
                                                    Mức ưu tiên:
                                                </p>
                                            </div>
                                        </div>
                                        <div className='col-4'>
                                            <div className='py-1'>
                                                <Priority
                                                    level={issue.priority}
                                                />
                                            </div>
                                        </div>
                                        <div className='col-3'>
                                            <div>
                                                <p className='fs-7 color-10 mb-0 py-1'>
                                                    Trạng thái:
                                                </p>
                                            </div>
                                        </div>
                                        <div className='col-3'>
                                            <div>
                                                <span className='fs-8 color-5 bg-color-1 text-center rounded-2 py-1 px-2'>
                                                    {issue.status.name}
                                                </span>
                                            </div>
                                        </div>
                                        <div className='col-2'>
                                            <div>
                                                <p className='fs-7 color-10 mb-0 py-1'>
                                                    Người giao:
                                                </p>
                                            </div>
                                        </div>
                                        <div className='col-4'>
                                            <div className='d-flex align-items-center'>
                                                <div className='ratio ratio-30x30 rounded-circle overflow-hidden'>
                                                    <img
                                                        src={
                                                            BASE_URL +
                                                            issue.reporter
                                                                .photoUrl
                                                        }
                                                        alt=''
                                                        className='object-fit-cover'
                                                    />
                                                </div>
                                                <div className='ms-2'>
                                                    <p className='fs-7 color-10 mb-0'>
                                                        {
                                                            issue.reporter
                                                                ?.fullName
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-3'>
                                            <div>
                                                <p className='fs-7 color-10 mb-0 py-1'>
                                                    Người được giao:
                                                </p>
                                            </div>
                                        </div>
                                        <div className='col-3'>
                                            {issue.assignee && (
                                                <div className='d-flex align-items-center'>
                                                    <div className='ratio ratio-30x30 rounded-circle overflow-hidden'>
                                                        <img
                                                            src={
                                                                BASE_URL +
                                                                issue.assignee
                                                                    .photoUrl
                                                            }
                                                            alt=''
                                                            className='object-fit-cover'
                                                        />
                                                    </div>
                                                    <div className='ms-2'>
                                                        <p className='fs-7 color-10 mb-0'>
                                                            {
                                                                issue.assignee
                                                                    ?.fullName
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className='col-2'>
                                            <div>
                                                <p className='fs-7 color-10 mb-0 py-1'>
                                                    Ngày tạo:
                                                </p>
                                            </div>
                                        </div>
                                        <div className='col-4'>
                                            <div>
                                                <p className='fs-7 color-10 py-1 mb-0'>
                                                    {issue.created_at
                                                        ? moment(
                                                              issue.created_at,
                                                          ).format(
                                                              "DD/MM/YYYY HH:mm:ss",
                                                          )
                                                        : moment().format(
                                                              "DD/MM/YYYY HH:mm:ss",
                                                          )}
                                                </p>
                                            </div>
                                        </div>
                                        <div className='col-3'>
                                            <div>
                                                <p className='fs-7 color-10 mb-0 py-1'>
                                                    Ngày cập nhật:
                                                </p>
                                            </div>
                                        </div>
                                        <div className='col-3'>
                                            <div>
                                                <p className='fs-7 color-10 py-1 mb-0'>
                                                    {issue.updated_at
                                                        ? moment(
                                                              issue.updated_at,
                                                          ).format(
                                                              "DD/MM/YYYY HH:mm:ss",
                                                          )
                                                        : moment().format(
                                                              "DD/MM/YYYY HH:mm:ss",
                                                          )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='task-detail__desc'>
                                    <div className='task-detail__desc__heading'>
                                        <p className='color-10 fw-3 mb-1'>
                                            Mô tả
                                        </p>
                                    </div>
                                    <div>
                                        {issue.description ? (
                                            <p className='fs-7 color-10 mb-0'>
                                                {issue.description}
                                            </p>
                                        ) : (
                                            <i className='fs-7'>
                                                Không có mô tả
                                            </i>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className='col-5'>
                                <div className='task-detail__comment'>
                                    <div className='task-detail__comment__heading'>
                                        <p className='color-10 fw-3 mb-1'>
                                            Bình luận
                                        </p>
                                    </div>
                                    <div className='task-detail__comment__conversation my-3'>
                                        {issue.comments.length !== 0 &&
                                            issue.comments.map((comment) => (
                                                <div
                                                    className='d-flex my-3'
                                                    key={comment.id}
                                                >
                                                    <div className='ratio ratio-40x40 rounded-circle overflow-hidden'>
                                                        <img
                                                            src={
                                                                BASE_URL +
                                                                comment.user
                                                                    .photoUrl
                                                            }
                                                            alt=''
                                                            className='object-fit-cover'
                                                        />
                                                    </div>
                                                    <div className='flex-grow-1 ms-2'>
                                                        <div className='d-flex align-items-center justify-content-between'>
                                                            <div className=''>
                                                                <p className='fs-7 fw-3 color-10 mb-0'>
                                                                    {comment
                                                                        .user
                                                                        .fullName ||
                                                                        comment
                                                                            .user
                                                                            .email}
                                                                </p>
                                                            </div>
                                                            <div className='d-flex'>
                                                                <img
                                                                    src='/images/icon/clock.svg'
                                                                    alt=''
                                                                    className='me-2'
                                                                />
                                                                <p className='fs-8 color-3 mb-0'>
                                                                    {moment(
                                                                        comment.created_at,
                                                                    ).format(
                                                                        "DD/MMM/YY h:mm A",
                                                                    )}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <p className='fs-7 color-10 mb-0'>
                                                                {comment.content
                                                                    .split(" ")
                                                                    .map(
                                                                        (
                                                                            item,
                                                                        ) => {
                                                                            if (
                                                                                item.includes(
                                                                                    "https://",
                                                                                ) ||
                                                                                item.includes(
                                                                                    "http://",
                                                                                )
                                                                            ) {
                                                                                return (
                                                                                    <a
                                                                                        href={
                                                                                            item
                                                                                        }
                                                                                        className=''
                                                                                    >
                                                                                        {
                                                                                            item
                                                                                        }{" "}
                                                                                    </a>
                                                                                );
                                                                            } else
                                                                                return (
                                                                                    item +
                                                                                    " "
                                                                                );
                                                                        },
                                                                    )}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className='mx-2'>
                                                        <button
                                                            className='border-0 bg-transparent d-flex p-0 mt-1'
                                                            data-bs-toggle='dropdown'
                                                            aria-expanded='false'
                                                        >
                                                            <img
                                                                src='/images/icon/more-sm.svg'
                                                                alt=''
                                                            />
                                                        </button>
                                                        <ul className='dropdown-menu dropdown-menu-end'>
                                                            <li>
                                                                <button
                                                                    className='dropdown-item d-flex align-items-center'
                                                                    onClick={() => {
                                                                        setIsDeleteComment(
                                                                            true,
                                                                        );
                                                                        setCommentTarget(
                                                                            comment,
                                                                        );
                                                                    }}
                                                                >
                                                                    <ReactSVG
                                                                        src='/images/icon/trash.svg'
                                                                        className='react-svg'
                                                                    />
                                                                    <span className='ms-2 fs-7 mt-1'>
                                                                        Xóa
                                                                    </span>
                                                                </button>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                    <div className='task-detail__comment__form shadow-sm'>
                                        <form
                                            action=''
                                            onSubmit={handleSubmit2(
                                                submitComment,
                                            )}
                                        >
                                            <div className='p-2 bg-color-5 d-flex'>
                                                <input
                                                    type='text'
                                                    className='form-control border-0'
                                                    {...register2("content", {
                                                        required: true,
                                                    })}
                                                />
                                                <button
                                                    className={`task-detail__comment__form__btn fs-7 bg-color-1 color-5 border-0 rounded-6 px-4 d-flex align-items-center ${
                                                        isSending
                                                            ? "sending"
                                                            : ""
                                                    }`}
                                                >
                                                    <div className='task-detail__comment__form__btn__icon'>
                                                        <img
                                                            alt=''
                                                            src='/images/icon/send.svg'
                                                        />
                                                    </div>
                                                    <span>Gửi</span>
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {isDelete && (
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
                                        Xóa công việc
                                    </p>
                                    <p className='color-3 fs-7'>
                                        Hành động này không thể hoàn tác! Bạn có
                                        chắc chắn muốn tiếp tục xóa không?
                                    </p>
                                </div>
                                <div className='text-center'>
                                    <button
                                        className='btn btn--color-1--outline col-3 mx-auto me-3 fs-7'
                                        onClick={() => setIsDelete(false)}
                                    >
                                        Hủy
                                    </button>
                                    <button
                                        className='btn btn--color-1--outline col-3 mx-auto fs-7'
                                        onClick={handleDeleteTask}
                                    >
                                        Xóa
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {isEdit && (
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
                                                    handleCloseEditTaskModal
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
                                                    data={userList}
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
                                                    handleCloseEditTaskModal
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
                {isDeleteComment && (
                    <div className='position-absolute top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center'>
                        <div className='position-absolute top-0 bottom-0 start-0 end-0 bg-dark bg-opacity-25 z-2 appear'></div>
                        <div className='container z-2 fade-in'>
                            <div className='p-4 mx-auto col-4 z-3 shadow-lg rounded-3 bg-color-5'>
                                <div className='text-center'>
                                    <p className='color-7 fs-4'>
                                        Xóa bình luận
                                    </p>
                                    <p className='color-3 fs-7'>
                                        Hành động này không thể hoàn tác! Bạn có
                                        chắc chắn muốn tiếp tục xóa không?
                                    </p>
                                </div>
                                <div className='text-center'>
                                    <button
                                        className='btn--color-1--outline rounded-6 py-1 px-4 me-3 fs-7'
                                        onClick={() =>
                                            setIsDeleteComment(false)
                                        }
                                    >
                                        Hủy
                                    </button>
                                    <button
                                        className='btn--color-1--outline rounded-6 py-1 px-4 fs-7'
                                        onClick={handleDeleteComment}
                                    >
                                        Xóa
                                    </button>
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

export default TaskDetail;
