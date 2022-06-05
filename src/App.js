import './App.css';
import Navbar from './components/UI/navbar/Navbar';
import AOS from "aos";
import "aos/dist/aos.css";
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Home from './pages/home/Home';
import Books from './pages/Books/Books';
import Chatroom from './pages/Chatroom/Chatroom';
import Chat from './pages/Chatroom/Chat';
import Login from './pages/Login/Login';
AOS.init();
function App() {
  
  return (
    <div className="App">
      <Navbar></Navbar>
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
        <Route path="/login-register">
          <Login></Login>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
