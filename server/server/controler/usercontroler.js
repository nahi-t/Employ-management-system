import user from "../model/User.js";
import bcrypt from "bcrypt";
const reg = async (params) => {
    try {
    
        
        const hashpassword = await bcrypt.hash("admin123", 10);
        const newUser = new user({
            name: "admin",
            email: "admin@example.com",
            password: hashpassword,
            role: "admin",
            // profileImage:"/images/admin.png"
        });

    const existingAdmin = await user.findOne({ email: "admin@example.com" });
    if (existingAdmin) {
      console.log("Admin already exists");
      return;
    }
        await newUser.save();
        console.log("User registered successfully");
    } catch (error) {
        console.error("Error registering user:", error);
    }
};
export default {
    reg
};