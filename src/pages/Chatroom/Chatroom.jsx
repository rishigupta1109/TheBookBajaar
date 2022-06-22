import React ,{useState,useEffect, useContext} from 'react'
import Loading from 'react-loading';
import { Link, useHistory } from 'react-router-dom'
import useHttpClient from '../../hooks/useHttpClient';
import AuthContext from '../../utilities/auth-context';
import "./Chatroom.css"

export default function Chatroom({socket}) {
  const [rooms,setRooms]=useState([]);
  const [lastMessages, setlastMessages] = useState([]);
  const {request}=useHttpClient();
  const [loading,setLoading]=useState(true);
  const context=useContext(AuthContext);
  const history =useHistory();
  useEffect(()=>{
    const fetchit=async()=>{
      const url="http://localhost:5000/api/chat/rooms";
       let responseData = await request(
         url,
         "POST",
         {"Content-Type":"application/json",
           Authorization: "Bearer " + context.token,
         },
         JSON.stringify({}),
         "Chats Loaded Successfully"
       );
       console.log("rooms",responseData);
       setLoading(false);
       if (responseData&&responseData.rooms) {
         setRooms(responseData.rooms);
         context.setRooms(responseData.rooms);
         socket.emit("join_room", responseData.rooms,context.user.id);
         console.log("join room req sent");
         setlastMessages(responseData.lastMessages);
       }
    }
    if(context.token){
      fetchit()
    }
  },[context.token]);
  return (
    <div className="chatroom">
      <h1>Your Chats</h1>
      <div className="chat-list">
        {loading && <Loading type="spin" color="#fff"></Loading>}
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
            let lstmsg=lastMessages.find((value)=>value.room===data.id);
            if(lstmsg){
              if(lstmsg.from===recievingUser){
                lastMsger=recievingUserName;
              }
              else{
                lastMsger="Me"
              }
            }else{
              lastMsger="";
            }
            return (
              <div className="chat-list-item" onClick={()=>{history.push(linkTo)}}>
                <h3>{recievingUserName}</h3>
                {lastMsger!==""&&<div className='row jc-sb'>
                <p>
                  {lastMsger} : {lstmsg.message}
                </p>
                <p>
                  {new Date(lstmsg.date).toLocaleString()}
                </p>
                </div>}
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
