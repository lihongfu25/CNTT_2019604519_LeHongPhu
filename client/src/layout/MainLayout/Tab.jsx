import React from "react";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";

const Tab = ({ label, iconSrc, currentTab, changeCurrentTab, isCollapsed }) => {
    let tempTab = null;
    if (label.toLowerCase() === "dashboard") tempTab = "";
    return (
        <Link
            to={tempTab !== null ? tempTab : `/${label.toLowerCase()}`}
            className={`nav__btn d-flex align-items-center text-decoration-none ${
                (currentTab === tempTab ||
                    currentTab === label.toLowerCase()) &&
                "active"
            } px-4`}
            onClick={() =>
                changeCurrentTab(
                    tempTab !== null ? tempTab : label.toLowerCase(),
                )
            }
        >
            <div className='d-flex nav__btn__icon'>
                <ReactSVG src={iconSrc} className='nav__btn__icon__svg' />
            </div>
            {isCollapsed ? (
                <span className='nav__btn__tooltip fs-7 bg-color-4 color-5 rounded-6 z-3 text-center'>
                    {label}
                </span>
            ) : (
                <div className='nav__btn__text fs-7 appear ms-2'>{label}</div>
            )}
        </Link>
    );
};

export default Tab;
