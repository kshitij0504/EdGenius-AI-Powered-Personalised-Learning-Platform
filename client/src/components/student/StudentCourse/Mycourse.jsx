import React, { useState, useEffect } from "react";
import { IoBookmarks, IoPlayCircleOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Sidebar from "../Studentsidebar/Studentsidebar";
import Header from "../Studentdash/Header";

const MyCoursesPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page") || "1", 10);

  const coursesPerPage = 4;

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);

    if (newDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const user = {
    name: "Aisha Sharma",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    learningGoal: "Become a Full-stack Web Developer",
    currentCourseSlug: "react-hooks-context",
    currentLessonTitle: "Mastering State with useState",
    lessonProgress: 75,
    diagnosticTaken: true,
    upcomingQuiz: "React Fundamentals Quiz",
    unreadNotifications: 2,
    xpPoints: 1250,
    level: 7,
  };

  const enrolledCourses = [
    {
      id: 1,
      title: "AWS Cloud Technical Essentials",
      description:
        "Understand scalable cloud infrastructure, deployment, and management using Amazon Web Services.",
      imageUrl: "http://googleusercontent.com/file_content/0",
      instructor: "Mark O'Connell",
      progress: 8,
      endsOn: "Feb 26, 2026",
      moduleProgress: "Module 4 of 4",
    },
    {
      id: 2,
      title: "Python for Data Science Bootcamp",
      description:
        "Master Python fundamentals for data analysis, visualization, and machine learning algorithms.",
      imageUrl:
        "https://via.placeholder.com/400x220/749BC2/FFFBDE?text=Python+DS",
      instructor: "Prof. Ankit Patel",
      progress: 90,
    },
    {
      id: 3,
      title: "UI/UX Design Masterclass 2025",
      description:
        "Learn modern design principles and tools like Figma for creating stunning user experiences from scratch.",
      imageUrl:
        "https://via.placeholder.com/400x220/4682A9/FFFBDE?text=UI/UX+Design",
      instructor: "Sophia Lee",
      progress: 30,
    },
    {
      id: 4,
      title: "Advanced React Patterns",
      description:
        "Dive deep into render props, higher-order components, and custom hooks for scalable applications.",
      imageUrl:
        "https://via.placeholder.com/400x220/91C8E4/4682A9?text=React+Patterns",
      instructor: "Dr. Elena Petrova",
      progress: 60,
    },
    {
      id: 5,
      title: "JavaScript ES6+ Deep Dive",
      description:
        "Explore modern JavaScript features including arrow functions, destructuring, and async/await.",
      imageUrl:
        "https://via.placeholder.com/400x220/FFBF00/FFFFFF?text=JavaScript+ES6",
      instructor: "John Doe",
      progress: 75,
    },
    {
      id: 6,
      title: "Database Management with SQL",
      description:
        "Learn SQL fundamentals for querying, managing, and optimizing relational databases.",
      imageUrl: "https://via.placeholder.com/400x220/A0DEFF/749BC2?text=SQL+DB",
      instructor: "Jane Smith",
      progress: 50,
    },
    {
      id: 7,
      title: "Mobile App Development with React Native",
      description:
        "Build cross-platform mobile applications using JavaScript and React Native.",
      imageUrl:
        "https://via.placeholder.com/400x220/ADD8E6/00008B?text=React+Native",
      instructor: "Alice Johnson",
      progress: 45,
    },
    {
      id: 8,
      title: "Machine Learning with TensorFlow",
      description:
        "An introduction to machine learning concepts and building models with TensorFlow.",
      imageUrl:
        "https://via.placeholder.com/400x220/DDA0DD/800080?text=TensorFlow",
      instructor: "Robert Brown",
      progress: 80,
    },
    {
      id: 9,
      title: "Ethical Hacking Fundamentals",
      description:
        "Learn about cybersecurity, penetration testing, and ethical hacking techniques.",
      imageUrl:
        "https://via.placeholder.com/400x220/F0E68C/B8860B?text=Hacking",
      instructor: "Charlie Green",
      progress: 20,
    },
    {
      id: 10,
      title: "Digital Marketing Strategy",
      description:
        "Develop effective digital marketing campaigns and understand SEO, SEM, and social media marketing.",
      imageUrl:
        "https://via.placeholder.com/400x220/B0C4DE/4682B4?text=Marketing",
      instructor: "Diana White",
      progress: 10,
    },
  ];

  const handleContinueCourse = (courseId) => {
    console.log(`Navigating to course with ID: ${courseId}`);
  };

  const indexOfLastCourse = page * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = enrolledCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );

  const totalPages = Math.ceil(enrolledCourses.length / coursesPerPage);

  return (
    <div
      className={`flex min-h-screen transition-all duration-500 ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute top-10 left-10 w-24 sm:w-32 h-24 sm:h-32 rounded-full opacity-20 blur-3xl animate-float ${
            isDarkMode ? "bg-blue-500" : "bg-blue-400"
          }`}
          style={{ animationDelay: "0s" }}
        />
        <div
          className={`absolute top-32 right-10 sm:right-20 w-16 sm:w-24 h-16 sm:h-24 rounded-full opacity-15 blur-2xl animate-float ${
            isDarkMode ? "bg-purple-500" : "bg-purple-400"
          }`}
          style={{ animationDelay: "2s" }}
        />
        <div
          className={`absolute bottom-20 left-1/3 w-16 sm:w-20 h-16 sm:h-20 rounded-full opacity-25 blur-xl animate-float ${
            isDarkMode ? "bg-green-500" : "bg-green-400"
          }`}
          style={{ animationDelay: "1s" }}
        />
        <div
          className={`absolute bottom-32 right-1/4 w-14 sm:w-16 h-14 sm:h-16 rounded-full opacity-20 blur-lg animate-float ${
            isDarkMode ? "bg-yellow-500" : "bg-yellow-400"
          }`}
          style={{ animationDelay: "3s" }}
        />
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm lg:hidden z-30 transition-all duration-500"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <Sidebar
        user={user}
        unreadNotifications={user.unreadNotifications}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        isDarkMode={isDarkMode}
      />

      <div className="flex-1 flex flex-col min-h-screen">
        <Header
          user={user}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />

        <main className="flex-1 container mx-auto px-4 py-7 sm:px-6 lg:px-8 relative z-10">
          <section
            className={`p-6 sm:p-8 rounded-xl shadow-lg animate-fade-in-up transition-all duration-500 ${
              isDarkMode
                ? "bg-gray-800 border border-gray-700 shadow-gray-900/50"
                : "bg-white border border-gray-200 shadow-gray-200/50"
            }`}
          >
            <h3
              className={`text-2xl sm:text-3xl font-extrabold flex items-center mb-6 transition-colors duration-500 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              <IoBookmarks className="mr-3 text-3xl sm:text-4xl text-blue-500" />
              My Enrolled Courses
            </h3>

            <div
              className={`border rounded-lg overflow-hidden my-6 p-4 flex flex-col sm:flex-row items-center transition-all duration-500 hover:shadow-lg transform hover:scale-[1.02] ${
                isDarkMode
                  ? "border-gray-600 bg-gray-700 hover:bg-gray-650"
                  : "border-gray-200 bg-gray-50 hover:bg-gray-100"
              }`}
            >
              <img
                src={enrolledCourses[0].imageUrl}
                className="w-32 h-24 sm:w-40 sm:h-28 object-cover rounded-md flex-shrink-0 mr-4"
                alt={enrolledCourses[0].title}
              />
              <div className="flex-1 min-w-0 mt-4 sm:mt-0">
                <h4
                  className={`font-semibold text-lg mb-1 transition-colors duration-500 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {enrolledCourses[0].title}
                </h4>
                <p
                  className={`text-sm mb-2 transition-colors duration-500 ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Started
                </p>
                <div
                  className={`w-full rounded-full h-2 mt-2 transition-colors duration-500 ${
                    isDarkMode ? "bg-gray-600" : "bg-gray-200"
                  }`}
                >
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-1000"
                    style={{
                      width: `${enrolledCourses[0].progress || 0}%`,
                    }}
                  ></div>
                </div>
                <div
                  className={`flex justify-between items-center text-xs mt-1 transition-colors duration-500 ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  <span>Progress: {enrolledCourses[0].progress || 0}%</span>
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mr-1 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span>Ends on {enrolledCourses[0].endsOn}</span>
                  </div>
                </div>
                <div
                  className={`text-sm mt-2 font-medium transition-colors duration-500 ${
                    isDarkMode ? "text-gray-200" : "text-gray-700"
                  }`}
                >
                  {enrolledCourses[0].moduleProgress}
                </div>
                <button
                  onClick={() => handleContinueCourse(enrolledCourses[0].id)}
                  className="mt-4 px-6 py-2 rounded-full font-bold text-sm flex items-center justify-center transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg"
                >
                  Resume
                </button>
              </div>
            </div>

            <div
              className={`flex items-start justify-between p-4 rounded-lg my-6 border transition-all duration-500 ${
                isDarkMode
                  ? "bg-blue-900/30 border-blue-700"
                  : "bg-blue-50 border-blue-200"
              }`}
            >
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p
                  className={`text-sm transition-colors duration-500 ${
                    isDarkMode ? "text-blue-200" : "text-blue-800"
                  }`}
                >
                  <span className="font-semibold">
                    Pick up where you left off
                  </span>
                  <br />
                  Don't let the great things you learned fade away! Reset your
                  deadlines and complete your assignments every week.
                </p>
              </div>
              <button
                className={`ml-4 px-4 py-2 text-sm rounded-full border transition-all duration-300 hover:scale-105 ${
                  isDarkMode
                    ? "border-blue-500 text-blue-400 hover:bg-blue-500/10"
                    : "border-blue-500 text-blue-600 hover:bg-blue-50"
                }`}
              >
                Reset my deadlines
              </button>
            </div>

            {enrolledCourses.length === 0 ? (
              <p
                className={`text-center py-10 text-lg transition-colors duration-500 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                You are not currently enrolled in any courses. Explore "All
                Courses" to get started!
              </p>
            ) : (
              <>
                {/* Courses Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {currentCourses.slice(1).map((course, index) => (
                    <div
                      key={course.id}
                      className={`rounded-lg shadow-md border overflow-hidden group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 shadow-gray-900/50"
                          : "bg-gray-50 border-gray-200 shadow-gray-200/50"
                      }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <img
                        src={course.imageUrl}
                        alt={course.title}
                        className="w-full h-30 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="p-4">
                        <h4
                          className={`font-semibold mb-1 text-lg line-clamp-1 transition-colors duration-500 ${
                            isDarkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {course.title}
                        </h4>
                        <p
                          className={`text-sm mb-2 line-clamp-2 transition-colors duration-500 ${
                            isDarkMode ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          {course.description}
                        </p>
                        <div
                          className={`flex items-center text-sm mb-3 transition-colors duration-500 ${
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          <span>Instructor: {course.instructor}</span>
                        </div>
                        <div
                          className={`w-full rounded-full h-2 mt-2 transition-colors duration-500 ${
                            isDarkMode ? "bg-gray-600" : "bg-gray-200"
                          }`}
                        >
                          <div
                            className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-1000"
                            style={{
                              width: `${course.progress || 0}%`,
                            }}
                          ></div>
                        </div>
                        <p
                          className={`text-xs mt-1 text-right transition-colors duration-500 ${
                            isDarkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          {course.progress || 0}% Completed
                        </p>
                        <button
                          onClick={() => handleContinueCourse(course.id)}
                          className="mt-4 w-full px-4 py-2 rounded-full font-bold text-sm flex items-center justify-center transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg"
                        >
                          <IoPlayCircleOutline className="mr-2 text-lg" />
                          Continue Course
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-8 space-x-2">
                    <Pagination
                      page={page}
                      count={totalPages}
                      renderItem={(item) => (
                        <PaginationItem
                          component={Link}
                          to={{
                            pathname: location.pathname,
                            search: item.page === 1 ? "" : `?page=${item.page}`,
                          }}
                          {...item}
                        />
                      )}
                    />
                  </div>
                )}
              </>
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

export default MyCoursesPage;
