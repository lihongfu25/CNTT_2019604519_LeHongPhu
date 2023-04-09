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
                path: "project",
                element: <Project />,
            },
            {
                path: "task",
                children: [
                    {
                        index: true,
                        element: <Task />,
                    },
                    {
                        path: ":issueId",
                        element: <Task />,
                    },
                ],
            },
            {
                path: "user",
                element: <User />,
            },
            {
                path: "statistical",
                element: <Report />,
            },
            {
                path: "notification",
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
