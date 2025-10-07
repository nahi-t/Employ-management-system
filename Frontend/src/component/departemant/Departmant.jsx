import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { columns, Depbutton } from "../../utile/DepartmantH.jsx";

import axios from "axios";

function Department() {
  const [dep, setDep] = useState([]);

  const [f, setf] = useState([]);
  const ondepdelet = async (id) => {
    setDep((prev) => prev.filter((item) => item.id !== id));
    setf((prev) => prev.filter((item) => item.id !== id));
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get("http://localhost:5000/api/getdep", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.success) {
          let sno = 1;
          const data = res.data.data.map((item) => ({
            sno: sno++,
            id: item._id,
            name: item.name,
            action: <Depbutton id={item._id} onDepDelete={ondepdelet} />,
          }));
          setDep(data);
          setf(data);
        }
      } catch (error) {
        console.error(error);
        if (
          error.response &&
          error.response.data &&
          !error.response.data.success
        ) {
          alert(error.response.data.message || "Error fetching departments");
        }
      }
    };
    fetchDepartments();
  }, []);
  const filterDepartments = (e) => {
    const record = dep.filter((dept) =>
      dept.name.toLowerCase().includes(e.target.value)
    );
    setf(record);
  };

  return (
    <div className="p-5 ">
      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold">Manage Department</h3>
      </div>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by department name"
          className="px-4 py-1 border border-teal-400 rounded"
          onChange={filterDepartments}
        />
        <Link
          to="/admin-dashboard/add"
          className="px-4 py-2 bg-teal-600 rounded text-white hover:bg-teal-700 transition"
        >
          Add New Department
        </Link>
      </div>

      <div className="bg-gradient-to-br from-white to-gray-400 ">
        <DataTable columns={columns} data={f} pagination highlightOnHover />
      </div>
    </div>
  );
}

export default Department;
