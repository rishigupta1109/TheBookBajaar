import React,{useEffect,useState,useContext} from 'react'
import Shelf from './../../components/Shelf/Shelf';
import "./Mybooks.css";
import Filterbar from './../../components/FilterBar/Filterbar';
import useHttpClient from "./../../hooks/useHttpClient";
import AuthContext from '../../utilities/auth-context';
export default function Mybooks() {
   const { request } = useHttpClient();
   const [books, setBooks] = useState([]);
   const [loading,setloading]=useState(true);
   const context = useContext(AuthContext);
   useEffect(() => {
     const url = `http://localhost:5000/api/books/user/${context.user.id}`;
     const fetchIt = async () => {
       const responseData = await request(
         url,
         "GET",
         {},
         {},
         "your Books Fetched Successfully"
       );
       console.log(responseData);
       setloading(false);
       if (responseData && responseData.books) {
         setBooks(responseData.books);
         console.log(responseData.books);
       }
     };
     fetchIt();
   }, []);
  return (
    <div
      style={{ textAlign: "center", backgroundColor: "red", color: "white" }}
      className="books"
    >
      <div style={{ alignSelf: "center", fontSize: "50px", padding: "30px" }}>
        My Books
      </div>
      <Filterbar collegeFilter={false}></Filterbar>
      <div className="Mybooks">
        <Shelf
          loading={loading}
          isBuyer={false}
          books={books}
          inWishlist={false}
        ></Shelf>
      </div>
    </div>
  );
}
