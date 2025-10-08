import React from "react";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="w-full bg-gradient-to-r from-teal-600 to-teal-700 shadow-md">
      <div className="max-w-7xl mx-auto px-5 py-3 flex justify-between items-center rounded-b-xl">
        {/* Welcome Text */}
        <p className="text-white font-semibold text-lg drop-shadow-md">
          Welcome, {user?.name || "Guest"}
        </p>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transform transition duration-300 hover:-translate-y-1 hover:shadow-xl active:translate-y-0"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
