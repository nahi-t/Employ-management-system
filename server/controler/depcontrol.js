import express from "express";
import Department from "../model/Department.js";
const adddep = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Validate input
    if (!name || !description) {
      return res
        .status(400)
        .json({ msg: "Name and description are required", success: false });
    }
    const depExists = await Department.findOne({ name });
    if (depExists) {
      return res
        .status(400)
        .json({ msg: "Department already exists", success: false });
    }

    // Create new department
    const newDepartment = await Department.create({ name, description });
    await newDepartment.save();
    return res.status(201).json({
      msg: "Department added successfully",
      success: true,
      data: newDepartment,
    });
  } catch (error) {
    console.error("Error adding department:", error);
    return res
      .status(500)
      .json({ msg: "Server error", success: false, error: errormsg });
  }
};
const getdep = async (req, res) => {
  try {
    const departments = await Department.find();
    return res.status(200).json({
      msg: "Departments fetched successfully",
      success: true,
      data: departments,
    });
  } catch (error) {
    console.error("Error fetching departments:", error);
    return res
      .status(500)
      .json({ msg: "Server error", success: false, error: error.message });
  }
};
const editdep = async (req, res) => {
  const { id } = req.params;
  try {
    const department = await Department.findById(id);

    if (!department) {
      return res.status(404).json({
        msg: "Department not found",
        success: false,
      });
    }

    return res.status(200).json({
      msg: "Department fetched successfully",
      success: true,
      data: department,
    });
  } catch (error) {
    console.error("Error fetching department:", error);
    return res
      .status(500)
      .json({ msg: "Server error", success: false, error: error.message });
  }
};

const updatdep = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const exitdep = await Department.findOne({ name });
    if (exitdep) {
      return res
        .status(400)
        .json({ msg: "Department name already exists", success: false });
    }
    const department = await Department.findById(id);

    if (!department) {
      return res.status(404).json({
        msg: "Department not found",
        success: false,
      });
    }

    // Update department fields
    department.name = name || department.name;
    department.description = description || department.description;

    await department.save();

    return res.status(200).json({
      msg: "Department updated successfully",
      success: true,
      data: department,
    });
  } catch (error) {
    console.error("Error updating department:", error);
    return res
      .status(500)
      .json({ msg: "Server error", success: false, error: error.message });
  }
};
const delet = async (req, res) => {
  const { id } = req.params;
  try {
    const department = await Department.findById(id);
    await department.deleteOne();
    if (!department) {
      return res.status(404).json({
        msg: "Department not found",
        success: false,
      });
    }
    await department.deleteOne();
    return res.status(200).json({
      msg: "Department deleted successfully",
      success: true,
      data: department,
    });
  } catch (error) {
    console.error("Error deleting department:", error);
    return res
      .status(500)
      .json({ msg: "Server error", success: false, error: error.message });
  }
};
export { adddep, getdep, editdep, updatdep, delet };
