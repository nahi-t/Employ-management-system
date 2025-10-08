import Employee from "../model/employmodel.js";
import User from "../model/User.js";
import Department from "../model/Department.js";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";
import fs from "fs";
import mongoose from "mongoose";

// Ensure uploads folder exists
const uploadPath = "public/uploades";
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadPath),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Add Employee Controller
const addem = async (req, res) => {
  try {
    const {
      name,
      employeeId,
      gender,
      designation,
      salary,
      email,
      dateOfBirth,
      maritalStatus,
      department, // must be department ObjectId
      password,
    } = req.body;

    // ✅ Basic validation
    if (!name || !email || !password || !employeeId || !department) {
      return res.status(400).json({
        success: false,
        message:
          "Name, Email, Password, Employee ID, and Department are required",
      });
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    // ✅ Check department validity
    if (!mongoose.Types.ObjectId.isValid(department)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid department ID" });
    }

    const depExists = await Department.findById(department);
    if (!depExists) {
      return res
        .status(404)
        .json({ success: false, message: "Department not found" });
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create User
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: "employee",
      profileImage: req.file ? req.file.filename : "",
    });
    await newUser.save();

    // ✅ Create Employee with department relation
    const newEmployee = new Employee({
      userId: newUser._id,
      employeeId,
      gender,
      designation,
      salary,
      dateOfBirth,
      maritalStatus,
      department,
      image: req.file ? req.file.filename : "",
    });

    await newEmployee.save();

    res.status(201).json({
      success: true,
      message: "Employee added successfully",
      user: newUser,
      employee: newEmployee,
    });
  } catch (error) {
    console.error("Error in addem:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ✅ Get all employees with User & Department populated
const getemp = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate("userId")
      .populate("department");
    // console.log(employees);

    res.status(200).json({ success: true, employees });
  } catch (error) {
    console.error("Error in getemp:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
const getemployeById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid employee ID" });
    }
    let employee;
    employee = await Employee.findById(id)
      .populate("userId")
      .populate("department");

    if (!employee) {
      employee = await Employee.findOne({ userId: id })
        .populate("userId", { password: 0 })
        .populate("department");
    }

    res.status(200).json({ success: true, employee });
  } catch (error) {
    console.error("Error in getemployeById:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid employee ID" });
    }

    const {
      name,
      email,
      employeeId,
      designation,
      salary,
      dateOfBirth,
      gender,
      maritalStatus,
      department,
    } = req.body;

    const employee = await Employee.findById(id).populate("userId");
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }

    // Update user info
    if (name) employee.userId.name = name;
    if (email) employee.userId.email = email;

    await employee.userId.save();

    // Update employee fields
    if (employeeId) employee.employeeId = employeeId;
    if (designation) employee.designation = designation;
    if (salary) employee.salary = salary;
    if (dateOfBirth) employee.dateOfBirth = dateOfBirth;
    if (gender) employee.gender = gender;
    if (maritalStatus) employee.maritalStatus = maritalStatus;

    if (department) {
      if (!mongoose.Types.ObjectId.isValid(department)) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid department ID" });
      }
      const depExists = await Department.findById(department);
      if (!depExists) {
        return res
          .status(404)
          .json({ success: false, message: "Department not found" });
      }
      employee.department = department; // assign ObjectId directly
    }

    // Mongoose timestamps will auto-update `updatedAt`
    await employee.save();

    res.json({ success: true, employee });
  } catch (error) {
    console.error("updateEmployee error:", error);
    res.status(500).json({ success: false, message: "Update failed" });
  }
};
const getemployeByDepartmentId = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid employee ID" });
    }

    const employees = await Employee.find({ department: id })
      .populate("userId", "name") // populate only the "name" field from User
      .select("userId");
    const names = employees.map((emp) => emp.userId.name);

    if (!employees) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }

    res.status(200).json({ success: true, names });
  } catch (error) {
    console.error("Error in getemployeById:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
export {
  addem,
  upload,
  getemp,
  getemployeById,
  updateEmployee,
  getemployeByDepartmentId,
};
