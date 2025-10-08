import express from "express";
import verify from "../midleware/auth.js";
import { changepass } from "../controler/setting.js";
const rout = express.Router();
rout.put("/cp", verify, changepass);

export default rout;
