import React from "react";
import "./Wishlist.css";
import Filterbar from "./../../components/FilterBar/Filterbar";
import Shelf from "./../../components/Shelf/Shelf";
export default function Wishlist() {
  return (
    <div className="books">
      <Filterbar collegeFilter={true}></Filterbar>
      <Shelf isBuyer={true} inWishlist={true}></Shelf>
    </div>
  );
}
