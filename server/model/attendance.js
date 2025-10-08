import mongoose, { Schema } from "mongoose";

const attendanceSchema = new Schema({
  employeeId: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
  date: { type: String, required: true },
  status: {
    type: String,
    enum: ["Present", "Absent", "Leave", "Pending"],
    default: "Pending",
  },
});

const attendance = mongoose.model("Attendance", attendanceSchema);
export default attendance;
