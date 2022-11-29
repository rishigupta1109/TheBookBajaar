import React, { useEffect, useState } from "react";
import "./Books.css";
import Filterbar from "../../components/FilterBar/Filterbar";
import Shelf from "../../components/Shelf/Shelf";
import useHttpClient from "./../../hooks/useHttpClient";
import useFilter from "../../hooks/useFilter";
import toastCreator from "./../../utilities/toastCreator";
export default function Books() {
  const { request } = useHttpClient();
  const [books, setBooks] = useState([]);
  const [loading, setloading] = useState(true);
  const {
    filteredbooks,
    uniquecolleges,
    uniquesubject,
    setfilteredbooks,
    sorting,
    filter,
    searchFilter,
  } = useFilter({ books });
  useEffect(() => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/books/`;
    const fetchIt = async () => {
      const responseData = await request(
        url,
        "GET",
        {},
        {},
        "Books Fetched Successfully"
      );
      // console.log(responseData);
      setloading(false);
      if (responseData && responseData.books) {
        setBooks(responseData.books);
        setfilteredbooks(responseData.books);
        // console.log(responseData.books);
      } else {
        toastCreator("Some Error Ocurred", "warning");
      }
    };
    fetchIt();
  }, []);

  return (
    <div
      style={{
        textAlign: "center",
        backgroundColor: "white",
        color: "rgb(80 79 79)",
      }}
      className="books"
    >
      <div style={{ alignSelf: "center", fontSize: "40px", padding: "30px" }}>
        Books
      </div>
      <Filterbar
        sorting={sorting}
        filter={filter}
        collegeFilter={true}
        uniquecolleges={Array.from(uniquecolleges)}
        uniquesubject={Array.from(uniquesubject)}
        searchFilter={searchFilter}
      ></Filterbar>
      <Shelf
        bookPresent={!!books.length}
        isBuyer={true}
        loading={loading}
        books={filteredbooks}
        inWishlist={false}
      ></Shelf>
    </div>
  );
}
