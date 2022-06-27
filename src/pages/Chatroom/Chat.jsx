import React, { useContext, useEffect, useState, useRef } from "react";
import "./Chat.css";
import backicon from "../../utilities/icons8-back-48.png";
import { useHistory, useParams } from "react-router-dom";
import AuthContext from "../../utilities/auth-context";
import useHttpClient from "../../hooks/useHttpClient";
import Loading from "react-loading";
import toastCreator from "../../utilities/toastCreator";

export default function Chat({ socket }) {
  const history = useHistory();
  const context = useContext(AuthContext);
  const [roomData, setRoomData] = useState({});
  const [loading, setLoading] = useState(false);
  const [msgLoading, setMsgLoading] = useState(false);
  const [btnActive, setbtnActive] = useState(false);
  const [recieverData, setRecieverData] = useState({});
  const [message, setMesssage] = useState("");
  const [messages, setMesssages] = useState([]);
  const [recieverOnline, setrecieverOnline] = useState(false);
  const { CHATID } = useParams();
  const chatbox = useRef();
  console.log(CHATID);
  const { request } = useHttpClient();
  const fetchit = async () => {
    setLoading(true);
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/chat/room/${CHATID}`;
    let responseData = await request(url, "GET", {}, JSON.stringify({}), "");
    console.log(responseData);
    setLoading(false);
    if (responseData && responseData.room) {
      setRoomData(responseData.room);
      let recievingUser;
      let recievingUserName;

      if (responseData.room.user1 === context.user.id) {
        recievingUser = responseData.room.user2;
        recievingUserName = responseData.room.name2;
        setRecieverData({ recievingUser, recievingUserName });
      } else {
        recievingUser = responseData.room.user1;
        recievingUserName = responseData.room.name1;
        console.log(recievingUser, recievingUserName);
        setRecieverData({ recievingUser, recievingUserName });
      }
      socket.emit("check_online", recievingUser);
      socket.emit("join_room", context.rooms, context.user.id);
      console.log("join room req sent in chat", context.rooms);
    }
  };
  const fetchMessages = async () => {
    setMsgLoading(true);
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/chat/messages/${CHATID}`;
    let responseData = await request(
      url,
      "POST",
      {
        "Content-Type": "application/json",
        Authorization: "Bearer " + context.token,
      },
      JSON.stringify({}),
      ""
    );
    setMsgLoading(false);
    if (responseData && responseData.messages) {
      setMesssages(responseData.messages);

      console.log(responseData.messages);
    }
  };
  useEffect(() => {
    if (context.token && context.rooms) {
      fetchit();
      fetchMessages();
    }
  }, [context.token]);
  useEffect(() => {
    if (context.token) {
      fetchit();
      fetchMessages();
    }
    if (context.notification.find((a) => a.room === CHATID) !== undefined) {
      socket.emit("remove_notification", CHATID, context.user.id);
      context.setNotification(
        context.notification.filter((a) => a.room !== CHATID)
      );
    }
  }, []);
  useEffect(() => {
    if (!!chatbox && !!chatbox.current) {
      chatbox.current.scrollTop = chatbox.current.scrollHeight;
    }
  }, [messages]);
  socket.on("room_joined", (msg) => {
    console.log("joined", msg);
    setrecieverOnline(true);
  });
  socket.on("room_left", (msg) => {
    console.log("left", msg);
    setrecieverOnline(false);
  });
  socket.on("online_status", (status) => {
    setrecieverOnline(status);
    console.log("receiver is ", status);
  });
  socket.on("message_recieved", (sandhesa) => {
    console.log(sandhesa);
    console.log(messages);
    let msg = [...messages, sandhesa];
    console.log(msg);
    setMesssages(msg);
  socket.emit("remove_notification", CHATID, context.user.id);

  });
  const sendHandler = () => {
    socket.emit("message_sent", {
      message,
      to: recieverData.recievingUser,
      from: context.user.id,
      date: new Date(),
      room: CHATID,
    });
    let msg = [
      ...messages,
      {
        message,
        to: recieverData.recievingUser,
        from: context.user.id,
        date: new Date(),
        room: CHATID,
      },
    ];
    console.log(msg);
    setMesssages(msg);
    setMesssage("");
    setbtnActive(false)
  };
  return (
    <div className="chat">
      {loading && !msgLoading && <Loading type="spin" color="#f00"></Loading>}
      {msgLoading && <Loading type="spin" color="#f00"></Loading>}

      {!loading && (
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
              onClick={() => {
                history.goBack();
              }}
              style={{
                border: "1px solid black",
                borderRadius: "25px",
                marginRight: "10px",
                cursor: "pointer",
              }}
            ></img>
            {recieverData.recievingUserName}
            <div
              className="dot"
              style={{ backgroundColor: recieverOnline ? "green" : "red" }}
            ></div>
          </div>
          <div className="messages" ref={chatbox}>
            {messages.length > 0 &&
              messages.map((data) => {
                if (data.to === context.user.id) {
                  return (
                    <div key={Math.random()} className="l ">
                      <p>
                        {recieverData.recievingUserName} : {data.message}
                      </p>
                      <p className="date-string">
                        {new Date(data.date).toLocaleString()}
                      </p>
                    </div>
                  );
                } else {
                  return (
                    <div key={Math.random()} className="r ">
                      <p>Me : {data.message}</p>
                      <p className="date-string">
                        {new Date(data.date).toLocaleString()}
                      </p>
                    </div>
                  );
                }
              })}
          </div>
          <div className="msg">
            <input
              placeholder="type your message here.."
              type="text"
              value={message}
              onKeyDown={(e)=>{
                if(e.key==="Enter"&&btnActive){
                  sendHandler()
                }
              }}
              onChange={(e) => {
                setMesssage(e.target.value);
                if (e.target.value.trim().length !== 0 && !btnActive) {
                  setbtnActive(true);
                } else if (e.target.value.trim().length === 0 && btnActive) {
                  setbtnActive(false);
                }
              }}
            ></input>
            <button onClick={sendHandler} disabled={!btnActive}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
