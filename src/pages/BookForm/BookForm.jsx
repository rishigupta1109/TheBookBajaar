import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import toastCreator from "../../utilities/toastCreator";
const books = [
  {
    id: 1,
    name: "RD sharma",
    subject: "maths",
    price: "150",
    seller: "Rishi",
    college: "IET",
    img: "https://5.imimg.com/data5/SELLER/Default/2021/4/NQ/NW/UA/74642511/rd-sharma-class-10-math-500x500.jpeg",
  },
  {
    id: 2,
    name: "RD sharma",
    subject: "maths",
    price: "150",
    seller: "Rishi",
    college: "IET",
    img: "https://5.imimg.com/data5/SELLER/Default/2021/4/NQ/NW/UA/74642511/rd-sharma-class-10-math-500x500.jpeg",
  },
  {
    id: 3,
    name: "RD sharma",
    subject: "maths",
    price: "150",
    seller: "Rishi",
    college: "IET",
    img: "https://5.imimg.com/data5/SELLER/Default/2021/4/NQ/NW/UA/74642511/rd-sharma-class-10-math-500x500.jpeg",
  },
  {
    id: 4,
    name: "RD sharma",
    subject: "maths",
    price: "150",
    seller: "Rishi",
    college: "IET",
    img: "https://5.imimg.com/data5/SELLER/Default/2021/4/NQ/NW/UA/74642511/rd-sharma-class-10-math-500x500.jpeg",
  },
  {
    id: 5,
    name: "RD sharma",
    subject: "maths",
    price: "150",
    seller: "Rishi",
    college: "IET",
    img: "https://5.imimg.com/data5/SELLER/Default/2021/4/NQ/NW/UA/74642511/rd-sharma-class-10-math-500x500.jpeg",
  },
  {
    id: 6,
    name: "HC Verma",
    subject: "physics",
    price: "100",
    seller: "Rishi",
    college: "IET",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVhJXUPr2eNac4AGMFbdOHykGFEUU6e6BpeA&usqp=CAU",
  },
];
export default function BookForm({ sell }) {
  const [bookName, setBookName] = useState("");
  const [amount, setAmount] = useState(0);
  let { bookId } = useParams();
  if (!sell) {
    console.log(bookId);
    const book = books.find((data) =>{ return (data.id ===Number( bookId))});
    console.log(book)
    if (bookName != book.name) {
      setBookName(book.name);
      setAmount(book.price);
    }
  }
  const clickHandler = () => {
    let booknameisValid = bookName.trim().length > 0;
    let bookamtisValid = Number(amount) > 0;
    if (bookamtisValid && booknameisValid) {
      console.log(bookName, amount);
    } else if (!booknameisValid) {
      toastCreator(`Write a valid name`);
    } else {
      toastCreator(` Amount cannot be 0`);
    }
  };
  const changeHandler = (e) => {
    switch (e.target.id) {
      case "bookname":
        setBookName(e.target.value);
      case "amount":
        setAmount(e.target.value);
    }
  };
  return (
    <div className="profile column">
      <ToastContainer />
      <div className="profile-box column">
        {sell && <h1 style={{ alignSelf: "center" }}>Sell a Book</h1>}
        {!sell && <h1 style={{ alignSelf: "center" }}>Update the Book</h1>}
        <div>
          <label>Book Name :</label>
          <input
            type="text"
            id="bookname"
            onChange={(e) => {
              setBookName(e.target.value);
            }}
            value={bookName}
          ></input>
        </div>
        <div>
          <label>Amount :</label>
          <input
            type="number"
            id="amount"
            onChange={(e) => {
              setAmount(e.target.value);
            }}
            value={amount}
          ></input>
        </div>
        <div>
          <label>Image:</label>
          <input type="file"></input>
        </div>

        <div>
         {sell&& <button style={{ alignSelf: "center" }} onClick={clickHandler}>
            Sell
          </button>}
         {!sell&& <button style={{ alignSelf: "center" }} onClick={clickHandler}>
            Update
          </button>}
        </div>
      </div>
    </div>
  );
}
