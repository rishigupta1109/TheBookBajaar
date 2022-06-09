import React from "react";
import "./Profile.css";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import toastCreator from "../../utilities/toastCreator";
export default function Profile() {
  const [neditState, nsetEditState] = useState(true);
  const [fname,setfname]=useState("RISHI");
  const [college,setcollege]=useState("ietdavv");
  const [lname,setlname]=useState("GUPTA");
  
  const saveHandler=()=>{
    if(fname.length>0&&lname.length>0&&college.length>0){
      console.log(fname,lname,college);
    }
    else if(fname.length===0){
      toastCreator("write a valid first name");
    }
    else if(lname.length===0){
      toastCreator("write a valid Last name");
    }
    else{
      toastCreator("Write a valid college name");
    }
  }
  return (
    <div className="profile column">
      <ToastContainer/>
      
      <div className="profile-box column">
        <h1 style={{ alignSelf: "center" }}>My Profile</h1>
      
        <div>
          <label>First Name :</label>
          <input
            type="text"
            disabled={neditState}
            value={fname}
            onChange={(e) => {
              setfname(e.target.value);
            }}
          ></input>
        </div>
        <div>
          <label>Last Name :</label>
          <input
            type="text"
            value={lname}
            onChange={(e) => {
              setlname(e.target.value);
            }}
            disabled={neditState}
          ></input>
        </div>
        <div>
          <label>College:</label>
          <input
            type="text"
            value={college}
            onChange={(e) => {
              setcollege(e.target.value);
            }}
            disabled={neditState}
          ></input>
        </div>
        <div>
          <label>Email :</label>
          <input type="text" value="grishi634@gmail.com" disabled></input>
        </div>
        <div>
          {neditState && (
            <button
              onClick={() => {
                nsetEditState(false);
              }}
            >
              Edit
            </button>
          )}
          {!neditState && (
            <button
              onClick={() => {
                saveHandler();
                nsetEditState(true);
              }}
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
