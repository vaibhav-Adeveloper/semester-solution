import { User } from "../models/user.model.js";
import { ApiError } from "../utility/apiError.js";
import { ApiResponse } from "../utility/apiResponse.js";
import { asyncHandler } from "../utility/asyncHandler.js";

// sign up handler.
const signupHandler = asyncHandler( async (req, res) => {
    // console.log(req.body);
    const {fullname, email, password, branch} = req.body;
    // checking all data is provided or not
    if(!fullname || !email || !password || !branch) throw new ApiError(400, "All fields are required");
    // checking user is existing user or not
    const user = await User.findOne({email});
    if(user) throw new ApiError(400, "User Already Exists, please Login !");
    // creating user 
    await User.create({
        fullname, email, password, branch
    })
    // console.log("User created successfully:", req.body);
    // sending response
    return res.status(200).json(
        new ApiResponse(201, "User account created successfully", {})
    )
})

// login handler 
const loginHandler = asyncHandler( async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password) throw new ApiError(400, "All fields are required");
    const user = await User.findOne({email});
    if(!user) throw new ApiError(400, "User doesn't exist with this email, please sign-up");

    const passwordCorrect = await user.isPasswordCorrect(password);
    if(!passwordCorrect) throw new ApiError(401, "Password is Incorrect");
    
    // set the cookie in the user browser
    const cookieOptions = {
        httpOnly:true,
        secure:false,  // for dev
        // expiresIn: process.env.ACCESS_TOKEN_EXPIRY, this line is only for JWT, for cookie we have to use maxAge : time in ms
        maxAge: 15*24*60*60*1000  // time in ms.
    }

    const token = user.generateAccessToken();
    // console.log("token generated sucessfully: ", token);

    return res.status(200).cookie("accessToken", token, cookieOptions).json(
        new ApiResponse(201, "User Logged in succesfully", user)
    )
})

const logoutHandler = asyncHandler( async(req, res) => {
    console.log("logoutHandler get started running, welcome developer !");

    // removing document (user) from DB.  // this means you are deleting the account of the user not logging out the user.
    // await User.deleteOne({_id: req.user._id});  // this is account deletion not the logout of user.
    // to logout the user just clear all the tokens or expire/invalidate the refresh token but not delete the user account.

    // removing cookie from user browser.

    if(!req.user){
        console.log("i am inside the if of logouthandler of backend api");
        throw new ApiError(400, "Not a logged in user, Please first logged in!");
    }

     const cookieOptions = {
        httpOnly:true,
        secure:false,  // for dev
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }

    return res.status(200).clearCookie("accessToken", cookieOptions).json(
        new ApiResponse(201, "User logged out successfully")
    )
})

export {signupHandler, loginHandler, logoutHandler};