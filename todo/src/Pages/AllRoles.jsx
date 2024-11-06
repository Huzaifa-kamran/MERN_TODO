import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllRoles = () => {
  const [roles, setRoles] = useState([]);

  const handleToast = (message,toastType)=>{
    toastType ==="danger"? toast.error(message):toast.success(message)
  }

  const handleDelete = async(roleName) =>{
    try {

      const response = await fetch(`http://localhost:5000/userroles/${roleName}`,{
        method: 'DELETE',
      });
       if(response.ok){
         handleToast("Role deleted successfully","success")
        }else{
          handleToast("Failed to delete role","danger")
       }
      
    } catch (error) {
      console.log(error.message);
    }

  }

  const fetchRoles = async () => {
    try {
      const response = await fetch('http://localhost:5000/userroles');
      const data = await response.json(); 
      setRoles(data); 
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, [roles]);

  return (
    <div className='container mt-5 text-center'>
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Role</th>
            <th scope="col">Status</th>
            <th scope="col">Update/Delete</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role, index) => (
            <tr key={role.id || index}>
              <th scope="row">{index + 1}</th>
              <td>{role.roleName}</td>
              <td>{role.roleStatus}</td>
              <td>
                 <Link className='btn btn-primary me-2' to={`updateRole/${role.roleName}`}>Update</Link>
                 <button className='btn btn-danger' onClick={()=>{handleDelete(role.roleName)}}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default AllRoles;
