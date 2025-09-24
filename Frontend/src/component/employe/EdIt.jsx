import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
function EdIt() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [departments, setDepartments] = useState([]);

  const baseURL =
    import.meta?.env?.VITE_API_BASE_URL?.replace(/\/$/, "") ||
    "http://localhost:5000";

  // fetch single employee
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(
          `${baseURL}/api/emp/getemploye/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setEmployee(data.employee || null);
      } catch (err) {
        console.error("Error fetching employee:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee();
  }, [id, baseURL]);

  // fetch all departments
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${baseURL}/api/getdep`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success) setDepartments(res.data.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
        alert("Error fetching departments");
      }
    };
    fetchDepartments();
  }, [baseURL]);

  // update nested user fields
  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({
      ...prev,
      userId: { ...prev.userId, [name]: value },
    }));
  };

  // update top-level employee fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // department select (store ObjectId, not name)
  const handleDepartmentChange = (e) => {
    const { value } = e.target;
    setEmployee((prev) => ({
      ...prev,
      department: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      name: employee.userId.name,
      email: employee.userId.email,
      employeeId: employee.employeeId,
      designation: employee.designation,
      salary: employee.salary,
      dateOfBirth: employee.dateOfBirth,
      gender: employee.gender,
      maritalStatus: employee.maritalStatus,
      department:
        typeof employee.department === "string"
          ? employee.department
          : employee.department?._id,
    };
    console.log(payload);
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/emp/updateemploye/${id}`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Employee updated");

      alert("Employee updated successfully");
      navigate(`/admin-dashboard/employees/View/${id}`);
    } catch (err) {
      console.log(err.response.data.messages);

      console.error("Error updating employee:", err);
      alert("Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="p-6 text-center">
        <p className="text-lg font-medium">Employee not found</p>
        <Link
          to="/employees"
          className="inline-flex mt-4 px-4 py-2 rounded-xl bg-black text-white hover:bg-gray-800"
        >
          Go Back
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Edit Employee</h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white p-6 rounded-2xl shadow-lg"
        >
          {/* Profile image preview */}
          {employee.userId.profileImage && (
            <div className="flex items-center gap-6">
              <img
                src={`${baseURL}/${employee.userId.profileImage}`}
                alt={employee.userId.name}
                className="h-32 w-32 rounded-xl object-cover ring-2 ring-gray-200"
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Full Name"
              name="name"
              value={employee.userId.name}
              onChange={handleUserChange}
            />
            <InputField
              label="Email"
              name="email"
              type="email"
              value={employee.userId.email}
              onChange={handleUserChange}
            />
            <InputField
              label="Employee ID"
              name="employeeId"
              value={employee.employeeId}
              onChange={handleChange}
            />
            <InputField
              label="Designation"
              name="designation"
              value={employee.designation}
              onChange={handleChange}
            />
            <InputField
              label="Salary"
              name="salary"
              type="number"
              value={employee.salary}
              onChange={handleChange}
            />
            <InputField
              label="Date of Birth"
              name="dateOfBirth"
              type="date"
              value={employee.dateOfBirth?.substring(0, 10)}
              onChange={handleChange}
            />

            {/* Department dropdown */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Department
              </label>
              <select
                name="department"
                value={
                  typeof employee.department === "string"
                    ? employee.department
                    : employee.department?._id
                }
                onChange={handleDepartmentChange}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="">Select Department</option>
                {departments.map((d) => (
                  <option key={d._id} value={d._id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            <SelectField
              label="Gender"
              name="gender"
              value={employee.gender}
              onChange={handleChange}
              options={["Male", "Female", "Other"]}
            />
            <SelectField
              label="Marital Status"
              name="maritalStatus"
              value={employee.maritalStatus}
              onChange={handleChange}
              options={["Single", "Married", "Divorced"]}
            />
          </div>

          <div className="flex justify-end gap-4">
            <Link
              to={`/employees/${id}`}
              className="px-5 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 rounded-xl bg-black text-white font-medium hover:bg-gray-800 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function InputField({ label, name, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value || ""}
        onChange={onChange}
        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
      />
    </div>
  );
}

function SelectField({ label, name, value, onChange, options }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>
      <select
        name={name}
        value={value || ""}
        onChange={onChange}
        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
      >
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

export default EdIt;
