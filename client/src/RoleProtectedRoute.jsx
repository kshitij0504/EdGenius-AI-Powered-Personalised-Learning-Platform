import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import getApi from "./helpers/API/getApi";

export default function RoleProtectedRoute({ allowedRoles, children }) {
  const [authStatus, setAuthStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await getApi("/api/auth/status", {
        credentials: "include",
      });

      if (response.data.success && response.data.authenticated) {
        console.log("Auth status response:", response.data);

        setAuthStatus(response.data);
      } else {
        setAuthStatus({ authenticated: false });
      }
    } catch (error) {
      setAuthStatus({ authenticated: false });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!authStatus?.authenticated) {
    return <Navigate to="/signin" replace />;
  }

  if (!authStatus.role || !allowedRoles.includes(authStatus.role)) {
    return <Navigate to="/not-authorized" replace />;
  }

  return children;
}
