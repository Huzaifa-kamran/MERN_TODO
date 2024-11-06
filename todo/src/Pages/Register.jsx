import React from 'react'

const Register = () => {
  return (
    <>
       <div className="background">
    <div className="shapes"></div>
    <div className="shapes"></div>
  </div>
  <form>
    <h3>Registration Form</h3>
    <label htmlFor="user"> Username</label>
    <input type="text" name="user" id="user" placeholder="Enter Username" />
    <label htmlFor="psw">Password</label>
    <input type="password" name="psw" id="psw" placeholder="Enter Password" />
    <button>Login Now</button>
    <div className="social">
      <div className="gg"><i className="bi bi-google"></i> Google</div>
      <div className="fb"><i className="bi bi-facebook"></i> Facebook</div>
    </div>
  </form>
    </>
  )
}

export default Register