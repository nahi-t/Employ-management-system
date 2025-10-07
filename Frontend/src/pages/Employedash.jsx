import React from "react";
import { Outlet } from "react-router-dom"; // Import Outlet
import EmployeeSidebar from "../component/employedashbord/EmployeeSidebar";
import Navbar from "../component/dashbord/Navbar";

function Employedash() {
  return (
    <div className="flex bg-gradient-to-br from-white to-gray-700">
      <EmployeeSidebar />
      <div className="flex-1 ml-64  from-white  to-gray-700 h-screen">
        <Navbar />

        {/* Nested Routes (like Adminsummery, Department, etc.) will render here */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Employedash;
