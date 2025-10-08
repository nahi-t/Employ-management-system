import React from "react";
import { Outlet } from "react-router-dom"; // Import Outlet
import Adminsidbar from "../component/dashbord/Adminsidbar";
import Navbar from "../component/dashbord/Navbar";

function Admindash() {
  return (
    <div className="flex">
      <Adminsidbar />
      <div className="flex-1 ml-64  bg-gradient-to-br from-white to-gray-400  h-screen">
        <Navbar />

        {/* Nested Routes (like Adminsummery, Department, etc.) will render here */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Admindash;
