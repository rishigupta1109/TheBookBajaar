import React, { useContext, useState } from "react";
import "./Shelf.css";
import { Link, useHistory } from "react-router-dom";
import chaticon from ".././../utilities/icons8-chat-32.png";
import addicon from ".././../utilities/icons8-add-50.png";
import removeicon from ".././../utilities/remove-icon-png-7132.png";
import editicon from "../../utilities/icons8-edit-48.png";
import soldicon from "../../utilities/icons8-sold-64.png";
import AuthContext from "../../utilities/auth-context";
import ReactLoading from "react-loading";
import useHttpClient from "../../hooks/useHttpClient";
import Modal from "./../modal/modal";
import toastCreator from "../../utilities/toastCreator";
export default function Shelf({
  isBuyer,
  books,
  loading,
  inWishlist,
  bookPresent,
  setBooks,
}) {
  const history = useHistory();
  console.log(inWishlist);
  console.log(books);
  const [modal, setModal] = useState(false);
  const [Soldbookid, setSoldbookid] = useState(null);
  const context = useContext(AuthContext);
  const { request } = useHttpClient();
  console.log(
    books.filter((value) => value.userid !== context.user.id).length === 0
  );
  if (!bookPresent || (books && books.length === 0)) {
    if (loading) {
      return (
        <div className="shelf" style={{ justifyContent: "center" }}>
          <ReactLoading type="spin" color="#fff"></ReactLoading>
        </div>
      );
    } else {
      if (isBuyer) {
        return (
          <div style={{ justifyContent: "center" }} className="shelf">
            No Books available
          </div>
        );
      } else {
        return (
          <div style={{ justifyContent: "center" }} className="shelf">
            No Books available
            <Link to="/bookform" className="shelf-btn">
              Add One
            </Link>
          </div>
        );
      }
    }
  }
  if (
    books.filter((value) => value.userid !== context.user.id).length === 0 &&
    isBuyer
  ) {
    return (
      <div style={{ justifyContent: "center" }} className="shelf">
        No Books available
      </div>
    );
  }
  const addToWishlist = async (e) => {
    console.log(e.target.getAttribute("data"));
    if (!context.isLoggedIn) {
      toastCreator("please Login to proceed", "warning");
      history.push("/login-register");
      return;
    }
    const book = books.filter((data) => data.id === e.target.id)[0];
    console.log(book);
    let responseData;
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/users/wishlist`;
    if (e.target.getAttribute("data") === "add") {
      responseData = await request(
        url,
        "POST",
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + context.token,
        },
        JSON.stringify({
          userid: context.user.id,
          book,
        }),
        "added to Wishlist Successfully"
      );
      if (responseData.existingUser) {
        console.log(responseData);
        const wishlist = [...context.wishlist, book];
        context.setWishlist(wishlist);
      }
    } else {
      responseData = await request(
        url,
        "DELETE",
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + context.token,
        },
        JSON.stringify({
          userid: context.user.id,
          bookid: book.id,
        }),
        "removed from Wishlist Successfully"
      );
      if (responseData.existingUser) {
        let wishlist = context.wishlist.filter((data) => data.id !== book.id);
        context.setWishlist(wishlist);
      }
    }

    console.log(responseData);
  };
  const soldHandler = async (soldOn) => {
    let responseData;
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/books/${Soldbookid}`;
    responseData = await request(
      url,
      "DELETE",
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + context.token,
      },
      JSON.stringify({
        soldOn,
      }),
      "removed Successfully"
    );
    if (responseData.sold) {
      console.log(responseData);
      setBooks((data) => {
        let newbooks = data.filter((value) => value.id !== Soldbookid);
        return newbooks;
      });
    }
    setModal(false);
  };
  const chatHandler = async (e) => {
    console.log(e.target.getAttribute("data"));
    console.log(e.target.getAttribute("data-seller"));
    if (!context.isLoggedIn) {
      toastCreator("please Login to proceed", "warning");
      history.push("/login-register");
      return;
    }
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/chat/createroom`;
    let responseData = await request(
      url,
      "POST",
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + context.token,
      },
      JSON.stringify({
        user2: e.target.getAttribute("data"),
        name1: context.user.firstName + " " + context.user.lastName,
        name2: e.target.getAttribute("data-seller"),
      }),
      ""
    );
    console.log(responseData);
    if (responseData.room) {
      history.push("/chats");
    }else{
        toastCreator("something went wrong please check your connection");
    }
  };
  return (
    <div className="shelf">
      {modal && (
        <Modal
          message="did the book sold on The Book Bajaar?"
          sold={soldHandler}
          closeModal={() => {
            setModal(false);
          }}
        ></Modal>
      )}
      {books.map((data, index) => {
        if (data.userid === context.user.id && isBuyer) return <div key={Math.random()}></div>;
        return (
          <div key={data.id} className="book">
            <img
              className="book-img"
              // src={`${process.env.REACT_APP_BACKEND_URL}/${data.image}`}
              src={data.image}
            ></img>
            <p style={{ fontSize: "larger" }}>
              {" "}
              <b>{data.name}</b>
            </p>
            <p style={{ fontSize: "larger" }}>
              {" "}
              <b>{data.price}₹</b>
            </p>
            {isBuyer && data.userid !== context.user.id && (
              <p>Seller : {data.seller.toUpperCase()}</p>
            )}

            {isBuyer && <p>{data.college}</p>}
            {isBuyer &&
              !context.wishlist.find((book) => data.id === book.id) &&
              !inWishlist &&
              data.userid !== context.user.id && (
                <button id={data.id} data="add" onClick={addToWishlist}>
                  <img src={addicon}></img>Add to wishlist
                </button>
              )}
            {isBuyer &&
              context.wishlist.find((book) => data.id === book.id) &&
              !inWishlist && (
                <button id={data.id} data="remove" onClick={addToWishlist}>
                  <img src={removeicon}></img>remove from wishlist
                </button>
              )}
            {isBuyer && inWishlist && (
              <button id={data.id} data="remove" onClick={addToWishlist}>
                <img src={removeicon}></img>Remove from wishlist
              </button>
            )}
            {isBuyer && (
              <button
                data={data.userid}
                data-seller={data.seller}
                onClick={chatHandler}
              >
                {" "}
                <img src={chaticon}></img> chat
              </button>
            )}
            {!isBuyer && (
              <button
                onClick={() => {
                  history.push(`/updatebook/${data.id}`);
                }}
              >
                <img src={editicon}></img>Edit
              </button>
            )}
            {!isBuyer && (
              <button
                onClick={(e) => {
                  setModal(true);
                  setSoldbookid(e.target.getAttribute("data"));
                }}
                data={data.id}
              >
                {" "}
                <img src={soldicon}></img>Sold
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
