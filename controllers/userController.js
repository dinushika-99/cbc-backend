import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from"dotenv";

dotenv.config();

export function createUser(req,res){
    const newUserData = req.body     //take all data to variable came from req.body
   
    newUserData.password = bcrypt.hashSync(newUserData.password, 10)   //take password from the data list to hashing + solting..... 10 is solting 
   
    //create new user object
    const user = new User(newUserData)

    user.save().then(()=>{
        res.json({
            message: "User created"
        })
    }).catch(()=>{
        res.json({
            message: " User not created"
        })
    })
}

export function loginUser(req,res){
    User.find({email: req.body.email}).then(
        (users)=>{
            if(users.length == 0){
                res.json({
                    message: "User not found"
                })
            }else {

                const user = users[0]

                const isPasswordCorrect = bcrypt.compareSync(req.body.password,user.password)

                if(isPasswordCorrect){
                    const token = jwt.sign({
                        email : user.email,
                        firstName : user.firstName,
                        lastName : user.lastName,
                        isBlocked : user.isBlocked,
                        type : user.type,
                        profilePicture : user.profilePicture
                    }, process.env.SECRET)
                    
                    res.json({
                        message: "User logged in",
                        token : token
                    })
                }else{
                    res.json({
                        message: "User not logged in (wrong password)"
                    })
                }
            }
        }
    )
}