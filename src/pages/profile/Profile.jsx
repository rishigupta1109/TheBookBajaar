import React from "react";
import "./Profile.css";
import { useState } from "react";
export default function Profile() {
  const [neditState, nsetEditState] = useState(true);
  return (
    <div className="profile column">
      <div className="profile-box column">
        <h1 style={{ alignSelf: "center" }}>My Profile</h1>
        <div>
          <label>First Name :</label>
          <input type="text" value="abcd" disabled={neditState}></input>
        </div>
        <div>
          <label>Last Name :</label>
          <input type="text" value="abcd" disabled={neditState}></input>
        </div>
        <div>
          <label>College:</label>
          <input type="text" value="abcd" disabled={neditState}></input>
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
