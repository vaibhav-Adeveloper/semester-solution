import { asyncHandler } from "../utility/asyncHandler.js";
import { ApiError } from "../utility/apiError.js";
import { ApiResponse } from "../utility/apiResponse.js";
import { Resource } from "../models/resource.model.js";

const getResourcesOnBasisOfBranchAndSemester = asyncHandler( async (req, res) => {
    const {branch, semester} = req.body;
    if(!branch || !semester){
        throw new ApiError(500, "Internal Server Error", {});
    }
    console.log("hey i am from getResourcesOnBasisOfBranchAndSemester function :", semester);
    try {
        const Resources = await Resource.find({
            branch: branch,
            semester: semester
        })
        if(!Resources){
            throw new ApiError(400, "No such course is founded", {});
        }
    
        console.log("Resource fetched successfully");
        console.log(Resources);
    
        return res.status(200).json(
            new ApiResponse(201, "Resources fetched Successfully", Resources)
        )

    } catch (error) {
        console.log("error from getResourcesOnBasisOfBranchAndSemester")
        console.log("Error coming from getResource Controller js");
        console.log("Error", error);
    }
})

export {getResourcesOnBasisOfBranchAndSemester};