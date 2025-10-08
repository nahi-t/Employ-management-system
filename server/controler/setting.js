import User from "../model/User.js";
import bcrypt from "bcrypt";

const changepass = async (req, res) => {
  try {
    const { userId, oldpassword, newpassword } = req.body;

    // 1. Find user
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // 2. Verify old password
    const isMatch = await bcrypt.compare(oldpassword, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Old password is incorrect" });
    }

    // 3. Hash and update
    const hashedPassword = await bcrypt.hash(newpassword, 10);
    await User.findByIdAndUpdate(userId, { password: hashedPassword });

    return res
      .status(200)
      .json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export { changepass };
