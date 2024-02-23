import Chart from "../components/Chart";
import Dashboard from "../components/Dashboard";
import ForgotPassword from "../components/ForgotPassword";
import Home from "../components/Home";
import Login from "../components/Login";
import ResetPassword from "../components/ResetPassword";
import Signin from "../components/Signin";

const AppRoutes = [
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/add-user",
        element: <Signin />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/dashboard",
        element: <Dashboard />
    },
    {
        path: "/forgot-password",
        element: <ForgotPassword />
    }
    ,
    {
        path: "/reset-password/:token",
        element: <ResetPassword />
    }
    ,
    {
        path: "/chart",
        element: <Chart />
    }


]

export default AppRoutes