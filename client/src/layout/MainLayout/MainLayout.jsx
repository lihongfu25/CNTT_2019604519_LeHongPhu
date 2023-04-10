import React from "react";
import moment from "moment";
import { ReactSVG } from "react-svg";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useLocation } from "react-router-dom";
import { changeCurrentTab } from "../../redux/store/tabSlice";
import { userLogout } from "../../redux/store/userSlice";
import { BASE_URL } from "../../config/api";
import "../../styles/layout/main.scss";
import Tab from "./Tab";

const ADMIN_ROLE = "r0";

const MainLayout = ({ children }) => {
    const [isCollapsed, setIsCollapsed] = React.useState(false);

    const currentTab = useSelector((state) => state.tab.currentTab);
    const user = useSelector((state) => state.user);

    const dispatch = useDispatch();
    const location = useLocation();

    React.useEffect(() => {
        const currentTab = location.pathname.split("/").pop().replace(/$/, "");
        dispatch(changeCurrentTab(currentTab));
    }, []);

    const handleCollapseMenu = () => {
        setIsCollapsed(!isCollapsed);
    };

    const changeTab = (tab) => {
        dispatch(changeCurrentTab(tab));
    };

    const handleLogout = () => {
        dispatch(userLogout());
        localStorage.removeItem("token");
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
                                onClick={() => changeTab("")}
                            >
                                {isCollapsed ? (
                                    <ReactSVG
                                        src='images/logo-short.svg'
                                        className='main-nav__header__logo__collapse mx-auto appear'
                                    />
                                ) : (
                                    <ReactSVG
                                        src='images/logo.svg'
                                        className='main-nav__header__logo__expand mx-auto appear'
                                    />
                                )}
                            </Link>
                        </div>
                    </div>
                    <div className='flex-grow-1'>
                        <Tab
                            label='Dashboard'
                            iconSrc='/images/icon/dashboard.svg'
                            currentTab={currentTab}
                            changeCurrentTab={changeTab}
                            isCollapsed={isCollapsed}
                        />
                        <Tab
                            label='Calendar'
                            iconSrc='/images/icon/calendar.svg'
                            currentTab={currentTab}
                            changeCurrentTab={changeTab}
                            isCollapsed={isCollapsed}
                        />
                        <Tab
                            label='Task'
                            iconSrc='/images/icon/task.svg'
                            currentTab={currentTab}
                            changeCurrentTab={changeTab}
                            isCollapsed={isCollapsed}
                        />
                        <Tab
                            label='Project'
                            iconSrc='/images/icon/project.svg'
                            currentTab={currentTab}
                            changeCurrentTab={changeTab}
                            isCollapsed={isCollapsed}
                        />
                        {user.roleId === ADMIN_ROLE && (
                            <Tab
                                label='User'
                                iconSrc='/images/icon/users.svg'
                                currentTab={currentTab}
                                changeCurrentTab={changeTab}
                                isCollapsed={isCollapsed}
                            />
                        )}
                        <Tab
                            label='Statistical'
                            iconSrc='/images/icon/report.svg'
                            currentTab={currentTab}
                            changeCurrentTab={changeTab}
                            isCollapsed={isCollapsed}
                        />
                        <Tab
                            label='Notification'
                            iconSrc='/images/icon/notification.svg'
                            currentTab={currentTab}
                            changeCurrentTab={changeTab}
                            isCollapsed={isCollapsed}
                        />
                    </div>
                </div>
                <div className='main-layout__content flex-grow-1'>
                    <div className='d-flex flex-column h-100'>
                        <div className='main-layout__header d-flex align-items-center justify-content-between shadow-sm border-bottom'>
                            <div className='d-flex align-items-center'>
                                <div className=''>
                                    <button
                                        className='bg-transparent border-0 w-100 h-100 ps-4'
                                        onClick={handleCollapseMenu}
                                    >
                                        {isCollapsed ? (
                                            <ReactSVG src='/images/icon/angle-right.svg' />
                                        ) : (
                                            <ReactSVG src='/images/icon/expand.svg' />
                                        )}
                                    </button>
                                </div>
                                <div className='date-now ms-5'>
                                    <p className='color-3 fs-5 mb-0'>
                                        {moment().format("dddd, Do MMMM")}
                                    </p>
                                </div>
                            </div>
                            <div className='d-flex me-4'>
                                <button
                                    className='bg-transparent border-0 d-flex align-items-center'
                                    data-bs-toggle='dropdown'
                                    aria-expanded='false'
                                >
                                    <div className='ratio ratio-40x40 rounded-circle overflow-hidden'>
                                        <img
                                            src={BASE_URL + user?.photoUrl}
                                            alt=''
                                            className='w-100 object-fit-cover'
                                        />
                                    </div>
                                    <div className='mx-2'>
                                        <p className='color-10 fw-4 mb-0'>
                                            {user?.fullName || user?.email}
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
                                <ul className='dropdown-menu dropdown-menu-end'>
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
                                            onClick={handleLogout}
                                        >
                                            Đăng xuất
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='p-4 flex-grow-1 bg-color-12'>
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
