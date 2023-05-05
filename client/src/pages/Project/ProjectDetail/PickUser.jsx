import React from "react";
import { ReactSVG } from "react-svg";
import { BASE_URL } from "../../../config/api";

const PickUser = ({ data, selected, onChange }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    React.useEffect(() => {
        const controlModel = (e) => {
            const selectForm = document.querySelector(".pick-user");
            const isClickInside = selectForm.contains(e.target);
            if (!isClickInside) {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener("click", controlModel);
        }
        return () => {
            document.removeEventListener("click", controlModel);
        };
    }, [isOpen]);

    const handleSelect = (user) => {
        onChange(user);
        setIsOpen(false);
    };
    return (
        <div
            className='pick-user d-flex align-items-center rounded-6 border position-relative'
            onClick={() => {
                setIsOpen(!isOpen);
            }}
        >
            <div className='d-flex align-items-center'>
                {selected && (
                    <div className='ratio ratio-30x30 rounded-circle overflow-hidden me-2'>
                        <img
                            src={BASE_URL + selected.photoUrl}
                            alt=''
                            className='object-fit-cover'
                        />
                    </div>
                )}
                <p className='fs-7 mb-0 color-3'>
                    {selected?.fullName || "Chọn người phụ trách"}
                </p>
            </div>
            {isOpen && (
                <div
                    className={`pick-user__select shadow position-absolute top-100 start-0 end-0 py-2 bg-color-5 rounded-6 mt-1 `}
                >
                    {data.length === 0 ? (
                        <div className='d-flex flex-column align-items-center justify-content-center my-3'>
                            <ReactSVG src='/images/icon/empty.svg' />
                            <p className='mb-0 color-3 fs-7'>
                                Không tìm thấy dữ liệu
                            </p>
                        </div>
                    ) : (
                        data.map((item) => (
                            <button
                                className='pick-user__select__item hover-bg-color-12 border-0 bg-transparent d-flex align-items-center px-3 py-2 w-100'
                                key={item.userId}
                                type='button'
                                onClick={() => handleSelect(item.user)}
                            >
                                <div className='ratio ratio-40x40 overflow-hidden rounded-circle'>
                                    <img
                                        src={BASE_URL + item.user.photoUrl}
                                        alt=''
                                        className='object-fit-cover'
                                    />
                                </div>
                                <div className='d-flex flex-column align-items-start ms-2'>
                                    <span className='pick-user__select__item__name fs-6 color-10'>
                                        {item.user.fullName || item.user.email}
                                    </span>
                                    {item.user.fullName && (
                                        <span className='pick-user__select__item__email fs-8 color-3'>
                                            {item.user.email}
                                        </span>
                                    )}
                                </div>
                            </button>
                        ))
                    )}
                </div>
            )}
            <div className='position-absolute top-50 end-0 me-2 translate-middle-y'>
                <ReactSVG src='/images/icon/angle-down.svg' />
            </div>
        </div>
    );
};

export default React.memo(PickUser);
