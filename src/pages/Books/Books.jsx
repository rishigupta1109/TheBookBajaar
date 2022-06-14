import React ,{useEffect, useState} from 'react'
import "./Books.css";
import Filterbar from '../../components/FilterBar/Filterbar';
import Shelf from '../../components/Shelf/Shelf';
import useHttpClient from './../../hooks/useHttpClient';
export default function Books() {
  const {request}=useHttpClient();
  const [books,setBooks]=useState([]);
  const [loading,setloading]=useState(true);
  useEffect(() => {
      const url="http://localhost:5000/api/books/";
      const fetchIt=async()=>{
       const responseData= await request(url,"GET",{},{},"Books Fetched Successfully");
       console.log(responseData);
       setloading(false);
       if(responseData&&responseData.books){
         setBooks(responseData.books);
        console.log(responseData.books);
       }
      }
      fetchIt();
  }, []);
  return (
    <div style={{textAlign:"center",backgroundColor:"red",color:"white"}} className="books">
    <div style={{alignSelf:"center",fontSize:"50px",padding:"30px"}}>Books</div>
      <Filterbar collegeFilter={true}></Filterbar> 
      <Shelf isBuyer={true} loading={loading} books={books} inWishlist={false}></Shelf>
    </div>
  );
}
