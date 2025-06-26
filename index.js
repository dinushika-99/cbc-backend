import express from 'express';
import bodyParser from 'body-parser';  //use bodyParser for process the output of express
import mongoose from 'mongoose';
import productRouter from './routes/productRouter.js';
import userRouter from './routes/userRouter.js';
import jwt from "jsonwebtoken";

const app = express();

const mongoUrl = "mongodb+srv://user:123@cluster0.8rcflsn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(mongoUrl,{})    //mongoose library create connection using above url(connection string) 
const connection = mongoose.connection;  //connection assign a variable

connection.once("open", ()=>{
    console.log("Database connected")         //once database connect successfully give this message
})

//bodyparser is for process the output of express
app.use(bodyParser.json())  //for middle ware app.use <- "use" key word...
 
//create middle ware to decripte the token 
app.use(

    (req,res,next)=>{  
        const token = req.header("Authorization")?.replace("Bearer ", "")
        console.log(token)

        if(token != null){
            jwt.verify(token, "cbc-secret-key-7973" , (error, decoded)=>{
                if(!error){
                    req.user = decoded 
                }
            })
        }

        next()
    }
)


app.use("/api/products",productRouter)  //if the request come as product sent it to productRouter
app.use("/api/users", userRouter)

//start express
app.listen(
    3000,       //port no
    ()=>{
        console.log("Server is running on port 3000");
    }
)