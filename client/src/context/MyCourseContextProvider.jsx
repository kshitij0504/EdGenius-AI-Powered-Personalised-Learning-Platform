// contexts/CourseContextProvider.js
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import getApi from "../helpers/API/getApi";
import React from "react";
import { MyCourseContext } from "./MyCourseContext";
import { useContext } from "react";

export default function MyCourseContextProvider({ children }) {
  const [myCourses, setMyCourses] = useState([]);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [overallProgress, setOverallProgress] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Custom themed toast function (same as your AuthContext)
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

  // Clear error function
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Fetch My Courses function
  const handleFetchMyCourses = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getApi("/api/enrollments/my-courses");
      console.log(response.data);
      
      if (response.data) {
        const coursesData = response.data
        setMyCourses(coursesData);
        return { success: true, data: coursesData };
      } else {
        const errorMessage = response.message || "Failed to fetch courses";
        setError(errorMessage);
        showToast(errorMessage, "error");
        return { success: false, message: errorMessage };
      }
    } catch (error) {
      const errorMessage = (
        error.response?.data?.message ||
        error.message ||
        "Network error. Please try again."
      );
      setError(errorMessage);
      showToast(errorMessage, "error");
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Get Course by Slug function
  const handleGetCourseBySlug = useCallback(async (slug) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getApi(`/api/courses/${slug}`);
      if (response.data.success) {
        const courseData = response.data.course || response.data.data;
        setCurrentCourse(courseData);
        return { success: true, data: courseData };
      } else {
        const errorMessage = response.message || "Failed to fetch course details";
        setError(errorMessage);
        showToast(errorMessage, "error");
        return { success: false, message: errorMessage };
      }
    } catch (error) {
      const errorMessage = (
        error.response?.data?.message ||
        error.message ||
        "Course not found or network error."
      );
      setError(errorMessage);
      showToast(errorMessage, "error");
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Get Course Progress function
  const handleGetCourseProgress = useCallback(async (courseId) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getApi(`/api/progress/course/${courseId}`);
      if (response.data.success) {
        const progressData = response.data.progress || response.data.data;
        return { success: true, data: progressData };
      } else {
        const errorMessage = response.message || "Failed to fetch course progress";
        setError(errorMessage);
        // Don't show toast for progress errors as they might be optional
        return { success: false, message: errorMessage };
      }
    } catch (error) {
      const errorMessage = (
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch progress data."
      );
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch Overall Progress function
  const handleFetchOverallProgress = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getApi("/api/progress/overall");
      if (response.data.success) {
        const progressData = response.data.progress || response.data.data;
        setOverallProgress(progressData);
        return { success: true, data: progressData };
      } else {
        const errorMessage = response.message || "Failed to fetch overall progress";
        setError(errorMessage);
        return { success: false, message: errorMessage };
      }
    } catch (error) {
      const errorMessage = (
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch overall progress."
      );
      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const ctxValue = {
    myCourses,
    currentCourse,
    overallProgress,
    isLoading,
    error,
    fetchMyCourses: handleFetchMyCourses,
    getCourseBySlug: handleGetCourseBySlug,
    getCourseProgress: handleGetCourseProgress,
    fetchOverallProgress: handleFetchOverallProgress,
    clearError,
  };

  return (
    <MyCourseContext.Provider value={ctxValue}>
      {children}
    </MyCourseContext.Provider>
  );
}

export const useCourses = () => useContext(MyCourseContext);
