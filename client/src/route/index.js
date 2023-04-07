import { MainLayout, LoginRegisterLayout } from "../layout";
import {
    Login,
    Register,
    ForgotPassword,
    ResetPassword,
    VerifyEmail,
} from "../screen";
import { Dashboard, Project, Task, User, Report, Profile } from "../pages";
const routes = [
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                index: true,
                element: <Dashboard />,
            },
            {
                path: "calendar",
                element: <Task />,
            },
            {
                path: "projects",
                element: <Project />,
            },
            {
                path: "tasks",
                element: <Task />,
            },
            {
                path: "users",
                element: <User />,
            },
            {
                path: "statistics",
                element: <Report />,
            },
            {
                path: "notifications",
                element: <Report />,
            },
            {
                path: "my-profile",
                element: <Profile />,
            },
        ],
    },
    {
        path: "/auth",
        element: <LoginRegisterLayout></LoginRegisterLayout>,
        children: [
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            },
            {
                path: "forgot-password",
                element: <ForgotPassword />,
            },
            {
                path: "reset-password",
                element: <ResetPassword />,
            },
            {
                path: "verify-email",
                element: <VerifyEmail />,
            },
        ],
    },
];

export default routes;
