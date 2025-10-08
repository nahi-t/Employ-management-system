import Attendance from "../model/attendance.js";
import Employee from "../model/employmodel.js";

const getAllAttendance = async (req, res) => {
  try {
    const date = new Date().toISOString().split("T")[0];

    const records = await Attendance.find({ date }).populate({
      path: "employeeId", // Reference field in Attendance model
      select:
        "employeeId gender designation salary dateOfBirth maritalStatus department userId",
      populate: [
        { path: "department", select: "name" },
        { path: "userId", select: "name email" },
      ],
    });

    res.status(200).json({ records, success: true });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

const updateattendance = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const date = new Date().toISOString().split("T")[0];

    // Validate required fields
    if (!id || !status) {
      return res
        .status(400)
        .json({ success: false, message: "Missing attendance ID or status" });
    }

    // Validate status value
    if (!["Present", "Absent", "Leave"].includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid status value" });
    }

    // Update attendance
    const attendanceRecord = await Attendance.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!attendanceRecord) {
      return res
        .status(404)
        .json({ success: false, message: "Attendance record not found" });
    }

    // Success
    return res.status(200).json({
      success: true,
      message: "Attendance updated successfully",
      attendanceRecord,
    });
  } catch (error) {
    console.error("Update Attendance Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
const atendancehis = async (req, res) => {
  try {
    const records = await Attendance.find().populate({
      path: "employeeId",
      select:
        "employeeId gender designation salary dateOfBirth maritalStatus department userId",
      populate: [
        { path: "department", select: "name" },
        { path: "userId", select: "name email" },
      ],
    });

    res.status(200).json({ records, success: true });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error: error.message });
  }
};

export { getAllAttendance, updateattendance, atendancehis };
