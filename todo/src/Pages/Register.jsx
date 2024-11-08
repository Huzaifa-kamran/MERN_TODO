import React, { useEffect, useState } from 'react';

const Register = () => {
  const [AllRoles, setAllRoles] = useState([]);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userImage, setUserImage] = useState('');
  const [userRole, setUserRole] = useState('');

  // Fetch roles from the API
  const fetchRoles = async () => {
    const rolesResponse = await fetch('http://localhost:5000/userroles');
    const roles = await rolesResponse.json();
    setAllRoles(roles); 
    console.log(roles); 
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
    const newUser = { userName, userEmail, userPassword,userImage, userRole };

    const response = await fetch('')
    console.log('Form submitted', { userName, userEmail, userPassword,userImage, userRole });
  };

  return (
    <>
      <div className="background mt-5">
        <div className="shapes"></div>
        <div className="shapes"></div>
      </div>
      <form onSubmit={handleSubmit}>
        <h3>Registration Form</h3>
        
        <label htmlFor="user">Username</label>
        <input
          type="text"
          name="user"
          id="user"
          placeholder="Enter Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        
        <label htmlFor="userEmail">Email</label>
        <input
          type="email"
          name="userEmail"
          id="userEmail"
          placeholder="Enter Email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
        
        <label htmlFor="psw">Password</label>
        <input
          type="password"
          name="psw"
          id="psw"
          placeholder="Enter Password"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
        />

        <label htmlFor="psw">Image</label>
        <input
          type="file"
          name="psw"
          id="image"
          placeholder="Enter Password"
          value={userImage}
          onChange={(e) => setUserImage(e.target.value)}
        />
        
        <label htmlFor="role">User Role</label>
        <select
          className="form-select text-light bg-dark"
          aria-label="Default select example"
          value={userRole}
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
        
        <div className="social">
          <div className="gg"><i className="bi bi-google"></i> Google</div>
          <div className="fb"><i className="bi bi-facebook"></i> Facebook</div>
        </div>
      </form>
    </>
  );
};

export default Register;
