import React from "react";
import Button from "./Button"


export default function EmpTr(props) {

  function handleClickDelete(){                         //when user clicke on delete button
    props.onDelete(props.id);                           //using props sending its id back to
  }                                                     //table.jsx

  function handleClickUpdate(){                         //same operations as above in delete
    props.onUpdate(props.id);
  }

    return(
    <tr>
      <td data-column="First Name">{props.srNo}</td>
      <td data-column="First Name">{props.fName}</td>
      <td data-column="Last Name">{props.lName}</td>
      <td data-column="Job Title">{props.jobTitle}</td>
      <td data-column="Salary">{props.salary}</td>
      <td data-column="Mobile Number">{props.mobNumber}</td>
      <td data-column="Email">{props.email}</td>
      <td data-column="Address">{props.address}</td>

      <td data-column="update Button">

      <Button
      onClick={handleClickUpdate}
      name="Update"
      className="button update"
      />

      </td>

      <td data-column="Delete Button">
      <Button
      onClick={handleClickDelete}
      name="Delete"
      className="button delete"
      />
      </td>





    </tr>
    )
}