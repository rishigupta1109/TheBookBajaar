import React from 'react'
import Shelf from './../../components/Shelf/Shelf';
import "./Mybooks.css";
import Filterbar from './../../components/FilterBar/Filterbar';
export default function Mybooks() {
  return (
    <div>
      <Filterbar collegeFilter={false}></Filterbar>
      <div className="Mybooks">
      <Shelf isBuyer={false}></Shelf>
      </div>
    </div>
  );
}
