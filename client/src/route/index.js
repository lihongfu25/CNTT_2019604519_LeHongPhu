import { LoginRegisterLayout, MainLayout } from "../layout";
import {
    Dashboard,
    Notification,
    Profile,
    Project,
    Report,
    Task,
    User,
} from "../pages";
import ProjectDetail from "../pages/Project/ProjectDetail/ProjectDetail";
import TaskDetail from "../pages/Task/TaskDetail/TaskDetail";
import {
    ForgotPassword,
    Login,
    Register,
    ResetPassword,
    VerifyEmail,
} from "../screen";
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
                path: "project",
                children: [
                    {
                        index: true,
                        element: <Project />,
                    },
                    {
                        path: ":projectId",
                        element: <ProjectDetail />,
                    },
                ],
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
                        element: <TaskDetail />,
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
                element: <Notification />,
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
