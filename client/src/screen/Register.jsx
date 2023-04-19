import React from "react";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
} from "firebase/auth";
import auth from "../config/firebase";
import Loading from "./Loading";
import axiosClient from "../config/api";
import { ReactSVG } from "react-svg";

const Register = () => {
    const [loading, setLoading] = React.useState(false);
    const [isRegister, setIsRegister] = React.useState(false);
    const navigate = useNavigate();
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
            const register = async () => {
                setLoading(true);
                try {
                    const userCredential = await createUserWithEmailAndPassword(
                        auth,
                        data.email,
                        data.password,
                    );

                    await axiosClient.post("auth/register", {
                        userId: uuidv4(),
                        email: data.email,
                        password: data.password,
                    });

                    await sendEmailVerification(userCredential.user);
                    setIsRegister(true);
                } catch (error) {
                    if (error.code === "auth/email-already-in-use") {
                        setError("email", {
                            type: "already-exist",
                            message: "Email này đã được đăng ký",
                        });
                    } else if (error.response.status === 409) {
                        setError("email", {
                            type: "already-exist",
                            message: "Email này đã được đăng ký",
                        });
                    }
                }
                setLoading(false);
            };
            register();
        }
    };
    return (
        <div className='register__form bg-white fade-in rounded-3 shadow-lg p-4 d-flex flex-column align-items-center justify-content-center'>
            <div className='register__form__heading mb-3'>
                <ReactSVG src='/images/logo@2x.svg' />
            </div>
            <form className='w-100' onSubmit={handleSubmit(onSubmit)}>
                <div className='mb-3'>
                    <label htmlFor='email' className='form-label'>
                        Email đăng ký
                    </label>
                    <input
                        type='email'
                        className={`form-control ${
                            errors.email && "is-invalid"
                        }`}
                        id='email'
                        aria-describedby='emailHelp'
                        placeholder='Nhập email đăng ký tài khoản'
                        {...register("email", {
                            required: true,
                            pattern:
                                /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
                        })}
                    />
                    {errors.email?.type === "required" && (
                        <div className='form-text text-danger'>
                            Vui lòng nhập trường này
                        </div>
                    )}
                    {errors.email?.type === "pattern" && (
                        <div className='form-text text-danger'>
                            Vui lòng nhập vào email hợp lệ
                        </div>
                    )}
                    {errors.email?.type === "already-exist" && (
                        <div className='form-text text-danger'>
                            {errors.email?.message}
                        </div>
                    )}
                </div>
                <div className='mb-3'>
                    <label htmlFor='password' className='form-label'>
                        Mật khẩu
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
                <div className='mb-3'>
                    <label htmlFor='password' className='form-label'>
                        Xác nhận mật khẩu
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
                <div className='form-check mb-3'>
                    <input
                        type='checkbox'
                        className='form-check-input'
                        id='terms'
                        defaultChecked={true}
                    />
                    <label className='form-check-label' htmlFor='terms'>
                        Tôi đã đọc và đồng ý{" "}
                        <a
                            href='https://www.atlassian.com/legal/cloud-terms-of-service'
                            className='color-1 hover-text--underline'
                        >
                            Điều khoản sử dụng
                        </a>{" "}
                        và{" "}
                        <a
                            href='https://www.atlassian.com/legal/privacy-policy'
                            className='color-1 hover-text--underline'
                        >
                            Chính sách bảo mật
                        </a>{" "}
                        của WoFM.
                    </label>
                </div>
                <div className='mb-3'>
                    <button type='submit' className='btn btn--color-1 w-100'>
                        Đăng ký
                    </button>
                </div>
                <div className='text-center'>
                    <span className='me-2 color-3'>Bạn đã có tài khoản ?</span>
                    <Link
                        to='/auth/login'
                        className='color-1 fw-semibold hover-text--underline'
                    >
                        Đăng nhập
                    </Link>
                </div>
            </form>
            {isRegister && (
                <div className='position-absolute top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center fade-in'>
                    <div className='position-absolute top-0 bottom-0 start-0 end-0 bg-dark bg-opacity-25 z-2'></div>
                    <div className='container z-2'>
                        <div className='p-4 mx-auto col-4 z-3 shadow-lg rounded-3 bg-color-5'>
                            <div className='text-center mb-2'>
                                <ReactSVG
                                    src='/images/icon/check.svg'
                                    className='object-fit-cover'
                                />
                            </div>
                            <div className='text-center'>
                                <p className='color-1 fs-4'>
                                    Đăng ký tài khoản thành công
                                </p>
                                <p className='color-3'>
                                    Vui lòng kiểm tra email và xác thực tài
                                    khoản trước khi đăng nhập
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

export default Register;
