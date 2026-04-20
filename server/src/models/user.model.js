import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    branch:{
        type:String,
        required:true,
        enum:["ECE", "CHEM", "MECH", "CSE", "IT", "ELEC", "META"],
        default: "Choose your branch"
    }
})

// using 'pre' built in middleware of mongoose, to hash the password before saving it to DB.
// also ensuring that this middleware runs only when, user password is changed or modified.
userSchema.pre("save", async function(){
    if(!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 4);
})
// if using async in middleware in mongoose, dont use next, as mongoose auto handles async.
// bcz async func automaticaly returns a promise.
// mongoose waits for promise - then continues
// so next() is unncessary
// if using simple callback :- function(){...} , then next is required compulsorily.
 

// creating a custom method for user, to check there entered password is correct or not.
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
}

// custom method for generating token to user
userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        userId: this._id,
        email: this.email
    }, 
    process.env.JWT_TOKEN_SECRET, 
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    })
}

export const User = mongoose.model("User", userSchema);