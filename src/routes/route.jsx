import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout/MainLayout";
import SignUp from "../pages/SignUp/SignUp";
import SignIn from "../pages/SignIn/SignIn";
import DashLayout from "../dashboard/DashLayout/DashLayout";
import PrivateRoute from "./PrivateRoute";
import Profile from "../dashboard/Profile/Profile";
import DashBoard from "../dashboard/Dashboard/DashBoard";
import Home from "../pages/Home/Home";
import CreateReq from "../dashboard/CreateReq/CreateReq";
import UpdateReq from "../dashboard/CreateReq/UpdateReq/UpdateReq";
import DetailsReq from "../dashboard/DetailsReq/DetailsReq";
import MyRequests from "../dashboard/Dashboard/MyRequests/MyRequests";
import ViewAllUsers from "../dashboard/adminPages/ViewAllUser/ViewAllUsers";
import DonationsRequests from "../dashboard/adminPages/DonationRequests/DonationsRequests";
import AddBlog from "../dashboard/adminPages/ContentManagement/AddBlog/AddBlog";
import AllBlogs from "../dashboard/adminPages/ContentManagement/AllBlogs/AllBlogs";
import ContentManagement from "../dashboard/adminPages/ContentManagement/ContentManagement";
import EditBlog from "../dashboard/adminPages/ContentManagement/EditBlog/EditBlog";

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
                path: '/dashboard',
                // index: true,
                element: <PrivateRoute><DashBoard></DashBoard></PrivateRoute>
            },
            {
                path: 'profile',
                element: <PrivateRoute><Profile></Profile></PrivateRoute>
            }
            ,
            {
                path: 'create-donation-request',
                element: <PrivateRoute><CreateReq></CreateReq></PrivateRoute>
            }
            ,
            {
                path: 'edit-request/:id',
                element: <PrivateRoute><UpdateReq></UpdateReq></PrivateRoute>
            }
            ,
            {
                path: 'details-request/:id',
                element: <PrivateRoute><DetailsReq></DetailsReq></PrivateRoute>
            }
            ,
            {
                path: 'my-donation-requests',
                element: <PrivateRoute><MyRequests></MyRequests></PrivateRoute>
            },

            // Admin Routes

            {
                path:'all-users',
                element: <PrivateRoute><ViewAllUsers></ViewAllUsers></PrivateRoute>
            },
            {
                path: 'all-blood-donation-request',
                element: <PrivateRoute><DonationsRequests></DonationsRequests></PrivateRoute>
            },
            {
                path: 'content-management',
                element: <PrivateRoute><ContentManagement></ContentManagement></PrivateRoute>,
                children:[
                    {
                        index:true,
                        // path: 'content-management',
                        element: <PrivateRoute><AllBlogs></AllBlogs></PrivateRoute>
                    },
                    {
                        path: 'add-blog',
                        element: <PrivateRoute><AddBlog></AddBlog></PrivateRoute>
                    }
                    ,
                    {
                        path: 'edit-blog/:id',
                        element: <PrivateRoute><EditBlog></EditBlog></PrivateRoute>
                    }
                ]
            }
        ]
    }
])

export default route;