import React, { useState, useReducer, useContext } from "react";
import "../Login/Login.css";
import toastCreator from "../../utilities/toastCreator";
import AuthContext from "../../utilities/auth-context";
import useHttpClient from "./../../hooks/useHttpClient";
import { Link } from "react-router-dom";
import Backdrop from "../../components/modal/backdrop";
import Loading from "../../components/UI/navbar/Loading";
const initialValidity = {
  inputs: {
    fname: {
      id: "First Name",
      type: "text",
      value: "",
      isValid: false,
    },
    lname: {
      id: "Last Name",
      type: "text",
      value: "",
      isValid: false,
    },
    email: {
      type: "email",
      id: "Email",
      value: "",
      isValid: false,
    },
    college: {
      type: "text",
      id: "College",
      value: "",
      isValid: false,
    },
    pass: {
      type: "pass",
      id: "password",
      value: "",
      isValid: false,
    },
    cpass: {
      id: "confirm Password",
      type: "cpass",
      value: "",
      isValid: false,
    },
  },
  isValid: false,
};

const formReducer = (state, action) => {
  let formIsValid = true;
  switch (action.type) {
    case "change":
      for (let inputID in state.inputs) {
        if (inputID == action.inputId) {
          formIsValid = action.isValid && formIsValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputID].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: {
            ...state.inputs[action.inputId],
            value: action.value,
            isValid: action.isValid,
          },
        },
        isValid: formIsValid,
      };
    case "reset":
      return initialValidity;
    default:
      return state;
  }
};

