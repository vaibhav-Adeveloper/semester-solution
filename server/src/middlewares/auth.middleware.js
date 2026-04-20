import { User } from "../models/user.model.js";
import { ApiError } from "../utility/apiError.js";
import { asyncHandler } from "../utility/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler( async (req, _, next) => {
    try {
        // getting the token from browser (cookie) or from authorization header (sent via frontend) 
        // const token = req.cookies?.accessToken || req.header("Authorization").replace("Bearer ", "");
        const token = req.cookies?.accessToken;
        console.log("token is --> ", token);
        // checking token is there or not
        if(!token) throw new ApiError(400, "Access Token not found");
        // authenticating the token
        const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
        const user = await User.findById(decodedToken?.userId).select("-password");
        // checking user is there or not ?
        if(!user) throw new ApiError(400, "Invalid Access Token");
    
        // after all security checks, if user token is valid
        // add user in req object so other functions can access user info.
        req.user = user;
        next();

    } catch (error) {
        console.log("this error is from verifyJWT middleware", error);
        throw new ApiError(401, error?.message || "Invalid Access Token");
    }
})