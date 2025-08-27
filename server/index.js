import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbconect from "./db/db.js";
import rg from "./controler/usercontroler.js";
import rout from "./Rout/authrout.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", rout);

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
