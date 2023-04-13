import React from "react";
import { ReactSVG } from "react-svg";
import { BASE_URL } from "../../config/api";

const SelectUser = ({
    data,
    selected,
    onChange,
    error = false,
    errorMessage = null,
}) => {
    const [suggestion, setSuggestion] = React.useState([]);
    const [search, setSearch] = React.useState("");
    const [isOpen, setIsOpen] = React.useState(false);

    const inputSearchRef = React.useRef(null);

    const toVietnameseLowerCase = (string) => {
        const stringConvert = string
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^\w\s]/gi, "");
        return stringConvert.toLowerCase();
    };
    React.useEffect(() => {
        setSuggestion(
            data
                ?.filter(
                    (user) =>
                        !selected.some(
                            (selectedItem) =>
                                selectedItem.userId === user.userId,
                        ),
                )
                .filter((user) =>
                    toVietnameseLowerCase(user.fullName).includes(
                        toVietnameseLowerCase(search),
                    ),
                ),
        );
    }, [search, data, selected]);

    React.useEffect(() => {
        const controlModel = (e) => {
            const selectForm = document.querySelector(".form__user");
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

    const handleChange = (user, type) => {
        onChange(user, type);
        inputSearchRef.current.focus();
    };

    return (
        <>
            <div
                className={`form__user d-flex align-items-center rounded-6 border position-relative ${
                    error && "is-invalid"
                }`}
            >
                {selected.length !== 0 &&
                    selected.map((user) => (
                        <p
                            className='form__user--selected d-flex align-items-center me-2'
                            key={user.userId}
                        >
                            <span className='fs-7 me-1'>{user.fullName}</span>
                            <button
                                className='form__user--selected__btn bg-transparent border-0 d-flex p-1'
                                type='button'
                                onClick={() => handleChange(user, "REMOVE")}
                            >
                                <img
                                    src='/images/icon/close-primary.svg'
                                    alt=''
                                    className='object-fit-cover'
                                />
                            </button>
                        </p>
                    ))}
                <input
                    ref={inputSearchRef}
                    type='text'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onFocus={() => setIsOpen(true)}
                    className='form__user__search form-control d-inline-block flex-grow-1 border-0 py-0 px-1'
                />
                {isOpen && (
                    <div
                        className={`form__user__select shadow position-absolute top-100 start-0 end-0 py-2 bg-color-5 rounded-6 mt-1 `}
                    >
                        {suggestion.length === 0 ? (
                            <div className='d-flex flex-column align-items-center justify-content-center my-3'>
                                <ReactSVG src='/images/icon/empty.svg' />
                                <p className='mb-0 color-3 fs-7'>
                                    Không tìm thấy dữ liệu
                                </p>
                            </div>
                        ) : (
                            suggestion.map((user) => (
                                <button
                                    className='form__user__select__item border-0 bg-transparent d-flex align-items-center px-3 py-2 w-100'
                                    key={user.userId}
                                    type='button'
                                    onClick={() => {
                                        handleChange(user, "ADD");
                                    }}
                                >
                                    <div className='ratio ratio-40x40 overflow-hidden rounded-circle'>
                                        <img
                                            src={BASE_URL + user.photoUrl}
                                            alt=''
                                            className='object-fit-cover'
                                        />
                                    </div>
                                    <div className='d-flex flex-column align-items-start ms-2'>
                                        <span className='form__user__select__item__name fs-6 color-10'>
                                            {user.fullName || user.email}
                                        </span>
                                        {user.fullName && (
                                            <span className='form__user__select__item__email fs-8 color-3'>
                                                {user.email}
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
            {error && (
                <div className='form-text text-danger'>{errorMessage}</div>
            )}
        </>
    );
};

export default React.memo(SelectUser);
