import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        index: true,
        ref: "User"
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 255,
        minLength: 3
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 255,
        minLength: 2
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: /^\S+@\S+\.\S+$/, // Basic email format validation
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    gender: {
        type: String,
        index: true
    },
    ipAddr: {
        type: String,
        index: true
    },
    profileImgName: {
        type: String,
    },
    profileImgUri: {
        type: String,
    },
    status: {
        // {
        //     0: Inactive
        //     1: Active
        // }
        type: Number,
        default: 1,
    }

}, {timestamps: true})

const User = mongoose.model("User", userSchema);

export default User;