import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Admindash from "./pages/Admindash";
import Employedash from "./pages/Employedash.jsx";
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
import Salary from "./component/salary/Salary.jsx";
import Viewsalary from "./component/salary/Viewsalary.jsx";
import Summarycard from "./component/employedashbord/Summarycard.jsx";
import Leaves from "./component/leaves/Leaves.jsx";
import Addleaves from "./component/leaves/Addleaves.jsx";
import Setting from "./component/employedashbord/Setting.jsx";
import Leveslist from "./component/leaves/Leveslist.jsx";
import Detail from "./component/leaves/Detail.jsx";
import AttendanceForm from "./component/Attendance/Atendanceadd.jsx";
import Addattendanceh from "./component/Attendance/Attendancehis.jsx";

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        {/* Redirect root to admin dashboard */}
        <Route path="/" element={<Navigate to="/admin-dashboard" />} />
        {/* <Route path="/" element={<Navigate to="/employee" />} /> */}

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
          <Route path="/admin-dashboard/salary" element={<Salary />} />
          <Route
            path="/admin-dashboard/salary/view/:id"
            element={<Viewsalary />}
          />
          <Route path="settings" element={<Setting />} />
          <Route path="leaves" element={<Leveslist />} />
          <Route path="leaves/:id" element={<Detail />} />
          <Route path="attendance" element={<AttendanceForm />} />
          <Route path="attendance-history" element={<Addattendanceh />} />
        </Route>

        {/* Employee Dashboard */}

        <Route
          path="/employee"
          element={
            <ProtectedRoute>
              <Employedash />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<Summarycard />} />
          <Route path="profile/:id" element={<Veiw />} />
          <Route path="salary/:id" element={<Viewsalary />} />
          <Route path="leaves" element={<Leaves />} />
          <Route path="Addleaves" element={<Addleaves />} />
          <Route path="setting" element={<Setting />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
