import React, { useState } from 'react'
import styles from '../App.css';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';

const UpdateRole = () => {
    const [roleName, setRoleName] = useState();
    const [roleStatus, setRoleStatus] = useState();
    const navigator = useNavigate();
    const {id} = useParams();


    const fetchRole = async()=>{
       // Fetch roles from the API
     const response = await fetch(`http://localhost:5000/userroles`);
    
 
     const data = await response.json();
    
 
    const updateRole = data.filter(x => x.roleName === id);
      
        setRoleName(updateRole[0].roleName)
        setRoleStatus(updateRole[0].roleStatus)

    }

    const handleToast = (message,toastType)=>{
      toastType ==="danger"? toast.error(message):toast.success(message)
    }

    const handleUpdate = async(e) =>{
     e.preventDefault();
     const API = `http://localhost:5000/userroles/${id}`;
     const newRole = {
        roleName:roleName,
        roleStatus:roleStatus
     }
     console.log(newRole.roleName, newRole.roleStatus)
     const response = await fetch(API,{
        method: "PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(newRole)
     });

     const API_Response = await response.json();
     if(API_Response.message){
      
        handleToast("Role Updated Successfully","success");
        setRoleName("");
        setRoleStatus("");
        setTimeout(() => {
          navigator("/allRoles")
         
        }, 2000);
      }else{
       handleToast(API_Response.error,"danger");
      }
    }

    useEffect(() => {
     fetchRole()
    
    
    }, [])
    
    return (
    <>
    <div className="background mt-5">
 <div className="shapes"></div>
 <div className="shapes"></div>
</div>
<form onSubmit={handleUpdate}>
 <h3>Update Role</h3>
 <label htmlFor="user">Role Name</label>
 <input type="text" name="user" id="user" value={roleName} placeholder="Enter Rolename" onChange={(e)=> setRoleName(e.target.value)}/>
 <label htmlFor="psw">Role Status</label>
 <select className="form-select text-light bg-dark" aria-label="Default select example" onChange={(e)=> setRoleStatus(e.target.value)}>
  <option>Select status</option>
  <option value="active" selected={roleStatus === "active"}>Active</option>
  <option value="inactive" selected={roleStatus === "inactive"}>In Active</option>
</select>
 <button type='submit'>Update Role</button>
 <div className="social">
   <div className="gg"><i className="bi bi-google"></i> Google</div>
   <div className="fb"><i className="bi bi-facebook"></i> Facebook</div>
 </div>
</form>
<ToastContainer />
 </>
  )
}

export default UpdateRole