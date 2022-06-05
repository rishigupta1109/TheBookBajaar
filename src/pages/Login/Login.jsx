import React, { useState } from "react";
import "../Login/Login.css";
export default function Login() {
  const [mode,setMode]=useState(0);    //0->register 1->login
  return (
    <div className="login-register">
      <div className="switch-btns">
        <button
          className={mode ? "active" : undefined}
          onClick={() => {
            setMode(0);
          }}
        >
          Register
        </button>
        <button
          className={mode ? undefined : "active"}
          onClick={() => {
            setMode(1);
          }}
        >
          Login
        </button>
      </div>
      <div className="column form">
        {mode===1&&<h1 style={{ alignSelf: "center" }}>Login</h1>}
        {mode===0&&<h1 style={{ alignSelf: "center" }}>Register</h1>}
        {mode=== 0&&<div>
          <label>First Name</label>
          <input type="text"></input>
        </div>}
        {mode===0&&<div>
          <label>Last Name</label>
          <input type="text"></input>
        </div>}
        <div>
          <label>Email</label>
          <input type="text"></input>
        </div>
       {mode==0&& <div>
          <label>College</label>
          <input type="text"></input>
        </div>}
        <div>
          <label>Password</label>
          <input type="text"></input>
        </div>
       {mode===0&& <div>
          <label>Confirm Password</label>
          <input type="text"></input>
        </div>}
        {mode===0&&<button>Register</button>}
       {mode===1&& <button>Login</button>}
      </div>
    </div>
  );
}
