import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./Login.css";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../assets/logo2.jpg'


const Login = () => {
  let user=useRef()
    let password=useRef()

    let navigate=useNavigate()
  function login(e){
        e.preventDefault()
        if(user.current.value==="admin" && password.current.value==="admin123"){
          navigate("admindashboard")
        }
        else if(user.current.value==="accountant" && password.current.value==="accountant123"){
          navigate("accountant")
        }
        else{
          navigate("/")
        }
    }
  return (
    <>
 
      <nav className="navbar">
        <div><img className="logo" src={logo} alt="logo not found" /></div>
        <div className="nav-links">
          <a href="/">About Us</a>
          <span>|</span>
          <a href="/signup" className="signup-btn">Sign up</a>
        </div>
      </nav>

    
      <div className="login-container">
        <h1>Welcome back</h1>
        <form onSubmit={login}>
          <label>Enter Email address or Username:</label>
          <input
            type="text"
            required
            ref={user}
          />
          <label>Enter Password:</label>
          <input
            type="password"
            required
            ref={password}
          />
          <div className="options">
            <a href="/forgot-password" className="forgot">Forgot Password?</a>
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>
        <p className="create-account">
          Don’t have an account? <a href="/register">Create New Account</a>
        </p>
      </div>

      {/* Footer */}
      <footer>
        <p>© All copy rights are reserved to group 4</p>
        <div className="contact">
          <span>📞 +91 9999999999</span>
          <span>📧 abc@gmail.com</span>
        </div>
      </footer>
      <Outlet />
    </>
  );
};

export default Login;