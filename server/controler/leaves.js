import mongoose from "mongoose";
import Leave from "../model/leaves.js";
import Employee from "../model/employmodel.js";

const addleaves = async (req, res) => {
  try {
    const { employeeId, leaveType, fromDate, toDate, description } = req.body;

    if (!employeeId || !leaveType || !fromDate || !toDate) {
      return res.status(400).json({
        success: false,
        message: "employeeId, leaveType, fromDate, and toDate are required",
      });
    }
    const userId = employeeId;

    if (!mongoose.Types.ObjectId.isValid(employeeId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid employeeId format",
      });
    }
    const employee = await Employee.findOne({ userId });
    console.log(employee);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }
    const start = new Date(fromDate);
    const end = new Date(toDate);
    if (isNaN(start) || isNaN(end)) {
      return res.status(400).json({
        success: false,
        message: "fromDate or toDate is invalid",
      });
    }
    if (start > end) {
      return res.status(400).json({
        success: false,
        message: "fromDate cannot be later than toDate",
      });
    }

    const newLeave = new Leave({
      employeeId: employee._id,
      leaveType: leaveType.trim(),
      fromDate: start,
      toDate: end,
      description: description?.trim(),
    });

    await newLeave.save();
    return res.status(201).json({ success: true, data: newLeave });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error from addleaves",
      err: error.message,
    });
  }
};

const getLeavesByUserId = async (req, res) => {
  try {
    const { userId } = req.params; // frontend sends /api/leaves/user/:userId

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or missing userId" });
    }

    // Find employee by userId
    const employee = await Employee.findOne({ userId });
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, message: "Employee not found" });
    }

    // Find leaves for that employee
    const leaves = await Leave.find({ employeeId: employee._id }).sort({
      createdAt: -1,
    });

    return res
      .status(200)
      .json({ success: true, data: leaves, employee: employee });
  } catch (error) {
    console.error("Error fetching leaves:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching leaves",
      error: error.message,
    });
  }
};
const getleaves = async (req, res) => {
  try {
    const leaves = await Leave.find().populate({
      path: "employeeId",
      populate: [
        { path: "department", select: "name" },
        { path: "employeeId", select: "name employeeId" },
      ],
    });

    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    console.error("Error fetching leaves:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching leaves",
      error: error.message,
    });
  }
};
const getleavesdetail = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or missing leave ID" });
    }

    const leave = await Leave.findById(id).populate({
      path: "employeeId",
      populate: [
        { path: "department", select: "name" },
        { path: "employeeId", select: "name employeeId" },
      ],
    });

    return res.status(200).json({ success: true, leave });
  } catch (error) {
    console.error("Error fetching leaves:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching leaves",
      error: error.message,
    });
  }
};
const updateleaves = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const leaves = await Leave.findByIdAndUpdate(id, { status });
    if (!leaves) {
      return res
        .status(404)
        .json({ success: false, message: "Leave not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Leave updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "somthing wrong" });
  }
};

export {
  addleaves,
  getLeavesByUserId,
  getleaves,
  getleavesdetail,
  updateleaves,
};
