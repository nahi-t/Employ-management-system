import express from "express";
const router = express.Router();
import verify from "../midleware/auth.js";
import { getsummery } from "../controler/dashbordco.js";
router.get("/summ", verify, getsummery);

export default router;
