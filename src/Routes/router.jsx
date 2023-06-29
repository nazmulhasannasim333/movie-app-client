import React from "react";

import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Details from "../pages/Details/Details";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Explore from "../pages/Explore/Explore";
import Home from "../pages/Home/Home/Home";
import SearchResult from "../pages/SearchResult/SearchResult";

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
        element: <Details />,
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
        path: "/dashboard",
        element: <Explore />,
      },
    ],
  },
]);

export default router;
