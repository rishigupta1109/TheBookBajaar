import { createContext } from "react";
const AuthContext=createContext({
    isLoggedIn:false,
    login:()=>{},
    logout:()=>{},
    user:{},
    token:null
})
export default AuthContext;