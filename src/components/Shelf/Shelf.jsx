import React, { useContext, useState } from "react";
import "./Shelf.css";
import { Link, useHistory } from "react-router-dom";
import chaticon from ".././../utilities/icons8-chat-32.png";
import addicon from ".././../utilities/icons8-heart-90-black.png";
import removeicon from ".././../utilities/icons8-heart-90.png";
import editicon from "../../utilities/icons8-edit-48.png";
import soldicon from "../../utilities/icons8-sold-64.png";
import AuthContext from "../../utilities/auth-context";
import ReactLoading from "react-loading";
import useHttpClient from "../../hooks/useHttpClient";
import Modal from "./../modal/modal";
import toastCreator from "../../utilities/toastCreator";
import { Pagination, Tooltip } from "antd";
import Loading from "../UI/navbar/Loading";
import { useEffect } from "react";
export default function Shelf({
  isBuyer,
  books,
  loading,
  inWishlist,
  bookPresent,
  setBooks,
}) {
  const history = useHistory();
  // console.log(inWishlist);
  // console.log(books);
  const [bookData, setBookData] = useState(null);
  const [modal, setModal] = useState(false);
  const [Soldbookid, setSoldbookid] = useState(null);
  const [loadingapi, setLoadingApi] = useState(false);
  const context = useContext(AuthContext);
  const { request } = useHttpClient();
  const [page, setPage] = useState(1);
  // console.log(
  //   books.filter((value) => value.userid !== context.user.id).length === 0
  // );
  useEffect(() => {
    if (books && books.length > 0) {
      setBookData(books.slice((page - 1) * 8, 8));
    }
  }, [page, books]);
  if (!bookPresent || (books && books.length === 0)) {
    if (loading) {
      return (
        <div
          className="shelf"
          style={{ justifyContent: "center", height: "76vh" }}
        >
          <ReactLoading type="spin" color="#f00"></ReactLoading>
        </div>
      );
    } else {
      if (isBuyer) {
        return (
          <div
            style={{ justifyContent: "center", height: "76vh" }}
            className="shelf"
          >
            No Books available
          </div>
        );
      } else {
        return (
          <div
            style={{ justifyContent: "center", height: "76vh" }}
            className="shelf"
          >
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
      <div
        style={{ justifyContent: "center", height: "76vh" }}
        className="shelf"
      >
        No Books available
      </div>
    );
  }
  const addToWishlist = async ({ id, data }) => {
    // console.log(data);
    if (!context.isLoggedIn) {
      toastCreator("please Login to proceed", "warning");
      history.push("/login-register");
      return;
    }
    const book = books.filter((data) => data.id === id)[0];
    // console.log(book);
    let responseData;
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/users/wishlist`;
    if (data === "add") {
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
        // console.log(responseData);
        const wishlist = [...context.wishlist, book];
        context.setWishlist(wishlist);
      } else {
        toastCreator(String(responseData), "error");
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
      } else {
        toastCreator(String(responseData), "error");
      }
    }

    // console.log(responseData);
  };
  const soldHandler = async (soldOn) => {
    // console.log(Soldbookid)
    let responseData;
    setLoadingApi(true);
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
    if (responseData && responseData.sold) {
      // console.log(responseData);
      setBooks((data) => {
        let newbooks = data.filter((value) => value.id !== Soldbookid);
        return newbooks;
      });
    } else {
      toastCreator(String(responseData), "error");
    }
    setModal(false);
    setLoadingApi(false);
  };
  const chatHandler = async ({ data, seller }) => {
    // console.log(data);
    // console.log(seller);
    if (!context.isLoggedIn) {
      toastCreator("please Login to proceed", "warning");
      history.push("/login-register");
      return;
    }
    setLoadingApi(true);
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/chat/createroom`;
    let responseData = await request(
      url,
      "POST",
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + context.token,
      },
      JSON.stringify({
        user2: data,
        name1: context.user.firstName + " " + context.user.lastName,
        name2: seller,
      }),
      "Rooms Loaded successfully."
    );
    // console.log(responseData);
    if (responseData.room) {
      history.push(`/chats/${responseData.room.id}`);
    } else {
      toastCreator(String(responseData), "error");
    }
    setLoadingApi(false);
  };
  return (
    <div className="shelfContainer">
      <div className="shelf">
        <Loading zIndex={10} loading={loadingapi} />
        {modal && (
          <Modal
            message="did the book sold on The Book Bajaar?"
            sold={soldHandler}
            closeModal={() => {
              setModal(false);
            }}
          ></Modal>
        )}
        {bookData?.map((data, index) => {
          if (data.userid === context.user.id && isBuyer)
            return <div key={Math.random()}></div>;
          return (
            <div key={data.id} className="book" data-aos="fade-up">
              <img alt="book-img" className="book-img" src={data.image}></img>
              <div className="column" style={{ width: "100%" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "baseline",
                  }}
                >
                  <Tooltip title={data.name}>
                    <p
                      style={{
                        fontSize: "2rem",
                        textOverflow: "ellipsis",
                        overflow: " hidden",
                        whiteSpace: "nowrap",
                        fontWeight: "500",
                      }}
                    >
                      {" "}
                      {data.name}
                    </p>
                  </Tooltip>
                  <p style={{ fontSize: "2rem", fontWeight: "500" }}>
                    {" "}
                    {data.price}₹
                  </p>
                </div>
                <p style={{ fontSize: "1.5rem", color: "gray" }}>
                  {" "}
                  {data.subject}
                </p>
                <div
                  className="row"
                  style={{ color: "gray", justifyContent: "center" }}
                >
                  {isBuyer && data.userid !== context.user.id && (
                    <p>{data.seller.toUpperCase()} ,</p>
                  )}

                  {isBuyer && <p>{data.college}</p>}
                </div>
                <div className="row" style={{ justifyContent: "center" }}>
                  {isBuyer &&
                    !context.wishlist.find((book) => data.id === book.id) &&
                    !inWishlist &&
                    data.userid !== context.user.id && (
                      <Tooltip title="Add to wishlist">
                        <button
                          id={data.id}
                          data="add"
                          onClick={(e) => {
                            addToWishlist({ id: data.id, data: "add" });
                          }}
                        >
                          <img alt="add-icon" src={addicon}></img>
                        </button>
                      </Tooltip>
                    )}
                  {isBuyer &&
                    context.wishlist.find((book) => data.id === book.id) &&
                    !inWishlist && (
                      <Tooltip title="Remove from wishlist">
                        <button
                          id={data.id}
                          data="remove"
                          onClick={(e) => {
                            addToWishlist({ id: data.id, data: "remove" });
                          }}
                        >
                          <img alt="remove-icon" src={removeicon}></img>
                        </button>
                      </Tooltip>
                    )}
                  {isBuyer && inWishlist && (
                    <Tooltip title="Remove from wishlist">
                      <button
                        id={data.id}
                        data="remove"
                        onClick={(e) => {
                          addToWishlist({ id: data.id, data: "remove" });
                        }}
                      >
                        <img alt="remove-icon" src={removeicon}></img>
                      </button>
                    </Tooltip>
                  )}
                  {isBuyer && (
                    <Tooltip title={`Chat with ${data.seller}`}>
                      <button
                        data={data.userid}
                        data-seller={data.seller}
                        onClick={() => {
                          chatHandler({
                            data: data.userid,
                            seller: data.seller,
                          });
                        }}
                      >
                        {" "}
                        <img alt="chat-icon" src={chaticon}></img>
                      </button>
                    </Tooltip>
                  )}
                  {!isBuyer && (
                    <Tooltip title={`Edit Book`}>
                      <button
                        onClick={() => {
                          history.push(`/updatebook/${data.id}`);
                        }}
                      >
                        <img alt="edit-icon" src={editicon}></img>
                      </button>
                    </Tooltip>
                  )}
                  {!isBuyer && (
                    <Tooltip title={`Mark Sold`}>
                      <button
                        onClick={(e) => {
                          setModal(true);
                          setSoldbookid(data.id);
                        }}
                      >
                        {" "}
                        <img alt="sold-icon" src={soldicon}></img>
                      </button>
                    </Tooltip>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Pagination
        current={page}
        total={books?.length / 8}
        onChange={(e) => {
          setPage(e);
        }}
      />
    </div>
  );
}
