import React, { useState } from "react";
import useHttpClient from "../../hooks/useHttpClient";
import toastCreator from "../../utilities/toastCreator";
import { useHistory } from 'react-router-dom';

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const [otp, setotp] = useState("");
  const [mode, setmode] = useState(0);
  const { request } = useHttpClient();
  const history=useHistory();
  const inputChangeHandler = (e) => {
    console.log(e.target.id,e.target.value)
    if (e.target.id === "email") {
      setEmail(e.target.value);
    } else if (e.target.id === "pass") {
      setpassword(e.target.value);
    } else if (e.target.id === "cpass") {
      setcpassword(e.target.value);
    } else if (e.target.id === "otp") {
      if (Number(e.target.id )> 9999) {
        setotp(9999);
      } else {
        setotp(e.target.value);
      }
    }
  };
  const getOtpHandler = async () => {
    if (
      email.trim().length !== 0 &&
      email.includes("@") &&
      email.includes(".")
    ) {
      let url = `${process.env.REACT_APP_BACKEND_URL}/api/users/reset`;
      const responseData = await request(
        url,
        "POST",
        {
          "Content-Type": "application/json",
        },
        JSON.stringify({
          email: email,
        }),
        "Otp sent to your email"
      );
      console.log(responseData);
       if (responseData.status === "success") setmode(1);
      

    } else {
      toastCreator("please write a valid email","warning");
    }
  };
  const resetPasswordHandler = async () => {
    if (
      password.trim().length >= 5 &&
      password === cpassword &&
      Number(otp) > 999 &&
      Number(otp) < 10000
    ) {
      let url = `${process.env.REACT_APP_BACKEND_URL}/api/users/otpverify`;
      const responseData = await request(
        url,
        "POST",
        {
          "Content-Type": "application/json",
        },
        JSON.stringify({
          email: email,
          password,
          otp,
        }),
        "password changed successfully"
      );
      console.log(responseData);
      if ((responseData.status ==="success")) history.push("/");

    } else if (password.trim().length < 5) {
      toastCreator("password must be 5 character long", "warning");
    } else if (password !== cpassword) {
      toastCreator("passwords doesnt matches", "warning");
    } else {
      toastCreator("incorrect otp", "warning");
    }
  };
  return (
    <div className="login-register" data-aos="fade-down">
      <div className="column form">
        <h1 data-aos="flip-right" style={{ alignSelf: "center" }}>
          Reset Pssword
        </h1>
        <div>
          <label>Email</label>
          <input
            type="text"
            onChange={inputChangeHandler}
            id="email"
            value={email}
            disabled={!!mode}
          ></input>
        </div>
        {mode === 1 && (
          <div>
            <label>Password</label>
            <input
              onChange={inputChangeHandler}
              type="text"
              id="pass"
              value={password}
            ></input>
          </div>
        )}
        {mode === 1 && (
          <div>
            <label>Confirm Password</label>
            <input
              type="text"
              onChange={inputChangeHandler}
              id="cpass"
              value={cpassword}
            ></input>
          </div>
        )}
        {mode === 1 && (
          <div>
            <label>Otp</label>
            <input
              type="number"
              onChange={inputChangeHandler}
              id="otp"
              value={otp}
            ></input>
          </div>
        )}
        {mode === 1 && (
          <p>*if otp not showing in emails, please check in spam also</p>
        )}
        {mode === 0 && <button onClick={getOtpHandler}>get otp</button>}
        {mode === 1 && <button onClick={resetPasswordHandler}>submit</button>}
      </div>
    </div>
  );
}
