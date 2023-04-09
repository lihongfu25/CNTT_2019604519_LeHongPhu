import React from "react";
import NotificationItem from "./NotificationItem";
import "./notification.scss";

const NotificationList = ({ data }) => {
    return (
        <div className='notification__list text-start'>
            <div className='mb-3'>
                <p className='fs-5 fw-3 color-10 mb-0'>Activity Stream</p>
            </div>
            <div>
                {data.map((item) => (
                    <NotificationItem data={item} key={item.id} />
                ))}
            </div>
        </div>
    );
};

export default React.memo(NotificationList);
