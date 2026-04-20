import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRouter from "./routes/user.route.js"
import getCoursesAndResourcesRouter from "./routes/getCoursesAndResources.route.js";
import previewRouter from "./routes/previewDocument.route.js";

const app = express();

// setting neccessary express configurations :-
// accepting json data in express from api's, forms etc
app.use(express.json());
// accepting data from the url in express.
app.use(express.urlencoded({extended: true}));
// getting access to cookies from browser (to manupulate them).
app.use(cookieParser());
// allowing CORS between backend and frontend.
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true   // so that cookie can be accepted, otherwise cookie will be blocked by the browser.
}));

// setting routes
// sign-up route
app.use("/api/v1/student", userRouter);

// get courses route and resource route
app.use("/api/v1/student/branch/semester", getCoursesAndResourcesRouter);

// get preview route
app.use("/api/v1/student/showdocument", previewRouter);

export default app;