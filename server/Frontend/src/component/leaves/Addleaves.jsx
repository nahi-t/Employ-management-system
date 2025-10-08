import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

export default function Addleaves() {
  const { user } = useAuth(); // ✅ destructure user
  const [form, setForm] = useState({
    leaveType: "",
    fromDate: "",
    toDate: "",
    description: "",
    employeeId: user?._id || "", // ✅ correct key
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/leaves/addleaves",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.data);
      if (res.data.success) {
        alert("Leave request submitted successfully!");
        setForm({
          leaveType: "",
          fromDate: "",
          toDate: "",
          description: "",
          employeeId: user?._id || "",
        });
      } else {
        alert(res.data.message || "Failed to submit leave request.");
      }
    } catch (error) {
      console.error("Error submitting leave:", error);
      alert("An error occurred while submitting the request.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-2xl font-bold text-gray-700 mb-6">
        Request for Leave
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Leave Type */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Leave Type
          </label>
          <select
            name="leaveType"
            value={form.leaveType}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            required
          >
            <option value="">Select type</option>
            <option value="sick">Sick Leave</option>
            <option value="casual">Casual Leave</option>
            <option value="vacation">Vacation</option>
          </select>
        </div>

        {/* From Date */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            From Date
          </label>
          <input
            type="date"
            name="fromDate"
            value={form.fromDate}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            required
          />
        </div>

        {/* To Date */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            To Date
          </label>
          <input
            type="date"
            name="toDate"
            value={form.toDate}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="4"
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
            placeholder="Provide details about your leave..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
}
