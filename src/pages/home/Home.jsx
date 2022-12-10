import React, { useContext } from "react";
import logo from "../../utilities/tbb_logo-redonwhote.jpg";
import "./Home.css";
import chaticon from "../../utilities/chat_bubble_outline_white_24dp.svg";
import freeicon from "../../utilities/free (1).png";
import filtericon from "../../utilities/filter_alt_white_24dp.svg";
import "@animxyz/core";
import "antd/dist/antd.css";
import bookTree from "../../utilities/book-tree.png";
import sellBook from "../../utilities/Sell-hero.png";

import { Carousel } from "antd";
// import hero1 from "../../utilities/hero1.webp";
// import hero2 from "../../utilities/hero2.jpg";
import hero3 from "../../utilities/hero3-utilised.jpg";
import { Link } from "react-router-dom";
import AuthContext from "../../utilities/auth-context";
const contentStyle = {
  height: "88vh",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "white",
  width: "100%",
  objectFit: "cover",
  transition: ".5s ease",
  backfaceVisibility: " hidden",
};
export default function Home() {
  const feautures = ["College Filter", "Chat Room", "Free to use"];
  const feauturesIcon = [filtericon, chaticon, freeicon];
  const heroes = [hero3];
  const ctx = useContext(AuthContext);
  return (
    <div className="home">
      <div className="home_s0">
        <Carousel autoplay>
          {heroes.length !== 0 &&
            heroes.map((hero) => (
              <div className="container">
                <img
                  alt="hero"
                  style={contentStyle}
                  className="heroimage"
                  src={hero}
                ></img>
              </div>
            ))}
        </Carousel>
      </div>
      <div className="home_s1">
        <h1 style={{ alignSelf: "center" }} className="head">
          What is The Book Bajaar?
        </h1>
        <img
          src={logo}
          alt="logo-icon"
          className="s1_logo "
          data-aos="zoom-in"
          data-aos-duration="500"
        ></img>
        <p className="s1_p">
          {" "}
          <b className="title_s1">The Book Bajaar</b> is a platform which acts
          as a medium for buying and selling used books at a genuine price and
          in the college campus itself.
        </p>
      </div>
      <div className="home_s3">
        <div className="s3-d1">
          <p className="s3-h1">Wanna buy a book?</p>
          <p className="s3-h2">Take a Look into our collection..</p>
          <Link
            className="s3-btn"
            onClick={() => {
              window.scrollTo(0, 0);
            }}
            to={"/books"}
          >
            {">"}
          </Link>
        </div>
        <div>
          <img
            className="s3_image"
            data-aos="zoom-in"
            data-aos-duration="500"
            src={bookTree}
          ></img>
        </div>
      </div>
      <div className="home_s3 s3_2">
        <div>
          <img
            className="s3_image"
            data-aos="zoom-in"
            data-aos-duration="500"
            src={sellBook}
          ></img>
        </div>
        <div className="s3-d1">
          <p className="s3-h1">Wanna Sell a book?</p>
          <p className="s3-h2">Head towards it!</p>
          <Link
            className="s3-btn"
            onClick={() => {
              window.scrollTo(0, 0);
            }}
            to={ctx.isLoggedIn ? "/bookform" : "/login-register"}
          >
            {">"}
          </Link>
        </div>
      </div>
      <div className="home-s2">
        <h1 style={{ alignSelf: "center" }} className="head">
          Why choose us?
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
                <img alt="feauture-icon" src={feauturesIcon[index]}></img>
                <h2>{feauture}</h2>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
