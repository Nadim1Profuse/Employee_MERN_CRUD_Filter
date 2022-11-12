import React, { useEffect, useState } from "react";
import PopupForm from "./PopupForm";
import EmpTr from "./EmpTr";
import Button from "./Button";
import  Axios  from "axios";
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import IconButton from '@mui/material/IconButton';

let fullEmpData=[]
let findSalInputName="";


export default function Table(){

  const [employees,setEmployees]=useState([]);                    //initialisng emty arra

  const [isUpdatePopUpOpen,setUpdatePopUp]=useState(false);       //popUp for update bydefault hidden

  const [clickedIdForUpdate,setClickedIdForUpdate]=useState("1");   //saving clickedId in update

  const [searchString,setSearchString]=useState({
    fNameSearch:"",
    lNameSearch:"",
    jobTitleSearch:"",
    mobSearch:"",
    emailSearch:"",
    addSearch:""

  });

  const [salaryFind,setSalaryFind]=useState({
    salaryFixed:"",
    salaryGreater:"",
    salaryLess:"",
    salaryRangeStarts:"",
    salaryRangeEnds:""

  })

  const [isFindPopUpFnameOpen,setFindPopUpFnameOpen]=useState(false);
  const [isFindPopUpLnameOpen,setFindPopUpLnameOpen]=useState(false);
  const [isFindPopUpJobTitleOpen,setFindPopUpJobTitleOpen]=useState(false);
  const [isFindPopUpSalaryOpen,setFindPopUpSalaryOpen]=useState(false)
  const [isFindPopUpMobOpen,setFindPopUpMobOpen]=useState(false);
  const [isFindPopUpEmailOpen,setFindPopUpEmailOpen]=useState(false);
  const [isFindPopUpAddOpen,setFindPopUpAddOpen]=useState(false);
  
  const [salaryInputClicked,setSalaryInputClicked]=useState({
    isFixedClicked:true,
    isGreaterClicked:true,
    isLessClicked:true,
    isRangeStartClicked:true,
    isRangeEndClicked:true


  })

  
  useEffect(()=>{

    Axios.get("http://localhost:3001/read").then((response)=>{
      
      const empDataDb=response.data;
      fullEmpData=empDataDb
      setEmployees(empDataDb);
      // console.log(employees);

      // console.log("our full employee data is fullEmpData= ")
      // console.log(fullEmpData);
    })

  },[])
  

  const [updateEmployee,setUpdateEmp]=useState({                  //initialising emty employee for update

        fName:"",
        lName:"",
        jobTitle:"",
        salary:"",
        mobNumber:"",
        email:"",
        address:""
     
  })

  // Adding New Employee by addPopUp

function addNewEmployee(newEmployee){                         //fx for adding new employee
  

  setEmployees((prevValue) => [...prevValue, newEmployee]);   //adding new employee to Employees Array
  
  console.log(employees);


}


// Deleting existing employee

function deleteEmp(id){                                 //fx for delete

  console.log("id from db for delete="+id)

  let text="Are You Really Want To Delete This"
  if(confirm(text)){                                    // javaScript Confirm() fx for Confirming before delete
    
    
    Axios.delete(`http://localhost:3001/delete/${id}`);

    window.location.reload();

  }else{
    console.log("you cancled");
  }
}




// updating Existing Employee


function updateEmp(id){  

  setClickedIdForUpdate(id); 
  
  setUpdatePopUp(true);                               //Opening Popup form for update
               
  
 Axios.put("http://localhost:3001/update",{
    _id:id,
    upadtedEmp:updateEmployee
  }).then(value=>{
    const gotBackData=value.data;
    setUpdateEmp(gotBackData[0]);
  });

  setClickedIdForUpdate(id);                          //saving the clickedId in usestate
  
}


// getting values  from updateformPopup 

function handleChange(event){

  
  const {name,value}=event.target;                   //getting the user input from UpdatePopup form

  setUpdateEmp(preValue=>{                           //and using it to update the employee
      return{                                        //by SetUpdateEmp use state fx
          ...preValue,
          [name]:value
      }
  })

}



function closeForm(){
  setUpdatePopUp(false);
  setFindPopUpFnameOpen(false)
  setFindPopUpLnameOpen(false)
  setFindPopUpJobTitleOpen(false);
  setFindPopUpEmailOpen(false);
  setFindPopUpAddOpen(false);
  setFindPopUpMobOpen(false);
  setFindPopUpSalaryOpen(false);
}

function handleSubmit(event){
  
  event.preventDefault();

  Axios.post("http://localhost:3001/finalUpdate",{
    clickedIdUpdate:clickedIdForUpdate,
    updatedEmployee:updateEmployee
});
  

  setUpdatePopUp(false);                           //closing updatePopupForm 

  window.location.reload();                        
}

function handleChangefind(event){
  const {name,value}=event.target;
  setSearchString({
    [name]:value
  })
  
}

function handleChangeFindSalary(event){

  console.log("handeChangeFindSalary Clicked")
  const {name,value}=event.target; 

  setSalaryFind(preValue=>{
    return{
      ...preValue,
      [name]:value
  }
  });

}


// search codes start from here

function fNameSearch(){
  setFindPopUpFnameOpen(true);
  console.log(fullEmpData)
  setEmployees(fullEmpData);
  console.log("fNameSearchclicked");

}

function lNameSearch(){

  setEmployees(fullEmpData);

  setFindPopUpLnameOpen(true);
  console.log("lNameSearchh clicked");
  

}

function jobTitleSearch(){

  setEmployees(fullEmpData);
  console.log("jobTitleSearch clicked");
  setFindPopUpJobTitleOpen(true)

}

function salarySearch(){

  setEmployees(fullEmpData);
  console.log("salarySearch clicked");
  setFindPopUpSalaryOpen(true)
}

function mobSearch(){

  setEmployees(fullEmpData);
  console.log("mobSearch clicked");
  setFindPopUpMobOpen(true);

}

function emailSearch(){

  setEmployees(fullEmpData);
  console.log("emailSearch clicked");
  setFindPopUpEmailOpen(true);

}

function addSearch(){

  setEmployees(fullEmpData);
  console.log("addSearch clicked");
  setFindPopUpAddOpen(true);  
}


function handleFindSubmitFname(event){
  event.preventDefault();
  console.log(searchString);
  setFindPopUpFnameOpen(false);
  console.log(employees);
  const findValue=searchString.fNameSearch;

  setEmployees(prevsValue=>{
    return prevsValue.filter(emp=>{
      return emp.fName===findValue;
    })
  })

  
  
  console.log("input value="+findFName);


  
  
  setSearchString({
    fNameSearch:"",
    lNameSearch:"",
    jobTitleSearch:"",
    salarySearch:"",
    mobSearch:"",
    emailSearch:"",
    addSearch:""

  })
  
  
  

}

function handleFindSubmitLname(event){

  event.preventDefault();
  console.log(searchString);
  setFindPopUpLnameOpen(false);

  const findValue=searchString.lNameSearch;

  setEmployees(prevsValue=>{
    return prevsValue.filter(emp=>{
      return emp.lName===findValue;
    })
  })

  setSearchString({
    fNameSearch:"",
    lNameSearch:"",
    jobTitleSearch:"",
    salarySearch:"",
    mobSearch:"",
    emailSearch:"",
    addSearch:""

  })
}

function handleFindSubmitJobTitle(event){

  event.preventDefault();
  console.log(searchString);
  setFindPopUpJobTitleOpen(false);

  const findValue=searchString.jobTitleSearch;

  setEmployees(prevsValue=>{
    return prevsValue.filter(emp=>{
      return emp.jobTitle===findValue;
    })
  })

  setSearchString({
    fNameSearch:"",
    lNameSearch:"",
    jobTitleSearch:"",
    salarySearch:"",
    mobSearch:"",
    emailSearch:"",
    addSearch:""

  })
  

}



function handleFindSubmitSalary(event){
  event.preventDefault();
  console.log(salaryFind);
  setFindPopUpSalaryOpen(false);

  console.log("findSalInputName="+findSalInputName)

  switch (findSalInputName) {

    case "salaryFixed":
      console.log("findsalSubmit SalaFixed Swich Case Executed");
      const findSalaryFixed=parseInt(salaryFind.salaryFixed);
      console.log("findSalary="+findSalaryFixed)
      
      setEmployees(prevValue=>{

       return prevValue.filter(emp=>{
        return emp.salary===findSalaryFixed;

        })

      })
      break;



    case "salaryGreater":
      console.log("findsalSubmit SlaryGreater Swich Case Executed");
      const findSalaryGreater=parseInt(salaryFind.salaryGreater);
      console.log("findSalary="+findSalaryGreater);
      
      setEmployees(prevValue=>{
        return prevValue.filter(emp=>{
          return emp.salary > findSalaryGreater;
        })
      })
      
      
      break;


    case "salaryLess":
      console.log("findsalSubmit SlaryLess Swich Case Executed");
      const findSalaryLess=parseInt(salaryFind.salaryLess);
      console.log("findSalary="+findSalaryLess);

      setEmployees(prevValue=>{
        return prevValue.filter(emp=>{
         return emp.salary < findSalaryLess;
        })
      })


      break;

    case "salaryRangeEnds":
      console.log("findsalSubmit SlaryRange Swich Case Executed");
      const findSalaryRangeStarts=parseInt(salaryFind.salaryRangeStarts);
      const findSalaryRangeEnds=parseInt(salaryFind.salaryRangeEnds);
      console.log("findSalaryRangeStart="+findSalaryRangeStarts+"and ends="+findSalaryRangeEnds);

      setEmployees(prevValue=>{
        return prevValue.filter(emp=>{
          return (emp.salary >findSalaryRangeStarts && emp.salary<findSalaryRangeEnds );  
        })
      })

      break;
      


  
    default:
      break;
  }

  setSalaryFind({
    salaryFixed:"",
    salaryGreater:"",
    salaryLess:"",
    salaryRangeStarts:"",
    salaryRangeEnds:""

  })
  

}

function handleFindSubmitMob(event){

  event.preventDefault();
  console.log(searchString);
  setFindPopUpMobOpen(false);

  const findValue=searchString.mobSearch;

  setEmployees(prevsValue=>{
    return prevsValue.filter(emp=>{
      return emp.mobNumber===findValue;
    })
  })

  

  setSearchString({
    fNameSearch:"",
    lNameSearch:"",
    jobTitleSearch:"",
    salarySearch:"",
    mobSearch:"",
    emailSearch:"",
    addSearch:""

  })
 
}

function handleFindSubmitEmail(event){

  event.preventDefault();
  console.log(searchString);
  setFindPopUpEmailOpen(false);

  const findValue=searchString.emailSearch;

  setEmployees(prevsValue=>{
    return prevsValue.filter(emp=>{
      return emp.email===findValue;
    })
  })

  setSearchString({
    fNameSearch:"",
    lNameSearch:"",
    jobTitleSearch:"",
    salarySearch:"",
    mobSearch:"",
    emailSearch:"",
    addSearch:""

  })
  

}

function handleFindSubmitAdd(event){

  event.preventDefault();
  console.log(searchString);
  setFindPopUpAddOpen(false);

  const findValue=searchString.addSearch;

  setEmployees(prevsValue=>{
    return prevsValue.filter(emp=>{
      return emp.address===findValue;
    })
  })
 
  setSearchString({
    fNameSearch:"",
    lNameSearch:"",
    jobTitleSearch:"",
    salarySearch:"",
    mobSearch:"",
    emailSearch:"",
    addSearch:""

  })
}

function handleClickSalaryInput(event){
  const inputClicked=event.target.name;
  findSalInputName=inputClicked;

  console.log("input clicked for salary= "+inputClicked)

  switch (inputClicked) {
    case "salaryFixed":
      console.log("switch case executed for Salaryfixed")


      setSalaryFind(
        {
          salaryFixed:"",
          salaryGreater:"",
          salaryLess:"",
          salaryRangeStarts:"",
          salaryRangeEnds:""

        }
      )

      

      
      break;

    case "salaryGreater":
      console.log("switch case executed for salaryGreater")

      setSalaryFind(
        {
          salaryFixed:"",
          salaryGreater:"",
          salaryLess:"",
          salaryRangeStarts:"",
          salaryRangeEnds:""

        }
      )

      
        
        break;
    
    case "salaryLess":
      console.log("switch case executed for salaryLess")

      setSalaryFind(
        {
          salaryFixed:"",
          salaryGreater:"",
          salaryLess:"",
          salaryRangeStarts:"",
          salaryRangeEnds:""

        }
      )

      
            
        break;
        
    case "salaryRangeStarts":
      console.log("switch case executed for salaryRangeStarts")
      setSalaryFind(
        {
          salaryFixed:"",
          salaryGreater:"",
          salaryLess:"",
          salaryRangeStarts:"",
          salaryRangeEnds:""

        }
      )

      
          
            
        break;
        
    case "salaryRangeEnds":
      console.log("switch case executed for salaryRangeEnds")
      

      
            
        break;
          

  
    default:
      break;
  }
}





let count=0;                                            // initializing Counter for sr.Number

    return(

<div className="resTable">        
<h1 style={{margin:"30px 250px"}}> Employee Summery </h1>

{/******************** find PopUp forms starts  ************/}

{/* 1.for First Name find Query */}
<div class="loginPopup" id="updatePopup" >
        <div class="formPopup" style={{display: isFindPopUpFnameOpen ? "block" : "none",marginTop:"6rem",left:"52rem" }} id="popupForm">
          <form  class="formContainer">
            <h2 style={{marginBottom:"1rem"}}>Find Employees <br/> By <br/> First Name</h2>
            
            <input onChange={handleChangefind} type="text" id="email" placeholder="Enter First Name To Search" name="fNameSearch"  value={searchString.fNameSearch} required="true" />
           
            
            <Button
            className="btn"
            name="Submit"
            onClick={handleFindSubmitFname}
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

{/* 2.for  last Name find Query */}

<div class="loginPopup" id="updatePopup" >
        <div class="formPopup" style={{display: isFindPopUpLnameOpen ? "block" : "none",marginTop:"6rem",left:"52rem" }} id="popupForm">
          <form  class="formContainer">
            <h2 style={{marginBottom:"1rem"}}>Find Employees<br/>  By <br/>Last Name</h2>
            
            <input onChange={handleChangefind} type="text" id="email" placeholder="Enter Last Name To Search" name="lNameSearch"  value={searchString.lNameSearch} required />
           
            
            <Button
            className="btn"
            name="Submit"
            onClick={handleFindSubmitLname}
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

{/* 3. for  Job Title find Query */}


<div class="loginPopup" id="updatePopup" >
        <div class="formPopup" style={{display: isFindPopUpJobTitleOpen ? "block" : "none",marginTop:"6rem",left:"52rem" }} id="popupForm">
          <form  class="formContainer">
            <h2 style={{marginBottom:"1rem"}}>Find Employees <br/> By <br/> Job Title</h2>
            
            <input onChange={handleChangefind} type="text" id="email" placeholder="Enter Job Title To Search" name="jobTitleSearch"  value={searchString.jobTitleSearch} required />
           
            
            <Button
            className="btn"
            name="Submit"
            onClick={handleFindSubmitJobTitle}
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

{/* 4. for Salary find Query */}


<div class="loginPopup" id="updatePopup" >
        <div class="formPopup" style={{display: isFindPopUpSalaryOpen ? "block" : "none",marginTop:"2rem",left:"52rem" }} id="popupForm">
          <form  class="formContainer">
            <h2 style={{marginBottom:"1rem"}}>Find Employees By Salary</h2>
            {/* <h4>By Fixed Salary</h4> */}
            <input onClick={handleClickSalaryInput} onChange={handleChangeFindSalary} type="number" id="email" placeholder="Enter Fixed Salary Amount To Search" name="salaryFixed"  value={salaryFind.salaryFixed} disabled={salaryInputClicked.isFixedClicked ? false  : true} required />
            <h2>Or</h2>
            {/* <h4>By Greater Than Enterd Amount</h4> */}
            <input onClick={handleClickSalaryInput} onChange={handleChangeFindSalary} type="number" id="email" placeholder="Enter the Greater Than Amount To Search" name="salaryGreater"  value={salaryFind.salaryGreater} disabled={salaryInputClicked.isGreaterClicked ? false : true} required />
            {/* <h4>By Less Than Enterd Amount</h4> */}
            <h2>Or</h2>
            <input onClick={handleClickSalaryInput} onChange={handleChangeFindSalary} type="number" id="email" placeholder= "Enter the Less Than Amount To Search" name="salaryLess"  value={salaryFind.salaryLess}  disabled={salaryInputClicked.isLessClicked ? false : true} required />
            {/* <h4>By a Perticuler Range</h4> */}
            <h2>Or</h2>

            <div style={{display: "flex"}}>
              <div style={{flex:"50%",marginRight:"1rem"}}>
              <input onClick={handleClickSalaryInput} onChange={handleChangeFindSalary} type="number" id="email" placeholder="Salary Range Starts From" name="salaryRangeStarts"  value={salaryFind.salaryRangeStarts}  disabled={salaryInputClicked.isRangeStartClicked ? false : true} required />
              </div>
              <div style={{flex:"50%",marginRight:"1rem"}}>
              <input onClick={handleClickSalaryInput} onChange={handleChangeFindSalary} type="number" id="email" placeholder="Salary Range Ends To" name="salaryRangeEnds"  value={salaryFind.salaryRangeEnds} disabled={salaryInputClicked.isRangeEndClicked ? false : true} required />
              </div>
            </div>

             



            <Button
            className="btn"
            name="Submit"
            onClick={handleFindSubmitSalary}
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

{/* 5. for  Mobile Number find Query */}

<div class="loginPopup" id="updatePopup" >
        <div class="formPopup" style={{display: isFindPopUpMobOpen ? "block" : "none",marginTop:"6rem",left:"52rem" }} id="popupForm">
          <form  class="formContainer">
            <h2 style={{marginBottom:"1rem"}}>Find Employees <br/>By<br/> Mobile Number</h2>
            
            <input onChange={handleChangefind} type="text" id="email" placeholder="Enter Mobile Number To Search" name="mobSearch"  value={searchString.mobSearch} required />
           
            
            <Button
            className="btn"
            name="Submit"
            onClick={handleFindSubmitMob}
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

{/* 6. for  Email find Query */}

<div class="loginPopup" id="updatePopup" >
        <div class="formPopup" style={{display: isFindPopUpEmailOpen ? "block" : "none",marginTop:"6rem",left:"52rem" }} id="popupForm">
          <form  class="formContainer">
            <h2 style={{marginBottom:"1rem"}}>Find Employees<br/> By <br/>Email Id </h2>
            
            <input onChange={handleChangefind} type="text" id="email" placeholder="Enter Email Id To Search" name="emailSearch"  value={searchString.emailSearch} required />
           
            
            <Button
            className="btn"
            name="Submit"
            onClick={handleFindSubmitEmail}
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


{/* 7. for  Res. Add. find Query */}

<div class="loginPopup" id="updatePopup" >
        <div class="formPopup" style={{display: isFindPopUpAddOpen ? "block" : "none",marginTop:"6rem",left:"52rem" }} id="popupForm">
          <form  class="formContainer">
            <h2 style={{marginBottom:"1rem"}}>Find Employees<br/> By<br/> Res. Address </h2>
            
            <input onChange={handleChangefind} type="text" id="email" placeholder="Enter Res. Address To Search" name="addSearch"  value={searchString.addSearch} required />
           
            
            <Button
            className="btn"
            name="Submit"
            onClick={handleFindSubmitAdd}
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




{/* popupForm for update section */}

<div class="loginPopup" id="updatePopup">
        <div class="formPopup" style={{display: isUpdatePopUpOpen ? "block" : "none" }} id="popupForm">
          <form  class="formContainer">
            <h2>Update Employee</h2>
            
            <input onChange={handleChange} type="text" id="email" placeholder="Firs Name" name="fName"  value={updateEmployee.fName} required />
           
            <input onChange={handleChange} type="text" id="psw" placeholder="Last Name" name="lName" value={updateEmployee.lName} required/>

            <input onChange={handleChange} type="text" id="psw" placeholder="Job Title" name="jobTitle" value={updateEmployee.jobTitle} required/>

            <input onChange={handleChange} type="text" id="psw" placeholder="Mobile Number" name="mobNumber" value={updateEmployee.mobNumber} required/>

            <input onChange={handleChange} type="text" id="psw" placeholder="Email Address" name="email" value={updateEmployee.email} required/>

            <input onChange={handleChange} type="text" id="psw" placeholder="Res. Add." name="address" value={updateEmployee.address} required/>



            <Button
            className="btn"
            name="Submit"
            onClick={handleSubmit}
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

<PopupForm
  addEmployee={addNewEmployee}
/>

<table>

  <thead>
    <tr style={{textAlign:"center"}}>
      <th >Sr.No </th>
      <th style={{textAlign:"center"}} >First Name <IconButton aria-label="delete" size="large" color="secondary"><ManageSearchIcon fontSize="inherit" onClick={fNameSearch} /></IconButton></th>
      <th style={{textAlign:"center"}} >Last Name <IconButton aria-label="delete" size="large" color="secondary"><ManageSearchIcon fontSize="inherit" onClick={lNameSearch} /></IconButton></th>
      <th style={{textAlign:"center"}}>Job Title <IconButton aria-label="delete" size="large" color="secondary"><ManageSearchIcon fontSize="inherit" onClick={jobTitleSearch} /></IconButton></th>
      <th style={{textAlign:"center"}}>Salary <IconButton aria-label="delete" size="large" color="secondary"><ManageSearchIcon fontSize="inherit" onClick={salarySearch} /></IconButton></th>
      <th style={{textAlign:"center"}}>Mobile Number <IconButton aria-label="delete" size="large" color="secondary"><ManageSearchIcon fontSize="inherit" onClick={mobSearch} /></IconButton></th>
      <th style={{textAlign:"center"}}>Email <br/> <IconButton aria-label="delete" size="large" color="secondary"><ManageSearchIcon fontSize="inherit" onClick={emailSearch} /></IconButton></th>
      <th style={{textAlign:"center"}}>Res. Add. <IconButton aria-label="delete" size="large" color="secondary"><ManageSearchIcon fontSize="inherit" onClick={addSearch} /></IconButton></th>
      <th style={{textAlign:"center"}}>Edit </th>
      <th style={{textAlign:"center"}}>Delete </th>
      
    </tr>
  </thead>
  <tbody>

  {
    
    employees.map((singleEmp,index)=>{
      count++;

      return(

        <EmpTr
          key={index}
          id={singleEmp._id}
          srNo={count}
          fName={singleEmp.fName}
          lName={singleEmp.lName}
          jobTitle={singleEmp.jobTitle}
          salary={singleEmp.salary}
          mobNumber={singleEmp.mobNumber}
          email={singleEmp.email}
          address={singleEmp.address}
          onUpdate={updateEmp}
          onDelete={deleteEmp}
          


        />
      )      
    })
  }
  
    
  </tbody>
</table>
</div>

)}