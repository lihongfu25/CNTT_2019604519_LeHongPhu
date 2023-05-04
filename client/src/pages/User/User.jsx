import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { ReactSVG } from "react-svg";
import { Spinner } from "../../components";
import axiosClient, { BASE_URL } from "../../config/api";
import notify from "../../config/toast";
import { setRoles } from "../../redux/store/roleSlice";
import { userUpdateProfile } from "../../redux/store/userSlice";
import {
    removeUser,
    setUserRole,
    setUsers,
} from "../../redux/store/usersSlice";
import Loading from "../../screen/Loading";
import { toVietnameseLowerCase } from "../../styles/global";
import "./users.scss";
import download from "../../config/download-excel";
const User = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [isShow, setIsShow] = React.useState(false);
    const [isDelete, setIsDelete] = React.useState(false);
    const [isChangePassword, setIsChangePassword] = React.useState(false);
    const [search, setSearch] = React.useState("");
    const [currentTarget, setCurrentTarget] = React.useState(null);
    const [userList, setUserList] = React.useState([]);
    const [roleList, setRoleList] = React.useState([]);
    const [provinces, setProvinces] = React.useState();
    const [districts, setDistricts] = React.useState();
    const [wards, setWards] = React.useState();
    const [image, setImage] = React.useState();
    const [preview, setPreview] = React.useState();
    const [addressSelected, setAddressSelected] = React.useState({
        province: null,
        district: null,
        ward: null,
    });

    const user = useSelector((state) => state.user);
    const users = useSelector((state) => state.users);
    const roles = useSelector((state) => state.role);
    const dispatch = useDispatch();
    const avatarRef = React.useRef();

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
        formState: { errors: errors2 },
        setError: setError2,
        setValue: setValue2,
        clearErrors: clearErrors2,
    } = useForm();

    React.useEffect(() => {
        if (image) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(image);
        } else {
            setPreview(BASE_URL + currentTarget?.photoUrl);
        }
    }, [image, currentTarget]);

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

    React.useEffect(() => {
        if (!provinces) {
            axios
                .get("https://provinces.open-api.vn/api/?depth=1")
                .then((response) => {
                    setProvinces(response.data);
                })
                .catch((error) => console.log(error));
        }
        if (addressSelected.province) {
            axios
                .get(
                    `https://provinces.open-api.vn/api/p/${addressSelected.province}?depth=2`,
                )
                .then((response) => {
                    setDistricts(response.data.districts);
                })
                .catch((error) => console.log(error));
        }
        if (addressSelected.district) {
            axios
                .get(
                    `https://provinces.open-api.vn/api/d/${addressSelected.district}?depth=2`,
                )
                .then((response) => {
                    setWards(response.data.wards);
                })
                .catch((error) => console.log(error));
        }
    }, [addressSelected, provinces]);

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
            setCurrentTarget(user);
            setAddressSelected({
                province: user.provinceCode,
                district: user.districtCode,
                ward: user.wardCode,
            });
            setValue("fullName", user.fullName);
            setValue("username", user.username);
            setValue("email", user.email);
            setValue("dob", user.dob);
            setValue("gender", user.gender || "other");
            setValue("phoneNumber", user.phoneNumber);
            setIsShow(true);
        } catch (error) {
            console.log(error);
        }
    };

    const handleOpenChangePasswordModel = () => {
        setIsShow(false);
        setIsChangePassword(true);
        setValue2("oldPassword", "");
        setValue2("newPassword", "");
        setValue2("confirmPassword", "");
    };

    const handleExportData = async () => {
        try {
            const response = await axiosClient({
                method: "get",
                url: "user/export",
                responseType: "blob",
            });
            download(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChangeRole = async (e) => {
        try {
            await axiosClient.put(`user/${currentTarget.userId}/role`, {
                roleId: e.target.value,
            });
            notify("success", "Thay đổi quyền người dùng thành công");
            dispatch(
                setUserRole({
                    userId: currentTarget.userId,
                    roleId: e.target.value,
                }),
            );
        } catch (error) {
            notify("error", error.response.data.message);
        }
    };

    const onSubmit = async (data) => {
        data.provinceCode = addressSelected.province;
        data.districtCode = addressSelected.district;
        data.wardCode = addressSelected.ward;
        setIsLoading(true);
        try {
            const formData = new FormData();
            Object.keys(data).forEach((item) => {
                if (data[item] !== null) {
                    formData.append(item, data[item]);
                }
            });
            if (data.photoUrl) formData.append("photoUrl", data.photoUrl);
            const res = await axiosClient.post(
                `user/${currentTarget.userId}`,
                formData,
            );
            if (user.userId === res.data.userId) {
                dispatch(userUpdateProfile(res.data.user));
            }
            const resUser = await axiosClient.get("user");
            dispatch(setUsers(resUser.data.users));
            notify("success", "Cập nhật thông tin thành công");
            setIsShow(false);
        } catch (error) {
            const errorMessage = error.response.data.message;
            console.log(error);
            if (errorMessage.includes("Email")) {
                setError("email", {
                    type: "already-exist",
                    message: errorMessage,
                });
            }
            if (errorMessage.includes("Username")) {
                setError("username", {
                    type: "validate",
                    message: errorMessage,
                });
            }
            notify("error", errorMessage);
        }
        setIsLoading(false);
    };

    const onChangePassword = async (data) => {
        if (data.newPassword !== data.confirmPassword) {
            setError2("confirmPassword", {
                type: "invalid",
                message: "Nhập lại mật khẩu không chính xác",
            });
        } else {
            setIsLoading(true);
            try {
                await axiosClient.put(
                    `user/${currentTarget.userId}/password`,
                    data,
                );
                setIsChangePassword(false);
                notify("success", "Đổi mật khẩu thành công");
            } catch (error) {
                setError2("oldPassword", {
                    type: "invalid",
                    message: error.response.data.message,
                });
                console.log(error.response.data.user);
            }
            setIsLoading(false);
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
                                        className='form-control fs-7 rounded-4'
                                        placeholder='Tìm kiếm'
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                    />
                                </div>
                                <button
                                    className='users__export btn--color-1--outline rounded-4 px-3 d-flex align-items-center'
                                    onClick={handleExportData}
                                >
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
                                                            )?.roleName
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
                                onClick={() => {
                                    setIsShow(false);
                                    clearErrors();
                                }}
                            >
                                <ReactSVG src='/images/icon/close.svg' />
                            </button>
                            <div className='d-flex flex-column align-items-center'>
                                <div className='position-relative mb-3'>
                                    <div className='ratio ratio-100x100 rounded-circle overflow-hidden shadow-sm'>
                                        <img src={preview} alt='' />
                                    </div>
                                    <button
                                        className='bg-color-5 border-0 shadow-sm rounded-circle position-absolute top-100 start-50 translate-middle'
                                        onClick={() =>
                                            avatarRef.current.click()
                                        }
                                    >
                                        <ReactSVG src='/images/icon/camera.svg' />
                                    </button>
                                    <input
                                        className='d-none'
                                        type='file'
                                        ref={avatarRef}
                                        accept='image/*'
                                        onChange={(e) => {
                                            const newAvatar = e.target.files[0];
                                            if (newAvatar) {
                                                setImage(newAvatar);
                                                setValue("photoUrl", newAvatar);
                                            }
                                        }}
                                    />
                                </div>
                                <div className='mb-3'>
                                    <p className='fs-4 color-10 mb-0'>
                                        {currentTarget.fullName}
                                    </p>
                                </div>
                                <form
                                    className='w-100'
                                    onSubmit={handleSubmit(onSubmit)}
                                >
                                    <div className='row mb-3'>
                                        <div className='col'>
                                            <div className=''>
                                                <label
                                                    htmlFor='fullName'
                                                    className='form-label fs-7'
                                                >
                                                    Họ và tên:
                                                </label>
                                                <input
                                                    type='text'
                                                    className={`form-control fs-7 ${
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
                                                    className='form-label fs-7'
                                                >
                                                    Username:
                                                </label>
                                                <input
                                                    type='text'
                                                    className={`form-control fs-7 ${
                                                        errors.username &&
                                                        "is-invalid"
                                                    }`}
                                                    id='username'
                                                    placeholder='Username'
                                                    {...register("username", {
                                                        pattern:
                                                            /^[a-zA-Z0-9-]*$/,
                                                    })}
                                                />
                                                {errors.username?.type ===
                                                    "pattern" && (
                                                    <div className='form-text text-danger fs-7'>
                                                        Username chỉ chứa chữ
                                                        cái, số và (-)
                                                    </div>
                                                )}
                                                {errors.username?.type ===
                                                    "validate" && (
                                                    <div className='form-text text-danger fs-7'>
                                                        {
                                                            errors.username
                                                                ?.message
                                                        }
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row mb-3'>
                                        <div className='col'>
                                            <div className=''>
                                                <label
                                                    htmlFor='email'
                                                    className='form-label fs-7'
                                                >
                                                    Email:
                                                </label>
                                                <input
                                                    type='text'
                                                    className={`form-control fs-7 ${
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
                                                    <div className='form-text text-danger fs-7'>
                                                        Vui lòng nhập trường này
                                                    </div>
                                                )}
                                                {errors.email?.type ===
                                                    "pattern" && (
                                                    <div className='form-text text-danger fs-7'>
                                                        Vui lòng nhập vào email
                                                        hợp lệ
                                                    </div>
                                                )}
                                                {errors.email?.type ===
                                                    "already-exist" && (
                                                    <div className='form-text text-danger fs-7'>
                                                        {errors.email?.message}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className='col'>
                                            <div className=''>
                                                <label
                                                    htmlFor='dob'
                                                    className='form-label fs-7'
                                                >
                                                    Ngày sinh:
                                                </label>
                                                <input
                                                    type='date'
                                                    className={`form-control fs-7 ${
                                                        errors.dob &&
                                                        "is-invalid"
                                                    }`}
                                                    id='dob'
                                                    placeholder='dob'
                                                    {...register("dob", {})}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row mb-3'>
                                        <div className='col'>
                                            <div className=''>
                                                <label
                                                    htmlFor='gender'
                                                    className='form-label fs-7'
                                                >
                                                    Giới tính:
                                                </label>
                                                <select
                                                    className={`form-select fs-7 ${
                                                        errors.gender &&
                                                        "is-invalid"
                                                    }`}
                                                    id='gender'
                                                    {...register("gender", {})}
                                                >
                                                    <option value={1}>
                                                        Nam
                                                    </option>
                                                    <option value={0}>
                                                        Nữ
                                                    </option>
                                                    <option value={"other"}>
                                                        Khác
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className='col'>
                                            <div className=''>
                                                <label
                                                    htmlFor='phoneNumber'
                                                    className='form-label fs-7'
                                                >
                                                    Số điện thoại:
                                                </label>
                                                <input
                                                    type='text'
                                                    className={`form-control fs-7 ${
                                                        errors.phoneNumber &&
                                                        "is-invalid"
                                                    }`}
                                                    id='phoneNumber'
                                                    placeholder='Số điện thoại'
                                                    {...register(
                                                        "phoneNumber",
                                                        {
                                                            pattern: /^[0-9]*$/,
                                                            minLength: 10,
                                                            maxLength: 10,
                                                        },
                                                    )}
                                                />
                                                {errors.phoneNumber?.type ===
                                                    "pattern" && (
                                                    <div className='form-text text-danger fs-7'>
                                                        Số điện thoại chỉ chứa
                                                        số
                                                    </div>
                                                )}
                                                {(errors.phoneNumber?.type ===
                                                    "minLength" ||
                                                    errors.phoneNumber?.type ===
                                                        "maxLength") && (
                                                    <div className='form-text text-danger fs-7'>
                                                        Vui lòng nhập vào số
                                                        điện thoại hợp lệ
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row mb-3'>
                                        <div className='col'>
                                            <label
                                                htmlFor='provinces'
                                                className='form-label fs-7'
                                            >
                                                Tỉnh/Thành phố
                                            </label>
                                            <select
                                                id='provinces'
                                                className='form-select fs-7'
                                                aria-label='example'
                                                value={
                                                    addressSelected.province ||
                                                    ""
                                                }
                                                onChange={(e) => {
                                                    setAddressSelected({
                                                        province:
                                                            e.target.value,
                                                    });
                                                    setDistricts();
                                                    setWards();
                                                }}
                                            >
                                                <option value=''>
                                                    Tỉnh/Thành phố
                                                </option>
                                                {provinces?.map((province) => (
                                                    <option
                                                        key={province.code}
                                                        value={province.code}
                                                    >
                                                        {province.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className='col'>
                                            <label
                                                htmlFor='districts'
                                                className='form-label fs-7'
                                            >
                                                Quận/Huyện
                                            </label>
                                            <select
                                                id='districts'
                                                className='form-select fs-7'
                                                aria-label='example'
                                                value={
                                                    addressSelected.district ||
                                                    ""
                                                }
                                                onChange={(e) => {
                                                    setAddressSelected(
                                                        (prevAddress) => ({
                                                            ...prevAddress,
                                                            district:
                                                                e.target.value,
                                                        }),
                                                    );
                                                    setWards();
                                                }}
                                            >
                                                <option value=''>
                                                    Quận/Huyện
                                                </option>
                                                {districts?.map((district) => (
                                                    <option
                                                        key={district.code}
                                                        value={district.code}
                                                    >
                                                        {district.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className='col'>
                                            <label
                                                htmlFor='wards'
                                                className='form-label fs-7'
                                            >
                                                Phường/Xã
                                            </label>
                                            <select
                                                id='wards'
                                                className='form-select fs-7'
                                                aria-label='example'
                                                value={
                                                    addressSelected.ward || ""
                                                }
                                                onChange={(e) =>
                                                    setAddressSelected(
                                                        (prevAddress) => ({
                                                            ...prevAddress,
                                                            ward: e.target
                                                                .value,
                                                        }),
                                                    )
                                                }
                                            >
                                                <option value=''>
                                                    Phường/Xã
                                                </option>
                                                {wards?.map((ward) => (
                                                    <option
                                                        key={ward.code}
                                                        value={ward.code}
                                                    >
                                                        {ward.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className='row mb-3'>
                                        <div className='col'>
                                            <div className=''>
                                                <label
                                                    htmlFor='role'
                                                    className='form-label fs-7'
                                                >
                                                    Role:
                                                </label>
                                                <select
                                                    className={`form-select fs-7`}
                                                    id='role'
                                                    defaultValue={
                                                        currentTarget?.roleId
                                                    }
                                                    onChange={(e) =>
                                                        handleChangeRole(e)
                                                    }
                                                >
                                                    {roleList.map((role) => (
                                                        <option
                                                            value={role.roleId}
                                                        >
                                                            {role.roleName}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className='col'>
                                            <div className=''>
                                                <label
                                                    htmlFor='password'
                                                    className='form-label fs-7'
                                                >
                                                    Mật khẩu:
                                                </label>
                                                <div
                                                    className='control-password position-relative'
                                                    onClick={
                                                        handleOpenChangePasswordModel
                                                    }
                                                >
                                                    <input
                                                        type='password'
                                                        readOnly
                                                        className={`form-control fs-7`}
                                                        id='password'
                                                        value='**********'
                                                    />
                                                    <div className='position-absolute top-50 end-0 translate-middle me-1'>
                                                        <ReactSVG src='/images/icon/edit.svg' />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='text-center'>
                                        <button className='btn btn--color-1 col-3 mx-auto'>
                                            Lưu
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {isChangePassword && (
                <div className='position-absolute top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center'>
                    <div className='position-absolute top-0 bottom-0 start-0 end-0 bg-dark bg-opacity-25 z-2 appear'></div>
                    <div className='container z-2 fade-in'>
                        <div className='p-4 mx-auto col-5 z-3 shadow-lg rounded-3 bg-color-5'>
                            <form onSubmit={handleSubmit2(onChangePassword)}>
                                <p className='text-center color-1 fs-4'>
                                    Đổi mật khẩu
                                </p>
                                <div className='mb-3'>
                                    <label
                                        htmlFor='oldPassword'
                                        className='form-label fs-7'
                                    >
                                        Mật khẩu cũ:
                                    </label>
                                    <input
                                        type='password'
                                        className={`form-control fs-7 ${
                                            errors2.oldPassword && "is-invalid"
                                        }`}
                                        id='oldPassword'
                                        placeholder='Nhập mật khẩu'
                                        {...register2("oldPassword", {
                                            required: true,
                                            minLength: 8,
                                        })}
                                    />
                                    {errors2.oldPassword?.type ===
                                        "required" && (
                                        <div className='form-text text-danger fs-7'>
                                            Vui lòng nhập trường này
                                        </div>
                                    )}
                                    {errors2.oldPassword?.type ===
                                        "minLength" && (
                                        <div className='form-text text-danger fs-7'>
                                            Mật khẩu tối thiểu phải có 8 kí tự
                                        </div>
                                    )}
                                    {errors2.oldPassword?.type ===
                                        "invalid" && (
                                        <div className='form-text text-danger fs-7'>
                                            {errors2.oldPassword?.message}
                                        </div>
                                    )}
                                </div>
                                <div className='mb-3'>
                                    <label
                                        htmlFor='newPassword'
                                        className='form-label fs-7'
                                    >
                                        Mật khẩu mới:
                                    </label>
                                    <input
                                        type='password'
                                        className={`form-control fs-7 ${
                                            errors2.newPassword && "is-invalid"
                                        }`}
                                        id='newPassword'
                                        placeholder='Nhập mật khẩu'
                                        {...register2("newPassword", {
                                            required: true,
                                        })}
                                    />
                                    {errors2.newPassword?.type ===
                                        "required" && (
                                        <div className='form-text text-danger fs-7'>
                                            Vui lòng nhập trường này
                                        </div>
                                    )}
                                    {errors2.newPassword?.type ===
                                        "minLength" && (
                                        <div className='form-text text-danger fs-7'>
                                            Mật khẩu tối thiểu phải có 8 kí tự
                                        </div>
                                    )}
                                </div>
                                <div className='mb-3'>
                                    <label
                                        htmlFor='confirmPassword'
                                        className='form-label fs-7'
                                    >
                                        Nhập lại mật khẩu:
                                    </label>
                                    <input
                                        type='password'
                                        className={`form-control fs-7 ${
                                            errors2.confirmPassword &&
                                            "is-invalid"
                                        }`}
                                        id='confirmPassword'
                                        placeholder='Nhập mật khẩu'
                                        {...register2("confirmPassword", {
                                            required: true,
                                        })}
                                    />
                                    {errors2.confirmPassword?.type ===
                                        "required" && (
                                        <div className='form-text text-danger fs-7'>
                                            Vui lòng nhập trường này
                                        </div>
                                    )}
                                    {errors2.confirmPassword?.type ===
                                        "minLength" && (
                                        <div className='form-text text-danger fs-7'>
                                            Mật khẩu tối thiểu phải có 8 kí tự
                                        </div>
                                    )}
                                    {errors2.confirmPassword?.type ===
                                        "invalid" && (
                                        <div className='form-text text-danger fs-7'>
                                            Nhập lại mật khẩu không chính xác
                                        </div>
                                    )}
                                </div>
                                <div className='text-end'>
                                    <button
                                        className='btn btn--color-1--outline me-3'
                                        onClick={() => {
                                            setIsChangePassword(false);
                                            clearErrors2();
                                        }}
                                    >
                                        Hủy
                                    </button>
                                    <button className='btn btn--color-1--outline'>
                                        Cập nhật
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            {isLoading && <Loading />}
        </>
    );
};

export default User;