export default function Login() {
  const context = useContext(AuthContext);
  const [mode, setMode] = useState(0); //0->register 1->login
  const [formValidity, dispatch] = useReducer(formReducer, initialValidity);
  const [loading, setLoading] = useState(false);
  const [pvisible, setpvisible] = useState(false);
  const { request } = useHttpClient();
  const checkValidity = ({ type, value }) => {
    if (type === "fname" || type === "lname") {
      return value.trim().length !== 0;
    } else if (type === "pass" || type === "cpass") {
      if (type === "cpass") {
        return value === formValidity.inputs["pass"].value;
      }
      return value.trim().length !== 0 && value.trim().length >= 5;
    } else if (type == "email") {
      // console.log(type, typeof value);
      return value.includes("@") && value.includes(".") && value.length !== 0;
    } else {
      return value.trim().length > 0;
    }
  };
  const inputChangeHandler = (e) => {
    dispatch({
      type: "change",
      value: e.target.value,
      isValid: checkValidity({ type: e.target.id, value: e.target.value }),
      inputId: e.target.id,
    });
  };
  const resetFields = () => {
    dispatch({ type: "reset" });
  };
  console.log(loading);
  const registerHandler = async () => {
    if (!formValidity.isValid) {
      for (let input of Object.values(formValidity.inputs)) {
        // console.log(input);
        if (!input.isValid) {
          if (input.type === "text") {
            toastCreator(`Please write a valid ${input.id}`, "warning");
          } else if (input.type === "email") {
            toastCreator(`Please write a valid email id`, "warning");
          } else {
            if (input.id === "password") {
              toastCreator(`length of password must be 8 characters`);
            } else toastCreator("Password didn`t matches", "warning");
          }
          break;
        }
      }
    } else {
      setLoading(true);
      // toastCreator(`submitted`,"success");

      // console.log("sending post req");

      let url = `${process.env.REACT_APP_BACKEND_URL}/api/users/signup`;
      const responseData = await request(
        url,
        "POST",
        {
          "Content-Type": "application/json",
        },
        JSON.stringify({
          firstName: formValidity.inputs.fname.value,
          lastName: formValidity.inputs.lname.value,
          college: formValidity.inputs.college.value,
          email: formValidity.inputs.email.value,
          password: formValidity.inputs.pass.value,
        }),
        "Registered Successfully"
      );
      if (responseData && responseData.user && responseData.token) {
        // console.log(responseData.user);
        context.login(responseData.user, responseData.token);
      } else {
        toastCreator(String(responseData), "error");
      }
      setLoading(false);
    }
  };
  const loginHandler = async () => {
    if (
      formValidity.inputs["email"].isValid &&
      formValidity.inputs["pass"].isValid
    ) {
      // context.login(formValidity.inputs);
      // console.log(formValidity);
      // const responseData=await
      setLoading(true);
      let url = `${process.env.REACT_APP_BACKEND_URL}/api/users/login`;
      const responseData = await request(
        url,
        "POST",
        {
          "Content-Type": "application/json",
        },
        JSON.stringify({
          email: formValidity.inputs.email.value,
          password: formValidity.inputs.pass.value,
        }),
        "Logged In Successfully"
      );
      if (responseData && responseData.user && responseData.token) {
        // console.log(responseData.user);
        context.login(responseData.user, responseData.token);
      } else {
        toastCreator(String(responseData), "error");
      }
    } else if (!formValidity.inputs["email"].isValid) {
      toastCreator(`Write a valid email`, "warning");
    } else {
      toastCreator(`Write a valid password`, "warning");
    }
    setLoading(false);
  };
  return (
    <div className="login-register" data-aos="fade-down">
      <div className="switch-btns">
        <button
          className={mode ? "active" : undefined}
          onClick={() => {
            setMode(0);
            resetFields();
          }}
        >
          Register
        </button>
        <button
          className={mode ? undefined : "active"}
          onClick={() => {
            setMode(1);
            resetFields();
          }}
        >
          Login
        </button>
      </div>
      <div className="column form">
        <Loading loading={loading} />

        {mode === 1 && (
          <h1
            data-aos="flip-right"
            style={{ alignSelf: "center", color: "white" }}
          >
            Login
          </h1>
        )}
        {mode === 0 && (
          <h1
            data-aos="flip-left"
            style={{ alignSelf: "center", color: "white" }}
          >
            Register
          </h1>
        )}

        {mode === 0 && (
          <div>
            <label>First Name</label>
            <input
              title="Please write your first name"
              placeholder="Ex. Philip"
              onChange={inputChangeHandler}
              value={formValidity.inputs["fname"].value}
              type="text"
              id="fname"
            ></input>
          </div>
        )}
        {mode === 0 && (
          <div>
            <label>Last Name</label>
            <input
              title="Please write your last name"
              placeholder="Ex. Coulson"
              onChange={inputChangeHandler}
              type="text"
              value={formValidity.inputs["lname"].value}
              id="lname"
            ></input>
          </div>
        )}
        <div>
          <label>Email</label>
          <input
            title="Please write your email"
            placeholder="Ex. Philip@gmail.com"
            type="text"
            onChange={inputChangeHandler}
            id="email"
            value={formValidity.inputs["email"].value}
          ></input>
        </div>
        {mode == 0 && (
          <div>
            <label>College</label>
            <input
              title="Please write your college name"
              placeholder="Ex. Institute of engineering and technology"
              onChange={inputChangeHandler}
              type="text"
              value={formValidity.inputs["college"].value}
              id="college"
              list="uniquecolleges"
            ></input>
            <datalist id="uniquecolleges">
              {context.uniqueColleges.map((data) => {
                return <option key={Math.random()}>{data}</option>;
              })}
            </datalist>
          </div>
        )}
        <div>
          <label>Password</label>
          <input
            title="length of password should be greater than 5 characters"
            placeholder="Ex. admin@123"
            onChange={inputChangeHandler}
            type={pvisible ? "text" : "password"}
            id="pass"
            value={formValidity.inputs["pass"].value}
          ></input>
        </div>
        {mode === 0 && (
          <div>
            <label>Confirm Password</label>
            <input
              title="Confirm your password"
              placeholder="Ex. admin@123"
              type={pvisible ? "text" : "password"}
              onChange={inputChangeHandler}
              id="cpass"
              value={formValidity.inputs["cpass"].value}
            ></input>
          </div>
        )}
        {mode === 0 && (
          <p>*Password length must be greater than 5 characters</p>
        )}
        <div style={{ justifyContent: "flex-start" }}>
          <input
            style={{ width: "15px", height: "15px" }}
            onChange={() => {
              setpvisible(!pvisible);
            }}
            type="checkbox"
            className="checkbox"
          ></input>
          <label>Show password</label>
        </div>

        {mode === 1 && <Link to="/resetpassword">forgot password?</Link>}
        {mode === 0 && <button onClick={registerHandler}>Register</button>}
        {mode === 1 && <button onClick={loginHandler}>Login</button>}
      </div>
    </div>
  );
}
