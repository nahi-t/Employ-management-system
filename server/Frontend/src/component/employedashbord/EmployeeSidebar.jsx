import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaCalendar,
  FaMoneyBillWave,
  FaTachometerAlt,
  FaUser,
  FaBars,
  FaCogs,
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

export default function EmployeeSidebar() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const linkClasses = ({ isActive }) =>
    `flex items-center space-x-4 py-3 px-4 rounded-lg transition-colors duration-200 ${
      isActive
        ? "bg-teal-500 text-white shadow-md"
        : "text-gray-200 hover:bg-teal-600 hover:text-white"
    }`;

  return (
    <>
      {/* Hamburger Toggle for Mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 bg-teal-600 p-2 rounded-full text-white shadow-md hover:bg-teal-700 transition-colors duration-200 md:hidden"
      >
        <FaBars size={24} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen bg-gray-900 text-white shadow-lg z-40 transform transition-transform duration-300 ease-in-out
          ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 w-64 md:w-64 rounded-r-2xl`}
      >
        {/* Header */}
        <div className="bg-teal-600 h-16 flex items-center justify-center rounded-r-1xl shadow-md">
          <h3 className="text-2xl font-bold tracking-wide">EMPLOYE MS</h3>
        </div>

        {/* User Info */}
        <div className="px-6 py-4 border-b border-gray-700">
          <p className="text-sm text-gray-300">Hello,</p>
          <p className="text-lg font-semibold text-white">{user?.name}</p>
        </div>

        {/* Navigation Links */}
        <nav className="px-4 mt-4 flex flex-col space-y-2">
          <NavLink to="/employee/dashboard" className={linkClasses} end>
            <FaTachometerAlt /> <span>Dashboard</span>
          </NavLink>
          <NavLink
            to={`/employee/profile/${user?._id}`}
            className={linkClasses}
          >
            <FaUser /> <span>My Profile</span>
          </NavLink>
          <NavLink to={`/employee/salary/${user?._id}`} className={linkClasses}>
            <FaMoneyBillWave /> <span>Salary</span>
          </NavLink>
          <NavLink to="/employee/leaves" className={linkClasses}>
            <FaCalendar /> <span>Leaves</span>
          </NavLink>
          <NavLink to="/employee/Setting" className={linkClasses}>
            <FaCogs /> <span>Settings</span>
          </NavLink>
        </nav>

        {/* Footer / Optional Extra */}
        <div className="absolute bottom-0 w-full px-4 py-6 border-t border-gray-700">
          <p className="text-xs text-gray-400">© 2025 Employee MS</p>
        </div>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
        ></div>
      )}
    </>
  );
}
