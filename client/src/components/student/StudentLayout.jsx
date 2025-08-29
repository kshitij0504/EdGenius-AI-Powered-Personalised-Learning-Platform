import React, { useState, useEffect } from "react";
import Sidebar from "./Studentsidebar/Studentsidebar";
import Header from "./Studentdash/Header";

const StudentLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Theme management
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
    lessonProgress: 75,
    upcomingQuiz: "React Fundamentals Quiz",
    unreadNotifications: 2,
    xpPoints: 1250,
    level: 7,
    streak: 15,
    totalLessons: 48,
    completedLessons: 32,
    weeklyGoal: 5,
    completedThisWeek: 7,
  };

  return (
    <div
      className={`flex h-screen overflow-hidden transition-all duration-500 ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      {/* Background elements */}
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

      <div className="fixed top-0 left-0 h-full w-64 z-40">
        <Sidebar
          user={user}
          unreadNotifications={user.unreadNotifications}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          isDarkMode={isDarkMode}
        />
      </div>

      <div className="flex-1 ml-64 h-full overflow-y-auto">
        <Header
          user={user}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />

        <main className="flex-1 container mx-auto px-4 py-7 sm:px-6 lg:px-8 relative z-10">
          {/* Pass isDarkMode and other props to children */}
          {React.cloneElement(children, { isDarkMode, user })}
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;
