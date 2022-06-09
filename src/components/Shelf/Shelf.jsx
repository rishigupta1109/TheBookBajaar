import React from 'react'
import "./Shelf.css";
import chaticon from ".././../utilities/icons8-chat-32.png";
import addicon from ".././../utilities/icons8-add-50.png";
import removeicon from ".././../utilities/remove-icon-png-7132.png";
import editicon from "../../utilities/icons8-edit-48.png"
import soldicon from "../../utilities/icons8-sold-64.png"
const books = [
  {
    name: "RD sharma",
    subject: "maths",
    price: "150",
    seller: "Rishi",
    college: "IET",
    img: "https://5.imimg.com/data5/SELLER/Default/2021/4/NQ/NW/UA/74642511/rd-sharma-class-10-math-500x500.jpeg",
  },
  {
    name: "RD sharma",
    subject: "maths",
    price: "150",
    seller: "Rishi",
    college: "IET",
    img: "https://5.imimg.com/data5/SELLER/Default/2021/4/NQ/NW/UA/74642511/rd-sharma-class-10-math-500x500.jpeg",
  },
  {
    name: "RD sharma",
    subject: "maths",
    price: "150",
    seller: "Rishi",
    college: "IET",
    img: "https://5.imimg.com/data5/SELLER/Default/2021/4/NQ/NW/UA/74642511/rd-sharma-class-10-math-500x500.jpeg",
  },
  {
    name: "RD sharma",
    subject: "maths",
    price: "150",
    seller: "Rishi",
    college: "IET",
    img: "https://5.imimg.com/data5/SELLER/Default/2021/4/NQ/NW/UA/74642511/rd-sharma-class-10-math-500x500.jpeg",
  },
  {
    name: "RD sharma",
    subject: "maths",
    price: "150",
    seller: "Rishi",
    college: "IET",
    img: "https://5.imimg.com/data5/SELLER/Default/2021/4/NQ/NW/UA/74642511/rd-sharma-class-10-math-500x500.jpeg",
  },
  {
    name: "HC Verma",
    subject: "physics",
    price: "100",
    seller: "Rishi",
    college: "IET",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVhJXUPr2eNac4AGMFbdOHykGFEUU6e6BpeA&usqp=CAU",
  },
];
export default function Shelf({ isBuyer, inWishlist }) {
  console.log(inWishlist)
  return (
    <div className="shelf">
      {books.map((data, index) => {
        return (
          <div className="book">
            <img className="book-img" src={data.img}></img>
            <p style={{ fontSize: "larger" }}>
              {" "}
              <b>{data.name}</b>
            </p>
            <p style={{ fontSize: "larger" }}>
              {" "}
              <b>{data.price}₹</b>
            </p>
            {isBuyer && <p>Seller :{data.seller}</p>}
            {isBuyer && <p>{data.college}</p>}
            {isBuyer && !inWishlist && (
              <button>
                <img src={addicon}></img>Add to wishlist
              </button>
            )}
            {isBuyer && inWishlist && (
              <button>
                <img src={removeicon}></img>Remove
              </button>
            )}
            {isBuyer && (
              <button>
                {" "}
                <img src={chaticon}></img> chat
              </button>
            )}
            {!isBuyer && (
              <button>
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
