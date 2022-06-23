import { createContext } from "react";
const AuthContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  user: {},
  token: null,
  wishlist: [],
  setWishlist: () => {},
  setUniqueBookName: () => {},
  setUniqueColleges: () => {},
  setUniqueSubjects: () => {},
  uniqueBookName: [],
  uniqueColleges: [],
  uniqueSubjects: [],
  rooms: [],
  setRooms: () => {},
  notification: [],
  setNotification: () => {},
});
export default AuthContext;