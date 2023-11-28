import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout/MainLayout";
import SignUp from "../pages/SignUp/SignUp";
import SignIn from "../pages/SignIn/SignIn";
import DashLayout from "../dashboard/DashLayout/DashLayout";
import PrivateRoute from "./PrivateRoute";
import Profile from "../dashboard/Profile/Profile";
import DashBoard from "../dashboard/Dashboard/DashBoard";
import Home from "../pages/Home/Home";

const route = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            }
        ]
    },
    {
        path: '/sign-up',
        element: <SignUp></SignUp>
    },
    {
        path: '/sign-in',
        element: <SignIn></SignIn>
    },
    
    // Dashboard

    {
        path: '/dashboard',
        element:<PrivateRoute><DashLayout></DashLayout></PrivateRoute> ,
        children:[
            {
                path: 'dashboard',
                // index: true,
                element: <PrivateRoute><DashBoard></DashBoard></PrivateRoute>
            },
            {
                path: 'profile',
                element: <PrivateRoute><Profile></Profile></PrivateRoute>
            }
        ]
    }
])

export default route;