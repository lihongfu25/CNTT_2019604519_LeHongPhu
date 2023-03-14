import React from "react";
import { useForm } from "react-hook-form";
import { confirmPasswordReset } from "firebase/auth";
import { useSearchParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../config/api";
import auth from "../config/firebase";
import Loading from "./Loading";

const ResetPassword = () => {
    const [loading, setLoading] = React.useState(false);
    const [isReset, setIsReset] = React.useState(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();
    const handleRedict = () => {
        navigate("/auth/login");
    };
    const onSubmit = (data) => {
        if (data.confirm !== data.password) {
            setError("confirm", {
                type: "invalid",
                message: "Nhập lại mật khẩu không chính xác",
            });
        } else {
            const submit = async () => {
                setLoading(true);
                await confirmPasswordReset(
                    auth,
                    searchParams.get("oobCode"),
                    data.password,
                )
                    .then(() => {
                        setLoading(false);
                        setIsReset(true);
                    })
                    .catch((error) => {
                        console.log(error);
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            };
            submit();
        }
    };
    return (
        <div className='forgot-password__form bg-white fade-in rounded-3 shadow-lg p-4 d-flex flex-column align-items-center justify-content-center'>
            <div className='forgot-password__form__heading mb-3 col-3'>
                <img
                    src={BASE_URL + "images/logo2.png"}
                    alt=''
                    className='w-100 object-fit-cover'
                />
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='w-100'>
                <div className='mb-4'>
                    <label htmlFor='password' className='form-label'>
                        Nhập mật khẩu mới
                    </label>
                    <input
                        type='password'
                        className={`form-control ${
                            errors.password && "is-invalid"
                        }`}
                        id='password'
                        placeholder='Nhập mật khẩu'
                        {...register("password", {
                            required: true,
                            minLength: 8,
                        })}
                    />
                    {errors.password?.type === "required" && (
                        <div className='form-text text-danger'>
                            Vui lòng nhập trường này
                        </div>
                    )}
                    {errors.password?.type === "minLength" && (
                        <div className='form-text text-danger'>
                            Mật khẩu tối thiểu phải có 8 kí tự
                        </div>
                    )}
                </div>
                <div className='mb-4'>
                    <label htmlFor='confirm' className='form-label'>
                        Nhập lại mật khẩu mới
                    </label>
                    <input
                        type='password'
                        className={`form-control ${
                            errors.confirm && "is-invalid"
                        }`}
                        id='confirm'
                        placeholder='Nhập mật khẩu'
                        {...register("confirm", {
                            required: true,
                            minLength: 8,
                        })}
                    />
                    {errors.confirm?.type === "required" && (
                        <div className='form-text text-danger'>
                            Vui lòng nhập trường này
                        </div>
                    )}
                    {errors.confirm?.type === "minLength" && (
                        <div className='form-text text-danger'>
                            Mật khẩu tối thiểu phải có 8 kí tự
                        </div>
                    )}
                    {errors.confirm?.type === "invalid" && (
                        <div className='form-text text-danger'>
                            {errors.confirm?.message}
                        </div>
                    )}
                </div>
                <div className='mb-3'>
                    <button type='submit' className='btn btn--color-1 w-100'>
                        Xác nhận
                    </button>
                </div>
            </form>
            {isReset && (
                <div className='position-absolute top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center fade-in'>
                    <div className='position-absolute top-0 bottom-0 start-0 end-0 bg-dark bg-opacity-25 z-2'></div>
                    <div className='container z-2'>
                        <div className='p-4 mx-auto col-3 z-3 shadow-lg rounded-3 bg-light'>
                            <div className='col-2 mx-auto mb-1 p-2'>
                                <img
                                    src={BASE_URL + "images/icon/check.svg"}
                                    alt=''
                                    className='w-100 object-fit-cover'
                                />
                            </div>
                            <div className='text-center'>
                                <p className='color-3'>
                                    Đặt mật khẩu mới thành công
                                </p>
                            </div>
                            <div className='text-center'>
                                <button
                                    className='btn btn--color-1 col-4 mx-auto'
                                    onClick={handleRedict}
                                >
                                    Đóng
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {loading && <Loading />}
        </div>
    );
};

export default ResetPassword;
