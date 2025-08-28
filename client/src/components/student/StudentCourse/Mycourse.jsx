// MyCoursesPage.js
import React, { useState, useEffect } from "react";
import { IoBookmarks, IoPlayCircleOutline } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import StudentLayout from "../StudentLayout";
import { useCourses } from "../../../context/MyCourseContextProvider";

const MyCoursesPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page") || "1", 10);
  
  const { 
    myCourses, 
    isLoading, 
    error, 
    fetchMyCourses,
    clearError 
  } = useCourses();
  
  const coursesPerPage = 4;

  useEffect(() => {
    // Fetch courses on component mount
    fetchMyCourses();
  }, [fetchMyCourses]);

  const handleContinueCourse = (course) => {
    navigate(`/my-course/${course.slug || course._id || course.id}`);
  };

  const handleRetry = () => {
    clearError();
    fetchMyCourses();
  };

  const indexOfLastCourse = page * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = myCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );

  const totalPages = Math.ceil(myCourses.length / coursesPerPage);

  if (isLoading && myCourses.length === 0) {
    return (
      <StudentLayout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
        </div>
      </StudentLayout>
    );
  }

  if (error && myCourses.length === 0) {
    return (
      <StudentLayout>
        <div className="text-center py-10">
          <p className="text-red-500 text-lg mb-4">{error}</p>
          <button 
            onClick={handleRetry}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
          >
            Try Again
          </button>
        </div>
      </StudentLayout>
    );
  }

  return (
    <StudentLayout>
      <MyCoursesContent
        enrolledCourses={myCourses}
        currentCourses={currentCourses}
        page={page}
        totalPages={totalPages}
        location={location}
        handleContinueCourse={handleContinueCourse}
        isLoading={isLoading}
      />
    </StudentLayout>
  );
};

const MyCoursesContent = ({
  enrolledCourses,
  currentCourses,
  page,
  totalPages,
  location,
  handleContinueCourse,
  isDarkMode,
  isLoading,
}) => {
  return (
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
        {isLoading && (
          <div className="ml-3 animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
        )}
      </h3>

      {/* Featured Course Card */}
      {enrolledCourses.length > 0 && (
        <div
          className={`border rounded-lg overflow-hidden my-6 p-4 flex flex-col sm:flex-row items-center transition-all duration-500 hover:shadow-lg transform hover:scale-[1.02] ${
            isDarkMode
              ? "border-gray-600 bg-gray-700 hover:bg-gray-650"
              : "border-gray-200 bg-gray-50 hover:bg-gray-100"
          }`}
        >
          <img
            src={enrolledCourses[0].thumbnail || enrolledCourses[0].imageUrl || "https://via.placeholder.com/400x220/749BC2/FFFBDE?text=Course"}
            className="w-32 h-24 sm:w-40 sm:h-28 object-cover rounded-md flex-shrink-0 mr-4"
            alt={enrolledCourses[0].title}
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/400x220/749BC2/FFFBDE?text=Course";
            }}
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
              {enrolledCourses[0].endsOn && (
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
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z"
                    />
                  </svg>
                  <span>Ends on {new Date(enrolledCourses[0].endsOn).toLocaleDateString()}</span>
                </div>
              )}
            </div>
            {enrolledCourses[0].moduleProgress && (
              <div
                className={`text-sm mt-2 font-medium transition-colors duration-500 ${
                  isDarkMode ? "text-gray-200" : "text-gray-700"
                }`}
              >
                {enrolledCourses[0].moduleProgress}
              </div>
            )}
            <button
              onClick={() => handleContinueCourse(enrolledCourses[0])}
              disabled={isLoading}
              className="mt-4 px-6 py-2 rounded-full font-bold text-sm flex items-center justify-center transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Resume
            </button>
          </div>
        </div>
      )}

      {/* Deadline Reset Notice */}
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
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z"
            />
          </svg>
          <p
            className={`text-sm transition-colors duration-500 ${
              isDarkMode ? "text-blue-200" : "text-blue-800"
            }`}
          >
            <span className="font-semibold">Pick up where you left off</span>
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

      {/* Courses Grid */}
      {enrolledCourses.length === 0 ? (
        <p
          className={`text-center py-10 text-lg transition-colors duration-500 ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          You are not currently enrolled in any courses. Explore "All Courses"
          to get started!
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentCourses.slice(1).map((course, index) => (
              <div
                key={course.id || course._id}
                className={`rounded-lg shadow-md border overflow-hidden group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 ${
                  isDarkMode
                    ? "bg-gray-700 border-gray-600 shadow-gray-900/50"
                    : "bg-gray-50 border-gray-200 shadow-gray-200/50"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <img
                  src={course.thumbnail || course.imageUrl || "https://via.placeholder.com/400x220/749BC2/FFFBDE?text=Course"}
                  alt={course.title}
                  className="w-full h-30 object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/400x220/749BC2/FFFBDE?text=Course";
                  }}
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
                    <span>Instructor: {course.instructor || course.instructorName || 'N/A'}</span>
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
                    onClick={() => handleContinueCourse(course)}
                    disabled={isLoading}
                    className="mt-4 w-full px-4 py-2 rounded-full font-bold text-sm flex items-center justify-center transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
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
  );
};

export default MyCoursesPage;
