// CourseContext.js
import { useContext, useState, useCallback } from "react";
import { CourseContext } from "./CourseContext";
import toast from "react-hot-toast";
import getApi from "../helpers/API/getApi";
import postApi from "../helpers/API/postApi";

export default function CourseContextProvider({ children }) {
  const [courses, setCourses] = useState([]);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCourseLoading, setIsCourseLoading] = useState(false);
  const [error, setError] = useState(null);
  const [courseError, setCourseError] = useState(null);
  const [isEnrolling, setIsEnrolling] = useState(false);

  // Custom toast
  const showToast = (message, type = "success") => {
    toast[type](message, {
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
          "0 10px 25px -5px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)",
      },
      iconTheme: { primary: "white", secondary: "#1a73e8" },
    });
  };

  // Fetch all courses from API
  const fetchCourses = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getApi("/api/courses");

      if (response.data.success) {
        setCourses(response.data.data || []);
      } else {
        setError(response.message || "Failed to fetch courses");
        showToast(response.message || "Failed to fetch courses", "error");
      }
    } catch (err) {
      console.error("Fetch courses error:", err);
      const errorMessage =
        err.response?.data?.message || err.message || "Network error";
      setError(errorMessage);
      showToast(errorMessage, "error");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch single course by slug
  const fetchCourseBySlug = useCallback(async (slug) => {
    setIsCourseLoading(true);
    setCourseError(null);
    try {
      const response = await getApi(`/api/courses/${slug}`);
      console.log("Fetch course response:", response);

      if (response.data.success) {
        setCurrentCourse(response.data.data);
        return response.data;
      } else {
        setCourseError(response.message || "Failed to fetch course");
        showToast(response.message || "Failed to fetch course", "error");
        return null;
      }
    } catch (err) {
      console.error("Fetch course error:", err);
      const errorMessage =
        err.response?.data?.message || err.message || "Network error";
      setCourseError(errorMessage);
      showToast(errorMessage, "error");
      return null;
    } finally {
      setIsCourseLoading(false);
    }
  }, []);

  const enrollCourse = useCallback(async (userId, courseId) => {
    setIsEnrolling(true);
    console.log("Enrolling user:", userId, "in course:", courseId);

    try {
      const response = await postApi("/api/enrollments/enroll", { courseId });
      console.log("Enroll response data:", response.data);

      if (!response.data) {
        throw new Error(response.data.message || "Enrollment failed");
      }

      return {
        success: true,
        isFree: false,
        razorpayOrderId: response.data.razorpayOrderId,
        courseTitle: response.data.courseTitle,
        amount: response.data.amount,
      };
    } catch (error) {
      toast.error(error.message);
      throw error;
    } finally {
      setIsEnrolling(false);
    }
  }, []);

  const verifyPayment = useCallback(async (paymentData) => {
    try {
      const data = await postApi("/api/enrollments/verify", paymentData);
      console.log("Payment verification response:", data);
      
      return data;
    } catch (error) {
      console.error("Payment verification error:", error);
      throw error;
    }
  }, []);

  const ctxValue = {
    courses,
    currentCourse,
    isLoading,
    isCourseLoading,
    error,
    isEnrolling,
    courseError,
    fetchCourses,
    fetchCourseBySlug,
    setCurrentCourse,
    enrollCourse,
    verifyPayment,
  };

  return (
    <CourseContext.Provider value={ctxValue}>{children}</CourseContext.Provider>
  );
}

// Custom hook to use the context
export const useCourses = () => useContext(CourseContext);
