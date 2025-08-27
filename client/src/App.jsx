import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import DarkModeToggle from "./components/DarkModeToggle.jsx";
import StudentDashboard from "./components/student/Studentdash/Studentdash.jsx";
import Studentquiz from "./components/student/Quiz/Studentquiz.jsx";
import MyCoursesPage from "./components/student/StudentCourse/Mycourse.jsx";
import ContactPage from "./components/student/Contact/conatct.jsx";
import AllCoursesPage from "./components/student/Allcourse/Allcourse.jsx";
import MyProgress from "./components/student/Myprogress/Myprogress.jsx";
import QuizPage from "./components/temp.jsx";
import EdgeniusQuiz from "./components/student/Quiz/Studentquiz.jsx";
import InstructorDashboard from "./components/Instructor/Instructordash/Instructordash.jsx";
import Course from "./components/Instructor/Course/Course.jsx";
import EnrollStudent from "./components/Instructor/Student/EnrollStudent.jsx";
import CreateCoursePage from "./components/Instructor/Course/createcourse.jsx";
import EditCoursePage from "./components/Instructor/Course/editcourse.jsx";
import SettingsPage from "./components/Instructor/Instructordash/Setting.jsx";
import AddContentPage from "./components/Instructor/Course/AddContent.jsx";
import LoginPage from "./components/Authentication/signin.jsx";
import SignupPage from "./components/Authentication/signup.jsx";
import RoleProtectedRoute from "./RoleProtectedRoute.jsx";
import NotAuthorized from "./pages/not-authorized.jsx";
import NotFound from "./pages/404.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Student Protected Routes */}
        <Route
          path="/studentdash"
          element={
            <RoleProtectedRoute allowedRoles={["USER"]}>
              <StudentDashboard />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/studentfirstquiz"
          element={
            <RoleProtectedRoute allowedRoles={["USER"]}>
              <Studentquiz />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/quiz"
          element={
            <RoleProtectedRoute allowedRoles={["USER"]}>
              <EdgeniusQuiz />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/mycourse"
          element={
            <RoleProtectedRoute allowedRoles={["USER"]}>
              <MyCoursesPage />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/allcourses"
          element={
            <RoleProtectedRoute allowedRoles={["USER"]}>
              <AllCoursesPage />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/myprogress"
          element={
            <RoleProtectedRoute allowedRoles={["USER"]}>
              <MyProgress />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <RoleProtectedRoute allowedRoles={["USER"]}>
              <ContactPage />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/quiz"
          element={
            <RoleProtectedRoute allowedRoles={["USER"]}>
              <QuizPage />
            </RoleProtectedRoute>
          }
        />

        {/* Instructor Protected Routes */}
        <Route
          path="/instructordash"
          element={
            <RoleProtectedRoute allowedRoles={["INSTRUCTOR"]}>
              <InstructorDashboard />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/instructor/courses"
          element={
            <RoleProtectedRoute allowedRoles={["INSTRUCTOR"]}>
              <Course />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/instructor/students"
          element={
            <RoleProtectedRoute allowedRoles={["INSTRUCTOR"]}>
              <EnrollStudent />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/instructor/createcourse"
          element={
            <RoleProtectedRoute allowedRoles={["INSTRUCTOR"]}>
              <CreateCoursePage />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/instructor/editcourse/:courseId"
          element={
            <RoleProtectedRoute allowedRoles={["INSTRUCTOR"]}>
              <EditCoursePage />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/instructor/addcontent/:courseId"
          element={
            <RoleProtectedRoute allowedRoles={["INSTRUCTOR"]}>
              <AddContentPage />
            </RoleProtectedRoute>
          }
        />
        <Route
          path="/instructor/settings"
          element={
            <RoleProtectedRoute allowedRoles={["INSTRUCTOR"]}>
              <SettingsPage />
            </RoleProtectedRoute>
          }
        />

        {/* Not Authorized */}
        <Route path="/not-authorized" element={<NotAuthorized />} />

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
