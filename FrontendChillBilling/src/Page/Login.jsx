import React from "react";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  function login(e){
        e.preventDefault()
        user.current.value==='Accountant' && pass.current.value==='Accoutant123' ? navigate('accountant') : navigate('login')
    }
  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          Billing <br /> App
        </div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <span>|</span>
          <Link to="/about">About Us</Link>
          <span>|</span>
          <Link to="/register">
            <button className="signup-btn">Sign Up</button>
          </Link>
        </div>
      </nav>

      {/* Login Form */} 
      <div className="login-container">
        <h1>Welcome Back</h1>
        <form>
          <label>Email / Username:</label>
          <input type="text" placeholder="Enter your email or username" required ref={user} />

          <label>Password:</label>
          <input type="password" placeholder="Enter your password" required  ref={password}/>

          <div className="options">
            <Link to="/forgot-password" className="forgot">
              Forgot Password?
            </Link>
          </div>
                  
          <button type="submit" className="login-btn" onClick={login} >
            Login 
          </button>
        </form>

        <p className="create-account">
          Don’t have an account?{" "}
          <Link to="/register">Create New Account</Link>
        </p>
      </div>

      {/* Footer */}
      <footer>
        <p>© All rights reserved | Group 4</p>
        <div className="contact">
          <span>📞+91 9999999999</span>
          <span>📧 abc@gmail.com</span>
        </div>
      </footer>
    </>
  );
};

export default Login;