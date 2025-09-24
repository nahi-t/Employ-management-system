import express from "express";
import {
  addem,
  upload,
  getemp,
  getemployeById,
  updateEmployee,
  getemployeByDepartmentId,
} from "../controler/employ.js";
import verify from "../midleware/auth.js";

const rout = express.Router();

rout.post("/addem", verify, upload.single("image"), addem);
rout.get("/getemploye", verify, getemp);
rout.get("/getemploye/:id", verify, getemployeById);
rout.put("/updateemploye/:id", verify, updateEmployee);
rout.get("/depid/:id", getemployeByDepartmentId);

export default rout;
