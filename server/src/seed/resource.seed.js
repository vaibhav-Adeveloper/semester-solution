import dotenv from "dotenv";
import mongoose from "mongoose";
import { Resource } from "../models/resource.model.js";
import path from "path";
import fs from "fs";
import { DB_NAME } from "../constants.js";

dotenv.config({
    path: "./.env"
})

const filePath = path.join(process.cwd(), "resources.json");

const resourceJsonFile = JSON.parse(
    fs.readFileSync(filePath, "utf-8")
)

const seedResources = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        await Resource.deleteMany();
        await Resource.insertMany(resourceJsonFile);
        console.log("Seeding Done Successfully")
        process.exit(0);

    } catch (error) {
        console.log("Error in seeding resource json file in DB");
        console.log("Error :", error);
        process.exit(1);
    }
}

seedResources();