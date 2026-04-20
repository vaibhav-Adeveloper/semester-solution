// import fs from "fs";
// import { fetchDocument } from "../services/useCloudinary.js";
import { ApiError } from "../utility/apiError.js";
import { ApiResponse } from "../utility/apiResponse.js";

const previewDocument = async(req, res) => {
    const {publicId} = req.body;
    console.log("publicId from previewDocument :", publicId);
    try {
        const filePublicUrl = await fetchDocument("PENDING_MESS_FEE_NOTICE.docx_j1oyym");
        console.log("hey i am from previewDocument controller js", filePublicUrl);
        
        // res.setHeader("Content-Type", "application/pdf");
        // res.setHeader("Content-Disposition", "inline");

        // const fileStream = fs.createReadStream(filePublicUrl);
        // fileStream.pipe(res);
        // res.redirect(filePublicUrl);

        res.status(200).json(
            new ApiResponse(201, "Message", filePublicUrl)
        )

    } catch (error) {
        console.log("Error is coming from priviewDocument function");
        console.log(error);
        throw new ApiError(500, error?.message || "error in previewing")
    }
}

export {previewDocument};