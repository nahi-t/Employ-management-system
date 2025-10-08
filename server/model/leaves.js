import mongoose, { Schema } from "mongoose";
const leaveSchema = new Schema({
  employeeId: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
  leaveType: {
    type: String,
    enum: ["sick", "casual", "vacation"],
    required: true,
  },
  fromDate: { type: Date, required: true },
  toDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ["pending", "Approved", "rejected"],
    default: "pending",
  },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
const Leave = mongoose.model("Leave", leaveSchema);
export default Leave;
