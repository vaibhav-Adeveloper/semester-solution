import mongoose, { mongo } from "mongoose";

// sub schema
const subjectSchema = new mongoose.Schema({
    subject:{
        type:String,
        required:true
    },
    code:{
        type:String,
        required:true
    }
})

// main schema
const courseSchema = new mongoose.Schema({
    branch:{
        type:String,
        required:true
    },
    semester:{
        type:String,
        required:true
    },
    subjects:{
        type:[subjectSchema]
    }
})

export const Course = mongoose.model("Course", courseSchema);