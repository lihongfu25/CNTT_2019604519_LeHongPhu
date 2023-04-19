import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactSVG } from "react-svg";
import axiosClient, { BASE_URL } from "../../config/api";
import notify from "../../config/toast";
import { setRoles } from "../../redux/store/roleSlice";
import { removeUser, setUsers } from "../../redux/store/usersSlice";
import Loading from "../../screen/Loading";
import { toVietnameseLowerCase } from "../../styles/global";
import "./users.scss";
import { Spinner } from "../../components";
import { useForm } from "react-hook-form";
const User = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [isShow, setIsShow] = React.useState(false);
    const [isDelete, setIsDelete] = React.useState(false);
    const [search, setSearch] = React.useState("");
    const [currentTarget, setCurrentTarget] = React.useState(null);
    const [userList, setUserList] = React.useState([]);
    const [roleList, setRoleList] = React.useState([]);
    const users = useSelector((state) => state.users);
    const roles = useSelector((state) => state.role);
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        clearErrors,
        setValue,
    } = useForm();

    React.useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await Promise.all([
                    axiosClient.get("user"),
                    axiosClient.get("role"),
                ]);
                dispatch(setUsers(response[0].data.users));
                dispatch(setRoles(response[1].data.data));
                setUserList(response[0].data.users);
                setRoleList(response[1].data.data);
            } catch (error) {
                console.log(error);
            }
        };
        if (users.length === 0) getUsers();
        else {
            setUserList(users);
            setRoleList(roles);
        }
    }, [users, dispatch, roles]);

    const handleOpenDeleteForm = (user) => {
        setIsDelete(true);
        setCurrentTarget(user);
    };

    const handleDeleteUser = async () => {
        setIsLoading(true);
        try {
            await axiosClient.delete("user/" + currentTarget.userId);
            notify("success", "Xóa người dùng thành công");
            dispatch(removeUser(currentTarget.userId));
        } catch (error) {
            notify("error", error.response.data.message);
        }
        setIsLoading(false);
        setIsDelete(false);
    };

    const handleOpenInfoForm = async (user) => {
        try {
            await setCurrentTarget(user);
            setIsShow(true);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <div
                className={`users h-100 d-flex flex-column ${
                    userList.length === 0 &&
                    "align-items-center justify-content-center"
                }`}
            >
                {userList.length === 0 ? (
                    <Spinner />
                ) : (
                    <>
                        <div className=''>
                            <p className='fs-4 fw-2 color-10 mb-2'>
                                Người dùng
                            </p>
                        </div>
                        <div className='d-flex flex-column p-4 bg-color-5 h-100'>
                            <div className='d-flex justify-content-between'>
                                <div className='users__search col-3'>
                                    <input
                                        type='text'
                                        name=''
                                        id=''
                                        className='form-control'
                                        placeholder='Tìm kiếm'
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                    />
                                </div>
                                <button className='users__export btn btn--color-1--outline d-flex align-items-center'>
                                    <ReactSVG
                                        src='/images/icon/download.svg'
                                        className='react-svg'
                                    />
                                    <span className='ms-2'>Xuất dữ liệu</span>
                                </button>
                            </div>
                            <hr className='border-dashed' />
                            <div className='flex-grow-1'>
                                <table className='table'>
                                    <thead className='table-light'>
                                        <tr>
                                            <th
                                                scope='col'
                                                className='col-1 text-start p-3'
                                            >
                                                STT
                                            </th>
                                            <th
                                                scope='col'
                                                className='col-4 text-start p-3'
                                            >
                                                Họ và Tên
                                            </th>
                                            <th
                                                scope='col'
                                                className='col-3 text-start py-3'
                                            >
                                                Email
                                            </th>
                                            <th
                                                scope='col'
                                                className='col-2 text-start py-3'
                                            >
                                                Role
                                            </th>
                                            <th
                                                scope='col'
                                                className='col-3 text-center py-3'
                                            ></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {userList
                                            .filter(
                                                (user) =>
                                                    toVietnameseLowerCase(
                                                        user.fullName,
                                                    ).includes(
                                                        toVietnameseLowerCase(
                                                            search,
                                                        ),
                                                    ) ||
                                                    toVietnameseLowerCase(
                                                        user.email,
                                                    ).includes(
                                                        toVietnameseLowerCase(
                                                            search,
                                                        ),
                                                    ),
                                            )
                                            .map((item, i) => (
                                                <tr
                                                    key={i}
                                                    className='align-middle'
                                                >
                                                    <td className='px-4'>
                                                        {i + 1}
                                                    </td>
                                                    <td className='px-3'>
                                                        <div className='d-flex'>
                                                            <div className='ratio ratio-40x40 rounded-circle overflow-hidden'>
                                                                <img
                                                                    src={
                                                                        BASE_URL +
                                                                        item.photoUrl
                                                                    }
                                                                    alt=''
                                                                    className='w-100 object-fit-cover'
                                                                />
                                                            </div>
                                                            <div className='d-flex flex-column align-items-start justify-content-center flex-grow-1 ms-2'>
                                                                <span className='fs-7'>
                                                                    {item.fullName ||
                                                                        item.email}
                                                                </span>
                                                                {item.username && (
                                                                    <span className='fs-8 color-3'>
                                                                        {
                                                                            item.username
                                                                        }
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className=''>
                                                        {item.email}
                                                    </td>
                                                    <td className=''>
                                                        {
                                                            roleList.find(
                                                                (role) =>
                                                                    role.roleId ===
                                                                    item.roleId,
                                                            ).roleName
                                                        }
                                                    </td>
                                                    <td className='text-center'>
                                                        <div className='d-flex justify-content-center'>
                                                            <button
                                                                className='bg-transparent border-0 me-2'
                                                                onClick={() =>
                                                                    handleOpenInfoForm(
                                                                        item,
                                                                    )
                                                                }
                                                            >
                                                                <ReactSVG src='/images/icon/info.svg' />
                                                            </button>
                                                            <button
                                                                className='bg-transparent border-0'
                                                                onClick={() =>
                                                                    handleOpenDeleteForm(
                                                                        item,
                                                                    )
                                                                }
                                                            >
                                                                <ReactSVG src='/images/icon/trash.svg' />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}
            </div>
            {isDelete && (
                <div className='position-absolute top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center'>
                    <div className='position-absolute top-0 bottom-0 start-0 end-0 bg-dark bg-opacity-25 z-2 appear'></div>
                    <div className='container z-2 fade-in'>
                        <div className='p-4 mx-auto col-4 z-3 shadow-lg rounded-3 bg-color-5'>
                            <div className='text-center mb-2'>
                                <ReactSVG
                                    src='/images/icon/warning.svg'
                                    className='object-fit-cover'
                                />
                            </div>
                            <div className='text-center'>
                                <p className='color-7 fs-4'>Xoá người dùng</p>
                                <p className='color-3'>
                                    Bạn sẽ không thể hoàn tác hành động này! Vẫn
                                    tiếp tục xóa?
                                </p>
                            </div>
                            <div className='text-center'>
                                <button
                                    className='btn btn--color-1--outline col-3 mx-auto me-3'
                                    onClick={() => setIsDelete(false)}
                                >
                                    Hủy
                                </button>
                                <button
                                    className='btn btn--color-1--outline col-3 mx-auto'
                                    onClick={handleDeleteUser}
                                >
                                    Xóa
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {isShow && (
                <div className='position-absolute top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center'>
                    <div className='position-absolute top-0 bottom-0 start-0 end-0 bg-dark bg-opacity-25 z-2 appear'></div>
                    <div className='container z-2 fade-in'>
                        <div className='p-4 mx-auto col-8 z-3 shadow-lg rounded-3 bg-color-5 position-relative'>
                            <button
                                className='position-absolute top-0 end-0 border-0 bg-transparent mt-2 me-2 rounded-circle hover-bg-color-12'
                                onClick={() => setIsShow(false)}
                            >
                                <ReactSVG src='/images/icon/close.svg' />
                            </button>
                            <div className='d-flex flex-column align-items-center mb-2 py-3'>
                                <div className='position-relative mb-3'>
                                    <div className='ratio ratio-100x100 rounded-circle overflow-hidden'>
                                        <img
                                            src={
                                                BASE_URL +
                                                currentTarget.photoUrl
                                            }
                                            alt=''
                                        />
                                    </div>
                                    <button className='bg-color-5 border-0 shadow-sm rounded-circle position-absolute top-100 start-50 translate-middle'>
                                        <ReactSVG src='/images/icon/camera.svg' />
                                    </button>
                                </div>
                                <div className='mb-3'>
                                    <p className='fs-4 color-10 mb-0'>
                                        {currentTarget.fullName}
                                    </p>
                                </div>
                                <form className='w-100'>
                                    <div className='mb-3'>
                                        <label
                                            htmlFor='fullName'
                                            className='form-label'
                                        >
                                            Họ và Tên:
                                        </label>
                                        <input
                                            type='text'
                                            className={`form-control ${
                                                errors.fullName && "is-invalid"
                                            }`}
                                            id='fullName'
                                            placeholder='Họ và Tên'
                                            {...register("fullName", {})}
                                        />
                                    </div>
                                    <div className='row mb-3'>
                                        <div className='col'>
                                            <div className=''>
                                                <label
                                                    htmlFor='username'
                                                    className='form-label'
                                                >
                                                    Username:
                                                </label>
                                                <input
                                                    type='text'
                                                    className={`form-control ${
                                                        errors.username &&
                                                        "is-invalid"
                                                    }`}
                                                    id='username'
                                                    placeholder='Username'
                                                    {...register(
                                                        "username",
                                                        {},
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        <div className='col'>
                                            <div className=''>
                                                <label
                                                    htmlFor='email'
                                                    className='form-label'
                                                >
                                                    Email:
                                                </label>
                                                <input
                                                    type='text'
                                                    className={`form-control ${
                                                        errors.email &&
                                                        "is-invalid"
                                                    }`}
                                                    id='email'
                                                    placeholder='email'
                                                    {...register("email", {
                                                        required: true,
                                                        pattern:
                                                            /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
                                                    })}
                                                />
                                                {errors.email?.type ===
                                                    "required" && (
                                                    <div className='form-text text-danger'>
                                                        Vui lòng nhập trường này
                                                    </div>
                                                )}
                                                {errors.email?.type ===
                                                    "pattern" && (
                                                    <div className='form-text text-danger'>
                                                        Vui lòng nhập vào email
                                                        hợp lệ
                                                    </div>
                                                )}
                                                {errors.email?.type ===
                                                    "already-exist" && (
                                                    <div className='form-text text-danger'>
                                                        {errors.email?.message}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row mb-3'>
                                        <div className='col'>
                                            <div className=''>
                                                <label
                                                    htmlFor='dob'
                                                    className='form-label'
                                                >
                                                    Ngày sinh:
                                                </label>
                                                <input
                                                    type='date'
                                                    className={`form-control ${
                                                        errors.dob &&
                                                        "is-invalid"
                                                    }`}
                                                    id='dob'
                                                    placeholder='dob'
                                                    {...register("dob", {})}
                                                />
                                            </div>
                                        </div>
                                        <div className='col'>
                                            <div className=''>
                                                <label
                                                    htmlFor='gender'
                                                    className='form-label'
                                                >
                                                    Giới tính:
                                                </label>
                                                <select
                                                    type='text'
                                                    className={`form-control ${
                                                        errors.gender &&
                                                        "is-invalid"
                                                    }`}
                                                    id='gender'
                                                    placeholder='gender'
                                                    {...register("gender", {})}
                                                >
                                                    <option>ád</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row mb-3'>
                                        <div className='col'>
                                            <div className=''>
                                                <label
                                                    htmlFor='fullName'
                                                    className='form-label'
                                                >
                                                    Họ và Tên:
                                                </label>
                                                <input
                                                    type='text'
                                                    className={`form-control ${
                                                        errors.fullName &&
                                                        "is-invalid"
                                                    }`}
                                                    id='fullName'
                                                    placeholder='Họ và Tên'
                                                    {...register(
                                                        "fullName",
                                                        {},
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        <div className='col'>
                                            <div className=''>
                                                <label
                                                    htmlFor='username'
                                                    className='form-label'
                                                >
                                                    Username:
                                                </label>
                                                <input
                                                    type='text'
                                                    className={`form-control ${
                                                        errors.username &&
                                                        "is-invalid"
                                                    }`}
                                                    id='username'
                                                    placeholder='Username'
                                                    {...register(
                                                        "username",
                                                        {},
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            <div className='text-center'>
                                <button
                                    className='btn btn--color-1 col-3 mx-auto'
                                    onClick={() => setIsShow(false)}
                                >
                                    Lưu
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {isLoading && <Loading />}
        </>
    );
};

export default User;
