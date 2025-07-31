import React, { useState } from "react";
import { IoBookmarks, IoPlayCircleOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Sidebar from "../Studentsidebar/Studentsidebar";

const MyCoursesPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page") || "1", 10);

  const coursesPerPage = 4;

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
      imageUrl: "http://googleusercontent.com/file_content/0", // Using the uploaded image for the first course
      instructor: "Mark O'Connell",
      progress: 8, // Directly from your image
      endsOn: "Feb 26, 2026", // Added based on your image
      moduleProgress: "Module 4 of 4", // Added based on your image
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
      className="flex min-h-screen"
      style={{
        backgroundColor: "var(--color-edgenius-background-light, #F8F9FA)",
      }}
    >
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <Sidebar
        user={user}
        unreadNotifications={user.unreadNotifications}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div className="flex-1 flex flex-col">
        {/* Mobile menu button */}
        <button
          className="lg:hidden p-4 text-gray-700"
          onClick={() => setIsSidebarOpen(true)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>

        <main className="flex-1 container mx-auto px-4 py-7 sm:px-6 lg:px-8">
          <section className="bg-white p-6 sm:p-8 rounded-xl shadow-lg animate-fade-in-up">
            <h3
              className="text-2xl sm:text-3xl font-extrabold flex items-center"
              style={{ color: "var(--color-edgenius-accent-dark, #333)" }}
            >
              <IoBookmarks
                className="mr-3 text-3xl sm:text-4xl"
                style={{
                  color: "var(--color-edgenius-accent-medium, #6C63FF)",
                }}
              />
              My Enrolled Courses
            </h3>

            {/* Course Card from Image */}
            <div className="border border-gray-200 rounded-lg overflow-hidden my-6 p-4 flex flex-col sm:flex-row items-center">
              <img
                src={enrolledCourses[0].imageUrl} // Use the image from the first course
                alt={enrolledCourses[0].title}
                className="w-32 h-24 sm:w-40 sm:h-28 object-cover rounded-md flex-shrink-0 mr-4"
              />
              <div className="flex-1 min-w-0 mt-4 sm:mt-0">
                <h4 className="font-semibold text-lg text-[var(--color-edgenius-text-primary)] mb-1">
                  {enrolledCourses[0].title}
                </h4>
                <p className="text-sm text-[var(--color-edgenius-text-secondary)] mb-2">
                  Started
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${enrolledCourses[0].progress || 0}%`,
                      backgroundColor: "var(--color-edgenius-primary, #6C63FF)",
                    }}
                  ></div>
                </div>
                <div className="flex justify-between items-center text-xs text-gray-600 mt-1">
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
                <div className="text-sm text-gray-700 mt-2 font-medium">
                  {enrolledCourses[0].moduleProgress}
                </div>
                <button
                  onClick={() => handleContinueCourse(enrolledCourses[0].id)}
                  className="mt-4 px-6 py-2 rounded-full font-bold text-sm flex items-center justify-center transition-colors duration-300"
                  style={{
                    backgroundColor:
                      "var(--color-edgenius-accent-medium, #6C63FF)",
                    color: "white",
                    hover: {
                      backgroundColor:
                        "var(--color-edgenius-accent-dark, #574BCC)",
                    },
                  }}
                >
                  Resume
                </button>
              </div>
            </div>

            {/* "Pick up where you left off" section */}
            <div className="flex items-start justify-between bg-blue-50 p-4 rounded-lg my-6 border border-blue-200">
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
                <p className="text-sm text-blue-800">
                  <span className="font-semibold">
                    Pick up where you left off
                  </span>
                  <br />
                  Don't let the great things you learned fade away! Reset your
                  deadlines and complete your assignments every week.
                </p>
              </div>
              <button
                className="ml-4 px-4 py-2 text-sm rounded-full border"
                style={{
                  borderColor: "var(--color-edgenius-primary, #6C63FF)",
                  color: "var(--color-edgenius-primary, #6C63FF)",
                  hover: {
                    backgroundColor:
                      "var(--color-edgenius-primary-light, #E0E7FF)",
                  },
                }}
              >
                Reset my deadlines
              </button>
            </div>

            {enrolledCourses.length === 0 ? (
              <p
                className="text-center py-10 text-lg"
                style={{
                  color: "var(--color-edgenius-text-secondary, #6B7280)",
                }}
              >
                You are not currently enrolled in any courses. Explore "All
                Courses" to get started!
              </p>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {currentCourses.slice(1).map(
                    (
                      course // Slicing to exclude the first course which is displayed separately
                    ) => (
                      <div
                        key={course.id}
                        className="bg-gray-50 rounded-lg shadow-md border border-gray-200 overflow-hidden group hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1"
                      >
                        <img
                          src={course.imageUrl}
                          alt={course.title}
                          className="w-full h-30 object-cover"
                        />
                        <div className="p-4">
                          <h4
                            className="font-semibold mb-1 text-lg line-clamp-1"
                            style={{
                              color:
                                "var(--color-edgenius-text-primary, #1F2937)",
                            }}
                          >
                            {course.title}
                          </h4>
                          <p
                            className="text-sm mb-2 line-clamp-2"
                            style={{
                              color:
                                "var(--color-edgenius-text-secondary, #6B7280)",
                            }}
                          >
                            {course.description}
                          </p>
                          <div className="flex items-center text-sm text-gray-500 mb-3">
                            <span>Instructor: {course.instructor}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                            <div
                              className="h-2 rounded-full"
                              style={{
                                width: `${course.progress || 0}%`,
                                backgroundColor:
                                  "var(--color-edgenius-primary, #6C63FF)",
                              }}
                            ></div>
                          </div>
                          <p className="text-xs text-gray-600 mt-1 text-right">
                            {course.progress || 0}% Completed
                          </p>
                          <button
                            onClick={() => handleContinueCourse(course.id)}
                            className="mt-4 w-full px-4 py-2 rounded-full font-bold text-sm flex items-center justify-center transition-colors duration-300"
                            style={{
                              backgroundColor:
                                "var(--color-edgenius-accent-medium, #6C63FF)",
                              color: "white",
                              hover: {
                                backgroundColor:
                                  "var(--color-edgenius-accent-dark, #574BCC)",
                              },
                            }}
                          >
                            <IoPlayCircleOutline className="mr-2 text-lg" />{" "}
                            Continue Course
                          </button>
                        </div>
                      </div>
                    )
                  )}
                </div>

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
