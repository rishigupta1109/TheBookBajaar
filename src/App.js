import "./App.css";
import Navbar from "./components/UI/navbar/Navbar";
import AOS from "aos";
import "aos/dist/aos.css";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Books from "./pages/Books/Books";
import Chatroom from "./pages/Chatroom/Chatroom";
import Chat from "./pages/Chatroom/Chat";
import Login from "./pages/Login/Login";
import Profile from "./pages/profile/Profile";
import Mybooks from "./pages/Mybooks/Mybooks";
import Wishlist from "./pages/Wishlist/Wishlist";
import BookForm from "./pages/BookForm/BookForm";
import AuthContext from "./utilities/auth-context";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import useHttpClient from "./hooks/useHttpClient";
import { io } from "socket.io-client";
import toastCreator from "./utilities/toastCreator";
import { CommentText } from "semantic-ui-react";
import sound from "./utilities/message-ringtone-magic.mp3";
import useAudio from "./hooks/useAudio";
import ForgetPassword from "./pages/Login/forgetPassword";
const socket = io.connect(process.env.REACT_APP_BACKEND_URL);
AOS.init();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!JSON.parse(localStorage.getItem("token"))
  );
  const [notificationSound, togle] = useAudio(sound);
  const [rooms, setRooms] = useState([]);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState({});
  const [wishlist, setWishlist] = useState([]);
  const [tokenExpiry, settokenExpiry] = useState();
  const [uniqueColleges, setUniqueColleges] = useState([]);
  const [uniqueSubjects, setUniqueSubjects] = useState([]);
  const [uniqueBookName, setUniqueBookName] = useState([]);
  const [notification, setNotification] = useState([]);
  const history = useHistory();
  const { request } = useHttpClient();
  console.log(user);
  const loginHandler = (userDetail, token, expiration) => {
    setIsLoggedIn(true);
    let expirationDate = expiration || new Date().getTime() + 1000 * 60 * 60;
    settokenExpiry(expirationDate);
    setToken(token);
    setUser(userDetail);
    localStorage.setItem(
      "token",
      JSON.stringify({
        token,
        expirationDate,
        userDetail,
      })
    );
  };
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("token"));
    if (data && data.token && new Date(data.expirationDate) > new Date()) {
      loginHandler(data.userDetail, data.token, data.expirationDate);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  let logoutTimer;
  useEffect(() => {
    if (token && tokenExpiry) {
      const remaining = tokenExpiry - new Date().getTime();
      logoutTimer = setTimeout(logoutHandler, remaining);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, tokenExpiry]);
  const fetchIt = async (url, msg, set1, prop1, set2, prop2) => {
    const responseData = await request(url, "GET", {}, {}, msg);
    console.log(responseData);
    if (responseData) {
      set1(responseData[prop1]);
      if (set2) {
        set2(responseData[prop2]);
      }
    }
    console.log(responseData[prop1], responseData[prop2]);
  };
  useEffect(() => {
    if (token) {
      fetchIt(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/wishlist/${user.id}`,
        "",
        setWishlist,
        "wishlist"
      );
    }
  }, [token]);
  useEffect(() => {
    fetchIt(
      `${process.env.REACT_APP_BACKEND_URL}/api/users/uniquecolleges`,
      "",
      setUniqueColleges,
      "uniqueColleges"
    );
    fetchIt(
      `${process.env.REACT_APP_BACKEND_URL}/api/books/unique`,
      "",
      setUniqueBookName,
      "uniqueBookNames",
      setUniqueSubjects,
      "uniqueSubjects"
    );
  }, []);
  const logoutHandler = () => {
    setIsLoggedIn(false);
    setUser({});
    setToken(null);
    settokenExpiry(null);
    localStorage.removeItem("token");
    history.replace("/");
  };
  useEffect(() => {
    const fetchit = async () => {
      const url = `${process.env.REACT_APP_BACKEND_URL}/api/chat/rooms`;
      let responseData = await request(
        url,
        "POST",
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        JSON.stringify({}),
        ""
      );
      console.log("rooms", responseData);
      if (responseData && responseData.rooms) {
        setRooms(responseData.rooms);
        socket.emit("join_room", responseData.rooms, user.id);
        console.log("join room req sent");
      }
    };
    if (token) {
      fetchit();
    }
  }, [token]);
  socket.on("message_recieved", (sandhesa) => {
    togle();
    setNotification([sandhesa, ...notification]);
  });
  socket.on("notifications", (data) => {
    console.log(data);
    if (data[0].notification.length !== 0) {
      setNotification(data[0].notification);
    }
  });

  let routes = (
    <Switch>
      <Route path="/" exact>
        <Home></Home>
      </Route>
      <Route path="/books" exact>
        <Books></Books>
      </Route>
      <Route path="/chats" exact>
        <Chatroom socket={socket}></Chatroom>
      </Route>
      <Route path="/chats/:CHATID" exact>
        <Chat socket={socket}></Chat>
      </Route>
      <Route path="/profile">
        <Profile></Profile>
      </Route>
      <Route path="/mybooks">
        <Mybooks></Mybooks>
      </Route>
      <Route path="/wishlist">
        <Wishlist></Wishlist>
      </Route>
      <Route path="/bookform">
        <BookForm sell={true}></BookForm>
      </Route>
      <Route path="/updatebook/:bookId">
        <BookForm sell={false}></BookForm>
      </Route>
      <Redirect to="/"></Redirect>
    </Switch>
  );

  if (!isLoggedIn)
    routes = (
      <Switch>
        <Route path="/" exact>
          <Home></Home>
        </Route>
        <Route path="/books" exact>
          <Books></Books>
        </Route>
        <Route path="/login-register">
          <Login></Login>
        </Route>
        <Route path="/resetpassword">
          <ForgetPassword></ForgetPassword>
        </Route>
        <Redirect to="/"></Redirect>
      </Switch>
    );
  return (
    <AuthContext.Provider
      value={{
        uniqueBookName,
        uniqueColleges,
        uniqueSubjects,
        isLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
        user,
        token,
        wishlist,
        setWishlist: setWishlist,
        setUniqueBookName,
        setUniqueColleges,
        setUniqueSubjects,
        rooms,
        setRooms,
        notification,
        setNotification,
      }}
    >
      <ToastContainer />
      <div className="App">
        <Navbar></Navbar>
        {routes}
      </div>
    </AuthContext.Provider>
  );
}

export default App;
