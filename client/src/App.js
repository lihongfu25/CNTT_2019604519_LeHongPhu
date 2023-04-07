import { useEffect } from "react";
import { useNavigate, useRoutes } from "react-router-dom";
import axiosClient from "./config/api";
import routes from "./route";
import { useDispatch } from "react-redux";
import { userUpdateProfile } from "./redux/store/userSlice";

function App() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axiosClient.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${token}`;
            axiosClient
                .get("auth/token")
                .then((response) => {
                    dispatch(userUpdateProfile(response.data.data));
                    navigate("/");
                })
                .catch((error) => {
                    if (error.response.status === 401) {
                        localStorage.removeItem("token");
                        navigate("/auth/login");
                    }
                });
        }
    }, []);
    const appRoutes = useRoutes(routes);
    return <div>{appRoutes}</div>;
}
export default App;
