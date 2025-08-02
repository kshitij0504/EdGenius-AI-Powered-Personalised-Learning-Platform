// import { createContext, useState } from "react";
// import axios from "axios";

// axios.defaults.baseURL = "http://localhost:5000/api/auth"; // update if needed
// axios.defaults.withCredentials = true; // include cookies

// export const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const signup = async (email, password, interests) => {
//     setLoading(true);
//     try {
//       const res = await axios.post("/signup", { email, password, interests });
//       return { success: true, message: res.data.message };
//     } catch (err) {
//       return {
//         success: false,
//         message: err.response?.data?.message || "Signup failed",
//       };
//     } finally {
//       setLoading(false);
//     }
//   };

//   const signin = async (email, password) => {
//     setLoading(true);
//     try {
//       const res = await axios.post("/signin", { email, password });
//       setUser(res.data.data.user); // store user in context
//       return { success: true, message: res.data.message };
//     } catch (err) {
//       return {
//         success: false,
//         message: err.response?.data?.message || "Signin failed",
//       };
//     } finally {
//       setLoading(false);
//     }
//   };

//   const signout = async () => {
//     await axios.post("/signout");
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, signup, signin, signout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }
import { createContext, useState, useContext } from "react";
import axios from "axios";

// axios.defaults.baseURL = "http://localhost:8000/api/auth"; // update if needed
// axios.defaults.withCredentials = true; // include cookies

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const signup = async (name, email, password, interests) => {
    setLoading(true);
    try {
      console.log("Payload:", { name, email, password, interests });
      const res = await axios.post("http://localhost:8000/api/auth/signup", {
        name,
        email,
        password,
        interests,
      });
      return { success: true, message: res.data.message };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Signup failed",
      };
    } finally {
      setLoading(false);
    }
  };

  const signin = async (email, password) => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/api/auth/signin", {
        email,
        password,
      });
      setUser(res.data.data.user); // store user in context
      return { success: true, message: res.data.message };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Signin failed",
      };
    } finally {
      setLoading(false);
    }
  };

  const signout = async () => {
    await axios.post("/signout");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signup, signin, signout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// ADD THIS:
export function useAuth() {
  return useContext(AuthContext);
}
