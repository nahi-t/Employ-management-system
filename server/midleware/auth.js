import jwt from "jsonwebtoken";
import User from "../model/User.js";

const verify = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization; 
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "No token, authorization denied", success: false });
    }

    const token = authHeader.split(" ")[1]; 

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
   
    if (!decoded) {
      return res.status(401).json({ msg: "Invalid token", success: false });
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "User not found", success: false });
    }

    req.user = user; // Attach user to request object
    next();
  } catch (err) {
    return res.status(500).json({ message: "Server error", success: false });
  }
};

export default verify;
