import React, { useState, useContext, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import useHttpClient from "../../hooks/useHttpClient";
import AuthContext from "../../utilities/auth-context";
import toastCreator from "../../utilities/toastCreator";
import "./BookForm.css";
export default function BookForm({ sell }) {
  const [bookName, setBookName] = useState("");
  const [subject, setSubject] = useState("");
  const [price, setprice] = useState(0);
  const [file, setfile] = useState();
  const [imageisValid, setimageisValid] = useState();
  const [imgurl, setimgurl] = useState();
  const [disabled, setdisabled] = useState(false);
  let { bookId } = useParams();
  const history = useHistory();
  let image = useRef();
  const context = useContext(AuthContext);
  useEffect(() => {
    if (!sell) {
      const url = `http://localhost:5000/api/books/${bookId}`;
      const fetchIt = async () => {
        console.log("fetchit");
        const responseData = await request(
          url,
          "GET",
          {},
          {},
          "Book Fetched Successfully"
        );
        console.log(responseData);
        if (responseData && responseData.books) {
          setBookName(responseData.books[0].name);
          setSubject(responseData.books[0].subject);
          setprice(responseData.books[0].price);
          console.log(responseData.books);
        }
      };
      fetchIt();
    }
  }, []);

  const { request } = useHttpClient();
  const updateHandler = async (e) => {
    setdisabled(true);
    let booknameisValid = bookName.trim().length > 0;
    let subjectisValid = subject.trim().length > 0;
    let bookamtisValid = Number(price) > 0;
    console.log("updateHandler");
    if (bookamtisValid && booknameisValid && subjectisValid) {
      const url = `http://localhost:5000/api/books/${bookId}`;
      const responseData = await request(
        url,
        "PATCH",
        { "Content-Type": "application/json" },
        JSON.stringify({
          name: bookName,
          subject,
          price,
        }),
        "Book updated Successfully"
      );
      console.log(responseData);
      if (responseData.Book) {
        history.push("/mybooks");
      }
    } else if (!booknameisValid) {
      toastCreator(`Write a valid name`);
    } else if (!subjectisValid) {
      toastCreator(` write a valid subject name`);
    } else {
      toastCreator(` price cannot be 0`);
    }
  };
  const clickHandler = async () => {
    console.log("clicked")
    setdisabled(false);
    let booknameisValid = bookName.trim().length > 0;
    let subjectisValid = subject.trim().length > 0;
    let bookamtisValid = Number(price) > 0;
    if (bookamtisValid && booknameisValid && subjectisValid&&imageisValid) {
      const url = "http://localhost:5000/api/books/add";
      const formData=new FormData();
      formData.append("name",bookName);
      formData.append("subject",subject);
      formData.append("price",price);
      formData.append("userid", context.user.id);
      formData.append("image",file);
      formData.append(
        "seller",
        context.user.firstName + " " + context.user.lastName
      );
      console.log(formData)
      const responseData = await request(
        url,
        "POST",
        {  },
        formData,
        "Book added Successfully"
      );
      console.log(responseData);
      if (responseData.newBook) {
        history.push("/mybooks");
      }
    } else if (!booknameisValid) {
      toastCreator(`Write a valid name`);
    } else if (!subjectisValid) {
      toastCreator(` write a valid subject name`);
    } else if(!bookamtisValid) {
      toastCreator(` price cannot be 0`);
    }else{
      toastCreator(`please select a valid image`);
    }
  };
  const changeHandler = (e) => {
    switch (e.target.id) {
      case "bookname":
        setBookName(e.target.value);
      case "price":
        setprice(e.target.value);
    }
  };
  const pickImageHandler = () => {
    image.current.click();
  };
  const pickHandler = (e) => {
    if (e.target.files && e.target.files.length === 1) {
      setfile(e.target.files[0]);
      setimageisValid(true);
    }
    else{
      toastCreator(`please select a valid image`);
      imageisValid(false);
    }

  };
  useEffect(()=>{
    if(!file){
      return;
    }
    const fileReader=new FileReader();
    fileReader.onload=()=>{
      setimgurl(fileReader.result);
    }
    fileReader.readAsDataURL(file);

  },[file])
  return (
    <div className="profile column">
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
          <label>Subject :</label>
          <input
            type="text"
            id="subject"
            onChange={(e) => {
              setSubject(e.target.value);
            }}
            value={subject}
          ></input>
        </div>
        <div>
          <label>Price :</label>
          <input
            type="number"
            id="price"
            onChange={(e) => {
              setprice(e.target.value);
            }}
            value={price}
          ></input>
        </div>
        <div className="image-preview">
            {imgurl&&<img src={imgurl} alt="preview"></img>}
            {!imgurl&&<p>please pick an image</p>}
        </div>
        <div>
          <label>Image:</label>
          <button
            onClick={pickImageHandler}
            style={{ alignSelf: "center", fontSize: "15px" }}
          >
            Pick Image
          </button>
          <input
          accept=".jpg,.png,.jpeg"
            type="file"
            onChange={pickHandler}
            ref={image}
            style={{ display: "none" }}
          ></input>
        </div>

        <div>
          {sell && (
            <button
              style={{ alignSelf: "center" }}
              disabled={disabled}
              onClick={clickHandler}
            >
              Sell
            </button>
          )}
          {!sell && (
            <button
              style={{ alignSelf: "center" }}
              disabled={disabled}
              onClick={updateHandler}
            >
              Update
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
