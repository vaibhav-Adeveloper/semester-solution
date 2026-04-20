import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js';

// function to connect mongo DB to a mongo DB URI
export default async function ConnectDB(){
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log("Mongo DB connected succesfully as DB Host: ", connectionInstance.connection.host);
    } catch (error) {
        console.log("Mongo DB connection failed with error: ", error);
        process.exit(1);
    }
}