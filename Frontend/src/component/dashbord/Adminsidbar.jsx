import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaBuilding,
  FaCalendar,
  FaCogs,
  FaMoneyBillWave,
  FaTachometerAlt,
  FaUser,
  FaBars,
} from "react-icons/fa";

function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const linkClasses = ({ isActive }) =>
    `flex items-center space-x-4 py-2.5 px-4 rounded hover:bg-teal-700 ${
      isActive ? "bg-teal-500 text-white" : ""
    }`;

  return (
    <div>
      {/* Hamburger Toggle Button */}
      {/* <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 bg-teal-600 p-2 rounded text-white hover:bg-teal-700"
      >
        <FaBars size={24} />
      </button> */}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white transform
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        transition-transform duration-300 ease-in-out z-40`}
      >
        <div className="bg-teal-600 h-12 flex items-center justify-center">
          <h3 className="text-2xl font-Pacifico">EMPLOYE MS</h3>
        </div>
        <div className="px-4 space-y-2 mt-4">
          <NavLink to="/admin-dashboard" className={linkClasses} end>
            <FaTachometerAlt /> <span>Dashboard</span>
          </NavLink>
          <NavLink to="/admin-dashboard/employees" className={linkClasses}>
            <FaUser /> <span>Employees</span>
          </NavLink>
          <NavLink to="/admin-dashboard/department" className={linkClasses}>
            <FaBuilding /> <span>Department</span>
          </NavLink>
          <NavLink to="/admin-dashboard/salary" className={linkClasses}>
            <FaMoneyBillWave /> <span>Salary</span>
          </NavLink>
          <NavLink to="/admin-dashboard/leaves" className={linkClasses}>
            <FaCalendar /> <span>Leaves</span>
          </NavLink>
          <NavLink to="/admin-dashboard/attendance" className={linkClasses}>
            <FaCalendar /> <span>Attendance</span>
          </NavLink>

          <NavLink to="/admin-dashboard/settings" className={linkClasses}>
            <FaCogs /> <span>Settings</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default AdminSidebar;
