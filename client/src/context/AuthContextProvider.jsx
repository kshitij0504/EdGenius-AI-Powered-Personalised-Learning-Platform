import { useContext, useState, useCallback } from "react";
import { AuthContext } from "./AuthContext";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import getApi from "../helpers/API/getApi";
import postApi from "../helpers/API/postApi";
import React from "react";

export default function AuthContextProvider({ children }) {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Custom themed toast function
  const showToast = (message, type = "success") => {
    const toastConfig = {
      position: "top-right",
      duration: 4000,
      style: {
        borderRadius: "12px",
        background:
          type === "success"
            ? "linear-gradient(135deg, #1a73e8 0%, #4285f4 100%)"
            : type === "error"
            ? "linear-gradient(135deg, #dc2626 0%, #ef4444 100%)"
            : "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)",
        color: "white",
        padding: "16px 20px",
        fontWeight: "600",
        fontSize: "14px",
        boxShadow:
          "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
      },
      iconTheme: {
        primary: "white",
        secondary:
          type === "success"
            ? "#1a73e8"
            : type === "error"
            ? "#dc2626"
            : "#f59e0b",
      },
    };

    toast[type](message, toastConfig);
  };

  // Login function
  const handleLoginUser = useCallback(
    async (credentials) => {
      setIsLoading(true);
      try {
        console.log("Login credentials:", credentials);
        const response = await postApi("/api/auth/signin", credentials);
        console.log("Login response:", response);
        if (response.data.success) {
          const userData = response.data.user;

          setUser(userData);

          dispatch({
            type: "auth/setUser",
            payload: userData,
          });

          showToast("Welcome back! Login successful", "success");
          return { success: true, data: userData };
        } else {
          showToast(
            response.message || "Login failed. Please try again.",
            "error"
          );
          return { success: false, message: response.message };
        }
      } catch (error) {
        console.error("Login error:", error);
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Network error. Please try again.";
        showToast(errorMessage, "error");
        return { success: false, message: errorMessage };
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch]
  );

  const handleSignUp = useCallback(
    async (userData) => {
      setIsLoading(true);
      try {
        const cleanData = {
          name: `${userData.firstName} ${userData.lastName}`,
          email: userData.email,
          password: userData.password,
          interests: userData.interests,
        };

        const response = await postApi("/api/auth/signup", cleanData);
        console.log("Signup response:", response);

        if (response.data.success) {
          const newUser = response.data.data;

          setUser(newUser);
          dispatch({ type: "auth/setUser", payload: newUser });

          showToast(
            "Account created successfully! Welcome to Edgenius",
            "success"
          );
          return { success: true, data: newUser };
        } else {
          showToast(
            response.message || "Signup failed. Please try again.",
            "error"
          );
          return { success: false, message: response.message };
        }
      } catch (error) {
        console.error("Signup error:", error);
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Network error. Please try again.";
        showToast(errorMessage, "error");
        return { success: false, message: errorMessage };
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch]
  );

  // Logout function
  const handleLogout = useCallback(() => {
    setUser(null);
    dispatch({ type: "auth/clearUser" });
    localStorage.removeItem("authToken");
    showToast("Logged out successfully", "success");
  }, [dispatch]);

  const initializeAuth = useCallback(async () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const response = await getApi("/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.success) {
          setUser(response.data);
          dispatch({ type: "auth/setUser", payload: response.data });
        } else {
          localStorage.removeItem("authToken");
        }
      } catch (error) {
        localStorage.removeItem("authToken");
        console.error("Auth initialization error:", error);
      }
    }
  }, [dispatch]);

  // Call initializeAuth on mount
  React.useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const ctxValue = {
    loginUser: handleLoginUser,
    signUpUser: handleSignUp,
    logout: handleLogout,
    user,
    isLoading,
  };

  return (
    <AuthContext.Provider value={ctxValue}>
      {children}
      <Toaster
        position="top-right"
        containerStyle={{
          top: 20,
          right: 20,
        }}
        toastOptions={{
          className: "",
          style: {
            maxWidth: "400px",
          },
        }}
      />
    </AuthContext.Provider>
  );
}
