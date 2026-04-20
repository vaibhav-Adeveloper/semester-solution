import app from './app.js';
import ConnectDB from './db/connectDB.js';
import dotenv from 'dotenv';

// configuring environemnt file
dotenv.config({
    path: "../.env"
})

// app entry point :-
// connecting DB.
ConnectDB()
.then(()=>{
    console.log("--> Mongo DB connected Succesfully");
    // checking any error on the side of express server.
    app.on("error", (error)=>{
        console.log("Server finding difficult to proceed :",error);
    })
    // start listening the server on port.
    app.listen(process.env.PORT, ()=>{
        console.log(`Server is listeninig on port: ${process.env.PORT}`);
    })
})
.catch(()=>console.log("==> Connection to DB failed"))