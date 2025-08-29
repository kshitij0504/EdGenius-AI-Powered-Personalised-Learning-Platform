import { createContext } from "react";

export const AuthContext = createContext({
  loginUser: () => {},
  signUpUser: () => {},
  user: null,
  isAuthenticated: false,
  isLoading: false,
  logout: () => {},
});
