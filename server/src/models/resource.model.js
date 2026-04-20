import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema({
    filename:{
        type:String,
        required:true
    },
    contentType:{
        type:String,
        required:true,
        enum:["pdf", "notes", "book", "paper", "syllabus", "lecture"]
    },
    branch:{
        type:String,
        required:true
    },
    semester:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    previewUrl:{
        type:String,
        required:true,
        default:""
    },
    downloadUrl:{
        type:String,
        required:true,
        default:""
    }
})

export const Resource = mongoose.model("Resource", resourceSchema);