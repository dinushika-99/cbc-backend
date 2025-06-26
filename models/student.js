import mongoose from "mongoose"

//structure of the entity Eg: Student entity details
const studentSchema = mongoose.Schema({
    name: String,
    age : Number,
    gender : String
})

const Student  = mongoose.model("students", studentSchema) //create a model 

export default Student   // export student details for index.js