import React, { useContext } from 'react'
import "./Shelf.css";
import { Link, useHistory } from 'react-router-dom';
import chaticon from ".././../utilities/icons8-chat-32.png";
import addicon from ".././../utilities/icons8-add-50.png";
import removeicon from ".././../utilities/remove-icon-png-7132.png";
import editicon from "../../utilities/icons8-edit-48.png"
import soldicon from "../../utilities/icons8-sold-64.png"
import AuthContext from '../../utilities/auth-context';
import ReactLoading from "react-loading";

export default function Shelf({ isBuyer,books,loading, inWishlist }) {
  const history=useHistory();
  console.log(inWishlist);
  console.log(books);
  const context=useContext(AuthContext);
  if(!books||books.length===0){
    if(loading){
      return < div className="shelf" style={{justifyContent:"center"}}><ReactLoading type="spin" color="#fff"></ReactLoading></div>;
    }else{
      if(isBuyer){
        return (
          <div style={{ justifyContent: "center" }} className="shelf">
            No Books available
          </div>
        );
      }
      else{
        return (
          <div style={{ justifyContent: "center" }} className="shelf">
            No Books available
            <Link to="/bookform" className='shelf-btn'>Add One</Link>
          </div>)
          
        }
    }
  }
  return (
    <div className="shelf">
      {books.map((data, index) => {
        return (
          <div key={data.id} className="book">
            <img className="book-img" src={`http://localhost:5000/${data.image}`}></img>
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
            {isBuyer && data.userid === context.user.id && (
              <p>Seller : YOU</p>
            )}
            {isBuyer && <p>{data.college}</p>}
            {isBuyer && !inWishlist && data.userid !== context.user.id && (
              <button>
                <img src={addicon}></img>Add to wishlist
              </button>
            )}
            {isBuyer && inWishlist && (
              <button>
                <img src={removeicon}></img>Remove
              </button>
            )}
            {isBuyer && data.userid !== context.user.id && (
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
