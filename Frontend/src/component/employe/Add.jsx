import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddEmployeeForm() {
  const apiUrl = "http://localhost:5000/api/emp/addem";

  const [form, setForm] = useState({
    name: "",
    employeeId: "",
    gender: "",
    designation: "",
    salary: "",
    email: "",
    dateOfBirth: "",
    maritalStatus: "",
    department: "",
    password: "",
    image: null,
  });
  const nav = useNavigate();

  const [dep, setDep] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [serverMessage, setServerMessage] = useState(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/getdep", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success) {
          setDep(res.data.data);
        }
      } catch (error) {
        console.error(error);
        alert("Error fetching departments");
      }
    };
    fetchDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm((prev) => ({ ...prev, image: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerMessage(null);

    // Prepare form data
    const payload = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      payload.append(key, value);
    });

    try {
      setSubmitting(true);
      const token = localStorage.getItem("token");
      const res = await axios.post(apiUrl, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        nav("/admin-dashboard/employees");
      }

      setServerMessage({
        type: "success",
        text: "Employee added successfully",
      });

      // Reset form
      setForm({
        name: "",
        employeeId: "",
        gender: "",
        designation: "",
        salary: "",
        email: "",
        dateOfBirth: "",
        maritalStatus: "",
        department: "",
        password: "",
        image: null,
      });
    } catch (err) {
      setServerMessage({
        type: "error",
        text:
          err?.response?.data?.message ||
          err?.message ||
          "Failed to add employee",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-white to-gray-400  shadow-lg rounded-xl mt-10">
      <h1 className="text-2xl font-semibold mb-6 text-center">Add Employee</h1>

      {serverMessage && (
        <div
          className={`mb-4 rounded-lg border p-3 text-sm ${
            serverMessage.type === "success"
              ? "bg-green-50 border-green-200 text-green-700"
              : "bg-red-50 border-red-200 text-red-700"
          }`}
        >
          {serverMessage.text}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          name="employeeId"
          value={form.employeeId}
          onChange={handleChange}
          placeholder="Employee ID"
          className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gradient-to-br from-white to-gray-400 "
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="text"
          name="designation"
          value={form.designation}
          onChange={handleChange}
          placeholder="Designation"
          className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="number"
          name="salary"
          value={form.salary}
          onChange={handleChange}
          placeholder="Salary"
          className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="date"
          name="dateOfBirth"
          value={form.dateOfBirth}
          onChange={handleChange}
          className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          name="maritalStatus"
          value={form.maritalStatus}
          onChange={handleChange}
          className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gradient-to-br from-white to-gray-400 "
        >
          <option value="">Marital Status</option>
          <option value="Single">Single</option>
          <option value="Married">Married</option>
          <option value="Divorced">Divorced</option>
        </select>

        <select
          name="department"
          value={form.department}
          onChange={handleChange}
          className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gradient-to-br from-white to-gray-400 "
        >
          <option value="">Select Department</option>
          {dep.map((d) => (
            <option key={d._id} value={d._id}>
              {d.name}
            </option>
          ))}
        </select>

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Profile Image
          </label>
          <div className="flex items-center gap-4">
            {/* File preview */}
            {form.image && (
              <img
                src={URL.createObjectURL(form.image)}
                alt="Preview"
                className="w-16 h-16 object-cover rounded-full border border-gray-300"
              />
            )}

            <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow-sm text-sm font-medium flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v6M9 15l3-3 3 3M21 8V6a2 2 0 00-2-2H5a2 2 0 00-2 2v2"
                />
              </svg>
              {form.image ? "Change Image" : "Upload Image"}
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <div className="md:col-span-2 flex justify-end gap-3 mt-2">
          <button
            type="reset"
            onClick={() =>
              setForm({
                name: "",
                employeeId: "",
                gender: "",
                designation: "",
                salary: "",
                email: "",
                dateOfBirth: "",
                maritalStatus: "",
                department: "",
                password: "",
                image: null,
              })
            }
            className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-50"
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {submitting ? "Saving..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
