import dotenv from "dotenv";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { Course } from "../models/course.model.js";
import { DB_NAME } from "../constants.js";

dotenv.config({
    path: "./.env"
})

// absolute path to course.json
const filePath = path.join(process.cwd(), "course.json");
console.log("filepath: ", filePath);

const courseJsonFile = JSON.parse(
    fs.readFileSync(filePath, "utf-8")
)

// seeding function :-
const seedCourses = async () => {
    try {
        console.log("trying to connect")
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log("connected")
        await Course.deleteMany(); // reset
        console.log("deleted")
        await Course.insertMany(courseJsonFile);

        console.log("Course data seeded successfully");
        process.exit(0);

    } catch (error) {
        console.log("An error eccured while seeding the Course data");
        console.error(error);
        process.exit(1);
    }
}

seedCourses();