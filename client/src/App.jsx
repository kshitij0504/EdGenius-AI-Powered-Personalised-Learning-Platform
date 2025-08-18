import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import DarkModeToggle from "./components/DarkModeToggle.jsx";
import SignUpComponent from "./components/Authentication/signup.jsx";
import SignUpInterests from "./components/Authentication/SignUpInterests.jsx";
import Signin from "./components/Authentication/signin.jsx";
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<SignUpComponent />} />
        <Route path="/signup/interests" element={<SignUpInterests />} />
        <Route path="/studentdash" element={<StudentDashboard />} />
        <Route path="/studentfirstquiz" element={<Studentquiz />} />
        <Route path="/quiz" element={<EdgeniusQuiz />} />
        <Route path="/mycourse" element={<MyCoursesPage />} />
        <Route path="/allcourses" element={<AllCoursesPage />} />
        <Route path="/myprogress" element={<MyProgress />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/quiz" element={<QuizPage />} />

        <Route path="/instructordash" element={<InstructorDashboard />} />
        <Route path="/instructor/courses" element={<Course />} />
        <Route path="/instructor/students" element={<EnrollStudent />} />
        <Route path="/instructor/createcourse" element={<CreateCoursePage />} />
        <Route path="/instructor/editcourse" element={<EditCoursePage />} />
        <Route path="/instructor/addcontent" element={<AddContentPage />} />
        <Route path="/instrctor/settings" element={<SettingsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
