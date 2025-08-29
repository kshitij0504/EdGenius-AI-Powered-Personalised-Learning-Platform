import { useCallback, useState } from "react";
import { AuthContext } from "./AuthContext";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import getApi from "../helpers/API/getApi";
import postApi from "../helpers/API/postApi";
import React from "react";

export default function AuthContextProvider({ children }) {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector(state => state.auth);
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
        const response = await postApi("/api/auth/signin", credentials);
        if (response.data.success) {
          const userData = response.data.user;
          dispatch({ type: "auth/setUser", payload: userData });
          showToast("Welcome back! Login successful", "success");
          return { success: true, data: userData };
        } else {
          showToast(response.message || "Login failed. Please try again.", "error");
          return { success: false, message: response.message };
        }
      } catch (error) {
        const errorMessage = (
          error.response?.data?.message ||
          error.message ||
          "Network error. Please try again."
        );
        showToast(errorMessage, "error");
        return { success: false, message: errorMessage };
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch]
  );

  // Sign up function
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
        if (response.data.success) {
          const newUser = response.data.data;
          dispatch({ type: "auth/setUser", payload: newUser });
          showToast("Account created successfully! Welcome to Edgenius", "success");
          return { success: true, data: newUser };
        } else {
          showToast(response.message || "Signup failed. Please try again.", "error");
          return { success: false, message: response.message };
        }
      } catch (error) {
        const errorMessage = (
          error.response?.data?.message ||
          error.message ||
          "Network error. Please try again."
        );
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
    dispatch({ type: "auth/clearUser" });
    showToast("Logged out successfully", "success");
  }, [dispatch]);

  // No need for initializeAuth or React.useEffect for user initialization anymore

  const ctxValue = {
    loginUser: handleLoginUser,
    signUpUser: handleSignUp,
    logout: handleLogout,
    user,
    isAuthenticated,
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
