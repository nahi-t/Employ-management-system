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
import List from "./component/employe/List.jsx";
import { Toaster } from "react-hot-toast";
import Add from "./component/employe/Add.jsx";
import Veiw from "./component/employe/Veiw.jsx";
import EdIt from "./component/employe/EdIt.jsx";

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
          <Route path="/admin-dashboard/department/delet/:id" />
          <Route path="employees" element={<List />} />
          <Route path="/admin-dashboard/Adde" element={<Add />} />
          <Route
            path="/admin-dashboard/employees/View/:id"
            element={<Veiw />}
          />
          <Route
            path="/admin-dashboard/employees/Edit/:id"
            element={<EdIt />}
          />
        </Route>

        {/* Employee Dashboard */}
      </Routes>
    </>
  );
}

export default App;
