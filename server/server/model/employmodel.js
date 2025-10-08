import mongoose, { Schema } from "mongoose";

const employeeSchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  employeeId: { type: String, required: true, unique: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  designation: { type: String, required: true },
  salary: { type: Number, required: true, min: 0 },
  dateOfBirth: { type: Date, required: true },
  maritalStatus: {
    type: String,
    enum: ["Single", "Married", "Divorced"],
    required: true,
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: "Department",
    required: true,
  },

  image: { type: String },
  createdAt: { type: Date, default: Date.now },
  updateat: { type: Date, default: Date.now },
});

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
