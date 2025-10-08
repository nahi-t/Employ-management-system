import Attendance from "../model/attendance.js";
import Employee from "../model/employmodel.js";

const defaultAttendance = async (req, res, next) => {
  try {
    const date = new Date().toISOString().split("T")[0];

    // Check if any attendance records exist for today
    const existing = await Attendance.findOne({ date });

    if (!existing) {
      const employees = await Employee.find();

      // ✅ Make sure each document includes employeeId properly
      const attendanceDocs = employees.map((emp) => ({
        date,
        employeeId: emp._id,
        status: "Pending", // you can also use null if you prefer
      }));

      await Attendance.insertMany(attendanceDocs);
      console.log(
        `✅ Attendance created for ${employees.length} employees on ${date}`
      );
    }

    next();
  } catch (error) {
    console.error("❌ Error in defaultAttendance:", error);
    res.status(500).json({ message: error.message });
  }
};

export default defaultAttendance;
