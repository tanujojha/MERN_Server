import 'dotenv/config';
import express from "express";
import nodemailer from "nodemailer";
import { connnectToDB } from "./middlewares/DBConnections.js";
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import cors from "cors";


const app = express();
const PORT = process.env.PORT || 5001;

// Connect to DB
connnectToDB();

// Middlewares
app.use(cors())
app.use(express.json());
app.use(express.static("public"));  // serve static files from the 'public' directory

app.get("/", (req, res)=>{
    const data = {
        status: "success",
        message: "Welcome to MERN APP",
    }

    return res.status(200).send(data)
});


// Routes
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute)



app.listen(PORT, ()=>{
    console.log(`server running on ${PORT}`);
})