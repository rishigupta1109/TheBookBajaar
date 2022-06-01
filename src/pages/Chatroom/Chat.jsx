import React from "react";
import "./Chat.css";
export default function Chat() {
  return (
    <div className="chat">
      <div className="chat-section">
        <div
          style={{
            fontSize: "large",
            fontWeight: "bolder",
            padding: "6px",
            borderBottom: "1px solid gray",
          }}
          className="user"
        >
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
