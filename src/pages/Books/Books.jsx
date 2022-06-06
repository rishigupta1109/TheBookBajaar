import React from 'react'
import "./Books.css";
import Filterbar from '../../components/FilterBar/Filterbar';
import Shelf from '../../components/Shelf/Shelf';
export default function Books() {
  return (
    <div className="books">
      <Filterbar collegeFilter={true}></Filterbar>
      <Shelf isBuyer={true}></Shelf>
    </div>
  );
}
