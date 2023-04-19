import React from "react";
import { useSelector } from "react-redux";
import NotificationItem from "../../Notification/NotificationItem";

const NotificationList = () => {
    const notifications = useSelector((state) => state.notification);
    return (
        <div className='notification__list'>
            <div className='mb-1'>
                <p className='fs-5 fw-3 color-10 mb-0'>Activity Stream</p>
            </div>
            <div className='h-vh-25 overflow-y-scroll hidden-scrollBar'>
                {notifications.map((item) => (
                    <NotificationItem data={item} key={item.id} />
                ))}
            </div>
        </div>
    );
};

export default React.memo(NotificationList);
