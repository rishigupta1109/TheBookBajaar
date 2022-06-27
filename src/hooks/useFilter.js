import { useState,useEffect } from "react";
const useFilter=({books})=>{
     const [filteredbooks, setfilteredbooks] = useState([]);
     const [cF, scF] = useState("Select");
     const [sF, ssF] = useState("Select");
     useEffect(()=>{
      setfilteredbooks(books);
     },[books])
let uniquecolleges = new Set(books.map((data) => data.college));
let uniquesubject = new Set(books.map((data) => data.subject));
const sorting = (type) => {
  let array = [...filteredbooks];
  let filterdArray = array.sort((a, b) => {
    if (type === 1) return a.price - b.price;
    else if (type === -1) return b.price - a.price;
    else return true;
  });
  // console.log(filterdArray);
  setfilteredbooks(filterdArray);
};
const filter = (type, value) => {
  if (type === "S") {
    ssF(value);
  } else {
    scF(value);
  }
  let s = type === "S" ? value : sF;
  let c = type === "C" ? value : cF;
  let filterdArray = books.filter((data) => {
    if (s === "Select" && c === "Select") return true;
    else if (s === "Select") return data.college === c;
    else if (c === "Select") return data.subject === s;
    else return data.subject === s && data.college === c;
  });
  setfilteredbooks(filterdArray);
};
const searchFilter = (keyword) => {
  let filterdArray = books.filter((data) => {
    return data.name.toUpperCase().startsWith(keyword.toUpperCase());
  });
  setfilteredbooks(filterdArray);
};
return {filteredbooks,uniquecolleges,uniquesubject,setfilteredbooks,sorting,filter,searchFilter};

}
export default useFilter;