import Salary from "../model/salary.js";
import Employee from "../model/employmodel.js";

const addsalary = async (req, res) => {
  try {
    const {
      employeeId,
      basicSalary,
      allowance = 0,
      deduction = 0,
      payDate,
    } = req.body;

    if (!employeeId || !basicSalary || !payDate) {
      return res.status(400).json({
        success: false,
        mesg: "employeeId, basicSalary, and payDate are required",
      });
    }

    // Optional: validate that the employee exists
    const empExists = await Employee.findById(employeeId);
    if (!empExists) {
      return res
        .status(404)
        .json({ success: false, mesg: "Employee not found" });
    }

    const totalSalary =
      Number(basicSalary) + Number(allowance) - Number(deduction);

    const newSalary = new Salary({
      employeeId,
      basicSalary,
      allowance,
      deduction,
      netSalary: totalSalary,
      payDate,
    });

    await newSalary.save();
    return res.status(200).json({ success: true, data: newSalary });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "error from addsalary",
      err: error.message,
    });
  }
};

const getsalary = async (req, res) => {
  try {
    const { id } = req.params;
    let salaries;
    salaries = await Salary.find({ employeeId: id });
    if (!salaries || salaries.length < 1) {
      const employe = await Employee.findOne({ userId: id });
      salaries = await Salary.find({ employeeId: employe._id });
      return res.status(200).json({ success: true, data: salaries, employe });
    }
    return res.status(200).json({ success: true, data: salaries });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "error from getSalary",
      err: error.message,
    });
  }
};

export { addsalary, getsalary };
