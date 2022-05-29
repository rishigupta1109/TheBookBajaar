import React from "react";
import "./Filterbar.css";
export default function Filterbar() {
  return (
    <div className="filterbar">
      <div className="searchbar">
        <label>Search</label>
        <input placeholder="search"></input>
      </div>
      <div className="filters">
        <label>College</label>
        <select className="college">
          <option>IET</option>
          <option>IIPS</option>
        </select>
      </div>
      <div className="filters">
        <label>Subject</label>
        <select className="subject">
          <option>Physics</option>
          <option>Chemistry</option>
        </select>
      </div>
      <div className="sort">
        <label>Sortby</label>
        <select>
          <option>ascending</option>
          <option>desending</option>
        </select>
      </div>
    </div>
  );
}
