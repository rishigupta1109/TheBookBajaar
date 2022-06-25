import React,{useState} from "react";
import "./Filterbar.css";
export default function Filterbar({ collegeFilter, uniquecolleges, uniquesubject,filter,sorting,searchFilter }) {
  const [subject,setSubject]=useState("Select");
  const [college,setcollege]=useState("Select");
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
              setcollege(e.target.value);
              filter("C", e.target.value);
            }}
            className="college"
          >
            <option >Select</option>
            {uniquecolleges.length !== 0 &&
              uniquecolleges.map((data) => {
                if(data===college){
                return <option selected={true} key={Math.random()}>{data}</option>;
                }
                return <option key={Math.random()}>{data}</option>;
              })}
          </select>
        </div>
      )}
      <div className="filters">
        <label>Subject</label>
        <select
          className="subject"
          onChange={(e) => {
            setSubject(e.target.value);
            filter("S", e.target.value);
          }}
        >
          <option>Select</option>
          {uniquesubject.length !== 0 &&
            uniquesubject.map((data) => {
              if(data===subject){
              return <option selected={true} key={Math.random()}>{data}</option>;
              }
              return <option key={Math.random()}>{data}</option>;
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
