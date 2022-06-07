import React, { useState, useReducer } from "react";
import "../Login/Login.css";

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
    college: {
      type: "text",
      id: "College",
      value: "",
      isValid: false,
    },
    email: {
      type: "email",
      id: "Email",
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
  const [mode, setMode] = useState(0); //0->register 1->login
  const [errorMessage, setErrorMessage] = useState("");
  const [formValidity, dispatch] = useReducer(formReducer, initialValidity);
  const checkValidity = ({ type, value }) => {
    if (type === "fname" || type === "lname") {
      return value.trim().length !== 0;
    } else if (type === "pass" || type === "cpass") {
      if (type === "cpass") {
        return value === formValidity.inputs["pass"].value;
      }
      return value.trim().length !== 0 && value.trim().length > 7;
    } else if (type == "email") {
      console.log(type, typeof value);
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
  const registerHandler = () => {
    console.log(Object.values(formValidity.inputs));
    if (!formValidity.isValid) {
      for (let input of Object.values(formValidity.inputs)) {
        console.log(input);
        if (!input.isValid) {
          if (input.type === "text") {
            setErrorMessage(`*Please write a valid ${input.id}`);
          } else if (input.type === "email") {
            setErrorMessage("*Please write a valid email id");
          } else {
            if (input.id === "password") {
              setErrorMessage("*length of password must be 8 characters");
            } else setErrorMessage("*Password didn`t matches");
          }
          break;
        }
      }
    } else {
      setErrorMessage("submitted");
    }
  };
  const loginHandler=()=>{
    if(formValidity.inputs["email"].isValid&&formValidity.inputs["pass"].isValid){
        console.log(formValidity);
    }
    else if (!formValidity.inputs["email"].isValid) {
        setErrorMessage("*Write a valid email");
    }
    else{
      setErrorMessage("*Write a valid password");
    }
  }
  return (
    <div className="login-register" data-aos="fade-down">
      <div className="switch-btns">
        <button
          className={mode ? "active" : undefined}
          onClick={() => {
            setErrorMessage("");
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
            setErrorMessage("");
            resetFields();
          }}
        >
          Login
        </button>
      </div>
      <div className="column form">
        {mode === 1 && (
          <h1 data-aos="flip-right" style={{ alignSelf: "center" }}>
            Login
          </h1>
        )}
        {mode === 0 && (
          <h1 data-aos="flip-left" style={{ alignSelf: "center" }}>
            Register
          </h1>
        )}
        {errorMessage.trim().length !== 0 && (
          <h3 data-aos="flip-right" style={{ alignSelf: "center" }}>
            {errorMessage}
          </h3>
        )}
        {mode === 0 && (
          <div>
            <label>First Name</label>
            <input
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
              onChange={inputChangeHandler}
              type="text"
              value={formValidity.inputs["college"].value}
              id="college"
            ></input>
          </div>
        )}
        <div>
          <label>Password</label>
          <input
            onChange={inputChangeHandler}
            type="text"
            id="pass"
            value={formValidity.inputs["pass"].value}
          ></input>
        </div>
        {mode === 0 && (
          <div>
            <label>Confirm Password</label>
            <input
              type="text"
              onChange={inputChangeHandler}
              id="cpass"
              value={formValidity.inputs["cpass"].value}
            ></input>
          </div>
        )}
        {mode === 0 && <button onClick={registerHandler}>Register</button>}
        {mode === 1 && <button onClick={loginHandler}>Login</button>}
      </div>
    </div>
  );
}
