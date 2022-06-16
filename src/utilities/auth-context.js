import { createContext } from "react";
const AuthContext=createContext({
    isLoggedIn:false,
    login:()=>{},
    logout:()=>{},
    user:{},
    token:null,
    wishlist:[],
    setWishlist:()=>{}
})
export default AuthContext;