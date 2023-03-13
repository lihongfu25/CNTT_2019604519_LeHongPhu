import React from "react";
import { applyActionCode } from "firebase/auth";
import { BASE_URL } from "../config/api";
import auth from "../config/firebase";
import { useSearchParams, useNavigate } from "react-router-dom";
import Loading from "./Loading";

const VerifyEmail = () => {
    const [loading, setLoading] = React.useState(false);
    const [verified, setVerified] = React.useState(false);
    const [countdown, setCountdown] = React.useState(10);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (verified) {
            var interval = setInterval(() => {
                if (countdown === 1) {
                    clearInterval(interval);
                    navigate("/auth/login");
                } else {
                    setCountdown((prev) => prev - 1);
                }
            }, 1000);
        }
        return () => {
            clearInterval(interval);
        };
    }, [verified, countdown, navigate]);
    const handleRedict = () => {
        navigate("/auth/login");
    };
    const handleSubmit = () => {
        const verify = async () => {
            setLoading(true);
            await applyActionCode(auth, searchParams.get("oobCode"))
                .then((res) => {
                    console.log(res);
                })
                .catch((error) => {
                    console.log(error);
                })
                .finally(() => {
                    setLoading(false);
                    setVerified(true);
                });
        };
        verify();
    };
    return (
        <div className='position-absolute top-0 bottom-0 start-0 end-0 bg-secondary-subtle d-flex justify-content-center align-items-center'>
            <div className='container'>
                {verified ? (
                    <div className='col-4 p-4 shadow-lg rounded-3 mx-auto fade-in'>
                        <div className='col-4 mx-auto mb-4'>
                            <img
                                src={BASE_URL + "images/icon/check.svg"}
                                alt=''
                                className='w-100 object-fit-cover'
                            />
                        </div>
                        <div className='text-center'>
                            <p className='fs-3 color-1'>
                                Xác thực tài khoản thành công
                            </p>
                            <p className='color-10'>
                                Bây giờ bạn đã có thể đăng nhập và sử dụng ứng
                                dụng của chúng tôi.
                            </p>
                            <button
                                className='btn btn--color-1 col-6 mb-3'
                                onClick={handleRedict}
                            >
                                Trở về trang chủ
                            </button>
                            <p className='color-3'>
                                Tự động về trang chủ sau {countdown} giây.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className='col-4 p-4 shadow-lg rounded-3 mx-auto'>
                        <div className='col-4 mx-auto mb-4'>
                            <img
                                src={BASE_URL + "images/icon/email.svg"}
                                alt=''
                                className='w-100 object-fit-cover'
                            />
                        </div>
                        <div className='text-center'>
                            <p className='fs-3 color-1'>
                                Xác thực tài khoản email
                            </p>
                            <p className='color-10'>
                                Cảm ơn bạn đã đăng ký sử dụng dịch vụ của chúng
                                tôi. Vui lòng bấm <label htmlFor=''>nút</label>{" "}
                                bên dưới để hoàn tất việc xác thực tài khoản
                                email của bạn.
                            </p>
                            <button
                                className='btn btn--color-1 col-6 mb-3'
                                onClick={handleSubmit}
                            >
                                Xác thực
                            </button>
                            <p className='color-3'>
                                Nếu bạn không yêu cầu xác thực email này, vui
                                lòng bỏ qua.
                            </p>
                        </div>
                    </div>
                )}
                {loading && <Loading />}
            </div>
        </div>
    );
};

export default VerifyEmail;
