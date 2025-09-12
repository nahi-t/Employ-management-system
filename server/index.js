import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbconect from "./db/db.js";
import rg from "./controler/usercontroler.js";
import rout from "./Rout/authrout.js";
import deprout from "./Rout/depRout.js";
import emprout from "./Rout/emprout.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public/uploades"));
app.use("/api", rout);
app.use("/api", deprout);
app.use("/api/emp", emprout);

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
