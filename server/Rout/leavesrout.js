import express from "express";
import verify from "../midleware/auth.js";
import {
  addleaves,
  getLeavesByUserId,
  getleaves,
  getleavesdetail,
  updateleaves,
} from "../controler/leaves.js";
const rout = express.Router();
rout.post("/addleaves", verify, addleaves);

rout.get("/getleaves", verify, getleaves);
rout.get("/Detail/:id", verify, getleavesdetail);
rout.put("/update/:id", verify, updateleaves);
rout.get("/:userId", verify, getLeavesByUserId);

export default rout;
