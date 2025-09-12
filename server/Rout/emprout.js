import express from "express";
import {
  addem,
  upload,
  getemp,
  getemployeById,
  updateEmployee,
} from "../controler/employ.js";
import verify from "../midleware/auth.js";

const rout = express.Router();

rout.post("/addem", verify, upload.single("image"), addem);
rout.get("/getemploye", verify, getemp);
rout.get("/getemploye/:id", verify, getemployeById);
rout.put("/updateemploye/:id", verify, updateEmployee);

export default rout;
