import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import axiosClient, { BASE_URL } from "../../config/api";

const NotificationItem = ({ data }) => {
    const renderCreatedAt = (createdAt) => {
        const seconds = moment().diff(createdAt, "seconds");
        if (seconds >= 86400) {
            const day = Math.floor(seconds / 86400);
            if (day === 1) return "yestoday";
            else return `${day} days ago`;
        } else if (seconds >= 3600) {
            const hour = Math.floor(seconds / 3600);
            if (hour === 1) return "1 hour ago";
            else return `${hour} hours ago`;
        } else if (seconds >= 60) {
            const minute = Math.floor(seconds / 60);
            if (minute === 1) return "1 minute ago";
            else return `${minute} minutes ago`;
        } else return "now";
    };

    const handleChangeSeenStatus = () => {
        const updateSeenStatus = async () => {
            try {
                await axiosClient.put(`notification/${data.id}`);
            } catch (errer) {
                console.error(errer);
            }
        };
        updateSeenStatus();
    };
    return (
        <Link
            to={`/task/${data.issueId}`}
            className='text-decoration-none'
            onClick={handleChangeSeenStatus}
        >
            <div className='d-flex gap-2 p-2 rounded-6 notification__list__item'>
                <div className='ratio ratio-40x40 rounded-circle overflow-hidden'>
                    <img
                        src={BASE_URL + data.user.photoUrl}
                        alt=''
                        className='w-100 object-fit-cover'
                    />
                </div>
                <div className='d-flex flex-column align-items-start'>
                    <div>
                        <p className='fs-7 mb-0 text-wrap'>
                            <span className='color-1'>
                                {data.user.fullName}
                            </span>
                            <span className='color-10'>
                                {" " + data.content + " cho "}
                            </span>
                            <span className='color-1 text-wrap'>
                                {data.issueId + " - " + data.issue.name}
                            </span>
                        </p>
                    </div>
                    <div className='d-flex align-items-center'>
                        <img
                            src='/images/icon/clock.svg'
                            alt=''
                            className='me-1'
                        />
                        <p className='fs-8 color-3 mb-0'>
                            {renderCreatedAt(data.created_at)}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default React.memo(NotificationItem);
