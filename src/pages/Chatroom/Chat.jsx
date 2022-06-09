import React from "react";
import "./Chat.css";
import backicon from "../../utilities/icons8-back-48.png";
import { useHistory } from 'react-router-dom';
export default function Chat() {

  const history =useHistory();
  return (
    <div className="chat">
      <div className="chat-section">
        <div
          style={{
            fontSize: "large",
            fontWeight: "bolder",
            padding: "6px",
            borderBottom: "1px solid gray",
            alignItems: "center",
          }}
          className="user row"
        >
          <img
            src={backicon}
            onClick={()=>{history.goBack()}}
            style={{
              border: "1px solid black",
              borderRadius: "25px",
              marginRight: "10px",
              cursor: "pointer",
            }}
          ></img>
          Rishi Gupta
        </div>
        <div className="messages">
          <div className="l">Rishi : hi</div>
          <div className="r">You : hello</div>
        </div>
        <div className="msg">
          <input placeholder="type your message here.." type="text"></input>
          <button>Send</button>
        </div>
      </div>
    </div>
  );
}
