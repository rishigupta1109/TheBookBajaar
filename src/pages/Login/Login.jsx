import React from "react";
import "../Login/Login.css";
export default function Login() {
  return (
    <div className="login-register">
      <div className="switch-btns">
        <button>Register</button>
        <button>Login</button>
      </div>
      <div className="column form">
        <h1 style={{alignSelf:"center"}}>Login</h1>
        {/* <h2>Register</h2> */}
        <div>
          <label>First Name</label>
          <input type="text"></input>
        </div>
        <div>
          <label>Last Name</label>
          <input type="text"></input>
        </div>
        <div>
          <label>Email</label>
          <input type="text"></input>
        </div>
        <div>
          <label>College</label>
          <input type="text"></input>
        </div>
        <div>
          <label>Password</label>
          <input type="text"></input>
        </div>
        <div>
          <label>Confirm Password</label>
          <input type="text"></input>
        </div>
        <button>Register</button>
        {/* <button>Login</button> */}
      </div>
    </div>
  );
}
