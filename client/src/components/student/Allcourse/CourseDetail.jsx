// CourseDetailsPage.jsx
import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  IoArrowBack,
  IoTimeOutline,
  IoBookOutline,
  IoPeopleOutline,
  IoStarOutline,
  IoCheckmarkCircleOutline,
  IoLockClosedOutline,
  IoChevronDown,
  IoChevronUp,
} from "react-icons/io5";
import { FaPlay, FaLock } from "react-icons/fa";
import { useCourses } from "../../../context/CourseContextProvider";
import StudentLayout from "../StudentLayout";
import { AuthContext } from "../../../context/AuthContext";
import { useSelector } from "react-redux";

const CourseDetailsPage = () => {
  return (
    <StudentLayout>
      <CourseDetailsContent />
    </StudentLayout>
  );
};

const CourseDetailsContent = ({ isDarkMode }) => {
  const user = useSelector(state => state.auth.user);
  console.log("Current user in CourseDetailsContent:", user);

  const { slug } = useParams();
  const navigate = useNavigate();
  const {
    currentCourse,
    isCourseLoading,
    courseError,
    fetchCourseBySlug,
    enrollCourse,
    isEnrolling,
  } = useCourses();
  const [selectedModule, setSelectedModule] = useState(null);
  const [expandedModules, setExpandedModules] = useState({});

  useEffect(() => {
    if (slug) {
      fetchCourseBySlug(slug);
    }
  }, [slug, fetchCourseBySlug]);

  useEffect(() => {
    if (currentCourse?.modules?.length > 0) {
      setSelectedModule(currentCourse.modules[0]);
      // Auto-expand first module
      setExpandedModules({ [currentCourse.modules[0].id]: true });
    }
  }, [currentCourse]);

  const toggleModule = (moduleId) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }));
  };

  const handleEnrollment = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      const enrollmentResult = await enrollCourse(user.id, currentCourse.id);

      if (enrollmentResult.isFree) {
        navigate(`/courses/${slug}/learn`);
      } else {
        // For paid courses, redirect to checkout
        navigate("/checkout", {
          state: {
            courseData: {
              id: currentCourse.id,
              title: currentCourse.title,
              description: currentCourse.description,
              thumbnail: currentCourse.thumbnail,
              category: currentCourse.category,
              slug: slug,
            },
            enrollmentData: {
              razorpayOrderId: enrollmentResult.razorpayOrderId,
              amount: enrollmentResult.amount,
              courseTitle: enrollmentResult.courseTitle,
            },
          },
        });
      }
    } catch (error) {
      console.error("Enrollment error:", error);
    }
  };

  const getTotalLessons = () => {
    return (
      currentCourse?.modules?.reduce(
        (total, module) => total + (module.lessons?.length || 0),
        0
      ) || 0
    );
  };

  const getTotalDuration = () => {
    // Calculate based on actual lessons count
    return Math.floor(getTotalLessons() * 15); // Assuming 15 min per lesson
  };

  const getModulesCount = () => {
    return currentCourse?.modules?.length || 0;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Generate learning objectives from course description
  const getLearningObjectives = () => {
    if (!currentCourse?.description) return [];

    // Extract key learning points from description
    const description = currentCourse.description.toLowerCase();
    const objectives = [];

    if (description.includes("react")) {
      objectives.push(
        `Master ${
          currentCourse.title.includes("React") ? "React" : "the core framework"
        } fundamentals and advanced concepts`
      );
    }
    if (description.includes("projects")) {
      objectives.push("Build real-world projects and applications");
    }
    if (description.includes("hooks")) {
      objectives.push("Understand React Hooks and modern patterns");
    }
    if (description.includes("redux")) {
      objectives.push("Learn state management with Redux");
    }

    // Add generic objectives based on category
    if (currentCourse.category === "Development") {
      objectives.push("Implement responsive and accessible UIs");
      objectives.push("Deploy applications to production");
      objectives.push("Follow industry best practices");
    } else if (currentCourse.category === "Personal Development") {
      objectives.push("Develop practical skills for real-world application");
      objectives.push("Build confidence in your abilities");
    } else if (currentCourse.category === "Business") {
      objectives.push("Apply strategies to real business scenarios");
      objectives.push("Understand industry standards and practices");
    }

    // Ensure we have at least 4 objectives
    while (objectives.length < 4) {
      objectives.push(
        `Gain expertise in ${currentCourse.category.toLowerCase()}`
      );
    }

    return objectives.slice(0, 6); // Limit to 6 objectives
  };

  if (isDarkMode === undefined) {
    return (
      <div className="container mx-auto px-4 py-7">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-500">Loading...</div>
        </div>
      </div>
    );
  }

  if (isCourseLoading) {
    return (
      <div className="min-h-screen relative">
        {/* Background Animation Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className={`absolute top-20 right-20 w-32 h-32 rounded-full opacity-20 blur-3xl animate-float ${
              isDarkMode ? "bg-blue-600" : "bg-blue-400"
            }`}
          />
          <div
            className={`absolute bottom-20 left-20 w-24 h-24 rounded-full opacity-15 blur-2xl animate-float ${
              isDarkMode ? "bg-purple-600" : "bg-purple-400"
            }`}
          />
          <div
            className={`absolute bottom-40 right-40 w-28 h-28 rounded-full opacity-10 blur-xl animate-float ${
              isDarkMode ? "bg-green-500" : "bg-green-400"
            }`}
          />
        </div>

        <div className="container mx-auto px-4 py-8 relative z-10">
          {/* Loading Skeleton */}
          <div
            className={`rounded-3xl shadow-2xl overflow-hidden ${
              isDarkMode ? "bg-gray-900/80 backdrop-blur-md" : "bg-white"
            }`}
          >
            <div className="animate-pulse">
              <div
                className={`h-80 ${isDarkMode ? "bg-gray-800" : "bg-gray-200"}`}
              />
              <div className="p-8">
                <div
                  className={`h-10 rounded mb-4 ${
                    isDarkMode ? "bg-gray-800" : "bg-gray-200"
                  }`}
                />
                <div
                  className={`h-5 rounded mb-6 w-3/4 ${
                    isDarkMode ? "bg-gray-800" : "bg-gray-200"
                  }`}
                />
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-20 rounded-lg ${
                          isDarkMode ? "bg-gray-800" : "bg-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <div
                    className={`h-96 rounded-lg ${
                      isDarkMode ? "bg-gray-800" : "bg-gray-200"
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (courseError || !currentCourse) {
    return (
      <div className="min-h-screen relative">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className={`absolute top-20 right-20 w-32 h-32 rounded-full opacity-20 blur-3xl animate-float ${
              isDarkMode ? "bg-red-600" : "bg-red-400"
            }`}
          />
        </div>

        <div className="container mx-auto px-4 py-8 relative z-10">
          <div
            className={`rounded-3xl shadow-2xl p-8 text-center ${
              isDarkMode
                ? "bg-gray-900/80 backdrop-blur-md text-white"
                : "bg-white text-gray-900"
            }`}
          >
            <h1 className="text-3xl font-bold mb-4">Course Not Found</h1>
            <p
              className={`mb-6 ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {courseError || "The requested course could not be found."}
            </p>
            <button
              onClick={() => navigate("/allcourses")}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center mx-auto shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <IoArrowBack className="mr-2" />
              Back to Courses
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      {/* Enhanced Background Animation Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className={`absolute top-20 right-20 w-40 h-40 rounded-full opacity-25 blur-3xl animate-float ${
            isDarkMode ? "bg-blue-600/50" : "bg-blue-400/50"
          }`}
          style={{ animationDelay: "0s", animationDuration: "8s" }}
        />
        <div
          className={`absolute top-60 left-10 w-32 h-32 rounded-full opacity-20 blur-2xl animate-float ${
            isDarkMode ? "bg-purple-600/50" : "bg-purple-400/50"
          }`}
          style={{ animationDelay: "2s", animationDuration: "10s" }}
        />
        <div
          className={`absolute bottom-20 right-1/3 w-28 h-28 rounded-full opacity-25 blur-xl animate-float ${
            isDarkMode ? "bg-green-500/50" : "bg-green-400/50"
          }`}
          style={{ animationDelay: "1s", animationDuration: "9s" }}
        />
        <div
          className={`absolute bottom-40 left-1/4 w-24 h-24 rounded-full opacity-15 blur-2xl animate-float ${
            isDarkMode ? "bg-pink-500/50" : "bg-pink-400/50"
          }`}
          style={{ animationDelay: "3s", animationDuration: "11s" }}
        />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10 max-w-7xl">
        {/* Back Button - More visible and modern */}
        <button
          onClick={() => navigate("/allcourses")}
          className={`group flex items-center mb-6 px-5 py-3 rounded-xl font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ${
            isDarkMode
              ? "bg-gray-800/50 backdrop-blur-md text-blue-300 hover:bg-gray-700/50 hover:text-blue-200"
              : "bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700"
          }`}
        >
          <IoArrowBack className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Courses
        </button>

        <div
          className={`rounded-3xl shadow-2xl overflow-hidden mb-8 ${
            isDarkMode ? "bg-gray-900/40 backdrop-blur-md" : "bg-white"
          }`}
        >
          <div className="relative">
            <img
              src={currentCourse.thumbnail}
              alt={currentCourse.title}
              className="w-full h-72 md:h-96 object-cover"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/1200x500/91C8E4/4682A9?text=Course+Thumbnail";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <div className="flex items-center mb-3">
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-md">
                  {currentCourse.category}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3 tracking-tight">
                {currentCourse.title}
              </h1>
              <p className="text-gray-100 text-lg max-w-2xl leading-relaxed">
                {currentCourse.description}
              </p>
            </div>
            {/* Preview Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
              <button className="bg-white/20 backdrop-blur-md p-6 rounded-full text-white hover:scale-110 transition-transform">
                <FaPlay className="text-4xl" />
              </button>
            </div>
          </div>

          <div className="p-6 md:p-8">
            {/* Course Stats - Colorful cards with hover effects */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                {
                  icon: IoBookOutline,
                  value: getTotalLessons(),
                  label: "Lessons",
                },
                {
                  icon: IoTimeOutline,
                  value: `${getTotalDuration()}m`,
                  label: "Duration",
                },
                {
                  icon: IoPeopleOutline,
                  value: getModulesCount(),
                  label: "Modules",
                },
                { icon: IoStarOutline, value: "New", label: "Course" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className={`group text-center p-5 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                    isDarkMode
                      ? `bg-gray-800/50 backdrop-blur-sm hover:bg-gray-700/50 ${
                          index % 2 === 0
                            ? "border-blue-500/20"
                            : "border-purple-500/20"
                        } border`
                      : "bg-gray-50 hover:bg-white"
                  }`}
                >
                  <stat.icon
                    className={`text-3xl mx-auto mb-3 transition-colors duration-300 ${
                      isDarkMode
                        ? `text-${
                            index % 2 === 0 ? "blue" : "purple"
                          }-400 group-hover:text-${
                            index % 2 === 0 ? "blue" : "purple"
                          }-300`
                        : "text-blue-600 group-hover:text-blue-500"
                    }`}
                  />
                  <div
                    className={`font-bold text-xl ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {stat.value}
                  </div>
                  <div
                    className={`text-sm ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Instructor - With hover zoom */}
            <div className="flex items-center mb-8 group">
              <img
                src={currentCourse.instructor?.profilePhoto}
                alt={currentCourse.instructor?.name}
                className="w-20 h-20 rounded-full mr-4 transition-transform duration-300 group-hover:scale-110"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/80x80";
                }}
              />
              <div>
                <h3
                  className={`font-semibold text-xl ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {currentCourse.instructor?.name}
                </h3>
                <p
                  className={`${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Course Instructor
                </p>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Created: {formatDate(currentCourse.createdAt)}
                </p>
              </div>
            </div>

            {/* Price and Enroll - More vibrant button */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-8 p-6 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-700 shadow-lg">
              <div className="mb-4 md:mb-0">
                <div className="text-white text-4xl font-extrabold">
                  ₹{currentCourse.price.toLocaleString()}
                </div>
                <div className="text-blue-100 text-sm">
                  One-time payment • Lifetime access
                </div>
              </div>
              <button
                onClick={handleEnrollment}
                disabled={isEnrolling}
                className={`py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 w-full md:w-auto px-8 ${
                  isEnrolling
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-white text-purple-700 hover:bg-gray-100 shadow-md hover:shadow-lg"
                }`}
              >
                {isEnrolling ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-700 mr-2"></div>
                    Processing...
                  </div>
                ) : currentCourse.price === 0 ? (
                  "Enroll for Free"
                ) : (
                  "Enroll Now"
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Course Content - Grid layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Course Modules - Modern accordion with smooth transitions */}
          <div className="lg:col-span-2">
            <div
              className={`rounded-3xl shadow-2xl p-6 ${
                isDarkMode ? "bg-gray-900/40 backdrop-blur-md" : "bg-white"
              }`}
            >
              <h2
                className={`text-3xl font-bold mb-6 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Course Content ({getModulesCount()} modules, {getTotalLessons()}{" "}
                lessons)
              </h2>

              <div className="space-y-3">
                {currentCourse.modules?.map((module, moduleIndex) => (
                  <div
                    key={module.id}
                    className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                      isDarkMode
                        ? "border-gray-700 bg-gray-800/50"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    <button
                      onClick={() => toggleModule(module.id)}
                      className={`w-full p-5 text-left flex items-center justify-between hover:bg-opacity-70 transition-all duration-300 ${
                        isDarkMode ? "hover:bg-gray-700/70" : "hover:bg-gray-50"
                      }`}
                    >
                      <div>
                        <h3
                          className={`font-semibold text-lg mb-1 ${
                            isDarkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          Module {module.order || moduleIndex + 1}:{" "}
                          {module.title}
                        </h3>
                        <p
                          className={`text-sm ${
                            isDarkMode ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          {module.lessons?.length || 0} lessons • ~
                          {Math.floor((module.lessons?.length || 0) * 15)} min
                        </p>
                      </div>
                      {expandedModules[module.id] ? (
                        <IoChevronUp
                          className={`w-6 h-6 ${
                            isDarkMode ? "text-gray-300" : "text-gray-500"
                          }`}
                        />
                      ) : (
                        <IoChevronDown
                          className={`w-6 h-6 ${
                            isDarkMode ? "text-gray-300" : "text-gray-500"
                          }`}
                        />
                      )}
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        expandedModules[module.id]
                          ? "max-h-[2000px]"
                          : "max-h-0"
                      }`}
                    >
                      <div
                        className={`border-t ${
                          isDarkMode
                            ? "border-gray-700 bg-gray-800/30"
                            : "border-gray-200 bg-gray-50"
                        }`}
                      >
                        {module.lessons?.map((lesson, lessonIndex) => (
                          <div
                            key={lesson.id}
                            className={`p-4 border-b last:border-b-0 flex items-center hover:bg-opacity-50 transition-colors duration-300 group ${
                              isDarkMode
                                ? "border-gray-700 hover:bg-gray-700/50"
                                : "border-gray-200 hover:bg-gray-100"
                            }`}
                          >
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 transition-colors duration-300 ${
                                isDarkMode
                                  ? "bg-gray-700 group-hover:bg-blue-600/50"
                                  : "bg-gray-200 group-hover:bg-blue-100"
                              }`}
                            >
                              <FaPlay
                                className={`text-sm transition-colors duration-300 ${
                                  isDarkMode
                                    ? "text-gray-300 group-hover:text-white"
                                    : "text-gray-500 group-hover:text-blue-600"
                                }`}
                              />
                            </div>
                            <div className="flex-1">
                              <h4
                                className={`font-medium text-base ${
                                  isDarkMode ? "text-white" : "text-gray-900"
                                }`}
                              >
                                {lesson.order || lessonIndex + 1}.{" "}
                                {lesson.title}
                              </h4>
                              <p
                                className={`text-sm ${
                                  isDarkMode ? "text-gray-300" : "text-gray-600"
                                }`}
                              >
                                {lesson.videoUrl ? "Video" : "Content"} • ~15
                                min
                              </p>
                            </div>
                            <FaLock
                              className={`text-lg transition-colors duration-300 ${
                                isDarkMode
                                  ? "text-gray-500 group-hover:text-gray-300"
                                  : "text-gray-400 group-hover:text-gray-500"
                              }`}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Course Sidebar - Sticky with colorful accents */}
          <div className="lg:col-span-1">
            <div
              className={`rounded-3xl shadow-2xl p-6 sticky top-8 ${
                isDarkMode ? "bg-gray-900/40 backdrop-blur-md" : "bg-white"
              }`}
            >
              <h3
                className={`text-2xl font-bold mb-6 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                What You'll Learn
              </h3>

              <ul className="space-y-4">
                {getLearningObjectives().map((objective, index) => (
                  <li key={index} className="flex items-start group">
                    <IoCheckmarkCircleOutline
                      className={`text-2xl mr-3 mt-0.5 flex-shrink-0 transition-colors duration-300 ${
                        isDarkMode
                          ? `text-green-400 group-hover:text-green-300`
                          : "text-green-500 group-hover:text-green-600"
                      }`}
                    />
                    <span
                      className={`text-base leading-relaxed ${
                        isDarkMode ? "text-gray-200" : "text-gray-700"
                      }`}
                    >
                      {objective}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Course Details - Table-like with colors */}
              <div
                className={`mt-8 pt-6 border-t ${
                  isDarkMode ? "border-gray-700" : "border-gray-200"
                }`}
              >
                <h4
                  className={`font-semibold text-lg mb-4 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Course Details
                </h4>
                <div className="space-y-3 text-base">
                  <div
                    className={`flex justify-between ${
                      isDarkMode ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    <span>Category:</span>
                    <span
                      className={`font-medium ${
                        isDarkMode ? "text-blue-300" : "text-blue-600"
                      }`}
                    >
                      {currentCourse.category}
                    </span>
                  </div>
                  <div
                    className={`flex justify-between ${
                      isDarkMode ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    <span>Modules:</span>
                    <span
                      className={`font-medium ${
                        isDarkMode ? "text-purple-300" : "text-purple-600"
                      }`}
                    >
                      {getModulesCount()}
                    </span>
                  </div>
                  <div
                    className={`flex justify-between ${
                      isDarkMode ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    <span>Lessons:</span>
                    <span
                      className={`font-medium ${
                        isDarkMode ? "text-green-300" : "text-green-600"
                      }`}
                    >
                      {getTotalLessons()}
                    </span>
                  </div>
                  <div
                    className={`flex justify-between ${
                      isDarkMode ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    <span>Updated:</span>
                    <span className="font-medium">
                      {formatDate(currentCourse.updatedAt)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage;
