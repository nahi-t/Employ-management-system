import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { Empbutton, columns } from "../../utile/EH.jsx";
import axios from "axios";

function List() {
  const [emp, setEmp] = useState([]);
  const [f, setf] = useState([]);

  useEffect(() => {
    const fetchemploy = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(
          "http://localhost:5000/api/emp/getemploye",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (res.data.success) {
          const data = res.data.employees.map((item, index) => ({
            sno: index + 1,
            _id: item._id,
            dep: item.department?.name || "N/A",
            name: item.userId?.name || "Unknown",
            dob: item.dateOfBirth || "N/A",
            profile: (
              <img
                className="w-25 h-25 rounded-full"
                src={`http://localhost:5000/${item.userId.profileImage}`}
              />
            ),
            action: <Empbutton id={item._id} data={emp} />,
          }));

          setEmp(data);
          setf(data);
        }
      } catch (error) {
        console.error(error);
        if (
          error.response &&
          error.response.data &&
          !error.response.data.success
        ) {
          alert(error.response.data.message || "Error fetching employees");
        }
      }
    };

    fetchemploy();
  }, []);
  const filteremp = (e) => {
    const record = emp.filter((emp) =>
      emp.name.toLowerCase().includes(e.target.value)
    );
    setf(record);
  };

  return (
    <div className="p-5">
      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold">Manage Employee</h3>
      </div>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by employee name"
          className="px-4 py-1 border border-teal-400 rounded"
          onChange={filteremp}
        />
        <Link
          to="/admin-dashboard/Adde"
          className="px-4 py-2 bg-teal-600 rounded text-white hover:bg-teal-700 transition"
        >
          Add New Employee
        </Link>
      </div>

      <div>
        <DataTable columns={columns} data={f} pagination highlightOnHover />
      </div>
    </div>
  );
}

export default List;
