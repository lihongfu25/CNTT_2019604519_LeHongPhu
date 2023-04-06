import React from "react";
import { ReactSVG } from "react-svg";
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
                                    <ReactSVG
                                        src='images/logo.svg'
                                        className='main-nav__header__logo__collapse mx-auto appear'
                                    />
                                ) : (
                                    <ReactSVG
                                        src='images/Group 1.svg'
                                        className='main-nav__header__logo__expand mx-auto appear'
                                    />
                                )}
                            </Link>
                        </div>
                    </div>
                    <div className='flex-grow-1 overflow-hidden'>
                        <Link
                            to='/'
                            className={`nav__btn d-flex align-items-center text-decoration-none overflow-hidden border-0 w-100 py-3 px-4 transition-ease ${
                                currentTab === "dashboard" && "active"
                            }`}
                            onClick={() => changeCurrentTab("dashboard")}
                        >
                            <div className='d-flex nav__btn__icon'>
                                <svg
                                    className='nav__btn__icon__svg'
                                    xmlns='http://www.w3.org/2000/svg'
                                    xmlnsXlink='http://www.w3.org/1999/xlink'
                                    width='17'
                                    height='17'
                                    viewBox='0 0 17 17'
                                >
                                    <defs>
                                        <clipPath id='clip-path'>
                                            <rect
                                                id='Rectangle_3'
                                                data-name='Rectangle 3'
                                                width='17'
                                                height='17'
                                                stroke='#76797e'
                                                strokeWidth='1'
                                            />
                                        </clipPath>
                                    </defs>
                                    <g
                                        id='Mask_Group_2'
                                        data-name='Mask Group 2'
                                        clipPath='url(#clip-path)'
                                    >
                                        <g
                                            id='dashboard'
                                            transform='translate(0 0)'
                                        >
                                            <path
                                                id='Path_3'
                                                data-name='Path 3'
                                                d='M16.864,8.364H10.682a.773.773,0,0,1-.773-.773V1.409a.773.773,0,0,1,.773-.773h6.182a.773.773,0,0,1,.773.773V7.591A.773.773,0,0,1,16.864,8.364ZM11.455,6.818h4.636V2.182H11.455Zm2.318,10.818a3.864,3.864,0,1,1,3.864-3.864A3.864,3.864,0,0,1,13.773,17.636Zm0-6.182a2.318,2.318,0,1,0,2.318,2.318A2.318,2.318,0,0,0,13.773,11.455ZM7.591,9.909H1.409a.773.773,0,0,0-.773.773v6.182a.773.773,0,0,0,.773.773H7.591a.773.773,0,0,0,.773-.773V10.682A.773.773,0,0,0,7.591,9.909Zm-.773,6.182H2.182V11.455H6.818Zm.773-7.727H1.409a.773.773,0,0,1-.773-.773V1.409A.773.773,0,0,1,1.409.636H7.591a.773.773,0,0,1,.773.773V7.591A.773.773,0,0,1,7.591,8.364ZM2.182,6.818H6.818V2.182H2.182Z'
                                                transform='translate(-0.636 -0.636)'
                                            />
                                        </g>
                                    </g>
                                </svg>
                            </div>
                            <div className='nav__btn__text appear ms-2'>
                                Dashboard
                            </div>
                        </Link>
                        <Link
                            to='/project'
                            className={`nav__btn d-flex align-items-center text-decoration-none overflow-hidden border-0 w-100 py-3 px-4 transition-ease ${
                                currentTab === "project" && "active"
                            }`}
                            onClick={() => changeCurrentTab("project")}
                        >
                            <div className='d-flex nav__btn__icon'>
                                <svg
                                    className=' nav__btn__icon__svg'
                                    xmlns='http://www.w3.org/2000/svg'
                                    xmlnsXlink='http://www.w3.org/1999/xlink'
                                    width='17'
                                    height='17'
                                    viewBox='0 0 17 17'
                                >
                                    <defs>
                                        <clipPath id='clip-path'>
                                            <rect
                                                id='Rectangle_44'
                                                data-name='Rectangle 44'
                                                width='17'
                                                height='17'
                                                transform='translate(24 131)'
                                                stroke='#76797e'
                                                strokeWidth='1'
                                            />
                                        </clipPath>
                                    </defs>
                                    <g
                                        id='Mask_Group_19'
                                        data-name='Mask Group 19'
                                        transform='translate(-24 -131)'
                                        clipPath='url(#clip-path)'
                                    >
                                        <g
                                            id='calendar'
                                            transform='translate(24 131)'
                                        >
                                            <path
                                                id='Path_584'
                                                data-name='Path 584'
                                                d='M13.718,1.309h-.634V.668a.664.664,0,1,0-1.328,0v.642H5.244V.668a.664.664,0,1,0-1.328,0v.642H3.282A3.286,3.286,0,0,0,0,4.591v9.123A3.286,3.286,0,0,0,3.282,17H13.718A3.286,3.286,0,0,0,17,13.714V4.591a3.286,3.286,0,0,0-3.282-3.282ZM3.282,2.637h.634V3.931a.664.664,0,0,0,1.328,0V2.637h6.512V3.931a.664.664,0,0,0,1.328,0V2.637h.634a1.957,1.957,0,0,1,1.955,1.955v.634H1.328V4.591A1.957,1.957,0,0,1,3.282,2.637ZM13.718,15.669H3.282a1.957,1.957,0,0,1-1.955-1.955V6.553H15.672v7.161A1.957,1.957,0,0,1,13.718,15.669ZM5.9,9.164a.664.664,0,0,1-.664.664H3.927a.664.664,0,0,1,0-1.328H5.233A.664.664,0,0,1,5.9,9.164Zm7.84,0a.664.664,0,0,1-.664.664H11.767a.664.664,0,1,1,0-1.328h1.305A.664.664,0,0,1,13.736,9.164Zm-3.924,0a.664.664,0,0,1-.664.664H7.844a.664.664,0,1,1,0-1.328H9.149A.664.664,0,0,1,9.813,9.164ZM5.9,13.08a.664.664,0,0,1-.664.664H3.927a.664.664,0,0,1,0-1.328H5.233A.664.664,0,0,1,5.9,13.08Zm7.84,0a.664.664,0,0,1-.664.664H11.767a.664.664,0,1,1,0-1.328h1.305A.664.664,0,0,1,13.736,13.08Zm-3.924,0a.664.664,0,0,1-.664.664H7.844a.664.664,0,1,1,0-1.328H9.149A.664.664,0,0,1,9.813,13.08Z'
                                            />
                                        </g>
                                    </g>
                                </svg>
                            </div>
                            <div className='nav__btn__text appear ms-4'>
                                Calendar
                            </div>
                        </Link>
                        <Link
                            to='/task'
                            className={`nav__btn d-flex align-items-center text-decoration-none overflow-hidden border-0 w-100 py-3 px-4 transition-ease ${
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
                                className={`nav__btn d-flex align-items-center text-decoration-none overflow-hidden border-0 w-100 py-3 px-4 transition-ease ${
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
                            className={`nav__btn d-flex align-items-center text-decoration-none overflow-hidden border-0 w-100 py-3 px-4 transition-ease ${
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
                        <div className='py-3 px-4'>
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
