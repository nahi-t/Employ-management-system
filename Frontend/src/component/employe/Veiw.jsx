import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function View() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  // ---- helpers ----
  const baseURL =
    import.meta?.env?.VITE_API_BASE_URL?.replace(/\/$/, "") ||
    "http://localhost:5000";

  const formatDate = (iso) => {
    if (!iso) return "—";
    const d = new Date(iso);
    // guard against invalid/placeholder dates (e.g., year 0002)
    const year = d.getUTCFullYear();
    if (Number.isNaN(d.getTime()) || year < 1900) return "—";
    return new Intl.DateTimeFormat(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }).format(d);
  };

  const getImageSrc = (emp) => {
    const path = emp?.userId?.profileImage || emp?.image;
    if (!path) return null;
    if (/^https?:\/\//i.test(path)) return path;
    // your server used "public/uploades" — usually exposed as "/uploades/<file>"
    return `${baseURL}/uploades/${path}`;
  };

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(
          `${baseURL}/api/emp/getemploye/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setEmployee(data.employee || null);
      } catch (err) {
        console.error("Error fetching employee:", err);
        setEmployee(null);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee();
  }, [id, baseURL]);

  if (loading) {
    return (
      <div className="p-6">
        <div className="max-w-3xl mx-auto">
          <div className="animate-pulse">
            <div className="h-40 w-40 rounded-full bg-gray-200 mx-auto" />
            <div className="h-6 bg-gray-200 rounded mt-6 w-2/3 mx-auto" />
            <div className="h-4 bg-gray-200 rounded mt-3 w-1/2 mx-auto" />
            <div className="h-4 bg-gray-200 rounded mt-3 w-1/3 mx-auto" />
          </div>
        </div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="p-6">
        <div className="max-w-2xl mx-auto rounded-2xl border border-gray-200 p-8 text-center">
          <p className="text-lg font-medium">No employee found</p>
          <p className="text-gray-500 mt-1">
            We couldn’t load the record. It may have been deleted or the ID is
            incorrect.
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center mt-6 px-4 py-2 rounded-xl bg-black text-white hover:bg-gray-800"
          >
            Go back
          </Link>
        </div>
      </div>
    );
  }

  const imgSrc = getImageSrc(employee);

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Employee Details
          </h2>
          <Link
            to="/admin-dashboard/employees"
            className="hidden sm:inline-flex px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-50"
          >
            Back
          </Link>
        </div>

        {/* Card */}
        <div className="mt-6 rounded-2xl border border-gray-200 bg-white shadow-sm">
          {/* Top section */}
          <div className="p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative">
              {imgSrc ? (
                <img
                  src={`http://localhost:5000/${employee.userId.profileImage}`}
                  alt={employee?.userId?.name || "Employee"}
                  className="h-36 w-36 md:h-40 md:w-40 rounded-2xl object-cover ring-1 ring-gray-200"
                />
              ) : (
                <div className="h-36 w-36 md:h-40 md:w-40 rounded-2xl bg-gray-100 grid place-content-center ring-1 ring-gray-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-14 w-14"
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

            <div className="flex-1 w-full">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-xl md:text-2xl font-semibold">
                  {employee?.userId?.name || "—"}
                </h3>
                {employee?.department?.name && (
                  <span className="px-2.5 py-1 rounded-full text-sm bg-gray-100 border border-gray-200">
                    {employee.department.name}
                  </span>
                )}
                {employee?.designation && (
                  <span className="px-2.5 py-1 rounded-full text-sm bg-gray-100 border border-gray-200">
                    {employee.designation}
                  </span>
                )}
                {employee?.employeeId && (
                  <span className="px-2.5 py-1 rounded-full text-sm bg-gray-100 border border-gray-200">
                    ID: {employee.employeeId}
                  </span>
                )}
              </div>

              <p className="text-gray-600 mt-1">
                {employee?.department?.description || "—"}
              </p>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <InfoRow label="Email" value={employee?.userId?.email} />
                <InfoRow label="Gender" value={employee?.gender} />
                <InfoRow
                  label="Marital Status"
                  value={employee?.maritalStatus}
                />
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

          {/* Details grid */}
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

        <div className="mt-6 sm:hidden">
          <Link
            to="/employees"
            className="inline-flex w-full items-center justify-center px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-50"
          >
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="font-medium">{value || "—"}</span>
    </div>
  );
}

function InfoBlock({ title, items }) {
  return (
    <div className="rounded-2xl border border-gray-100 p-5">
      <h4 className="font-semibold">{title}</h4>
      <dl className="mt-4 space-y-3">
        {items.map(([k, v]) => (
          <div key={k} className="flex items-center justify-between">
            <dt className="text-sm text-gray-500">{k}</dt>
            <dd className="font-medium text-right max-w-[60%]">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default View;
