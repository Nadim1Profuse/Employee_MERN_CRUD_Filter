const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");

const app=express();


app.use(express.json());
app.use(cors());


mongoose.connect("mongodb://127.0.0.1:27017/ReactEmployeeDB");


const employeeSchema={
        fName:String,
        lName:String,
        jobTitle:String,
        salary:Number,
        mobNumber:String,
        email:String,
        address:String

}

const Employee=mongoose.model("Employee",employeeSchema);

// getting employee data from clientSide and saving to DB

app.post("/add",(req,res)=>{
    res.send("Welcom to srver side on port 3001");
    const gotEmp=req.body;

    console.log(gotEmp);

    const employee=new Employee({
        fName:gotEmp.fName,
        lName:gotEmp.lName,
        jobTitle:gotEmp.jobTitle,
        salary:gotEmp.salary,
        mobNumber:gotEmp.mobNumber,
        email:gotEmp.email,
        address:gotEmp.address
    })
     employee.save(err=>{
        if(!err){
            console.log("succefully saved employee from client to db");
        }else{
            console.log(err)
        }
     });
});


// sending data to client side from db

app.get("/read",(req,res)=>{

    Employee.find({},(err,employees)=>{
        if(!err){

            res.send(employees);

        }else{
            console.log(err);
        }
    })
})


app.delete("/delete/:id",(req,res)=>{

    const idForDelete=req.params.id;
    console.log("id got from client to server for delete is below");
    console.log(idForDelete);
    
    Employee.findByIdAndRemove(idForDelete).exec((err)=>{
        if(!err){
            console.log("succefully deleted from db");
        }else{
            console.log(err);
        }
    })

});


app.put("/update",(req,res)=>{
    const dataToUpdate=req.body;
    console.log("app.put execute data from client is below");
    console.log(dataToUpdate);
    const updateId=req.body._id;
    Employee.find({_id:updateId},(err,foundEmp)=>{
        if(!err){
         console.log("got data from updated id");
         res.send(foundEmp);
         console.log(foundEmp)
        }else{
         console.log(err);
        }
         
     })

});


app.post("/finalUpdate",(req,res)=>{
    const idForUpdate=req.body.clickedIdUpdate;
    const empDataForUpdate=req.body.updatedEmployee;
    
   
    console.log("patched data _id of clickedIdForUpdate from client is=  ");
    console.log(idForUpdate);
    console.log("patched data upadtedEmp of clickedIdForUpdate from client is=  ");
    console.log(empDataForUpdate);
    Employee.updateOne({_id:idForUpdate},{$set:empDataForUpdate},function (err){
        if(!err){
            console.log("Succesfully updated")
        }


    })
});



app.listen(3001,()=>{
    console.log("server is running on port 3001");
});