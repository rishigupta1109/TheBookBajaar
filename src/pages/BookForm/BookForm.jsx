import React, { useState } from "react";

export default function BookForm() {
  const [bookName,setBookName]=useState("");
  const [amount,setAmount]=useState(0);
  const [errmsg,seterrmsg]=useState("");
  const clickHandler=()=>{
      let booknameisValid=bookName.trim().length>0;
      let bookamtisValid=Number(amount)>0;
      if(bookamtisValid&&booknameisValid){
        console.log(bookName,amount);
      }
      else if(!booknameisValid){
        seterrmsg("* Write a valid name");
      }
      else{
        seterrmsg("* Amount cannot be 0");
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
      <div className="profile-box column">
        <h1 style={{ alignSelf: "center" }}>Sell a Book</h1>
        {errmsg.trim().length>0&&<h3>{errmsg}</h3>}
        <div>
          <label>Book Name :</label>
          <input type="text" id="bookname" onChange={(e)=>{setBookName(e.target.value)}} value={bookName}></input>
        </div>
        <div>
          <label>Amount :</label>
          <input type="number" id="amount" onChange={(e)=>{setAmount(e.target.value)}} value={amount}></input>
        </div>
        <div>
          <label>Image:</label>
          <input type="file"></input>
        </div>

        <div>
          <button style={{ alignSelf: "center" }} onClick={clickHandler}>Sell</button>
        </div>
      </div>
    </div>
  );
}
