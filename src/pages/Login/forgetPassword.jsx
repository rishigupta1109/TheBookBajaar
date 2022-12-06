import React, { useState } from "react";
import useHttpClient from "../../hooks/useHttpClient";
import toastCreator from "../../utilities/toastCreator";
import { useHistory } from "react-router-dom";
import Loading from "./../../components/UI/navbar/Loading";
export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [cpassword, setcpassword] = useState("");
  const [otp, setotp] = useState("");
  const [mode, setmode] = useState(0);
  const [loading, setLoading] = useState(false);
  const { request } = useHttpClient();
  const history = useHistory();
  const inputChangeHandler = (e) => {
    // console.log(e.target.id,e.target.value)
    if (e.target.id === "email") {
      setEmail(e.target.value);
    } else if (e.target.id === "pass") {
      setpassword(e.target.value);
    } else if (e.target.id === "cpass") {
      setcpassword(e.target.value);
    } else if (e.target.id === "otp") {
      if (Number(e.target.id) > 9999) {
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
      setLoading(true);
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
      // console.log(responseData);
      if (responseData?.status === "success") setmode(1);
      else {
        toastCreator(String(responseData), "error");
      }
      setLoading(false);
    } else {
      toastCreator("please write a valid email", "warning");
    }
  };
  const resetPasswordHandler = async () => {
    if (
      password.trim().length >= 5 &&
      password === cpassword &&
      Number(otp) > 999 &&
      Number(otp) < 10000
    ) {
      setLoading(true);
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
      // console.log(responseData);
      if (responseData?.status === "success") history.push("/");
      else {
        toastCreator(String(responseData), "error");
      }
      setLoading(false);
    } else if (password.trim().length < 5) {
      toastCreator("password must be 5 character long", "warning");
    } else if (password !== cpassword) {
      toastCreator("passwords doesnt matches", "warning");
    } else {
      toastCreator("incorrect otp", "warning");
    }
  };
  return (
    <div
      className="login-register"
      style={{ height: "90vh" }}
      data-aos="fade-down"
    >
      <Loading loading={loading} />
      <div className="column form">
        <h1
          data-aos="flip-right"
          style={{ alignSelf: "center", color: "white" }}
        >
          Reset Password
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
              title="length of password should be greater than 5 characters"
              placeholder="Ex. admin@123"
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
              title="Confirm your password"
              placeholder="Ex. admin@123"
              type="text"
              onChange={inputChangeHandler}
              id="cpass"
              value={cpassword}
            ></input>
          </div>
        )}
        {mode === 1 && (
          <p>*Password length must be greater than 5 characters</p>
        )}
        {mode === 1 && (
          <div>
            <label>Otp</label>
            <input
              title="Write the 4 digit otp"
              type="number"
              onChange={inputChangeHandler}
              id="otp"
              value={otp}
            ></input>
          </div>
        )}
        {mode === 1 && (
          <p>
            *If otp not visible in primary emails, please check in spam also
          </p>
        )}
        {mode === 0 && <button onClick={getOtpHandler}>get otp</button>}
        {mode === 1 && <button onClick={resetPasswordHandler}>submit</button>}
      </div>
    </div>
  );
}
