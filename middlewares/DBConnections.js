import mongoose from "mongoose";

export const connnectToDB = async()=> {
    const res = await mongoose.connect('mongodb://127.0.0.1:27017/scrap');
    // console.log(res.connections);
        
    if(res.connection.readyState === 1){
        console.log(`MongoDB connected ReadyState: ${res.connection.readyState}`);
    }else{
        console.log(`MongoDB connection ReadyState: ${res.connection.readyState}`);
    }
}