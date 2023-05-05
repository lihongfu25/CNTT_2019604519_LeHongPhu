import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "../../components";
import axiosClient from "../../config/api";
import notify from "../../config/toast";
import { setNotifications } from "../../redux/store/notificationSlice";
import NotificationItem from "./NotificationItem";
import "./notification.scss";
const Notification = () => {
    const notifications = useSelector((state) => state.notification);
    const user = useSelector((state) => state.user);
    const [isLoading, setIsLoading] = React.useState(false);
    const dispatch = useDispatch();

    const handleRefreshNotify = async () => {
        setIsLoading(true);
        try {
            const response = await axiosClient.get(
                `notification?userId=${user.userId}`,
            );
            dispatch(setNotifications(response.data.data));
        } catch (error) {
            notify("error", error.response.data.messgae);
        }
        setIsLoading(false);
    };
    return (
        <div className='notification__list h-100 d-flex flex-column'>
            <div className='d-flex justify-content-between mb-3'>
                <div>
                    <p className='fs-4 fw-2 color-10 mb-2'>Hoạt động gần đây</p>
                </div>
                <div>
                    <button
                        className='btn--color-1 px-4 py-1'
                        onClick={handleRefreshNotify}
                    >
                        Làm mới
                    </button>
                </div>
            </div>
            {isLoading ? (
                <div className='d-flex justify-content-center align-items-center flex-grow-1'>
                    <Spinner />
                </div>
            ) : (
                <div className='h-vh-75 overflow-y-scroll hidden-scrollBar'>
                    {notifications.map((item) => (
                        <NotificationItem data={item} key={item.id} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Notification;
