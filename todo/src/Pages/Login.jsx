import React from 'react'

const Login = () => {
  return (
    <>
       <div className="background mt-5">
    <div className="shapes"></div>
    <div className="shapes"></div>
  </div>
  <form>
    <h3>Login Form</h3>
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

export default Login