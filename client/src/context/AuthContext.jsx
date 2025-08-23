import { createContext } from "react";

export const AuthContext = createContext({
  loginUser: () => {},
  signUpUser: () => {},
  user: null,
  isLoading: false,
  logout: () => {},
});
