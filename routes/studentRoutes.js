import express from "express";
import {getStudents, createStudent, deleteStudent} from "../controllers/studentControllers.js";


//create studentRouter
const studentRouter = express.Router();

//if received get request - action
studentRouter.get("/",getStudents)

//if received post request -  action
studentRouter.post("/",createStudent)

studentRouter.delete("/", deleteStudent)

export default studentRouter;