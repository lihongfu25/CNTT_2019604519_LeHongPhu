import React from "react";
import { ReactSVG } from "react-svg";

const SelectStatus = ({ data, selected, onChange, error = false, errorMessage = null }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    React.useEffect(() => {
        const controlModel = (e) => {
            const selectForm = document.querySelector(".form__status");

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

    const handleSelect = (event, status) => {
        event.target.previousSibling.checked = !event.target.previousSibling.checked;

        onChange(status);
        console.log(selected);
    };

    return (
        <>
            <div
                className={`form__status d-flex align-items-center rounded-6 border position-relative ${error && "is-invalid"}`}
                onClick={() => {
                    setIsOpen(true);
                }}
            >
                {selected.length !== 0 &&
                    selected.map((status) => (
                        <p className='form__status--selected me-2' key={status.statusId}>
                            <span className='fs-7'>{status.name}</span>
                        </p>
                    ))}
                <div className={`form__status__select shadow position-absolute top-100 start-0 end-0 py-2 bg-color-5 rounded-6 mt-1 ${isOpen ? "" : "d-none"}`}>
                    {data?.map((status) => (
                        <div className='d-flex align-items-center px-3 py-1' key={status.statusId}>
                            <input type='checkbox' id={status.statusId} />
                            <button className='fs-7 border-0 bg-transparent' type='button' onClick={(event) => handleSelect(event, status)}>
                                {status.name}
                            </button>
                        </div>
                    ))}
                </div>
                <div className='position-absolute top-50 end-0 me-2 translate-middle-y'>
                    <ReactSVG src='/images/icon/angle-down.svg' />
                </div>
            </div>
            {error && <div className='form-text text-danger'>{errorMessage}</div>}
        </>
    );
};

export default React.memo(SelectStatus);
