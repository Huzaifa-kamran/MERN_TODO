import React, { useState } from 'react'
import styles from '../App.css';
import { useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddRole = () => {
    const [roleName, setRoleName] = useState();
    const [roleStatus, setRoleStatus] = useState();
    const navigator = useNavigate();
  

    const handleToast = (message,toastType)=>{
      toastType ==="danger"? toast.error(message):toast.success(message)
    }




    const handleSubmit = async(e) =>{
     e.preventDefault();
     const API = 'http://localhost:5000/userroles';
     const newRole = {
        roleName:roleName,
        roleStatus:roleStatus
     }
     console.log(newRole.roleName, newRole.roleStatus)
     const response = await fetch(API,{
        method: "POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(newRole)
     });

     const API_Response = await response.json();



     if(API_Response.message){
      
       handleToast("Role Added Successfully","success");
       setRoleName("");
       setRoleStatus("");
       setTimeout(() => {
         navigator("/allRoles")
        
       }, 2000);
     }else{
      handleToast(API_Response.error,"danger");
     }
    }
    return (
    <>
    <div className="background mt-5">
 <div className="shapes"></div>
 <div className="shapes"></div>
</div>
<form onSubmit={handleSubmit}>
 <h3>Add Role</h3>
 <label htmlFor="user">Role Name</label>
 <input type="text" name="user" id="user" placeholder="Enter Rolename" onChange={(e)=> setRoleName(e.target.value)}/>
 <label htmlFor="psw">Role Status</label>
 <select className="form-select text-light bg-dark" aria-label="Default select example" onChange={(e)=> setRoleStatus(e.target.value)}>
  <option>Select status</option>
  <option value="active">Active</option>
  <option value="inactive">In Active</option>
</select>
 <button type='submit'>Add Role</button>
 <div className="social">
   <div className="gg"><i className="bi bi-google"></i> Google</div>
   <div className="fb"><i className="bi bi-facebook"></i> Facebook</div>
 </div>
</form>
<ToastContainer />
 </>
  )
}

export default AddRole