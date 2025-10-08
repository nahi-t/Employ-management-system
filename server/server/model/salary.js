import mongoose, { Schema } from "mongoose";
const salarySchima = new Schema({
  employeeId: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
  basicSalary: { type: Number, required: true },
  allowance: { type: Number },
  deduction: { type: Number },
  netSalary: { type: Number },
  payDate: { type: Date, required: true },
  cratedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
const salary = mongoose.model("Salary", salarySchima);
export default salary;
