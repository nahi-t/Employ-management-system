import React from "react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import List from "./List";

function Leaves() {
  return (
    <div className="p-5">
      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold">Manage Employee</h3>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="relative w-full max-w-sm font-sans">
          {/* Search Icon */}
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>

          {/* Input */}
          <input
            type="text"
            // value={value}
            // onChange={onChange}
            placeholder={"search...."}
            className="w-3px pl-10 pr-4 py-2 border border-slate-800 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none bg-white text-gray-700 placeholder-gray-400 shadow-sm transition duration-200"
          />
        </div>
        <Link
          to="/employee/Addleaves"
          className="px-4 py-2 bg-teal-600 rounded text-white hover:bg-teal-700 transition"
        >
          Add New Leaves
        </Link>
      </div>
      <List />
    </div>
  );
}

export default Leaves;
