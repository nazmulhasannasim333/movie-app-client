import React from "react";

import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import UserProfile from "../components/UserProfile/UserProfile";
import UserProfileUpdate from "../components/UserProfileUpdate/UserProfileUpdate";
import Dashboard from "../pages/Dashboard/Dashboard";
import FavoriteVideos from "../pages/Dashboard/UserDashboard/FavoriteVideos";
import WatchLater from "../pages/Dashboard/UserDashboard/WatchLater";
import Details from "../pages/Details/Details";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Explore from "../pages/Explore/Explore";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import SearchResult from "../pages/SearchResult/SearchResult";
import Signup from "../pages/Signup/Signup";
import Subscription from "../pages/Subscription/Subscription";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/:mediaType/:id",
        element: <PrivateRoute><Details /></PrivateRoute>,
      },
      {
        path: "/search/:query",
        element: <SearchResult />,
      },
      {
        path: "/explore/:mediaType",
        element: <Explore />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/subscription",
        element: <Subscription />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: 'favoritevideos',
        element: <FavoriteVideos />
      },
      {
        path: 'watchlater',
        element: <WatchLater />
      },
      {
        path: 'userprofile',
        element: <UserProfile />
      },
      // update profile
      {
        path: 'updateProfile/:id',
        element: <UserProfileUpdate />,
        loader: ({params})=> fetch(`http://localhost:5000/getprofileinfo/${params.id}`)
      },
    ]
  },
]);

export default router;
