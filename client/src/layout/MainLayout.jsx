import React from "react";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import "../styles/layout/main.scss";

const ADMIN_ROLE = "r0";

const MainLayout = ({ children }) => {
    const [isCollapsed, setIsCollapsed] = React.useState(false);
    const [currentTab, setCurrentTab] = React.useState("dashboard");

    const user = useSelector((state) => state.user);

    const handleCollapseMenu = () => {
        setIsCollapsed(!isCollapsed);
    };

    const changeCurrentTab = (tab) => {
        setCurrentTab(tab);
    };

    return (
        <div className='main-layout position-fixed top-0 bottom-0 start-0 end-0'>
            <div className='d-flex h-100'>
                <div
                    className={`main-layout__nav d-flex flex-column shadow-sm border-end transition-ease ${
                        isCollapsed ? "collapse" : "expand"
                    }`}
                    id='main-nav'
                >
                    <div className='main-layout__header d-flex justify-content-center align-items-center'>
                        <div className='d-flex align-items-center justify-content-center'>
                            <Link
                                to='/'
                                className='main-nav__header__logo text-center'
                                onClick={() => changeCurrentTab("dashboard")}
                            >
                                {isCollapsed ? (
                                    <img
                                        src='images/logo.svg'
                                        alt='logo'
                                        className='main-nav__header__logo__collapse mx-auto appear'
                                    />
                                ) : (
                                    <img
                                        src='images/Group 1.svg'
                                        alt='logo'
                                        className='main-nav__header__logo__expand mx-auto appear'
                                    />
                                )}
                            </Link>
                        </div>
                    </div>
                    <div className='px-4 flex-grow-1 overflow-hidden'>
                        <Link
                            to='/'
                            className={`nav__btn d-flex align-items-center text-decoration-none overflow-hidden border-0 rounded-pill w-100 p-3 mb-2 transition-ease ${
                                currentTab === "dashboard" && "active"
                            }`}
                            onClick={() => changeCurrentTab("dashboard")}
                        >
                            <div className='d-flex'>
                                {currentTab === "dashboard" ? (
                                    <img
                                        src='images/icon/dashboard-active.svg'
                                        alt='logo'
                                        className=''
                                    />
                                ) : (
                                    <img
                                        src='images/icon/dashboard.svg'
                                        alt='logo'
                                        className=''
                                    />
                                )}
                            </div>
                            <div className='nav__btn__text appear ms-4'>
                                Trang chủ
                            </div>
                        </Link>
                        <Link
                            to='/project'
                            className={`nav__btn d-flex align-items-center text-decoration-none overflow-hidden border-0 rounded-pill w-100 p-3 my-2 transition-ease ${
                                currentTab === "project" && "active"
                            }`}
                            onClick={() => changeCurrentTab("project")}
                        >
                            <div className='d-flex'>
                                {currentTab === "project" ? (
                                    <img
                                        src='images/icon/project-active.svg'
                                        alt='logo'
                                        className=''
                                    />
                                ) : (
                                    <img
                                        src='images/icon/project.svg'
                                        alt='logo'
                                        className=''
                                    />
                                )}
                            </div>
                            <div className='nav__btn__text appear ms-4'>
                                Dự án
                            </div>
                        </Link>
                        <Link
                            to='/task'
                            className={`nav__btn d-flex align-items-center text-decoration-none overflow-hidden border-0 rounded-pill w-100 p-3 my-2 transition-ease ${
                                currentTab === "task" && "active"
                            }`}
                            onClick={() => changeCurrentTab("task")}
                        >
                            <div className='d-flex'>
                                {currentTab === "task" ? (
                                    <img
                                        src='images/icon/task-active.svg'
                                        alt='logo'
                                        className=''
                                    />
                                ) : (
                                    <img
                                        src='images/icon/task.svg'
                                        alt='logo'
                                        className=''
                                    />
                                )}
                            </div>
                            <div className='nav__btn__text appear ms-4'>
                                Công việc
                            </div>
                        </Link>
                        {user.roleId === ADMIN_ROLE && (
                            <Link
                                to='/user'
                                className={`nav__btn d-flex align-items-center text-decoration-none overflow-hidden border-0 rounded-pill w-100 p-3 my-2 transition-ease ${
                                    currentTab === "users" && "active"
                                }`}
                                onClick={() => changeCurrentTab("users")}
                            >
                                <div className='d-flex'>
                                    {currentTab === "users" ? (
                                        <img
                                            src='images/icon/users-active.svg'
                                            alt='logo'
                                            className=''
                                        />
                                    ) : (
                                        <img
                                            src='images/icon/users.svg'
                                            alt='logo'
                                            className=''
                                        />
                                    )}
                                </div>
                                <div className='nav__btn__text appear ms-4'>
                                    Nhân viên
                                </div>
                            </Link>
                        )}
                        <Link
                            to='/report'
                            className={`nav__btn d-flex align-items-center text-decoration-none overflow-hidden border-0 rounded-pill w-100 p-3 my-2 transition-ease ${
                                currentTab === "report" && "active"
                            }`}
                            onClick={() => changeCurrentTab("report")}
                        >
                            <div className='d-flex'>
                                {currentTab === "report" ? (
                                    <img
                                        src='images/icon/report-active.svg'
                                        alt='logo'
                                        className=''
                                    />
                                ) : (
                                    <img
                                        src='images/icon/report.svg'
                                        alt='logo'
                                        className=''
                                    />
                                )}
                            </div>
                            <div className='nav__btn__text appear ms-4'>
                                Thống kê
                            </div>
                        </Link>
                    </div>
                    <div className='footer text-center border-top'>
                        <button
                            className='footer__btn bg-transparent border-0 w-100 h-100 p-2'
                            onClick={handleCollapseMenu}
                        >
                            {isCollapsed ? (
                                <img
                                    src='images/icon/angle-right.svg'
                                    alt='logo'
                                    className='rotate-180'
                                />
                            ) : (
                                <img
                                    src='images/icon/angle-left.svg'
                                    alt='logo'
                                    className='rotate-180'
                                />
                            )}
                        </button>
                    </div>
                </div>
                <div className='main-layout__content flex-grow-1'>
                    <div className='d-flex flex-column'>
                        <div className='main-layout__header d-flex align-items-center justify-content-end shadow-sm border-bottom'>
                            <div className='d-flex me-4'>
                                <button
                                    className='bg-transparent border-0 d-flex align-items-center'
                                    data-bs-toggle='dropdown'
                                    aria-expanded='false'
                                >
                                    <div className='ratio ratio-40x40 rounded-circle overflow-hidden transition-ease'>
                                        <img
                                            src='images/demo.jpg'
                                            alt=''
                                            className='w-100 object-fit-cover'
                                        />
                                    </div>
                                    <div className='mx-2'>
                                        <p className='color-10 fw-semibold mb-0'>
                                            {user?.fullName}
                                        </p>
                                    </div>
                                    <div>
                                        <img
                                            src='/images/icon/angle-down.svg'
                                            alt=''
                                            className={`transition-ease`}
                                        />
                                    </div>
                                </button>
                                <ul className='dropdown-menu'>
                                    <li>
                                        <Link
                                            className='dropdown-item text-decoration-none'
                                            to='/my-profile'
                                            onClick={() =>
                                                changeCurrentTab("profile")
                                            }
                                        >
                                            Tài khoản
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className='dropdown-item text-decoration-none'
                                            to='/auth/login'
                                        >
                                            Đăng xuất
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='p-3'>
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
