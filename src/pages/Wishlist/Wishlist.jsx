import React, { useContext, useEffect } from "react";
import "./Wishlist.css";
import Filterbar from "./../../components/FilterBar/Filterbar";
import Shelf from "./../../components/Shelf/Shelf";
import useFilter from "../../hooks/useFilter";
import AuthContext from "../../utilities/auth-context";
export default function Wishlist() {
  const context=useContext(AuthContext);
  const {
    filteredbooks,
    uniquecolleges,
    uniquesubject,
    setfilteredbooks,
    sorting,
    filter,
    searchFilter,
  } = useFilter({books:context.wishlist});
  useEffect(() => {
    setfilteredbooks(context.wishlist);
  }, [context.wishlist]);

  return (
    <div className="books">
      <Filterbar
        sorting={sorting}
        filter={filter}
        collegeFilter={true}
        uniquecolleges={Array.from(uniquecolleges)}
        uniquesubject={Array.from(uniquesubject)}
        searchFilter={searchFilter}
      ></Filterbar>
      <Shelf
        bookPresent={!!context.wishlist.length}
        isBuyer={true}
        books={filteredbooks}
        inWishlist={false}
      ></Shelf>
    </div>
  );
}
