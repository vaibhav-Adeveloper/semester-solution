import { Router } from "express";
import { signupHandler, loginHandler, logoutHandler } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { ApiResponse } from "../utility/apiResponse.js";

const router = Router();

// sign-up route
router.route("/signup").post(signupHandler);
// login route
router.route("/login").post(loginHandler);

// secured routes  -->>
// logout route
router.route("/logout").post(verifyJWT, logoutHandler);
router.route("/itsme").get(verifyJWT, (req, res) => {
    res.status(200).json(
        new ApiResponse(201, "User is Authenticated", req.user)
    )
})

export default router;