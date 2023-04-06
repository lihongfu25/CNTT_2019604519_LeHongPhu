import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { sendPasswordResetEmail } from "firebase/auth";
import auth from "../config/firebase";
import Loading from "./Loading";
import { ReactSVG } from "react-svg";

const ForgotPassword = () => {
    const [loading, setLoading] = React.useState(false);
    const [isReset, setIsReset] = React.useState(false);
    const [emailExists, setEmailExists] = React.useState(true);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();
    const onSubmit = (data) => {
        const submit = async () => {
            setLoading(true);
            await sendPasswordResetEmail(auth, data.email, {
                url: "http://localhost:3000/auth/login",
            })
                .then(() => {
                    setIsReset(true);
                    setEmailExists(true);
                })
                .catch((error) => {
                    if (error.code === "auth/user-not-found") {
                        setError("email", {
                            type: "invalid",
                        });
                        setEmailExists(false);
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        };
        submit();
    };
    return (
        <div className='forgot-password__form bg-white fade-in rounded-3 shadow-lg p-4 d-flex flex-column align-items-center justify-content-center'>
            <div className='forgot-password__form__heading mb-3 col-3'>
                <ReactSVG src='/images/logo.svg' />
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='w-100'>
                <div className='mb-3'>
                    <div
                        className={`p-3 bg-opacity-25 border rounded ${
                            emailExists
                                ? "border-success bg-success"
                                : "border-danger bg-danger"
                        }`}
                    >
                        <p
                            className={`text-center mb-0 ${
                                emailExists ? "text-success" : "text-danger"
                            }`}
                        >
                            {!emailExists
                                ? "Chúng tôi không tìm thấy tài khoản nào liên kết với email này"
                                : !isReset
                                ? "Nhập Email của bạn và hướng dẫn sẽ được gửi đến bạn!"
                                : "Kiểm tra thư của bạn và đặt lại mật khẩu của bạn."}
                        </p>
                    </div>
                </div>
                <div className='mb-4'>
                    <label htmlFor='email' className='form-label'>
                        Email đăng nhập
                    </label>
                    <input
                        type='email'
                        className={`form-control ${
                            errors.email && "is-invalid"
                        }`}
                        id='email'
                        aria-describedby='emailHelp'
                        placeholder='Nhập email'
                        {...register("email", {
                            required: true,
                        })}
                    />
                    {errors.email?.type === "required" && (
                        <div className='form-text text-danger'>
                            Vui lòng nhập trường này
                        </div>
                    )}
                    {errors.email?.type === "invalid" && (
                        <div className='form-text text-danger'>
                            Email này chưa được đăng ký
                        </div>
                    )}
                </div>
                <div className='mb-3'>
                    <button type='submit' className='btn btn--color-1 w-100'>
                        Gửi thông tin
                    </button>
                </div>
                <div className='text-center'>
                    <span className='me-2'>Bạn vẫn nhớ mật khẩu ?</span>
                    <Link
                        to='/auth/login'
                        className='color-1 fw-semibold hover-text--underline'
                    >
                        Đăng nhập
                    </Link>
                </div>
            </form>
            {loading && <Loading />}
        </div>
    );
};

export default ForgotPassword;
