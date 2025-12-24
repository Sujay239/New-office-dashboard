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
import Settings from './pages/users/Settings';
import Payroll from './pages/users/Payroll';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageAdmins from './pages/admin/ManageAdmins';
import AdminAttendance from './pages/admin/AdminAttendance';
import Employees from './pages/admin/Employees';
import AdminLeaves from './pages/admin/AdminLeaves';
import AdminPayroll from './pages/admin/AdminPayroll';
import AdminSettings from './pages/admin/AdminSettings';
import PastEmployees from './pages/admin/PastEmployees';

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
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "payroll",
        element: <Payroll />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "",
        element: <AdminDashboard />,
      },
      {
        path: "employees",
        element: <Employees />,
      },
      {
        path: "leaves",
        element: <AdminLeaves />,
      },
      {
        path: "manage-admins",
        element: <ManageAdmins />,
      },
      {
        path: "attendance",
        element: <AdminAttendance />,
      },
      {
        path: "payroll",
        element: <AdminPayroll />,
      },
      {
        path: "settings",
        element: <AdminSettings />,
      },
      {
        path: "past-employees",
        element: <PastEmployees />,
      },
    ],
  },
];

const AppRoutes = () => {
  const element = useRoutes(routes);
  return element;
}

export default AppRoutes;
