import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbconect from "./db/db.js";
import rg from "./controler/usercontroler.js";
import rout from "./Rout/authrout.js";
import deprout from "./Rout/depRout.js";
import emprout from "./Rout/emprout.js";
import salary from "./Rout/salaryrout.js";
import leavesrout from "./Rout/leavesrout.js";
import setting from "./Rout/setting.js";
import atndance from "./Rout/atendancerout.js";
import dashbord from "./Rout/dashbord.js";
import path from "path";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
// app.use(express.static("public/uploades"));
app.use(
  "/uploades",
  express.static(path.join(process.cwd(), "public/uploades"))
);
app.use("/api", rout);
app.use("/api", deprout);
app.use("/api/emp", emprout);
app.use("/api/salary", salary);
app.use("/api/leaves", leavesrout);
app.use("/api/setting", setting);
app.use("/api/attendance", atndance);
app.use("/api/dashbord", dashbord);

const PORT = process.env.PORT || 3000; // fallback port

try {
  await dbconect();
  await rg.reg();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
} catch (error) {
  console.error(error);
}
