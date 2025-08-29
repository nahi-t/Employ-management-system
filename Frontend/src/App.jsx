import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Admindash from "./pages/Admindash";
import Employedash from "./pages/Employedash";
import ProtectedRoute from "./utile/ProtectedRoute.jsx";
import Department from "./component/departemant/Departmant";
import Adminsummery from "./component/summarycard/Adminsummery.jsx";
import Adddep from "./component/departemant/Adddep.jsx";
import Edit from "./component/departemant/Edit.jsx";
import Delet from "./component/departemant/Delet.jsx";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        {/* Redirect root to admin dashboard */}
        <Route path="/" element={<Navigate to="/admin-dashboard" />} />

        {/* Public Login Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Admin Routes with Nested Children */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <Admindash />{" "}
              {/* Layout wrapper that should include <Outlet /> */}
            </ProtectedRoute>
          }
        >
          {/* Nested routes inside Admindash */}
          <Route index element={<Adminsummery />} />
          <Route path="department" element={<Department />} />
          <Route path="add" element={<Adddep />} />
          <Route
            path="/admin-dashboard/department/edit/:id"
            element={<Edit />}
          />
          <Route
            path="/admin-dashboard/department/delet/:id"
            element={<Delet />}
          />
        </Route>

        {/* Employee Dashboard */}
        <Route
          path="/employee"
          element={
            <ProtectedRoute>
              <Employedash />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
