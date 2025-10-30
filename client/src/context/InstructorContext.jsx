// context/InstructorContext.jsx
import { createContext, useContext, useState } from "react";
import getApi from "../helpers/API/getApi";

const InstructorContext = createContext();

export const InstructorProvider = ({ children }) => {
  const [instructor, setInstructor] = useState(null);
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const [courses, setCourses] = useState([]); // extracted from enrollments
  const [loading, setLoading] = useState(false);

  // ✅ Fetch enrolled students for instructor
  const fetchEnrolledStudents = async (courseId = "", search = "", page = 1, limit = 20) => {
    setLoading(true);
    try {
      const query = new URLSearchParams({
        courseId,
        search,
        page,
        limit,
      }).toString();

      const res = await getApi(`/api/instructor/students?${query}`);

      if (res?.data?.success) {
        const enrollments = res.data.data.enrollments || [];
        setEnrolledStudents(enrollments);

        // ✅ Extract unique courses from enrollments
        const uniqueCourses = [
          ...new Map(
            enrollments.map((e) => [e.course.id, e.course.title])
          ).entries(),
        ].map(([id, title]) => ({ id, title }));

        setCourses(uniqueCourses);
      } else {
        console.error("Failed to fetch students:", res?.data?.message);
      }
    } catch (err) {
      console.error("Error fetching students:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch single student's progress in a course
  const fetchStudentProgress = async (userId, courseId) => {
    try {
      const res = await getApi(`/api/instructor/students/${userId}/courses/${courseId}`);
      if (res?.data?.success) {
        return res.data.data;
      } else {
        console.error("Failed to fetch progress:", res?.data?.message);
        return null;
      }
    } catch (err) {
      console.error("Error fetching student progress:", err);
      return null;
    }
  };

  return (
    <InstructorContext.Provider
      value={{
        instructor,
        setInstructor,
        enrolledStudents,
        courses,
        loading,
        fetchEnrolledStudents,
        fetchStudentProgress,
      }}
    >
      {children}
    </InstructorContext.Provider>
  );
};

export const useInstructor = () => useContext(InstructorContext);
