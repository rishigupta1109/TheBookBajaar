import { createContext } from "react";
const AuthContext=createContext({
    isLoggedIn:false,
    login:()=>{},
    logout:()=>{},
    user:{}
})
export default AuthContext;