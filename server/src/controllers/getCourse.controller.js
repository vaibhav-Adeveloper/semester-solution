import { ApiError } from "../utility/apiError.js";
import { ApiResponse } from "../utility/apiResponse.js";
import { asyncHandler } from "../utility/asyncHandler.js";
import { Course } from "../models/course.model.js";

// handler to fetch course data from the DB.
const getCoursesOnBasisOfBranch = asyncHandler ( async (req, res) => {
    console.log("getCoursesOnBasisOfBranch function start running");
    const {branch} = req.body;
    if(!branch){
        throw new ApiError(500, "Internal Server Error", {});
    }
    try {
        const Courses = await Course.find({
            branch: branch,
        })
        if(!Courses){
            throw new ApiError(400, "No such course is founded", {});
        }

        console.log("Courses fetched successfully");
        console.log(Courses);

        return res.status(200).json(
            new ApiResponse(201, "Courses fetched Successfully", Courses)
        )
    } catch (error) {
        console.log("error from getCoursesOnBasisOfBranch")
        console.log("Error coming from getCourse Controller js");
        console.log("Error", error);
    }
})

export { getCoursesOnBasisOfBranch };