import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Leavebutton, columns } from "../../utile/Lh";

export default function Leveslist() {
  const [leaves, setLeaves] = useState([]);
  const [filteredLeaves, setFilteredLeaves] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchLeaves = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(
          "http://localhost:5000/api/leaves/getleaves",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.data.success) {
          const data = res.data.leaves.map((item, index) => ({
            sno: index + 1,
            _id: item._id,
            employeeId: item.employeeId?.employeeId || "N/A",
            name: item.employeeId?.userId?.name || "N/A",
            dep: item.employeeId?.department?.name || "N/A",
            days:
              (new Date(item.toDate) - new Date(item.fromDate)) /
                (1000 * 60 * 60 * 24) +
                1 || 0,
            dob: item.employeeId?.dateOfBirth || null,
            status: item.status,
            leaveType: item.leaveType,
            description: item.description,
            action: <Leavebutton id={item._id} />,
          }));

          setLeaves(data);
          setFilteredLeaves(data);
        }
      } catch (error) {
        console.error(error);
        alert(error.response?.data?.message || "Error fetching leaves");
      }
    };

    fetchLeaves();
  }, []);

  // Search input handler
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    filterLeaves(query, null); // apply search without status filter
  };

  // Status filter handler
  const handleFilterStatus = (status) => {
    filterLeaves(searchQuery, status);
  };

  // Combined filter function
  const filterLeaves = (query, status) => {
    let data = [...leaves];

    if (query) {
      data = data.filter(
        (leave) =>
          leave.employeeId.toLowerCase().includes(query) ||
          leave.name.toLowerCase().includes(query) ||
          leave.status.toLowerCase().includes(query)
      );
    }

    if (status) {
      data = data.filter(
        (leave) => leave.status.toLowerCase() === status.toLowerCase()
      );
    }

    setFilteredLeaves(data);
  };

  return (
    <div className="flex justify-center items-start min-h-screen py-10 px-4">
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden w-full max-w-6xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-600 to-cyan-500 p-6">
          <h3 className="text-2xl md:text-3xl font-bold text-white tracking-wide">
            Manage Leaves
          </h3>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Search */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <input
              type="text"
              placeholder="Search by employee, name, or status…"
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              onChange={handleSearch}
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3 mt-3">
            {["Pending", "Approved", "Rejected"].map((status) => (
              <button
                key={status}
                onClick={() => handleFilterStatus(status)}
                className="px-6 py-2 rounded-full text-sm font-medium bg-teal-600 text-white shadow-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
              >
                {status}
              </button>
            ))}
            <button
              onClick={() => setFilteredLeaves(leaves)}
              className="px-6 py-2 rounded-full text-sm font-medium bg-gray-500 text-white shadow-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
            >
              All
            </button>
          </div>

          {/* DataTable */}
          <DataTable columns={columns} data={filteredLeaves} pagination />
        </div>
      </div>
    </div>
  );
}
