import express from "express";
import verify from "../midleware/auth.js";
import {
  adddep,
  getdep,
  editdep,
  updatdep,
  delet,
} from "../controler/depcontrol.js";
const rout = express.Router();

rout.post("/add_dep", verify, adddep);
rout.get("/getdep", verify, getdep);
rout.get("/:id", verify, editdep);
rout.put("/:id", verify, updatdep);
rout.delete("/:id", verify, delet);

export default rout;
