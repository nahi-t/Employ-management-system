import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function View() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  const baseURL =
    import.meta?.env?.VITE_API_BASE_URL?.replace(/\/$/, "") ||
    "http://localhost:5000";

  const formatDate = (iso) => {
    if (!iso) return "—";
    const d = new Date(iso);
    if (isNaN(d.getTime()) || d.getUTCFullYear() < 1900) return "—";
    return new Intl.DateTimeFormat(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }).format(d);
  };

  const getImageSrc = (emp) => {
    const path = emp?.image;
    if (!path) return null;
    if (/^https?:\/\//i.test(path)) return path;
    return `${baseURL}/uploades/${path}`;
  };

  useEffect(() => {
    if (!id) {
      setEmployee(null);
      setLoading(false);
      return;
    }
    // Fetch employee details from the server
    const fetchEmployee = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${baseURL}/api/emp/getemploye/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setEmployee(response.data.employee || null);
        console.log("Fetched employee:", response.data.employee);
      } catch (error) {
        console.error("Failed to fetch employee details:", error);
        setEmployee(null);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee();
  }, [id, baseURL]);

  // Show placeholder if id is not available yet
  if (!id) {
    return (
      <div className="p-6 flex justify-center items-center h-full">
        <p className="text-gray-500 text-lg">Loading employee information...</p>
      </div>
    );
  }

  if (loading)
    return (
      <div className="p-6 flex justify-center items-center h-full">
        <div className="animate-pulse w-full max-w-3xl space-y-4">
          <div className="h-40 w-40 rounded-full bg-gray-200 mx-auto" />
          <div className="h-6 bg-gray-200 rounded w-2/3 mx-auto" />
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
          <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto" />
        </div>
      </div>
    );

  if (!employee)
    return (
      <div className="p-6 flex justify-center items-center h-full">
        <div className="max-w-2xl mx-auto rounded-2xl border border-gray-200 p-8 text-center bg-white shadow-md">
          <p className="text-lg font-medium">Employee not found</p>
          <p className="text-gray-500 mt-1">
            Unable to display employee details. The record may not exist or the
            ID is invalid.
          </p>
          <Link
            to="/employee"
            className="inline-flex items-center justify-center mt-6 px-6 py-2 rounded-xl bg-teal-600 text-white font-semibold hover:bg-teal-700 transition"
          >
            Go back
          </Link>
        </div>
      </div>
    );

  const imgSrc = getImageSrc(employee);

  return (
    <div className="max-w-4xl mx-auto ">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Employee Details</h2>
        <Link
          to="/admin-dashboard"
          className="hidden sm:inline-flex px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium"
        >
          Back
        </Link>
      </div>

      {/* Employee Card */}
      <div className="bg-gradient-to-br from-white to-gray-400 rounded-2xl shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row items-center md:items-start p-6 md:p-8 gap-6">
          {/* Profile Image */}
          <div className="relative flex-shrink-0">
            {imgSrc ? (
              <img
                src={`http://localhost:5000/uploades/${employee.image}`}
                alt={employee?.userId?.name || "Employee"}
                className="h-40 w-40 md:h-44 md:w-44 rounded-2xl object-cover ring-1 ring-gray-200 shadow-md"
              />
            ) : (
              <div className="h-40 w-40 md:h-44 md:w-44 rounded-2xl bg-gray-100 grid place-content-center ring-1 ring-gray-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-14 w-14 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 1115 0v.75H4.5v-.75z"
                  />
                </svg>
              </div>
            )}
          </div>

          {/* Info Section */}
          <div className="flex-1 w-full">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h3 className="text-2xl font-semibold text-gray-800">
                {employee?.userId?.name || "—"}
              </h3>
              {employee?.department?.name && (
                <span className="px-3 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200 text-sm font-medium">
                  {employee.department.name}
                </span>
              )}
              {employee?.designation && (
                <span className="px-3 py-1 rounded-full bg-gray-50 text-gray-700 border border-gray-200 text-sm font-medium">
                  {employee.designation}
                </span>
              )}
              {employee?.employeeId && (
                <span className="px-3 py-1 rounded-full bg-gray-50 text-gray-700 border border-gray-200 text-sm font-medium">
                  ID: {employee.employeeId}
                </span>
              )}
            </div>
            <p className="text-gray-500 mb-4">
              {employee?.department?.description || "—"}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <InfoRow label="Email" value={employee?.userId?.email} />
              <InfoRow label="Gender" value={employee?.gender} />
              <InfoRow label="Marital Status" value={employee?.maritalStatus} />
              <InfoRow
                label="Salary"
                value={
                  typeof employee?.salary === "number"
                    ? employee.salary.toLocaleString()
                    : "—"
                }
              />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100" />

        {/* More Details */}
        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoBlock
            title="Dates"
            items={[
              ["Date of Birth", formatDate(employee?.dateOfBirth)],
              ["Joined (User)", formatDate(employee?.userId?.createdAt)],
              ["Employee Created", formatDate(employee?.createdAt)],
              [
                "Department Created",
                formatDate(employee?.department?.createdAt),
              ],
              [
                "Last Updated",
                formatDate(employee?.updatedAt || employee?.updateat),
              ],
            ]}
          />

          <InfoBlock
            title="Department"
            items={[
              ["Name", employee?.department?.name || "—"],
              ["Description", employee?.department?.description || "—"],
              ["Dept Updated", formatDate(employee?.department?.updatedAt)],
              ["Dept ID", employee?.department?._id || "—"],
            ]}
          />
        </div>
      </div>
    </div>
  );
}

// Reusable InfoRow component
function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-gradient-to-br from-white to-gray-400  px-4 py-3 shadow-sm">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="font-medium text-gray-800">{value || "—"}</span>
    </div>
  );
}

// Reusable InfoBlock component
function InfoBlock({ title, items }) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-gray-400  p-5 shadow-sm">
      <h4 className="font-semibold text-gray-700">{title}</h4>
      <dl className="mt-4 space-y-3">
        {items.map(([k, v]) => (
          <div key={k} className="flex items-center justify-between">
            <dt className="text-sm text-gray-500">{k}</dt>
            <dd className="font-medium text-gray-800 text-right max-w-[60%]">
              {v}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
