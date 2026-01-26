import mongoose from "mongoose";
const connectDB=async ()=>{
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log(process.env.MONGODB_URI);
        console.log(`\n MongoDB connected DB host :${mongoose.connection.host}`)
    }catch(error){
        console.log("mongodb connection error ",error);
        process.exit(1)
    }
}
export default connectDB