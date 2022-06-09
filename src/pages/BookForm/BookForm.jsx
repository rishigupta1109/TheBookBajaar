import React, { useState } from "react";
import { ToastContainer } from 'react-toastify';
import toastCreator from "../../utilities/toastCreator";

export default function BookForm() {
  const [bookName,setBookName]=useState("");
  const [amount,setAmount]=useState(0);
  const clickHandler=()=>{
      let booknameisValid=bookName.trim().length>0;
      let bookamtisValid=Number(amount)>0;
      if(bookamtisValid&&booknameisValid){
        console.log(bookName,amount);
      }
      else if(!booknameisValid){
        toastCreator(`Write a valid name`);
      }
      else{
        toastCreator(` Amount cannot be 0`);
        
      }

  }
  const changeHandler=(e)=>{
      switch(e.target.id){
        case 'bookname':
          setBookName(e.target.value);
        case 'amount':
          setAmount(e.target.value);
      }
  }
  return (
    <div className="profile column">
        <ToastContainer/>
      <div className="profile-box column">
        <h1 style={{ alignSelf: "center" }}>Sell a Book</h1>
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
          <button style={{ alignSelf: "center" }} onClick={clickHandler}>
            Sell
          </button>
        </div>
      </div>
    </div>
  );
}
