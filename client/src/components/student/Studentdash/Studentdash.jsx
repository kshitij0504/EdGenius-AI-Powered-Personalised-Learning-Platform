import { useState, useEffect } from "react";
import LearningMilestones from "./Milestone";
import Sidebar from "../Studentsidebar/Studentsidebar";
import {
  IoBookOutline as IoBook2,
  IoTimerOutline,
  IoMedalOutline,
  IoFlameOutline,
} from "react-icons/io5";
import Header from "./Header";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

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

  const milestones = [
    {
      id: 1,
      title: "React Hooks Certification",
      description: "Master modern React patterns",
      achieved: true,
      date: "2025-06-15",
    },
    {
      id: 2,
      title: "Python Fundamentals Badge",
      description: "Complete Python basics course",
      achieved: true,
      date: "2025-05-20",
    },
    {
      id: 3,
      title: "Completed 50 Lessons",
      description: "Finish 50 interactive lessons",
      achieved: false,
      target: 50,
      current: 42,
    },
    {
      id: 4,
      title: "Full-Stack Developer",
      description: "Complete the full-stack learning path",
      achieved: false,
      target: 100,
      current: 65,
    },
  ];

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

      <div className="flex-1 flex flex-col min-h-screen">
        <Header
          user={user}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />

        <main className="flex-1 relative overflow-hidden">
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

          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              {[
                {
                  label: "Active Courses",
                  value: "3",
                  icon: (
                    <IoBook2
                      className={`text-3xl ${isDarkMode ? "text-white" : ""}`}
                    />
                  ),
                  color: isDarkMode
                    ? "from-blue-600 to-blue-700"
                    : "from-blue-500 to-blue-600",
                },
                {
                  label: "Hours Learned",
                  value: "127",
                  icon: (
                    <IoTimerOutline
                      className={`text-3xl ${isDarkMode ? "text-white" : ""}`}
                    />
                  ),
                  color: isDarkMode
                    ? "from-purple-600 to-purple-700"
                    : "from-purple-500 to-purple-600",
                },
                {
                  label: "Certificates",
                  value: "5",
                  icon: (
                    <IoMedalOutline
                      className={`text-3xl ${isDarkMode ? "text-white" : ""}`}
                    />
                  ),
                  color: isDarkMode
                    ? "from-green-600 to-green-700"
                    : "from-green-500 to-green-600",
                },
                {
                  label: "Streak Days",
                  value: "23",
                  icon: (
                    <IoFlameOutline
                      className={`text-3xl ${isDarkMode ? "text-white" : ""}`}
                    />
                  ),
                  color: isDarkMode
                    ? "from-red-600 to-red-700"
                    : "from-red-500 to-red-600",
                },
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className={`relative p-4 sm:p-6 rounded-2xl border transition-all duration-500 hover:scale-105 hover:-translate-y-2 group cursor-pointer ${
                    isDarkMode
                      ? "bg-gray-800 border-gray-700 shadow-lg shadow-gray-900/50"
                      : "bg-white border-gray-200 shadow-md shadow-gray-200/50"
                  }`}
                >
                  <div
                    className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-r ${stat.color}`}
                  />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <div
                        className={`text-3xl sm:text-4xl p-2 sm:p-3 rounded-xl group-hover:scale-110 transition-transform duration-300 ${
                          isDarkMode ? "bg-gray-700" : "bg-gray-100"
                        }`}
                      >
                        {stat.icon}
                      </div>
                      <div className="text-right">
                        <p
                          className={`text-xs sm:text-sm font-semibold mb-1 ${
                            isDarkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          {stat.label}
                        </p>
                        <p
                          className={`text-2xl sm:text-3xl font-black ${
                            isDarkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {stat.value}
                        </p>
                      </div>
                    </div>

                    <div
                      className={`h-1.5 sm:h-2 rounded-full ${
                        isDarkMode ? "bg-gray-700" : "bg-gray-200"
                      }`}
                    >
                      <div
                        className={`h-1.5 sm:h-2 rounded-full transition-all duration-1000 group-hover:animate-pulse bg-gradient-to-r ${stat.color}`}
                        style={{ width: `${60 + index * 10}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div
              className="animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              <LearningMilestones
                milestones={milestones}
                xpPoints={user.xpPoints}
                level={user.level}
                isDarkMode={isDarkMode}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
