import React from "react";

import { createBrowserRouter } from "react-router-dom";

import { SignIn, SignUp } from "./components";
import { Home, History, Auth, ViewQuery } from "./pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/home",
    element: <Home />
  },
  {
    path: "history",
    element: <History />,
  },
  {
    path: "auth",
    element: <Auth />,
    children: [
      {
        path: "sign-up",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "query/:id",
    element: <ViewQuery />,
  },
]);
