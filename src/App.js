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
import { useState,useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import useHttpClient from './hooks/useHttpClient';
AOS.init();
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!JSON.parse(localStorage.getItem("token"))
  );
  const [token, setToken] = useState(null);
  const [user, setUser] = useState({});
  const [wishlist, setWishlist] = useState([]);
  const [tokenExpiry, settokenExpiry] = useState();
  const history= useHistory();
  const {request}=useHttpClient();
  console.log(user);
  const loginHandler = (userDetail,token,expiration) => {
    setIsLoggedIn(true);
    let expirationDate=expiration||new Date().getTime()+1000*60*60;
    settokenExpiry(expirationDate);
    setToken(token)
    setUser(userDetail);
    localStorage.setItem("token",JSON.stringify({
      token,
      expirationDate,
      userDetail
    }))
    
  };
  useEffect(() => {
    const data=JSON.parse(localStorage.getItem("token"));
     if(data&&data.token&&new Date(data.expirationDate)>new Date()){
       loginHandler(data.userDetail,data.token,data.expirationDate);
     }else{
      setIsLoggedIn(false)
     }
  }, []);
  let logoutTimer;
  useEffect(()=>{
    if(token&&tokenExpiry){
      const remaining=tokenExpiry-new Date().getTime();
      logoutTimer=setTimeout(logoutHandler,remaining)
    }else{
      clearTimeout(logoutTimer)
    }
  },[token,tokenExpiry]);
 useEffect(() => {
   const url = `http://localhost:5000/api/users/wishlist/${user.id}`;
   const fetchIt = async () => {
     const responseData = await request(
       url,
       "GET",
       {},
       {},
       "Wishlist Fetched Successfully"
     );
     console.log(responseData);
     if (responseData ) {
      setWishlist(responseData.wishlist)
       console.log(responseData.wishlist);
     }
   };
   if(token){
     fetchIt();
   }
 }, [token]);
  const logoutHandler = () => {
    setIsLoggedIn(false);
    setUser({});
    setToken(null);
    settokenExpiry(null);
    localStorage.removeItem("token")
    history.replace('/');
  };
  let routes = (
    <Switch>
      <Route path="/" exact>
        <Home></Home>
      </Route>
      <Route path="/books" exact>
        <Books></Books>
      </Route>
      <Route path="/chats" exact>
        <Chatroom></Chatroom>
      </Route>
      <Route path="/chats/:CHATID" exact>
        <Chat></Chat>
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
  
  if(!isLoggedIn) routes = (
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
      <Redirect to="/"></Redirect>
    </Switch>
  );
  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login: loginHandler, logout: logoutHandler, user,token,wishlist,setWishlist:setWishlist }}
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
