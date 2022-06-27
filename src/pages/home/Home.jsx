import React from "react";
import logo from "../../utilities/tbb_logo-redonwhote.jpg";
import "./Home.css";
import chaticon from "../../utilities/chat_bubble_outline_white_24dp.svg";
import freeicon from "../../utilities/icons8-free-60.png";
import filtericon from "../../utilities/filter_alt_white_24dp.svg";
import "@animxyz/core";
export default function Home() {
  const feautures = ["College Filter", "Chat Room", "Free to use"];
  const feauturesIcon = [filtericon, chaticon, freeicon];

  return (
    <div className="home">
      <div className="home_s1">
        <img
          src={logo}
          className="s1_logo "
          data-aos="flip-left"
          data-aos-duration="1000"
        ></img>
        <p className="s1_p">
          {" "}
          <b className="title_s1">The Book Bajaar</b> is a platform which acts
          as a medium for buying and selling used books at a genuine price and
          in the college campus itself.
        </p>
      </div>
      <div className="home-s2">
        <h1 style={{ alignSelf: "center" }} className="head">
          Feautures
        </h1>

        <div className="feautures">
          {feautures.map((feauture, index) => {
            return (
              <div
                key={index}
                className="feauture-box"
                data-aos="flip-left"
                data-aos-duration="1000"
              >
                <img src={feauturesIcon[index]}></img>
                <h2>{feauture}</h2>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
