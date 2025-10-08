import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { Empbutton, columns } from "../../utile/EH.jsx";
import axios from "axios";

export default function List() {
  const [emp, setEmp] = useState([]);
  const [filteredEmp, setFilteredEmp] = useState([]);

  const baseURL =
    import.meta?.env?.VITE_API_BASE_URL?.replace(/\/$/, "") ||
    "http://localhost:5000";

  useEffect(() => {
    const fetchemploy = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(`${baseURL}/api/emp/getemploye`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(res.data);
        if (res.data.success) {
          const data = res.data.employees.map((item, index) => ({
            sno: index + 1,
            _id: item._id,
            dep: item.department?.name || "N/A",
            name: item.userId?.name || "Unknown",
            dob: item.dateOfBirth
              ? new Date(item.dateOfBirth).toLocaleDateString()
              : "N/A",
            profile: (
              <img
                className="w-16 h-16 rounded-full object-cover"
                src={
                  item.image
                    ? `${baseURL}/uploades/${item.image}`
                    : "https://via.placeholder.com/150"
                }
                alt={item.userId?.name || "Employee"}
              />
            ),
            action: <Empbutton id={item._id} data={item} />,
          }));

          setEmp(data);
          setFilteredEmp(data);
        }
      } catch (error) {
        console.error(error);
        alert(error.response?.data?.message || "Error fetching employees");
      }
    };

    fetchemploy();
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
        <h3 className="text-2xl font-bold">Manage Employees</h3>
      </div>

      {/* Search and Add Button */}
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <input
          type="text"
          placeholder="Search by employee name"
          className="px-4 py-2 border border-teal-400 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
          onChange={filteremp}
        />
        <Link
          to="/admin-dashboard/Adde"
          className="px-4 py-2 bg-teal-600 rounded text-white hover:bg-teal-700 transition"
        >
          Add New Employee
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
