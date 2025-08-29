import jwt from "jsonwebtoken";
import User from "../model/User.js";

const verify = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token, authorization denied", success: false });
    }

    const token = authHeader.split(" ")[1];

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired, please login again", success: false });
      }
      return res.status(401).json({ message: "Invalid token", success: false });
    }

    
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    req.user = user; 
    next();
  } catch (err) {
    console.error("Verify middleware error:", err); // Log full error
    return res.status(500).json({ message: "Server error", success: false, err: err.message });
  }
};

export default verify;
