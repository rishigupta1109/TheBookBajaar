import React from 'react'
import logo from "../../utilities/tbb_logo-redonwhote.jpg"
import "./Home.css"
import chaticon from "../../utilities/chats.png";
import freeicon from "../../utilities/free.png"
import filtericon from "../../utilities/filter.png"
export default function Home() {
    const feautures=["College Filter","Chat Room","Free to use"]
    const feauturesIcon=[filtericon,chaticon,freeicon]
  return (
    <div className="home">
      <div className="home_s1">
        <img src={logo} className="s1_logo"></img>
        <p className="s1_p">
          {" "}
          <b style={{fontSize:"40px"}}>The Book Bajaar</b> is a platform which acts as a medium for buying
          and selling used books at a genuine price and in the college campus
          itself.
        </p>
      </div>
      <div className='home-s2'>
            <h1 style={{alignSelf:"center"}}>Feautures</h1>
            <div className='feautures'>
            {feautures.map((feauture,index)=>{
                return <div key={index} className="feauture-box">
                    <img src={feauturesIcon[index]}></img>
                    <h2>{feauture}</h2>
                </div>;
            })}
            </div>
      </div>
    </div>
  );
}
