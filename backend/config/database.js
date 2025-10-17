
import mongoose from "mongoose";


const connectDB=async ()=>{

       try{
           await mongoose.connect(process.env.URI);
           console.log("Database connected");
       }catch(err){
        console.log("err",err);
       }
     

    }
    export default connectDB;




    