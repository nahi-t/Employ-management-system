import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Salary() {
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    department: "",
    employeeId: "",
    basicSalary: "",
    allowance: "",
    deduction: "",
    payDate: "",
  });

  const baseURL =
    import.meta?.env?.VITE_API_BASE_URL?.replace(/\/$/, "") ||
    "http://localhost:5000";

  // Fetch all employees and extract unique departments
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${baseURL}/api/emp/getemploye`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.success && Array.isArray(res.data.employees)) {
          const employees = res.data.employees;
          setEmployees(employees); // store all employees
          console.log(employees);
          // Extract unique departments
          const deptMap = {};
          employees.forEach((emp) => {
            const dept = emp.department;
            if (dept && !deptMap[dept._id]) {
              deptMap[dept._id] = { _id: dept._id, name: dept.name };
            }
          });
          setDepartments(Object.values(deptMap));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [baseURL]);

  // Handle dropdown changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "department" && { employee: "" }), // reset employee when department changes
    }));
  };

  // Filter employees based on selected department
  const filteredEmployees = employees.filter(
    (emp) => emp.department._id === formData.department
  );

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Salary Data:", formData);

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `http://localhost:5000/api/salary/adds`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.data.success == true) {
        alert("Salary record submitted!");
      } else {
        console.log(res.data.mesg);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to submit salary.");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Add Salary
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Department */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Department
          </label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept._id} value={dept._id}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>

        {/* Employee (filtered by department) */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Employee
          </label>
          <select
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="">Select Employee</option>
            {filteredEmployees.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.userId.name} {/* Display employee name */}
              </option>
            ))}
          </select>
        </div>

        {/* Basic Salary */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Basic Salary
          </label>
          <input
            type="number"
            name="basicSalary"
            value={formData.basicSalary}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
            min="0"
          />
        </div>

        {/* Allowance */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Allowance
          </label>
          <input
            type="number"
            name="allowance"
            value={formData.allowance}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            min="0"
          />
        </div>

        {/* Deduction */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Deduction
          </label>
          <input
            type="number"
            name="deduction"
            value={formData.deduction}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            min="0"
          />
        </div>

        {/* Pay Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pay Date
          </label>
          <input
            type="date"
            name="payDate"
            value={formData.payDate}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-200"
        >
          Save Salary
        </button>
      </form>
    </div>
  );
}
