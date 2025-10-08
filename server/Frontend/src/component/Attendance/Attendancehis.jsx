import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";

export default function AttendanceHistory() {
  const [recordsByDay, setRecordsByDay] = useState({});
  const [search, setSearch] = useState("");
  const [expandedDays, setExpandedDays] = useState({}); // Track collapsed/expanded days

  const baseURL =
    import.meta?.env?.VITE_API_BASE_URL?.replace(/\/$/, "") ||
    "http://localhost:5000";

  useEffect(() => {
    const fetchAttendanceHistory = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(`${baseURL}/api/attendance/history`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.success) {
          const grouped = {};
          res.data.records.forEach((item) => {
            const date = item.date;
            if (!grouped[date]) grouped[date] = [];
            grouped[date].push({
              sno: grouped[date].length + 1,
              empid: item.employeeId?.employeeId || "N/A",
              name: item.employeeId?.userId?.name || "Unknown",
              email: item.employeeId?.userId?.email || "N/A",
              department: item.employeeId?.department?.name || "N/A",
              status: item.status,
            });
          });
          setRecordsByDay(grouped);

          // Default: expand the latest day
          const sortedDays = Object.keys(grouped).sort(
            (a, b) => new Date(b) - new Date(a)
          );
          const initialExpanded = {};
          sortedDays.forEach((day, index) => {
            initialExpanded[day] = index === 0; // expand only newest day
          });
          setExpandedDays(initialExpanded);
        }
      } catch (error) {
        console.error("Error fetching attendance history:", error);
        alert(
          error.response?.data?.message || "Failed to fetch attendance history"
        );
      }
    };

    fetchAttendanceHistory();
  }, [baseURL]);

  const toggleDay = (day) => {
    setExpandedDays((prev) => ({ ...prev, [day]: !prev[day] }));
  };

  const columns = [
    { name: "S.No", selector: (row) => row.sno, sortable: true, width: "70px" },
    { name: "Employee ID", selector: (row) => row.empid, sortable: true },
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Email", selector: (row) => row.email, sortable: true },
    { name: "Department", selector: (row) => row.department, sortable: true },
    { name: "Status", selector: (row) => row.status, sortable: true },
  ];

  return (
    <div className="p-5">
      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold">
          Attendance History (Grouped by Day)
        </h3>
      </div>

      <input
        type="text"
        placeholder="Search by employee name"
        className="px-4 py-2 border border-gray-300 rounded mb-6 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-teal-400"
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
      />

      {Object.keys(recordsByDay)
        .sort((a, b) => new Date(b) - new Date(a)) // newest day first
        .map((date) => {
          const filteredData = recordsByDay[date].filter((r) =>
            r.name.toLowerCase().includes(search)
          );

          return (
            <div key={date} className="mb-4 border rounded shadow-sm">
              {/* Day Header */}
              <div
                className="cursor-pointer px-4 py-2 bg-teal-100 hover:bg-teal-200 flex justify-between items-center"
                onClick={() => toggleDay(date)}
              >
                <h4 className="text-lg font-semibold">{date}</h4>
                <span>{expandedDays[date] ? "▼" : "►"}</span>
              </div>

              {/* Table for the day */}
              {expandedDays[date] && (
                <div className="p-4">
                  <DataTable
                    columns={columns}
                    data={filteredData}
                    pagination
                    highlightOnHover
                    responsive
                    noDataComponent="No records found for this day"
                  />
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
}
