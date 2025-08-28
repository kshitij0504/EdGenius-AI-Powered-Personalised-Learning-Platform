// contexts/CourseContext.js
import { createContext } from "react";

export const MyCourseContext = createContext({
  myCourses: [],
  currentCourse: null,
  overallProgress: null,
  isLoading: false,
  error: null,
  fetchMyCourses: () => {},
  getCourseBySlug: () => {},
  getCourseProgress: () => {},
  fetchOverallProgress: () => {},
  clearError: () => {},
});
