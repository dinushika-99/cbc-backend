import mongoose, { startSession } from "mongoose";

//create user schema
const userSchema = mongoose.Schema({
    email : {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        default: "customer"
    },
    profilePic: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    }
})

//create user model
const User = mongoose.model("users", userSchema)

export default User;