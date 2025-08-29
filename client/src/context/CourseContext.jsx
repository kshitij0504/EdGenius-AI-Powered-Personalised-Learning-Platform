// CourseContext.js
import { createContext } from "react";

export const CourseContext = createContext({
  courses: [],
  currentCourse: null,
  isLoading: false,
  isCourseLoading: false,
  error: null,
  courseError: null,
  isEnrolling: false,
  fetchCourses: () => {},
  fetchCourseBySlug: () => {},
  setCurrentCourse: () => {},
  enrollCourse: () => {},
  verifyPayment: () => {},
});
