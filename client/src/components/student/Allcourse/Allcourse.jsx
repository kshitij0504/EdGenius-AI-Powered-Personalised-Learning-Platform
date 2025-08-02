import { useState } from "react";
import { IoBookmarks, IoPlayCircleOutline } from "react-icons/io5";
import Sidebar from "../Studentsidebar/Studentsidebar";
import { Link, useLocation } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";

const AllCoursesPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page") || "1", 10);

  const coursesPerPage = 6;

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
    <div className="flex min-h-screen bg-[var(--color-edgenius-background-light)]">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
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
        <main className="flex-1 container mx-auto px-1 py-7">
          <section className="bg-white p-6 sm:p-8 rounded-xl shadow-lg animate-fade-in-up">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[var(--color-edgenius-accent-dark)] mb-7 flex items-center">
              <IoBookmarks className="text-[var(--color-edgenius-accent-medium)] mr-3 text-3xl sm:text-4xl" />
              All Courses
            </h3>
            {enrolledCourses.length === 0 ? (
              <p className="text-center text-[var(--color-edgenius-text-secondary)] py-10 text-lg">
                You are not currently enrolled in any courses. Explore "All
                Courses" to get started!
              </p>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {currentCourses.map((course) => (
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
                        <h4 className="font-semibold text-[var(--color-edgenius-text-primary)] mb-1 text-lg line-clamp-1">
                          {course.title}
                        </h4>
                        <p className="text-sm text-[var(--color-edgenius-text-secondary)] mb-2 line-clamp-2">
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
                              backgroundColor: "var(--color-edgenius-primary)",
                            }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-600 mt-1 text-right">
                          {course.progress || 0}% Completed
                        </p>
                        <button
                          onClick={() => handleContinueCourse(course.id)}
                          className="mt-4 w-full bg-[var(--color-edgenius-accent-medium)] text-white px-4 py-2 rounded-full font-bold text-sm flex items-center justify-center hover:bg-[var(--color-edgenius-accent-dark)] transition-colors duration-300"
                        >
                          <IoPlayCircleOutline className="mr-2 text-lg" />{" "}
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

export default AllCoursesPage;
