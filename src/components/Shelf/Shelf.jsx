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
export default function Shelf({
  isBuyer,
  books,
  loading,
  inWishlist,
  bookPresent,
}) {
  const history = useHistory();
  console.log(inWishlist);
  console.log(books);
  const context = useContext(AuthContext);
  const { request } = useHttpClient();
  if (!bookPresent) {
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
  const addToWishlist = async (e) => {
    console.log(e.target.getAttribute("data"));

    const book = books.filter((data) => data.id === e.target.id)[0];
    console.log(book);
    let responseData;
    const url = "http://localhost:5000/api/users/wishlist";
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
          const wishlist=[...context.wishlist,book];
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
        let wishlist=context.wishlist.filter((data)=>data.id!==book.id);
        context.setWishlist(wishlist);
        
      }
    }

    console.log(responseData);

  };
  return (
    <div className="shelf">
      {books.map((data, index) => {
        if (data.userid === context.user.id)
        return <div></div>
          return (
            <div key={data.id} className="book">
              <img
                className="book-img"
                src={`http://localhost:5000/${data.image}`}
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
                !inWishlist &&
                (
                  <button id={data.id} data="remove" onClick={addToWishlist}>
                    <img src={removeicon}></img>remove from wishlist
                  </button>
                )}
              {isBuyer && inWishlist && (
                <button id={data.id} data="remove" onClick={addToWishlist}>
                  <img src={removeicon}></img>Remove from wishlist
                </button>
              )}
              {isBuyer  && (
                <button>
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
                <button>
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
