import React from 'react';
import logo from '../assets/logo2.jpg'

const Register = () => {
  return (
    <div>
      <style>{`
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background: #fff;
        }

      .logo img {
        height: 50px;
        width: auto;
        object-fit: contain;
        }
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #f5eaea;
          padding: 10px;
        }

        .logo {
          font-size: 24px;
          font-weight: bold;
          line-height: 1.2;
          padding-left:100px;
          padding-top:20px;
        }

        .nav-links {
          display: flex;
          gap: 20px;
          align-items: center;
          border: 2px solid;
          border-radius: 35px;
          justify-content: space-evenly;
          padding: 10px 100px;
        }

        .nav-links a {
          text-decoration: none;
          color: black;
          font-weight: bold;
          padding: 8px 16px;
          border-radius: 20px;
          transition: all 0.3s ease;
        }

        .nav-links a:hover {
          background-color: black;
          color: white;
          transform: scale(1.05);
        }

        .login-btn-nav {
          background: none;
          color: black;
          font-weight: 700;
          font-size: 16px;
          border: none;
          cursor: pointer;
        }

        .login-btn-nav:hover {
          background-color: black;
          color: white;
          border-radius: 15px;
          padding: 8px 16px;
        }

        .register-wrapper {
          display: flex;
          justify-content: space-between;
          padding: 40px;
          background: white;
          margin: 20px;
        }

        .register-left {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .reg-text {
          text-align: center;
          line-height: 1;
          font-size: 24px;
        }

        .line1,
        .line2 {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .big-r {
          font-size: 150px;
          font-weight: bold;
          color: transparent;
          -webkit-text-stroke: 2px red;
          margin: 0 10px;
        }

        .registe-word {
          display: inline-block;
          position: relative;
          top: -45px;
          left: 10px;
          font-size: 24px;
          font-weight: bold;
          color: black;
        }

        .text {
          font-size: 24px;
          font-weight: bold;
          color: black;
        }

        .line2 .text1 {
          position: relative;
          right: 20px;
          bottom: 50px;
          font-weight: 700;
        }

        .line2 .text2 {
          position: relative;
          left: 100px;
          bottom: 50px;
          font-weight: 700;
        }

        .register-form {
          flex: 1;
          padding: 20px 40px;
        }

        .register-form form {
          display: flex;
          flex-direction: column;
        }

        .register-form label {
          margin-top: 10px;
          font-weight: bold;
        }

        .register-form input {
          padding: 10px;
          margin-top: 5px;
          border-radius: 20px;
          border: 1px solid #ccc;
          outline: none;
        }

        .register-btn {
          margin-top: 20px;
          padding: 12px 24px;
          background: black;
          color: white;
          border: none;
          border-radius: 25px;
          cursor: pointer;
          font-size: 16px;
          width: 60%;
          align-self: center;
          transition: all 0.3s ease;
        }

        .register-btn:hover {
          background-color: white;
          color: black;
          border: 2px solid black;
          transform: scale(1.05);
        }

        footer {
          background-color: #f5eaea;
          padding: 10px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 14px;
        }

        footer p {
          margin: 0;
        }

        footer .contact {
          display: flex;
          gap: 15px;
          align-items: center;
        }
      `}</style>
      <div className="navbar">
        <div className="logo">
        <img src={logo} alt="Billing App Logo" />
        </div>
        <div className="nav-links">
          <a href="#">Home</a>
          <span>|</span>
          <a href="#">About us</a>
          <span>|</span>
          <button className="login-btn-nav">Login</button>
        </div>
      </div>

      <div className="register-wrapper">
        <div className="register-left">
          <div className="reg-text">
            <div className="line1">
              <span className="registe-word">registe</span>
              <span className="big-r">R</span>
            </div>
            <div className="line2">
              <span className="text1">you</span>
              <span className="text2">self</span>
            </div>
          </div>
        </div>

        <div className="register-form">
          <form>
            <label>Full Name :</label>
            <input type="text" required />
            <label>Email id :</label>
            <input type="email" required />
            <label>Phone number :</label>
            <input type="text" required />
            <label>Username :</label>
            <input type="text" required />
            <label>Enter Password :</label>
            <input type="password" required />
            <label>Retype Password :</label>
            <input type="password" required />

            <button type="submit" className="register-btn">Register</button>
          </form>
        </div>
      </div>

      <footer>
        <p>© All copy rights are reserved to group 4</p>
        <div className="contact">
          <span>📞 +91 9999999999</span>
          <span>📧 abc@gmail.com</span>
        </div>
      </footer>
    </div>
  );
};

export default Register;