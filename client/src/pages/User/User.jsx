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
const User = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [search, setSearch] = React.useState("");
    const [isDelete, setIsDelete] = React.useState(false);
    const [currentTarget, setcurrentTarget] = React.useState(null);
    const [userList, setUserList] = React.useState([]);
    const [roleList, setRoleList] = React.useState([]);
    const users = useSelector((state) => state.users);
    const roles = useSelector((state) => state.role);
    const dispatch = useDispatch();
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

    const handleOpenDeleteForm = (userId) => {
        setIsDelete(true);
        setcurrentTarget(userId);
    };

    const handleDeleteUser = async () => {
        setIsLoading(true);
        try {
            await axiosClient.delete("user/" + currentTarget);
            notify("success", "Xóa người dùng thành công");
            dispatch(removeUser(currentTarget));
        } catch (error) {
            notify("error", error.response.data.message);
        }
        setIsLoading(false);
        setIsDelete(false);
    };
    return (
        <>
            <div className='users h-100 d-flex flex-column'>
                <div className=''>
                    <p className='fs-4 fw-2 color-10 mb-2'>Người dùng</p>
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
                                onChange={(e) => setSearch(e.target.value)}
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
                                                toVietnameseLowerCase(search),
                                            ) ||
                                            toVietnameseLowerCase(
                                                user.email,
                                            ).includes(
                                                toVietnameseLowerCase(search),
                                            ),
                                    )
                                    .map((item, i) => (
                                        <tr key={i} className='align-middle'>
                                            <td className='px-4'>{i + 1}</td>
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
                                                                {item.username}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className=''>{item.email}</td>
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
                                                    <button className='bg-transparent border-0 me-2'>
                                                        <ReactSVG src='/images/icon/info.svg' />
                                                    </button>
                                                    <button
                                                        className='bg-transparent border-0'
                                                        onClick={() =>
                                                            handleOpenDeleteForm(
                                                                item.userId,
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
            {isLoading && <Loading />}
        </>
    );
};

export default User;
