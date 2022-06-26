import React, { useState, useContext, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import useHttpClient from "../../hooks/useHttpClient";
import AuthContext from "../../utilities/auth-context";
import toastCreator from "../../utilities/toastCreator";
import "./BookForm.css";
import FileBase64 from "react-file-base64";
export default function BookForm({ sell }) {
  const [bookName, setBookName] = useState("");
  const [subject, setSubject] = useState("");
  const [price, setprice] = useState(0);
  const [file, setfile] = useState();
  // const [imageisValid, setimageisValid] = useState();
  // const [imgurl, setimgurl] = useState();
  const [disabled, setdisabled] = useState(false);
  let { bookId } = useParams();
  const history = useHistory();
  let image = useRef();
  const context = useContext(AuthContext);
  useEffect(() => {
    if (!sell) {
      const url = `${process.env.REACT_APP_BACKEND_URL}/api/books/${bookId}`;
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
    let booknameisValid = bookName.trim().length > 0;
    let subjectisValid = subject.trim().length > 0;
    let bookamtisValid = Number(price) > 0;
    console.log("updateHandler");
    if (bookamtisValid && booknameisValid && subjectisValid) {
      setdisabled(true);
      const url = `${process.env.REACT_APP_BACKEND_URL}/api/books/${bookId}`;
      const responseData = await request(
        url,
        "PATCH",
        { 
          "Content-Type": "application/json",
          Authorization: "Bearer " + context.token,
        },
        JSON.stringify({
          name: bookName,
          subject,
          price,
        }),
        "Book updated Successfully"
      );
      console.log(responseData);
        setdisabled(false);
      if (responseData.Book) {
        history.push("/mybooks");
      }
    } else if (!booknameisValid) {
      toastCreator(`Write a valid name`,"warning");
    } else if (!subjectisValid) {
      toastCreator(` write a valid subject name`, "warning");
    } else {
      toastCreator(` price cannot be 0`, "warning");
    }
  };
  const clickHandler = async () => {
    console.log("clicked");
    let booknameisValid = bookName.trim().length > 0;
    let subjectisValid = subject.trim().length > 0;
    let bookamtisValid = Number(price) > 0;
    let imageisValid = !!file;
    if (bookamtisValid && booknameisValid && subjectisValid && imageisValid) {
      setdisabled(true);
      const url = `${process.env.REACT_APP_BACKEND_URL}/api/books/add`;
      
      let data = JSON.stringify({
        name: bookName,
        subject: subject,
        price: price,
        userid: context.user.id,
        image: file,
        seller: context.user.firstName + " " + context.user.lastName,
      });
      console.log(data);
      const responseData = await request(
        url,
        "POST",
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + context.token,
        },
        data,
        "Book added Successfully"
        );
        console.log(responseData);
        setdisabled(false);
        if (responseData.newBook) {
        history.push("/mybooks");
      }
    } else if (!booknameisValid) {
      toastCreator(`Write a valid name`, "warning");
    } else if (!subjectisValid) {
      toastCreator(` write a valid subject name`, "warning");
    } else if (!bookamtisValid) {
      toastCreator(` price cannot be 0`, "warning");
    } else {
      toastCreator(`please select a valid image`,"warning");
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
  // const pickHandler = (e) => {
  //   if (e.target.files && e.target.files.length === 1) {
  //     setfile(e.target.files[0]);
  //     setimageisValid(true);
  //   }
  //   else{
  //     toastCreator(`please select a valid image`);
  //     imageisValid(false);
  //   }

  // };

  // useEffect(()=>{
  //   if(!file){
  //     return;
  //   }
  //   const fileReader=new FileReader();
  //   fileReader.onload=()=>{
  //     setimgurl(fileReader.result);
  //   }
  //   fileReader.readAsDataURL(file);

  // },[file])
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
            list="uniqbookname"
          ></input>
          <datalist id="uniqbookname">
            {context.uniqueBookName.map((data) => {
              return <option key={Math.random()}>{data}</option>;
            })}
          </datalist>
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
            list="uniqsubject"
          ></input>
          <datalist id="uniqsubject">
            {context.uniqueSubjects.map((data) => {
              console.log(data);
              return <option key={Math.random()}>{data}</option>;
            })}
          </datalist>
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
        {sell && (
          <div className="image-preview">
            {file && <img src={file} alt="preview"></img>}
            {!file && <p>please pick an image</p>}
          </div>
        )}
        {/* {sell && (
          <div className="image-preview">
            {imgurl && <img src={imgurl} alt="preview"></img>}
            {!imgurl && <p>please pick an image</p>}
          </div>
        )} */}
        {sell && (
          <div>
            <label>Image:</label>

            <FileBase64
              type="file"
              multiple={false}
              accept=".jpg,.png,.jpeg"
              onDone={({ base64 }) => {
                      console.log(
                        base64.length,
                        new Blob([base64]).size,
                        
                      );
                    if (
                      !(base64.startsWith("data:image/jpeg") ||
                      base64.startsWith("data:image/jpg") ||
                      base64.startsWith("data:image/png"))
                    ) {
                      toastCreator("please select a valid image", "warning");
                    } else if (new Blob([base64]).size > 100000) {
                      toastCreator("image is too large", "warning");
                    } else {
                      setfile(base64);
                    }
                }}
            />
            {/* <input
              type="file"
              onChange={pickHandler}
              ref={image}
              style={{ display: "none" }}
            ></input> */}
          </div>
        )}

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
