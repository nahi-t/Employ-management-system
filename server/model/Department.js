import mongoose from "mongoose";
import Employee from "./employmodel.js";
import Leave from "./leaves.js";
import salary from "./salary.js";

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

departmentSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    try {
      const employees = await Employee.find({ department: this._id });
      const empid = employees.map((emp) => emp._id);
      await Employee.deleteMany({ department: this._id });
      await Leave.deleteMany({ employeeId: { $in: empid } });
      await salary.deleteMany({ employeeId: { $in: empid } });
      next();
    } catch (error) {
      next(error);
    }
  }
);

const Department = mongoose.model("Department", departmentSchema);
export default Department;
