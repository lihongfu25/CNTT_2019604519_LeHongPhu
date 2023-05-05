import React from "react";
import { ReactSVG } from "react-svg";
import { Priority } from "../../../components";

const PickPriority = ({ selected, onChange }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    React.useEffect(() => {
        const controlModel = (e) => {
            const selectForm = document.querySelector(".pick-priority");
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

    const handleSelect = (priority) => {
        onChange(priority);
        setIsOpen(false);
    };
    return (
        <div
            className='pick-priority d-flex align-items-center rounded-6 border position-relative'
            onClick={() => {
                setIsOpen(!isOpen);
            }}
        >
            <Priority level={selected} />
            {isOpen && (
                <div className='pick-priority__select shadow position-absolute top-100 start-0 end-0 py-2 bg-color-5 rounded-6 mt-1'>
                    {Array.from([5, 4, 3, 2, 1]).map((level) => (
                        <button
                            key={level}
                            className='pick-priority__select__item bg-transparent border-0 px-3 py-2 w-100'
                            onClick={() => handleSelect(level)}
                        >
                            <Priority level={level} />
                        </button>
                    ))}
                </div>
            )}
            <div className='position-absolute top-50 end-0 me-2 translate-middle-y'>
                <ReactSVG src='/images/icon/angle-down.svg' />
            </div>
        </div>
    );
};

export default React.memo(PickPriority);
