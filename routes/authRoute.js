import express from "express";
import User from "../models/userModel.js";
import {mockUserData} from "../mockData.js";
import bcrypt from "bcrypt";


const router = express.Router();

router.post("/register", async(req, res)=> {

    const response = {status: 1, data: [], message: "Registration Successfull", errors: []};

    try {

        const emailExists = await User.findOne({email: req.body.email});

        if(emailExists){
            response.message = "This User already exists"
            return res.json(response);
        }
        
        const getHashedPassword = async(plainPass)=> {

            const salt = await bcrypt.genSalt(5);
            const hashedPassword = await bcrypt.hash(plainPass, salt);
            
            return hashedPassword
        }

        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            gender: req.body.gender,
            ipAddr: req.body.ipAddr,
            password: await getHashedPassword(req.body.password)
        });
        newUser.userID = newUser._id;

        const savedUser = await newUser.save();

        // const promises = mockUserData.map(async(user)=> {
        //     const newUser = new User({
        //         firstName: user.firstName,
        //         lastName: user.lastName,
        //         email: user.email,
        //         gender: user.gender,
        //         ipAddr: user.ipAddr,
        //         password: await getHashedPassword(user.password)
        //     });
        //     newUser.userID = newUser._id;

        //     return await newUser.save();

        // });

        // const savedUsers = await Promise.all(promises);

        response.data = savedUser;
        
    } catch (error) {
        console.log(error);
        response.status = 0;
        response.data = null;
        response.message = "Server Error: Can not Register";
        response.errors = error;
    }

    res.json(response)
});


export default router