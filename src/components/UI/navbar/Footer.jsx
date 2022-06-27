import React, { useContext } from 'react'
import "./footer.css"
import logo from "../../../utilities/tbb_logo-redonwhote.jpg";
import { NavLink } from 'react-router-dom';
import AuthContext from '../../../utilities/auth-context';
import mailIcon from "../../../utilities/icons8-mail-100.png"
export default function Footer() {
 
  return (
    <div className="footer column">
      <div
        className="row"
        style={{ alignItems: "center", marginBottom: "35px" }}
      >
        <img
          className="mailicon"
          alt="mailicon"
          style={{ marginRight: "10px" }}
          src={mailIcon}
        ></img>

        <a
          style={{
            color: "gray",
          }}
          href="mailto:thebookbajaar@gmail.com"
        >
          thebookbajaar@gmail.com
        </a>
      </div>
      <div
        className="row"
        style={{ alignItems: "center", marginBottom: "35px" }}
      >
        Developed by :{"  "}
        <a
          target="_blank"
          style={{
            color: "gray",
            fontWeight: "bolder",
            fontSize:"xx-large",
            fontFamily: " 'Yellowtail', cursive",
          }}
          href="https://www.linkedin.com/in/rishi-gupta-027298204/"
        >
          {" "}
          &nbsp;Rishi Gupta
        </a>
      </div>
      <div className="row">
        &copy; Copyright 2022 -<b> The Book Bajaar</b>{" "}
      </div>
    </div>
  );
}
