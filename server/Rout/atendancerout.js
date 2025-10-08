import express from "express";
import verify from "../midleware/auth.js";
import attendance from "../midleware/atendance.js";
const router = express.Router();
import {
  getAllAttendance,
  updateattendance,
  atendancehis,
} from "../controler/atendance.js";

router.get("/geta", verify, attendance, getAllAttendance);
router.get("/history", verify, attendance, atendancehis);
router.put("/:id", verify, attendance, updateattendance);

export default router;
