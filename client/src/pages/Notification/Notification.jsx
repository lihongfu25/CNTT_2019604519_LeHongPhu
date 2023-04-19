import React from "react";
import { useSelector } from "react-redux";
import NotificationItem from "./NotificationItem";
import "./notification.scss";
const Notification = () => {
    const notifications = useSelector((state) => state.notification);
    return (
        <div className='notification__list h-100 d-flex flex-column'>
            <div className='mb-3'>
                <p className='fs-5 fw-3 color-10 mb-0'>Hoạt động gần đây</p>
            </div>
            <div className='h-vh-70 overflow-y-scroll hidden-scrollBar'>
                {notifications.map((item) => (
                    <NotificationItem data={item} key={item.id} />
                ))}
            </div>
        </div>
    );
};

export default Notification;
