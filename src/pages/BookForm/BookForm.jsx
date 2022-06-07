import React from "react";

export default function BookForm() {
  return (
    <div className="profile column">
      <div className="profile-box column">
        <h1 style={{ alignSelf: "center" }}>Sell a Book</h1>
        <div>
          <label>Book Name :</label>
          <input type="text"></input>
        </div>
        <div>
          <label>Amount :</label>
          <input type="number"></input>
        </div>
        <div>
          <label>Image:</label>
          <input type="file"></input>
        </div>

        <div>
          <button style={{ alignSelf: "center" }}>Sell</button>
        </div>
      </div>
    </div>
  );
}
