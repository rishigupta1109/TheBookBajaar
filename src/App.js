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
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
AOS.init();
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const history= useHistory();
  console.log(user);
  const loginHandler = (userDetail) => {
    setIsLoggedIn(true);
    setUser(userDetail);
    history.replace('/');
  };
  const logoutHandler = () => {
    setIsLoggedIn(false);
    setUser({});
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
      <Route path="/login-register">
        <Login></Login>
      </Route>
      <Redirect to="/"></Redirect>
    </Switch>
  );
  if(isLoggedIn) routes = (
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
  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login: loginHandler, logout: logoutHandler, user }}
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
