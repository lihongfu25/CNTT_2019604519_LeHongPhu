import React from "react";
import { Outlet } from "react-router-dom";
const MainLayout = ({ children }) => {
    return (
        <div className='d-flex'>
            <div>MainLayout</div>
            <Outlet />
        </div>
    );
};

export default MainLayout;
