import Student from "../models/student.js"

//using key word export - normal export
export function getStudents(req,res){
    Student.find().then(
        (studentList)=>{
            res.json({
                list: studentList
            })
        }
    )
}

export function createStudent(req,res){    //if request go through the student post method

    const student = new Student(req.body)   //save student 
    student.save().then(()=>{               //if   
        res.json({
            message:"Student created"
        })
    }).catch(()=>{                          //else
        res.json({
            message: "Student not created"
        })
    })
}

export function deleteStudent(req,res){
    Student.deleteOne({name : req.body.name}).then(
        ()=>{
            res.json(
                {
                    message: "Student deleted successfully"
                }
            )
        }
    )
}
