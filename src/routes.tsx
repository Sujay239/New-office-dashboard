// import React from 'react'
import { Navigate, useRoutes } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import UserLayout from './layouts/UserLayout';
import Dashboard from './pages/users/Dashboard';
import Tasks from './pages/users/Tasks';
import Notifications from './pages/users/Notifications';
import Attendance from './pages/users/Attendance';
import Chats from './pages/users/Chats';
import ApplyLeave from './pages/users/ApplyLeave';

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/user" replace />,
  },
  {
    path: "/user",
    element: <UserLayout />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "tasks",
        element: <Tasks />,
      },
      {
        path: "notifications",
        element: <Notifications />,
      },
      {
        path: "attendance",
        element: <Attendance />,
      },
      {
        path: "chats",
        element: <Chats />,
      },
      {
        path: "leave",
        element: <ApplyLeave />,
      },
    ],
  },
];

const AppRoutes = () => {
    const element = useRoutes(routes);
    return element;
}

export default AppRoutes;
