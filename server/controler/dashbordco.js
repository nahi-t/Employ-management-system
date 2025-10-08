import Employee from "../model/employmodel.js";
import Department from "../model/Department.js";
import Leave from "../model/leaves.js";

const getsummery = async (req, res) => {
  try {
    const totalemp = await Employee.countDocuments();
    const totaldep = await Department.countDocuments();
    const totasalary = await Employee.aggregate([
      { $group: { _id: null, totasalary: { $sum: "$salary" } } },
    ]);
    const empappforleav = await Leave.distinct("employeeId");
    const leavestatus = await Leave.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);
    const leavesummry = {
      applidfor: empappforleav.length,
      approved:
        leavestatus.find((status) => status._id === "approved")?.count || 0,
      rejected:
        leavestatus.find((status) => status._id === "rejected")?.count || 0,
      pending:
        leavestatus.find((status) => status._id === "pending")?.count || 0,
    };
    return res.status(200).json({
      success: true,
      totalemp,
      totaldep,
      totasalary: totasalary[0]?.totasalary || 0,
      leavesummry,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "dashbord summury error" });
  }
};

export { getsummery };
