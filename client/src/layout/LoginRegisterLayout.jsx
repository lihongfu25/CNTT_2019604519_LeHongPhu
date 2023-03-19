import React from "react";
import {
    createSearchParams,
    Outlet,
    useNavigate,
    useSearchParams,
} from "react-router-dom";
import "../styles/auth/auth.scss";

const LoginRegisterLayout = ({ children }) => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    React.useEffect(() => {
        if (searchParams.get("mode") === "resetPassword") {
            navigate({
                pathname: "reset-password",
                search: createSearchParams({
                    mode: searchParams.get("mode"),
                    oobCode: searchParams.get("oobCode"),
                }).toString(),
            });
        } else if (searchParams.get("mode") === "verifyEmail") {
            navigate({
                pathname: "verify-email",
                search: createSearchParams({
                    mode: searchParams.get("mode"),
                    oobCode: searchParams.get("oobCode"),
                }).toString(),
            });
        }
    }, [searchParams, navigate]);
    return (
        <div className='auth position-fixed top-0 bottom-0 start-0 end-0 d-flex align-items-center justify-content-center'>
            <div className='position-absolute top-0 bottom-0 start-0 end-0 bg-dark bg-opacity-25 z-1'></div>
            <div className='container z-2'>
                <div className='col-12 col-md-5 mx-auto'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default LoginRegisterLayout;
