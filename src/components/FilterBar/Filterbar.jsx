import React from "react";
import "./Filterbar.css";
export default function Filterbar({ collegeFilter, uniquecolleges, uniquesubject,filter,sorting,searchFilter }) {
  
  return (
    <div className="filterbar">
      <div className="searchbar">
        <label>Search</label>
        <input placeholder="search" onChange={(e)=>{searchFilter(e.target.value)}}></input>
      </div>
      {collegeFilter && (
        <div className="filters">
          <label>College</label>
          <select
            onChange={(e) => {
              filter("C", e.target.value);
            }}
            className="college"
          >
            <option>Select</option>
            {uniquecolleges.length !== 0 &&
              uniquecolleges.map((data) => {
                return <option>{data}</option>;
              })}
          </select>
        </div>
      )}
      <div className="filters">
        <label>Subject</label>
        <select
          className="subject"
          onChange={(e) => {
            filter("S", e.target.value);
          }}
        >
          <option>Select</option>
          {uniquesubject.length !== 0 &&
            uniquesubject.map((data) => {
              return <option>{data}</option>;
            })}
        </select>
      </div>
      <div className="sort">
        <label>Sortby</label>
        <select
          onChange={(e) => {
            console.log("sorting..")
            if (e.target.value === "ascending") {
              sorting(1);
            } else if (e.target.value === "desending") {
              sorting(-1);
            }
            else sorting(0)
          }}
        >
          <option>Select</option>
          <option>ascending</option>
          <option>desending</option>
        </select>
      </div>
    </div>
  );
}
