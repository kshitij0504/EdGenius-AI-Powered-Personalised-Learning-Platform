import { useState, useEffect } from "react";
import { IoBookmarks, IoPlayCircleOutline } from "react-icons/io5";
import Sidebar from "../Studentsidebar/Studentsidebar";
import Header from "../Studentdash/Header";
import { Link, useLocation } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";

const AllCoursesPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page") || "1", 10);

  const coursesPerPage = 6;

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
      title: "Advanced React Patterns",
      description:
        "Dive deep into render props, higher-order components, and custom hooks for scalable applications.",
      imageUrl:
        "https://via.placeholder.com/400x220/91C8E4/4682A9?text=React+Patterns",
      instructor: "Dr. Elena Petrova",
      progress: 60,
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
      title: "Cloud Computing with AWS",
      description:
        "Understand scalable cloud infrastructure, deployment, and management using Amazon Web Services.",
      imageUrl:
        "https://via.placeholder.com/400x220/FFFBDE/749BC2?text=AWS+Cloud",
      instructor: "Mark O'Connell",
      progress: 0,
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

      <div className="flex-1 flex flex-col">
        <Header
          user={user}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />

        <main className="flex-1 container mx-auto px-4 py-7 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div
              className={`absolute top-1/2 right-1/4 w-20 h-20 rounded-full opacity-20 blur-xl animate-float ${
                isDarkMode ? "bg-green-500" : "bg-green-400"
              }`}
              style={{ animationDelay: "1s" }}
            />
          </div>

          <section
            className={`p-6 sm:p-8 rounded-xl shadow-lg animate-fade-in-up relative z-10 ${
              isDarkMode
                ? "bg-gray-800 border border-gray-700"
                : "bg-white border border-gray-200"
            }`}
          >
            <h3
              className={`text-2xl sm:text-3xl font-extrabold mb-7 flex items-center ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              <IoBookmarks
                className={`mr-3 text-3xl sm:text-4xl ${
                  isDarkMode ? "text-blue-400" : "text-blue-600"
                }`}
              />
              All Courses
            </h3>
            {enrolledCourses.length === 0 ? (
              <p
                className={`text-center py-10 text-lg ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                You are not currently enrolled in any courses. Explore "All
                Courses" to get started!
              </p>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                  {currentCourses.map((course, index) => (
                    <div
                      key={course.id}
                      className={`rounded-lg shadow-md border overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-slide-in-up ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 hover:bg-gray-650"
                          : "bg-gray-50 border-gray-200 hover:bg-white"
                      }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={course.imageUrl}
                          alt={course.title}
                          className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      <div className="p-4">
                        <h4
                          className={`font-semibold mb-1 text-lg line-clamp-2 ${
                            isDarkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {course.title}
                        </h4>
                        <p
                          className={`text-sm mb-3 line-clamp-2 ${
                            isDarkMode ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          {course.description}
                        </p>
                        <div
                          className={`flex items-center text-sm mb-3 ${
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          <span>Instructor: {course.instructor}</span>
                        </div>

                        <div
                          className={`w-full rounded-full h-2 mb-2 ${
                            isDarkMode ? "bg-gray-600" : "bg-gray-200"
                          }`}
                        >
                          <div
                            className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-500"
                            style={{ width: `${course.progress || 0}%` }}
                          ></div>
                        </div>
                        <p
                          className={`text-xs mb-4 text-right ${
                            isDarkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          {course.progress || 0}% Completed
                        </p>

                        <button
                          onClick={() => handleContinueCourse(course.id)}
                          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2 rounded-full font-bold text-sm flex items-center justify-center transition-all duration-300 transform hover:scale-105"
                        >
                          <IoPlayCircleOutline className="mr-2 text-lg" />
                          Continue Course
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="flex justify-center mt-8 space-x-2">
                    <Pagination
                      page={page}
                      count={totalPages}
                      sx={{
                        "& .MuiPaginationItem-root": {
                          color: isDarkMode ? "#E5E7EB" : "#374151",
                          "&.Mui-selected": {
                            backgroundColor: isDarkMode ? "#3B82F6" : "#3B82F6",
                            color: "white",
                          },
                          "&:hover": {
                            backgroundColor: isDarkMode ? "#374151" : "#F3F4F6",
                          },
                        },
                      }}
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

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animate-slide-in-up {
          animation: slide-in-up 0.6s ease-out forwards;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default AllCoursesPage;
