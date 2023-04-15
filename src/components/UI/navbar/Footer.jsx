import React, { useContext } from "react";
import "./footer.css";
import logo from "../../../utilities/tbb_logo-redonwhote.jpg";
import { NavLink } from "react-router-dom";
import AuthContext from "../../../utilities/auth-context";
import mailIcon from "../../../utilities/icons8-mail-100.png";
export default function Footer() {
  return (
    <div className="footer column">
      <div className="row" style={{ alignItems: "center" }}>
        <img className="mailicon" alt="mailicon" src={mailIcon}></img>

        <a
          style={{
            color: "gray",
            marginLeft: "10px",
          }}
          href="mailto:thebookbajaar@gmail.com"
        >
          thebookbajaar@gmail.com
        </a>
      </div>
      <div className="row" style={{ alignItems: "center" }}>
        Developed by :{"  "}
        <a
          target="_blank"
          style={{
            color: "gray",
            fontWeight: "bolder",
            fontSize: "xx-large",
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
