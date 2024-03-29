import React, { useState, useRef, useContext } from "react";
import "./Navbar.css";
import logo from "../../../utilities/tbb_logo-redonwhote.jpg";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import DropdownTriggerExample from "./Dropdown";
import AuthContext from "../../../utilities/auth-context";
export default function Navbar() {
  const context = useContext(AuthContext);
  const history = useHistory();
  const [mobileview, setmobileview] = useState(window.innerWidth < 900);
  let [mobilemenu, setmobilemenu] = useState(false);
  let Line1 = useRef();
  let Line2 = useRef();
  let Line3 = useRef();
  const menuHandler = () => {
    if (!mobilemenu) {
      setmobilemenu(true);
      Line3.current.style.transform = ` rotate(
            45deg) translate(-12px, -11px)`;
      Line1.current.style.transform = ` rotate( 
            135deg) translate(13px, -11px)`;
      Line2.current.style.transform = ` translate(-55px, 0px)`;
    } else {
      setmobilemenu(false);
      Line3.current.style.transform = ` rotate(
                0deg) translate(0px, 0px)`;
      Line1.current.style.transform = ` rotate( 
                0deg) translate(0px, 0px)`;
      Line2.current.style.transform = ` translate(0px, 0px)`;
    }
  };
  window.onresize = () => {
    if (mobileview && window.innerWidth > 900) {
      setmobileview(false);
    } else if (!mobileview && window.innerWidth < 900) {
      setmobileview(true);
    }
  };
  return (
    <div className="nav">
      <div className="navbar">
        <div className="left">
          <img
            src={logo}
            onClick={() => {
              history.push("/");
            }}
            alt="logo-icon"
            className="nav-logo"
          ></img>
          {!mobileview && (
            <div>
              <NavLink to="/" exact activeClassName="nav-active">
                Home
              </NavLink>
              <NavLink to="/books" activeClassName="nav-active">
                Books
              </NavLink>
              {context.isLoggedIn && (
                <NavLink
                  style={{ position: "relative" }}
                  to="/chats"
                  activeClassName="nav-active"
                >
                  {context.notification.length !== 0 && (
                    <div
                      className="ui floating circular label"
                      style={{
                        border: "1px solid white",
                        color: "white",
                        backgroundColor: "red",
                      }}
                    >
                      {context.notification.length}
                    </div>
                  )}
                  Chats
                </NavLink>
              )}
              {/* <NavLink to="/profile" activeClassName="nav-active">
                My Profile
              </NavLink> */}
              {context.isLoggedIn && (
                <DropdownTriggerExample
                  className="dd"
                  userName={context.user.firstName}
                ></DropdownTriggerExample>
              )}
              {!context.isLoggedIn && (
                <NavLink to="/login-register" activeClassName="nav-active">
                  Login/Register
                </NavLink>
              )}
            </div>
          )}
        </div>
        <div className="right">
          {!mobileview && context.isLoggedIn && (
            <button onClick={context.logout}>Logout</button>
          )}
          {mobileview && (
            <div onClick={menuHandler} className="menubtnbox">
              <div className="line1" ref={Line1}></div>
              <div className="line2" ref={Line2}></div>
              <div className="line3" ref={Line3}></div>
            </div>
          )}
        </div>
      </div>
      {mobilemenu && mobileview && (
        <div className="mobilemenu" data-aos="fade-down">
          <NavLink
            onClick={() => {
              menuHandler();
            }}
            to="/"
            exact
            activeClassName="nav-active"
          >
            Home
          </NavLink>
          <NavLink
            onClick={() => {
              menuHandler();
            }}
            to="/books"
            activeClassName="nav-active"
          >
            Books
          </NavLink>
          {context.isLoggedIn && (
            <NavLink
              onClick={() => {
                menuHandler();
              }}
              to="/chats"
              activeClassName="nav-active"
            >
              Chats
            </NavLink>
          )}
          {context.isLoggedIn && (
            <NavLink
              onClick={() => {
                menuHandler();
              }}
              to="/wishlist"
              activeClassName="nav-active"
            >
              WishList
            </NavLink>
          )}
          {context.isLoggedIn && (
            <NavLink
              onClick={() => {
                menuHandler();
              }}
              to="/mybooks"
              activeClassName="nav-active"
            >
              My Books
            </NavLink>
          )}
          {context.isLoggedIn && (
            <NavLink
              onClick={() => {
                menuHandler();
              }}
              to="/bookform"
              activeClassName="nav-active"
            >
              Sell a book
            </NavLink>
          )}
          {context.isLoggedIn && (
            <NavLink
              onClick={() => {
                menuHandler();
              }}
              to="/profile"
              activeClassName="nav-active"
            >
              My Profile
            </NavLink>
          )}
          {!context.isLoggedIn && (
            <NavLink
              onClick={() => {
                menuHandler();
              }}
              to="/login-register"
              activeClassName="nav-active"
            >
              Login/Register
            </NavLink>
          )}
          {context.isLoggedIn && (
            <button onClick={context.logout}>Logout</button>
          )}
        </div>
      )}
    </div>
  );
}
