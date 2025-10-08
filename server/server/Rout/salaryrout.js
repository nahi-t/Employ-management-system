import express from "express";
import verify from "../midleware/auth.js";
import { addsalary, getsalary } from "../controler/salarycontrol.js";
const rout = express.Router();
rout.post("/adds", verify, addsalary);
rout.get("/get/:id", verify, getsalary);
export default rout;
