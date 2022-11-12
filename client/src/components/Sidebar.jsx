import React,{useEffect,useState} from "react";
import Header from "./Header";
import SidebarMenu from "./SidebarMenu";
import Profile from "./Profile";


function Sidebar(){

    const [isOpen, setIsOpen] = useState(false)

useEffect(() => {                                                       //it will execute on every render
  document.body.classList.toggle("active", isOpen===true);              //"active" class will add in body when isOpen is true
  console.log("useeffect executed and state of isOpen is="+isOpen);
},[isOpen])                         // useEffect is depend on the isOpen when the state of isOpen Changed it will execute the useEffect
   
    return(

<div className="wrapper">
         <Header
             sidebar={()=> setIsOpen(!isOpen)}
         />

        <div className="sidebar">
         
          <Profile/>

          <SidebarMenu/>

          

        </div>

</div>
    )
}

export default Sidebar;