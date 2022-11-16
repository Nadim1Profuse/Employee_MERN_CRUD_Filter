const express=require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect("mongodb+srv://orange:Profuse_nk@cluster0.mxv9rej.mongodb.net/EmployeeGeneralDb");

const personalInfoSchema=new mongoose.Schema({
    empId:Number,
    fName:String,
    mName:String,
    lName:String,
    age:Number,
    gender:String,
    bloodGroup:String,
    pwdStatus:String,
    
});

const personaldSchema=new mongoose.Schema({
        empId:Number,
        adharNumber:Number,
        panCardNumber:String,
        voterIdNumber:String,
        drivingLicenseNumber:String
    
})

const personalEmployeeSchema=new mongoose.Schema({
    empId:Number,
    generalInfo:personalInfoSchema,
    idDetails:personaldSchema
})

const empAddSchema=new mongoose.Schema({
    empId:Number,
    address1:String,
    landMark:String,
    city:String,
    state:String,
    pincode:Number
});

const empContactSchema=new mongoose.Schema({
    empId:Number,
    mobileNumber:Number,
    alternateMobileNumber:Number,
    landlineNumber:Number
})

const empContactAddressSchema=new mongoose.Schema({
    empId:Number,
    address:empAddSchema,
    contact:empContactSchema

})





const EmployeePersonal=mongoose.model("PersonalInfo",personalEmployeeSchema);

const EmpContactAddDetails=mongoose.model("ContactAddDetail",empContactAddressSchema);




const EmpFullDetailsSchema=new mongoose.Schema({
    empId:Number,
    empPersonal:{ type: mongoose.Schema.Types.ObjectId, ref: 'PersonalInfo' },
    empAddContact:{ type: mongoose.Schema.Types.ObjectId, ref: 'ContactAddDetail' }
})

const EmpCompleteDetails=mongoose.model("EmployeeCompleteDetail",EmpFullDetailsSchema)

app.post("/emp",(req,res)=>{

    for (let index = 0; index < 5000; index++) {
    const empDetails=req.body;
    // console.log(empDetails);
    
    const newEmployeePersonal=new EmployeePersonal({
        empId:empDetails.empId,

        generalInfo:{
            empId:empDetails.empId,
            fName:empDetails.fName,
            mName:empDetails.mName,
            lName:empDetails.lName,
            age:empDetails.age,
            gender:empDetails.gender,
            bloodGroup:empDetails.bloodGroup,
            pwdStatus:empDetails.pwdStatus,

        },

        idDetails:{
            empId:empDetails.empId,
            adharNumber:empDetails.adharNumber,
            panCardNumber:empDetails.panCardNumber,
            voterIdNumber:empDetails.voterIdNumber,
            drivingLicenseNumber:empDetails.drivingLicenseNumber
        }

    })

   
        newEmployeePersonal.save(err=>{
            if(!err){
                // console.log("succesfully added personals details");
            }else{
                console.log(err)
            }
        })
        
   

    



    const newEmpContAdd=new EmpContactAddDetails({
        empId:empDetails.empId,

        address:{
            empId:empDetails.empId,
            address1:empDetails.address1,
            landMark:empDetails.landMark,
            city:empDetails.city,
            state:empDetails.state,
            pincode:empDetails.pincode

        },

        contact:{
            empId:empDetails.empId,
            mobileNumber:empDetails.mobileNumber,
            alternateMobileNumber:empDetails.alternateMobileNumber,
            landlineNumber:empDetails.landlineNumber

        }

    })

    
        newEmpContAdd.save(err=>{
            if(!err){
                // console.log(" add and contact Detalis");
            }else{
                console.log(err);
            }
        })
        
    

    


    const newCompleteEmp=new EmpCompleteDetails({

       empId:empDetails.empId,
       empPersonal:newEmployeePersonal._id,
       empAddContact:newEmpContAdd._id

    })


    
       
        newCompleteEmp.save(err=>{
            if(!err){
                // console.log("succesfully Saved Full Employee Details");
            }else{
                console.log(err);
            }
        })
        
    }  
    res.send("successfully saved 5000 docs")
    console.log("successfully saved 5000 docs")


});





app.get("/get",(req,res)=>{
    
    EmpCompleteDetails.find({}).populate(['empPersonal','empAddContact']).exec((err,emp)=>{
        if(!err){
            console.log(emp)
        }else{
            console.log(err)
        }
        res.send(emp)
    })
   
    
})



app.listen(3000,()=>{
    console.log("server is running on port 3000");
})
