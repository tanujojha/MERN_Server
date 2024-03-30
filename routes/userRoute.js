import express from "express";
import User from "../models/userModel.js";



const router = express.Router();

router.get("/search", async(req, res)=> {

    // console.log("req query", req.query);

    const response = {status: 1, data: [], message: "User fetch successfully", errors: [], total: 0};

    const query = {
        
    }

    if(req.query.search){
        query.firstName = {'$regex': req.query.search, '$options': 'i'}
    }

    // console.log("query", query);

    try {

        const data = await User.find(query);

        // console.log("users : ", data);

        response.data = data;
        response.total = data.length;
        
    } catch (error) {
        console.log(error);
        response.status = 0;
        response.data = null;
        response.message = "Server Error: Can not search";
        response.errors = error;
    }

    res.json(response)
});


export default router