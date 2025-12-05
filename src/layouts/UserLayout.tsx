import React from "react";
import { Outlet } from "react-router-dom";
import UserSidebar from "../components/UserSidebar";

const UserLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300 flex">
      <UserSidebar />

      {/* Page content */}
      <main className="mx-auto w-[80vw] sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
