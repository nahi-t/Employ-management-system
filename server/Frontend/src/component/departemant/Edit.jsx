import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Edit() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Fetch department data when component mounts
  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5000/api/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.success) {
          setFormData({
            name: res.data.data.name,
            description: res.data.data.description,
          });
        }
      } catch (error) {
        console.error(error);
        setError("Failed to fetch department data");
      }
    };

    fetchDepartment();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!formData.name || !formData.description) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(`http://localhost:5000/api/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.success) {
        setMessage("Department updated successfully!");
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        setError(error.response.data.message || "Error updating department");
      } else {
        setError("Error updating department");
      }
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-96 max-w-3xl mx-auto bg-gradient-to-br from-white to-gray-400  rounded-md shadow-md p-8 mt-10">
        <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Edit Department
        </h3>

        {message && (
          <div className="mb-4 text-center text-teal-600 font-medium">
            {message}
          </div>
        )}

        {error && (
          <div className="mb-4 text-center text-red-600 font-medium">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Department Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Department Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter department name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 border-gray-300"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter department description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 border-gray-300"
              rows="4"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
          >
            Update Department
          </button>
        </form>
      </div>
    </div>
  );
}

export default Edit;
