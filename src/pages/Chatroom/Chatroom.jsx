import React, { useState, useEffect, useContext } from "react";
import Loading from "react-loading";
import { Link, useHistory } from "react-router-dom";
import useHttpClient from "../../hooks/useHttpClient";
import AuthContext from "../../utilities/auth-context";
import "./Chatroom.css";

export default function Chatroom({ socket }) {
  const [rooms, setRooms] = useState([]);
  const [lastMessages, setlastMessages] = useState([]);
  const { request } = useHttpClient();
  const [loading, setLoading] = useState(true);
  const context = useContext(AuthContext);
  const history = useHistory();
  useEffect(() => {
    const fetchit = async () => {
      const url = `${process.env.REACT_APP_BACKEND_URL}/api/chat/rooms`;
      let responseData = await request(
        url,
        "POST",
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + context.token,
        },
        JSON.stringify({}),
        "Chats Loaded Successfully"
      );
      console.log("rooms", responseData);
      setLoading(false);
      if (responseData && responseData.rooms) {
        setRooms(responseData.rooms);
        context.setRooms(responseData.rooms);
        socket.emit("join_room", responseData.rooms, context.user.id);
        console.log("join room req sent");
        setlastMessages(responseData.lastMessages);
      }
    };
    if (context.token) {
      fetchit();
    }
  }, [context.token]);
  useEffect(() => {
    console.log(context.notification, lastMessages);

    if (context.notification.length !== 0) {
      for (let room of rooms) {
        if (
          context.notification.find((a) => a.room === room.id) !== undefined
        ) {
          let msg = context.notification.filter((a) =>{
            if (a) return a.room === room.id;
            else return false;
          })[0];
          let i = lastMessages.findIndex((a) => {
            if (a) return a.room === msg.room;
            else return false;
          });
          console.log(i);
          if (i !== -1) {
            lastMessages[i] = msg;
            let x = [...lastMessages];
            console.log(lastMessages);
            setlastMessages(x);
          }
        }
      }
    }
  }, [context.notification]);
  return (
    <div className="chatroom">
      <p className="chat-head">Your Chats</p>
      <div className="chat-list">
        {loading && <Loading type="spin" color="#f00"></Loading>}
        {rooms &&
          !loading &&
          rooms.map((data) => {
            let recievingUser;
            let recievingUserName;
            if (data.user1 === context.user.id) {
              recievingUser = data.user2;
              recievingUserName = data.name2;
            } else {
              recievingUser = data.user1;
              recievingUserName = data.name1;
            }
            const linkTo = `chats/${data.id}`;
            let lastMsger;
            let lstmsg = lastMessages.find((value) => {
              if (value) {
                return value.room === data.id;
              } else {
                return false;
              }
            });
            if (lstmsg) {
              if (lstmsg.from === recievingUser) {
                lastMsger = recievingUserName;
              } else {
                lastMsger = "Me";
              }
            } else {
              lastMsger = "";
            }

            return (
              <div
                key={Math.random()}
                className="chat-list-item"
                onClick={() => {
                  history.push(linkTo);
                }}
              >
                <div className="row jc-sb" style={{ position: "relative" }}>
                  <h3>{recievingUserName}</h3>
                  {context.notification.length !== 0 &&
                    context.notification.find((a) => a.room === data.id) !==
                      undefined && (
                      <div
                        className="ui floating circular label"
                        style={{
                          border: "1px solid white",
                          color: "white",
                          backgroundColor: "red",
                        }}
                      >
                        {
                          context.notification.filter((a) => {
                            if (a) return a.room === data.id;
                            else return false;
                          }).length
                        }
                      </div>
                    )}
                </div>
                {lastMsger !== "" && (
                  <div>
                    <p style={{ margin: "0" }}>
                      {lastMsger} : {lstmsg.message}
                    </p>
                    <p style={{ fontSize: "small" }}>
                      {new Date(lstmsg.date).toLocaleString()}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        {rooms.length === 0 && !loading && (
          <div className="chat-list-item">No Rooms Present</div>
        )}
        {rooms === null && !loading && (
          <div className="chat-list-item">Something went wrong!</div>
        )}
      </div>
    </div>
  );
}
