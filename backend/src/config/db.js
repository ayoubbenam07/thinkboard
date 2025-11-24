import mongoose from "mongoose"

export const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("mongodb connected successfully")
    }
    catch(e){
        console.error("failed to connect", e)
        process.exit(1)
    }
}