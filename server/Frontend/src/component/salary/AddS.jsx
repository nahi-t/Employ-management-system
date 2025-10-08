// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import axios from "axios";

// function AddS() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [employee, setEmployee] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);

//   const baseURL =
//     import.meta?.env?.VITE_API_BASE_URL?.replace(/\/$/, "") ||
//     "http://localhost:5000";

//   useEffect(() => {
//     const fetchEmployee = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const { data } = await axios.get(
//           `${baseURL}/api/emp/getemploye/${id}`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         setEmployee(data.employee || null);
//       } catch (err) {
//         console.error("Error fetching employee:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchEmployee();
//   }, [id, baseURL]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEmployee((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleUserChange = (e) => {
//     const { name, value } = e.target;
//     setEmployee((prev) => ({
//       ...prev,
//       userId: { ...prev.userId, [name]: value },
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const payload = {
//       name: employee.userId.name,
//       email: employee.userId.email,
//       employeeId: employee.employeeId,
//       designation: employee.designation,
//       salary: employee.salary,
//       dateOfBirth: employee.dateOfBirth,
//       gender: employee.gender,
//       maritalStatus: employee.maritalStatus,
//     };
//     setSaving(true);
//     try {
//       const token = localStorage.getItem("token");
//       await axios.put(`${baseURL}/api/emp/updateemploye/${id}`, payload, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       navigate(`/admin-dashboard/employees/Edit/${id}`);
//       alert("Updated employee");
//     } catch (err) {
//       console.error("Error updating employee:", err);
//       alert("Update failed");
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-[50vh]">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
//       </div>
//     );
//   }

//   if (!employee) {
//     return (
//       <div className="p-6">
//         <div className="max-w-2xl mx-auto text-center border border-gray-200 p-8 rounded-2xl bg-white shadow">
//           <p className="text-lg font-medium">Employee not found</p>
//           <Link
//             to="/employees"
//             className="inline-flex mt-6 px-4 py-2 rounded-xl bg-black text-white hover:bg-gray-800"
//           >
//             Go Back
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6">
//       <div className="max-w-4xl mx-auto">
//         <h2 className="text-3xl font-bold tracking-tight text-gray-900">
//           Edit Employee
//         </h2>

//         <form
//           onSubmit={handleSubmit}
//           className="mt-8 space-y-8 bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
//         >
//           {/* Profile image preview */}
//           <div className="flex items-center gap-6">
//             <img
//               src={`http://localhost:5000/${employee.userId.profileImage}`}
//               alt={employee?.userId?.name || "Employee"}
//               className="h-32 w-32 rounded-xl object-cover ring-2 ring-gray-200 shadow-sm"
//             />
//             <div>
//               <p className="font-medium text-gray-800">Profile Image</p>
//               <p className="text-gray-500 text-sm">
//                 This can be updated in the upload section.
//               </p>
//             </div>
//           </div>

//           {/* Basic info */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <InputField
//               label="Full Name"
//               name="name"
//               value={employee?.userId?.name || ""}
//               onChange={handleUserChange}
//             />
//             <InputField
//               label="Email Address"
//               name="email"
//               type="email"
//               value={employee?.userId?.email || ""}
//               onChange={handleUserChange}
//             />
//             <InputField
//               label="Employee ID"
//               name="employeeId"
//               value={employee.employeeId || ""}
//               onChange={handleChange}
//             />
//             <InputField
//               label="Designation"
//               name="designation"
//               value={employee.designation || ""}
//               onChange={handleChange}
//             />
//             <InputField
//               label="Salary"
//               name="salary"
//               type="number"
//               value={employee.salary || ""}
//               onChange={handleChange}
//             />
//             <InputField
//               label="Date of Birth"
//               name="dateOfBirth"
//               type="date"
//               value={employee.dateOfBirth?.substring(0, 10) || ""}
//               onChange={handleChange}
//             />
//           </div>

//           {/* Select fields */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <SelectField
//               label="Gender"
//               name="gender"
//               value={employee.gender || ""}
//               onChange={handleChange}
//               options={["Male", "Female", "Other"]}
//             />
//             <SelectField
//               label="Marital Status"
//               name="maritalStatus"
//               value={employee.maritalStatus || ""}
//               onChange={handleChange}
//               options={["Single", "Married", "Divorced", "Widowed"]}
//             />
//           </div>

//           {/* Actions */}
//           <div className="flex justify-end gap-4">
//             <Link
//               to={`/employees/${id}`}
//               className="px-5 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
//             >
//               Cancel
//             </Link>
//             <button
//               type="submit"
//               disabled={saving}
//               className="px-6 py-2 rounded-xl bg-black text-white font-medium hover:bg-gray-800 disabled:opacity-50 transition"
//             >
//               {saving ? "Saving..." : "Save Changes"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// function InputField({ label, name, value, onChange, type = "text" }) {
//   return (
//     <div>
//       <label className="block text-sm font-semibold text-gray-700 mb-2">
//         {label}
//       </label>
//       <input
//         type={type}
//         name={name}
//         value={value}
//         onChange={onChange}
//         className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
//       />
//     </div>
//   );
// }

// function SelectField({ label, name, value, onChange, options }) {
//   return (
//     <div>
//       <label className="block text-sm font-semibold text-gray-700 mb-2">
//         {label}
//       </label>
//       <select
//         name={name}
//         value={value}
//         onChange={onChange}
//         className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
//       >
//         <option value="">Select {label}</option>
//         {options.map((opt) => (
//           <option key={opt} value={opt}>
//             {opt}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// }

// export default AddS;
