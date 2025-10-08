import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { Atendancebutton, columns } from "../../utile/Ah.jsx";
import axios from "axios";

export default function Attendance() {
  const [emp, setEmp] = useState([]);
  const [filteredEmp, setFilteredEmp] = useState([]);

  const baseURL =
    import.meta?.env?.VITE_API_BASE_URL?.replace(/\/$/, "") ||
    "http://localhost:5000";

  useEffect(() => {
    const fetchAttendance = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(`${baseURL}/api/attendance/geta`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("✅ Response:", res.data);

        if (res.data.success && Array.isArray(res.data.records)) {
          const data = res.data.records.map((item, index) => ({
            sno: index + 1,
            id: item._id,
            empid: item.employeeId?.employeeId || "N/A",
            name: item.employeeId?.userId?.name || "Unknown",
            email: item.employeeId?.userId?.email || "N/A",
            dep: item.employeeId?.department?.name || "N/A",
            gender: item.employeeId?.gender || "N/A",
            designation: item.employeeId?.designation || "N/A",
            status: item.status,
            action: (
              <Atendancebutton status={item.status} data={item} id={item._id} />
            ),
          }));

          setEmp(data);
          setFilteredEmp(data);
        } else {
          console.error("❌ Unexpected response format:", res.data);
        }
      } catch (error) {
        console.error("❌ Error fetching attendance:", error);
        alert(
          error.response?.data?.message || "Error fetching attendance data"
        );
      }
    };

    fetchAttendance();
  }, [baseURL]);

  const filteremp = (e) => {
    const search = e.target.value.toLowerCase();
    const record = emp.filter((item) =>
      item.name.toLowerCase().includes(search)
    );
    setFilteredEmp(record);
  };

  return (
    <div className="p-5">
      {/* Header */}
      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold">Attendance Management</h3>
      </div>

      {/* Search and Add Button */}
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <input
          type="text"
          placeholder="Search by employee name"
          className="px-4 py-2 border border-teal-400 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
          onChange={filteremp}
        />
        <p className="text-lg font-semibold">
          Mark Employee Attendance for{" "}
          <span className="font-bold underline text-gray-600">
            {new Date().toISOString().split("T")[0]}
          </span>
        </p>

        <Link
          to="/admin-dashboard/attendance-history"
          className="px-4 py-2 bg-teal-600 rounded text-white hover:bg-teal-700 transition"
        >
          View Attendance Report
        </Link>
      </div>

      {/* Data Table */}
      <DataTable
        columns={columns}
        data={filteredEmp}
        pagination
        highlightOnHover
        responsive
      />
    </div>
  );
}
