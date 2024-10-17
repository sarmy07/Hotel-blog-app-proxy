import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import AdminNavigation from "./AdminNavigation";
import { useSelector } from "react-redux";

const AdminLayout = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user || user.role !== "admin") {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="container mx-auto flex flex-col md:flex-row gap-4 items-start justify-start">
      <header className="w-full lg:w-1/5 sm:w-2/5">
        <AdminNavigation />
      </header>
      <main className="bg-white w-full p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
