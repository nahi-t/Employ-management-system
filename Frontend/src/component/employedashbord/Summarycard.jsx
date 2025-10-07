import React from "react";
import { FaUsers } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

export default function SummaryCard() {
  const { user } = useAuth();

  return (
    <div className="max-w-sm mx-auto">
      <div className="relative flex items-center  from-white  to-gray-700 rounded-2xl shadow-lg transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
        {/* Icon */}
        <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-r from-teal-500 to-teal-700 text-white flex items-center justify-center text-3xl m-4 shadow-inner">
          <FaUsers />
        </div>

        {/* Text */}
        <div className="pr-6 py-4">
          <p className="text-gray-500 text-sm font-medium">Welcome back</p>
          <p className="text-gray-800 text-xl font-bold">{user.name}</p>
        </div>

        {/* Decorative shadow effect */}
        <div className="absolute top-0 left-0 w-full h-full rounded-2xl bg-gradient-to-r from-teal-100 to-teal-200 opacity-20 -z-10"></div>
      </div>
    </div>
  );
}
