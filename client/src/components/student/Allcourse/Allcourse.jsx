import { useState, useEffect } from "react";
import { IoBookmarks, IoPlayCircleOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import StudentLayout from "../StudentLayout";
import { useCourses } from "../../../context/CourseContextProvider";

const AllCoursesPage = () => {
  return (
    <StudentLayout>
      <AllCoursesContent />
    </StudentLayout>
  );
};

const AllCoursesContent = ({ isDarkMode, user }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page") || "1", 10);

  // Use your CourseContext
  const { courses, isLoading, error, fetchCourses } = useCourses();

  const coursesPerPage = 6;

  // Fetch courses when component mounts
  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const handleContinueCourse = (courseSlug) => {
    navigate(`/courses/${courseSlug}`);
  };

  const coursesList = Array.isArray(courses) ? courses : [];

  const indexOfLastCourse = page * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = coursesList.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );

  const totalPages = Math.ceil(coursesList.length / coursesPerPage);

  // Add safety check for required props
  if (isDarkMode === undefined) {
    return (
      <div className="container mx-auto px-4 py-7">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-500">Loading...</div>
        </div>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <main className="flex-1 overflow-y-auto relative">
        <div className="container mx-auto px-4 py-7 sm:px-6 lg:px-8 relative z-10">
          <section
            className={`p-6 sm:p-8 rounded-xl shadow-lg ${
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

            {/* Loading skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className={`rounded-lg shadow-md border overflow-hidden animate-pulse ${
                    isDarkMode
                      ? "bg-gray-700 border-gray-600"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <div
                    className={`w-full h-40 ${
                      isDarkMode ? "bg-gray-600" : "bg-gray-300"
                    }`}
                  />
                  <div className="p-4">
                    <div
                      className={`h-4 rounded mb-2 ${
                        isDarkMode ? "bg-gray-600" : "bg-gray-300"
                      }`}
                    />
                    <div
                      className={`h-3 rounded mb-3 ${
                        isDarkMode ? "bg-gray-600" : "bg-gray-300"
                      }`}
                    />
                    <div
                      className={`h-2 rounded mb-4 ${
                        isDarkMode ? "bg-gray-600" : "bg-gray-300"
                      }`}
                    />
                    <div
                      className={`h-8 rounded ${
                        isDarkMode ? "bg-gray-600" : "bg-gray-300"
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    );
  }

  // Error state
  if (error) {
    return (
      <main className="flex-1 overflow-y-auto relative">
        <div className="container mx-auto px-4 py-7 sm:px-6 lg:px-8 relative z-10">
          <section
            className={`p-6 sm:p-8 rounded-xl shadow-lg ${
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

            <div className="text-center py-10">
              <div
                className={`text-lg mb-4 ${
                  isDarkMode ? "text-red-400" : "text-red-600"
                }`}
              >
                Error loading courses
              </div>
              <p
                className={`mb-4 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {error}
              </p>
              <button
                onClick={fetchCourses}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300"
              >
                Try Again
              </button>
            </div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 overflow-y-auto relative">
      {/* Background Animation Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className={`absolute top-1/2 right-1/4 w-20 h-20 rounded-full opacity-20 blur-xl animate-float ${
            isDarkMode ? "bg-green-500" : "bg-green-400"
          }`}
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-4 py-7 sm:px-6 lg:px-8 relative z-10">
        <section
          className={`p-6 sm:p-8 rounded-xl shadow-lg animate-fade-in-up ${
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
            All Courses ({coursesList.length})
          </h3>

          {coursesList.length === 0 ? (
            <p
              className={`text-center py-10 text-lg ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              No courses available at the moment. Check back later!
            </p>
          ) : (
            <>
              {/* Course Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {currentCourses.map((course, index) => (
                  <div
                    key={course.id}
                    className={`rounded-lg shadow-md border overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-slide-in-up ${
                      isDarkMode
                        ? "bg-gray-700 border-gray-600 hover:bg-gray-650"
                        : "bg-gray-50 border-gray-200 hover:bg-white"
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={
                          course.thumbnail ||
                          "https://via.placeholder.com/400x220/91C8E4/4682A9?text=Course"
                        }
                        alt={course.title}
                        className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/400x220/91C8E4/4682A9?text=Course";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Price badge */}
                      <div className="absolute top-2 right-2">
                        <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                          ₹{course.price}
                        </span>
                      </div>
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
                        <div className="flex items-center">
                          <img
                            src={
                              course.instructor?.profilePhoto ||
                              "https://via.placeholder.com/24x24"
                            }
                            alt={course.instructor?.name}
                            className="w-5 h-5 rounded-full mr-2"
                            onError={(e) => {
                              e.target.src =
                                "https://via.placeholder.com/24x24";
                            }}
                          />
                          <span>
                            Instructor: {course.instructor?.name || "Unknown"}
                          </span>
                        </div>
                      </div>

                      <div
                        className={`flex items-center text-xs mb-3 ${
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          {course.category}
                        </span>
                      </div>

                      {/* Course button */}
                      <button
                        onClick={() => handleContinueCourse(course.slug)}
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2 rounded-full font-bold text-sm flex items-center justify-center transition-all duration-300 transform hover:scale-[1.02]"
                      >
                        <IoPlayCircleOutline className="mr-2 text-lg" />
                        View Course
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-8">
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
      </div>
    </main>
  );
};

export default AllCoursesPage;
