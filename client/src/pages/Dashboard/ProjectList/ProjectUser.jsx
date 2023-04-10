import React from "react";
import { BASE_URL } from "../../../config/api";

const USER_SHOW = 4;
const ProjectUser = ({ data }) => {
    return (
        <div className='project__list__item__user__list d-flex justify-content-end position-relative'>
            {data?.map((user, index) =>
                index === USER_SHOW ? (
                    <div
                        className='project__list__item__user__list__item ratio ratio-30x30 rounded-circle overflow-hidden border border-2 border-color-5'
                        key={index}
                    >
                        <span className='d-flex align-items-center justify-content-center bg-color-2 fs-8 color-5'>
                            +{data.length - USER_SHOW}
                        </span>
                    </div>
                ) : (
                    <div
                        className={`project__list__item__user__list__item ratio ratio-30x30 rounded-circle overflow-hidden border border-2 border-color-5 ${
                            index > USER_SHOW ? "more" : ""
                        }`}
                        key={index}
                    >
                        <img
                            src={BASE_URL + user.user.photoUrl}
                            alt=''
                            className='w-100 object-fit-cover'
                        />
                    </div>
                ),
            )}
        </div>
    );
};

export default React.memo(ProjectUser);
