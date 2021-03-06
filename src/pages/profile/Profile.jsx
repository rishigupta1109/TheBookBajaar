import React, { useContext } from "react";
import "./Profile.css";
import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import toastCreator from "../../utilities/toastCreator";
import AuthContext from "../../utilities/auth-context";
import useHttpClient from "./../../hooks/useHttpClient";
export default function Profile() {
  const context = useContext(AuthContext);
  const [neditState, nsetEditState] = useState(true);
  const [fname, setfname] = useState(context.user.firstName);
  const [college, setcollege] = useState(context.user.college);
  const [lname, setlname] = useState(context.user.lastName);
  const { request } = useHttpClient();
  useEffect(() => {
    setfname(context.user.firstName);
    setcollege(context.user.college);
    setlname(context.user.lastName);
  }, [context.user]);
  const saveHandler = async () => {
    if (fname.length > 0 && lname.length > 0 && college.length > 0) {
      let url = `${process.env.REACT_APP_BACKEND_URL}/api/users/update`;
      const responseData = await request(
        url,
        "POST",
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + context.token,
        },
        JSON.stringify({
          firstName: fname,
          lastName: lname,
          college,
          email: context.user.email,
        }),
        "Details updated Successfully"
      );
      if (responseData && responseData.user) {
        nsetEditState(true);
        context.user.firstName = fname;
        context.user.lastName = lname;
        context.user.college = college;
        const details = JSON.parse(localStorage.getItem("token"));
        details.userDetail = {
          ...details.userDetail,
          firstName: fname,
          lastName: lname,
          college: college,
        };
        localStorage.setItem("token", JSON.stringify(details));
      }
    } else if (fname.length === 0) {
      toastCreator("write a valid first name");
    } else if (lname.length === 0) {
      toastCreator("write a valid Last name");
    } else {
      toastCreator("Write a valid college name");
    }
  };
  return (
    <div className="profile column" data-aos="fade-down">
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
          <input type="text" value={context.user.email} disabled></input>
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
