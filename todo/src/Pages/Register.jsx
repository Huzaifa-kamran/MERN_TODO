// import React, { useEffect, useState } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Register = () => {
//   const [AllRoles, setAllRoles] = useState([]);
//   const [userName, setUserName] = useState('');
//   const [userEmail, setUserEmail] = useState('');
//   const [userPassword, setUserPassword] = useState('');
//   const [userImage, setUserImage] = useState(null);
//   const [userRole, setUserRole] = useState();

//   const handleToast = (message,toastType)=>{
//     toastType ==="danger"? toast.error(message):toast.success(message)
//   }

//   // Fetch roles from the API
//   const fetchRoles = async () => {
//     const rolesResponse = await fetch('http://localhost:5000/userroles');
//     const roles = await rolesResponse.json();
//     setAllRoles(roles); 
//   };

//   useEffect(() => {
//     fetchRoles();
//   }, []);

//   // Handle form submission
//   const handleSubmit = async(e) => {
//     e.preventDefault();
//     const newUser = { userName, userEmail, userPassword,userImage, userRole };

//     const response = await fetch('http://localhost:5000/user',{
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(newUser),
//     });

//     const responseData = await response.json();

//     if(responseData.message){
//       handleToast(responseData.message,"success");
//     }else{
//       handleToast(responseData.error,"danger");
//     }
  
//   };

//   return (
//     <>
//       <div className="background mt-5">
//         <div className="shapes"></div>
//         <div className="shapes"></div>
//       </div>
//       <form onSubmit={handleSubmit}>
//         <h3>Registration Form</h3>
        
//         <label htmlFor="user">Username</label>
//         <input
//           type="text"
//           name="user"
//           id="user"
//           placeholder="Enter Username"
//           value={userName}
//           onChange={(e) => setUserName(e.target.value)}
//         />
        
//         <label htmlFor="userEmail">Email</label>
//         <input
//           type="email"
//           name="userEmail"
//           id="userEmail"
//           placeholder="Enter Email"
//           value={userEmail}
//           onChange={(e) => setUserEmail(e.target.value)}
//         />
        
//         <label htmlFor="psw">Password</label>
//         <input
//           type="password"
//           name="psw"
//           id="psw"
//           placeholder="Enter Password"
//           value={userPassword}
//           onChange={(e) => setUserPassword(e.target.value)}
//         />

//         <label htmlFor="psw">Image</label>
//         <input
//           type="file"
//           name="psw"
//           id="image"
//           placeholder="Enter Password"
//           value={userImage}
//           onChange={(e) => setUserImage(e.target.files[0])}
//         />
        
//         <label htmlFor="role">User Role</label>
//         <select
//           className="form-select text-light bg-dark"
//           aria-label="Default select example"
//           value={userRole}
//           onChange={(e) => setUserRole(e.target.value)}
//         >
//           <option value="">Select Role</option>
//           {AllRoles.map((role, index) => (
//             <option key={index} value={role.roleName}>
//               {role.roleName}
//             </option>
//           ))}
//         </select>
        
//         <button type="submit">Register</button>
        
//         <div className="social">
//           <div className="gg"><i className="bi bi-google"></i> Google</div>
//           <div className="fb"><i className="bi bi-facebook"></i> Facebook</div>
//         </div>
//       </form>
//       <ToastContainer />
//     </>
//   );
// };

// export default Register;

import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [AllRoles, setAllRoles] = useState([]);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userImage, setUserImage] = useState(null);  // File input, default to null
  const [userRole, setUserRole] = useState('');       // Ensure initial value is an empty string

  const handleToast = (message, toastType) => {
    toastType === "danger" ? toast.error(message) : toast.success(message);
  };

  // Fetch roles from the API
  const fetchRoles = async () => {
    try {
      const rolesResponse = await fetch('http://localhost:5000/userroles');
      const roles = await rolesResponse.json();
      setAllRoles(roles);
    } catch (error) {
      handleToast("Failed to load roles", "danger");
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("userEmail", userEmail);
    formData.append("userPassword", userPassword);
    formData.append("userImage", userImage);  // Append file directly
    formData.append("userRole", userRole);

    try {
      const response = await fetch('http://localhost:5000/user', {
        method: 'POST',
        body: formData,
      });

      const responseData = await response.json();

      if (response.ok) {
        handleToast(responseData.message, "success");
      } else {
        handleToast(responseData.error, "danger");
      }
    } catch (error) {
      handleToast("Registration failed", "danger");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h3>Registration Form</h3>
        
        <label htmlFor="user">Username</label>
        <input
          type="text"
          id="user"
          placeholder="Enter Username"
          value={userName || ''}
          onChange={(e) => setUserName(e.target.value)}
        />
        
        <label htmlFor="userEmail">Email</label>
        <input
          type="email"
          id="userEmail"
          placeholder="Enter Email"
          value={userEmail || ''}
          onChange={(e) => setUserEmail(e.target.value)}
        />
        
        <label htmlFor="psw">Password</label>
        <input
          type="password"
          id="psw"
          placeholder="Enter Password"
          value={userPassword || ''}
          onChange={(e) => setUserPassword(e.target.value)}
        />

        <label htmlFor="image">Image</label>
        <input
          type="file"
          id="image"
          onChange={(e) => setUserImage(e.target.files[0])}  // Removed value attribute for file input
        />
        
        <label htmlFor="role">User Role</label>
        <select
          value={userRole || ''}
          onChange={(e) => setUserRole(e.target.value)}
        >
          <option value="">Select Role</option>
          {AllRoles.map((role, index) => (
            <option key={index} value={role.roleName}>
              {role.roleName}
            </option>
          ))}
        </select>
        
        <button type="submit">Register</button>
        
        <ToastContainer />
      </form>
    </>
  );
};

export default Register;

