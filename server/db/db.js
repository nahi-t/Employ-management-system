import mongose from "mongoose";
const dbconect=async () => {
    try{
        await mongose.connect(process.env.URL, {
          
        });
        console.log("Database connected successfully");
    }catch(error){
        console.error("Database connection error:", error);
    }
    

}
export default dbconect;