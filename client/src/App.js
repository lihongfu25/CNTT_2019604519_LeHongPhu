import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import axiosClient from "./config/api";
import { setIssues } from "./redux/store/issueSlice";
import { userUpdateProfile } from "./redux/store/userSlice";
import routes from "./route";
import { setProjects } from "./redux/store/projectSlice";
import { setNotifications } from "./redux/store/notificationSlice";
import { login } from "./redux/store/loginSlice";

function App() {
    const loginState = useSelector((state) => state.login);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const getData = async () => {
                try {
                    axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                    const response = await axiosClient.get("auth/token");
                    dispatch(userUpdateProfile(response.data.data));
                    dispatch(login());
                    const resData = await Promise.all([
                        axiosClient.get(`issue?userId=${response.data.data.userId}`),
                        axiosClient.get(`project?userId=${response.data.data.userId}`),
                        axiosClient.get(`notification?userId=${response.data.data.userId}`),
                    ]);
                    dispatch(setIssues(resData[0].data.data));
                    dispatch(setProjects(resData[1].data.data));
                    dispatch(setNotifications(resData[2].data.data));
                } catch (error) {
                    if (error.response.status === 401) {
                        localStorage.removeItem("token");
                        navigate("/auth/login");
                    }
                }
            };
            if (!loginState.isLogin) getData();
        } else if (!location.pathname.includes("auth")) {
            navigate("/auth/login");
        }
    }, [location, navigate, dispatch]);
    const appRoutes = useRoutes(routes);
    return <div>{appRoutes}</div>;
}
export default App;
