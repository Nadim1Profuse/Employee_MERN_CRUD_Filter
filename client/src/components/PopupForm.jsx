import React, { useState } from "react";
import Button from "./Button";
import Axios from "axios";

export default function PopupForm(props){

const [isFormOpen,setIsFormOpen]=useState(false);
const [isFindFormOpen,setFindFormOpen]=useState(false);

const [employee,setEmployee]=useState(              //initializing empty employee 
    {
        fName:"",
        lName:"",
        jobTitle:"",
        salary:"",
        mobNumber:"",
        email:"",
        address:""
    }
);

const [searchValue,setSearchValue]=useState({
    valueToSearch:""
})

const [selectFeild,setSelectfeild]=useState("Select Feild")

function handleChange(event){
    const {name,value}=event.target;               //object Destructing

    setEmployee(preValue=>{                        //adding new details to empty employee
        return{
            ...preValue,
            [name]:value
        }

    })

}

function openForm(){
    setIsFormOpen(true);                           //setting to open form
}

function closeForm(){
    setIsFormOpen(false);                         //Setting to Close form
}

function handleSubmit(event){                     //when user submit PopUp Form to Add emp

    

    Axios.post("http://localhost:3001/add",employee);

    props.addEmployee(employee);                  //sending Added Employee to table.jsx



    setIsFormOpen(false);                         //setting popUpForm to Close

    

    setEmployee(                                  //After Adding and sending back to                                           //table.jsx once again setting empty
        {                                         //employee to table.jsx once 
            
        fName:"",                                 //employee to empty
        lName:"",
        jobTitle:"",
        salary:"",
        mobNumber:"",
        email:"",
        address:""
        }
    )

    window.location.reload();

}

function openFindForm(){
    setFindFormOpen(true);
}

function closeFindForm(){
    setFindFormOpen(false);
}



function handleFindChange(event){

    const findValue=event.target.value;
    setSearchValue(findValue);

}

function handleFindSubmit(event){
event.preventDefault();
console.log("handelfindSubmit executed")
console.log("selected field is="+selectFeild)
console.log("serached value is= "+searchValue);
setFindFormOpen(false)
}

function handleSelectFeildClick(event){
    const selectedMenu=event.target.value;
    setSelectfeild(selectedMenu);
    console.log("selected feild= "+selectedMenu)

}





    return(

        <div>

        <div style={{display: "flex"}} >
          <div style={{flex: "3"}}>
            <Button
            className="button button1"
            name="Find Employee"
            onClick={openFindForm}                                        //Open Form Button
            type="button"
            />
          </div>

          <div style={{flex: "6"}}>
            <Button
            className="button button1"
            name="Add Employee"
            onClick={openForm}                                        //Open Form Button
            type="button"
            />
          </div>
              
        </div>
        
        

        <div class="loginPopup">                                 
        <div class="formPopup" style={{display: isFormOpen ? "block" : "none" , marginTop:"4rem",left:"52rem"}} id="popupForm">
          <form  class="formContainer" onSubmit={handleSubmit} >
            <h2 style={{marginBottom:"1rem"}}>Add Employee</h2>

            <div style={{display: "flex"}}>
              <div style={{flex:"50%",marginRight:"1rem"}}>
              <input onChange={handleChange} type="text" id="email" placeholder="Firs Name" name="fName"  value={employee.fName} required />
           
              <input onChange={handleChange} type="text" id="psw" placeholder="Job Title" name="jobTitle" value={employee.jobTitle} required/>

              <input onChange={handleChange} type="number" id="psw" placeholder="Mobile Number" name="mobNumber" value={employee.mobNumber} required/>


              </div>
              <div style={{flex:"50%"}}>

              <input onChange={handleChange} type="text" id="psw" placeholder="Last Name" name="lName" value={employee.lName} required/>
              
              <input onChange={handleChange} type="number" id="psw" placeholder="Salary" name="salary" value={employee.salary} required/>
  
              <input onChange={handleChange} type="email" id="psw" placeholder="Email Address" name="email" value={employee.email} required/>

              </div>

         

            </div>
            <input onChange={handleChange} type="text" id="psw" placeholder="Res. Add." name="address" value={employee.address} required/>
            
            
            

            



            <Button
            className="btn"
            name="Submit"
            type="submit"
            />

            <Button
            className="btn cancel"
            name="Cancle"
            onClick={closeForm}
            type="button"
            />
            
          </form>
         </div>
         </div>

         {/* update form */}

         <div class="loginPopup">                                 
        <div class="formPopup" style={{display: isFindFormOpen ? "block" : "none" }} id="popupForm">
          <form  class="formContainer">
            <h2>Add Employee</h2>

            <select className="popUpFind" onChange={handleSelectFeildClick} value={selectFeild}>

            <option value="Select" selected >Select Feild</option>
             
            <option value="fName" >First Name</option>
            <option value="lName" >Last Name</option>
            <option value="jobTitle" >Job Title</option>
            <option value="mobNumber" >Mobile Number</option>
            <option value="email" >Email</option>
            <option value="address" >Res. Add.</option>

            </select>

            <input onChange={handleFindChange} type="text" id="email" placeholder="Enter Details To Search" name="toSearch"  value={searchValue.valueToSearch} required />
            
            



            <Button
            className="btn"
            name="Submit"
            onClick={handleFindSubmit}
            type="submit"
            />

            <Button
            className="btn cancel"
            name="Cancle"
            onClick={closeFindForm}
            type="button"
            />
            
          </form>
         </div>
         </div>

         </div>
    )
}