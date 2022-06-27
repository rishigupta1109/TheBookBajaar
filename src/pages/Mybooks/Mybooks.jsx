import React, { useEffect, useState, useContext } from "react";
import Shelf from "./../../components/Shelf/Shelf";
import "./Mybooks.css";
import Filterbar from "./../../components/FilterBar/Filterbar";
import useHttpClient from "./../../hooks/useHttpClient";
import AuthContext from "../../utilities/auth-context";
import useFilter from "../../hooks/useFilter";
export default function Mybooks() {
  const { request } = useHttpClient();
  const [books, setBooks] = useState([]);
  const [loading, setloading] = useState(true);
  const context = useContext(AuthContext);
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
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/books/user/${context.user.id}`;
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
        setfilteredbooks(responseData.books);
        console.log(responseData.books);
      }
    };
    if (context.user.id) fetchIt();
  }, [context.user]);

  return (
    <div
      style={{
        textAlign: "center",
        backgroundColor: "white",
        color: "rgb(80 79 79)",
      }}
      className="books"
    >
      <div style={{ alignSelf: "center", fontSize: "50px", padding: "30px" }}>
        My Books
      </div>
      <Filterbar
        collegeFilter={false}
        sorting={sorting}
        filter={filter}
        uniquecolleges={Array.from(uniquecolleges)}
        uniquesubject={Array.from(uniquesubject)}
        searchFilter={searchFilter}
      ></Filterbar>
      <div className="Mybooks">
        <Shelf
          loading={loading}
          isBuyer={false}
          books={filteredbooks}
          bookPresent={!!books.length}
          inWishlist={false}
          setBooks={setBooks}
        ></Shelf>
      </div>
    </div>
  );
}
