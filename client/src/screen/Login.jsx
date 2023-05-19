import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../config/api";
import Loading from "./Loading";
import { ReactSVG } from "react-svg";
import { useDispatch } from "react-redux";
import { userUpdateProfile } from "../redux/store/userSlice";
import { setIssues } from "../redux/store/issueSlice";
import { setNotifications } from "../redux/store/notificationSlice";
import { setProjects } from "../redux/store/projectSlice";
import { login } from "../redux/store/loginSlice";

const Login = () => {
    const [loading, setLoading] = React.useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();
    const onSubmit = (data) => {
        const submit = async () => {
            setLoading(true);
            try {
                const response = await axiosClient.post(`auth/login`, data);
                if (response.data.user.emailVerified === 0) {
                    setError("email", {
                        type: "verification",
                    });
                } else {
                    localStorage.setItem("token", response.data.token);
                    dispatch(userUpdateProfile(response.data.user));
                    dispatch(login());
                    const resData = await Promise.all([
                        axiosClient.get(`issue?userId=${response.data.user.userId}`),
                        axiosClient.get(`project?userId=${response.data.user.userId}`),
                        axiosClient.get(`notification?userId=${response.data.user.userId}`),
                    ]);
                    dispatch(setIssues(resData[0].data.data));
                    dispatch(setProjects(resData[1].data.data));
                    dispatch(setNotifications(resData[2].data.data));
                    navigate("/");
                }
            } catch (error) {
                setError("password", {
                    type: "invalid",
                });
            }
            setLoading(false);
        };
        submit();
    };
    return (
        <div className='login__form bg-white fade-in rounded-3 shadow-lg p-4 d-flex flex-column align-items-center justify-content-center'>
            <div className='login__form__heading mb-3'>
                <ReactSVG src='/images/logo@2x.svg' />
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='w-100'>
                <div className='mb-3'>
                    <label htmlFor='email' className='form-label'>
                        Email đăng nhập
                    </label>
                    <input
                        type='email'
                        className={`form-control ${((errors.email && errors.email.type !== "verification") || errors.password?.type === "invalid") && "is-invalid"}`}
                        id='email'
                        aria-describedby='emailHelp'
                        placeholder='Nhập email'
                        {...register("email", {
                            required: true,
                        })}
                    />
                    {errors.email?.type === "required" && <div className='form-text text-danger'>Vui lòng nhập trường này</div>}
                </div>
                <div className='mb-3'>
                    <label htmlFor='password' className='form-label'>
                        Mật khẩu
                    </label>
                    <input
                        type='password'
                        className={`form-control ${errors.password && "is-invalid"}`}
                        id='password'
                        placeholder='Nhập mật khẩu'
                        {...register("password", {
                            required: true,
                        })}
                    />
                    {errors.password?.type === "required" && <div className='form-text text-danger'>Vui lòng nhập trường này</div>}
                    {errors.password?.type === "invalid" && <div className='form-text text-danger'>Email đăng nhập hoặc mật khẩu không chính xác</div>}
                    {errors.email?.type === "verification" && <div className='form-text text-danger'>Tài khoản chưa được xác thực</div>}
                </div>
                <div className='d-flex justify-content-between mb-3'>
                    <div className='form-check'>
                        <input type='checkbox' className='form-check-input' id='remember' />
                        <label className='form-check-label' htmlFor='remember'>
                            Ghi nhớ tài khoản
                        </label>
                    </div>
                    <div>
                        <Link to='/auth/forgot-password' className='color-1 fw-semibold hover-text--underline'>
                            Quên mật khẩu ?
                        </Link>
                    </div>
                </div>
                <div className='mb-3'>
                    <button type='submit' className='btn btn--color-1 w-100'>
                        Đăng nhập
                    </button>
                </div>
                <div className='text-center'>
                    <span className='me-2 color-3'>Bạn chưa có tài khoản ?</span>
                    <Link to='/auth/register' className='color-1 fw-semibold hover-text--underline'>
                        Đăng ký
                    </Link>
                </div>
            </form>
            {loading && <Loading />}
        </div>
    );
};

export default Login;
