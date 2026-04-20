import { v2 as cloudinary } from "cloudinary";
import path from "path";
import dotenv from "dotenv";
import { ApiError } from "../utility/apiError.js";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const filePath = path.join(
    process.cwd(),
    "public/Real-World_Bug_Hunting_-_A_Field_Guide_to_Web_Hacking_by_Peter_Yaworski.pdf"
);

console.log("File Path is:", filePath);

const uploadOnCloud = async () => {
    try {

        // ✅ Upload PDF as IMAGE (best for preview)
        const res = await cloudinary.uploader.upload(filePath, {
            resource_type: "image",
            format: "pdf"
        });

        console.log("Upload Successful");

        // ✅ Generate Preview URL
        const previewUrl = cloudinary.url(res.public_id, {
            resource_type: "image",
            format: "pdf",
            secure: true
        });

        console.log("Respnse from the cloudinary is :- ", res);

        console.log("Preview URL:", previewUrl);

        const downloadUrl = cloudinary.url(res.public_id, {
            resource_type: "image",
            flags: "attachment",
            secure: true
        });

        console.log("Download URL:", downloadUrl);

        return {previewUrl, downloadUrl};

    } catch (error) {
        console.error("Cloudinary Error:", error);
        throw new ApiError(500, error.message || "Upload Failed");
    }
};

uploadOnCloud();
