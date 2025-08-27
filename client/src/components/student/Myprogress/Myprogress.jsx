import { useState, useEffect } from "react";
import {
  BookOpen,
  Trophy,
  Zap,
  CheckCircle,
  Menu,
  BarChart3,
  Flame,
} from "lucide-react";
import Sidebar from "../Studentsidebar/Studentsidebar";
import Header from "../Studentdash/Header";

const MyProgress = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState("week");
  const [animatedStats, setAnimatedStats] = useState({
    totalLessons: 0,
    completedLessons: 0,
    xpPoints: 0,
    streak: 0,
  });

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
    streak: 15,
    totalLessons: 48,
    completedLessons: 32,
    weeklyGoal: 5,
    completedThisWeek: 7,
  };

  const courses = [
    {
      id: 1,
      title: "React Fundamentals",
      progress: 85,
      totalLessons: 12,
      completedLessons: 10,
      timeSpent: "24h 30m",
      status: "In Progress",
    },
    {
      id: 2,
      title: "JavaScript Advanced",
      progress: 100,
      totalLessons: 15,
      completedLessons: 15,
      timeSpent: "32h 15m",
      status: "Completed",
    },
    {
      id: 3,
      title: "Node.js Backend",
      progress: 45,
      totalLessons: 18,
      completedLessons: 8,
      timeSpent: "18h 45m",
      status: "In Progress",
    },
    {
      id: 4,
      title: "Database Design",
      progress: 25,
      totalLessons: 10,
      completedLessons: 3,
      timeSpent: "8h 20m",
      status: "Started",
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedStats({
        totalLessons: user.totalLessons,
        completedLessons: user.completedLessons,
        xpPoints: user.xpPoints,
        streak: user.streak,
      });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const StatCard = ({ icon: Icon, title, value, subtitle, delay = 0 }) => (
    <div
      className={`p-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-500 animate-slide-up ${
        isDarkMode
          ? "bg-gray-800 border border-gray-700"
          : "bg-white border border-gray-200"
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between mb-4">
        <div
          className={`p-3 rounded-lg ${
            isDarkMode ? "bg-gray-700" : "bg-blue-50"
          }`}
        >
          <Icon
            className={`w-6 h-6 ${
              isDarkMode ? "text-blue-400" : "text-blue-600"
            }`}
          />
        </div>
        <div className="text-right">
          <div
            className={`text-2xl font-bold animate-count-up ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {value}
          </div>
          <div
            className={`text-sm ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {subtitle}
          </div>
        </div>
      </div>
      <h3
        className={`font-semibold ${
          isDarkMode ? "text-white" : "text-gray-900"
        }`}
      >
        {title}
      </h3>
    </div>
  );

  const ProgressBar = ({ progress, className = "" }) => (
    <div
      className={`w-full h-2 rounded-full overflow-hidden ${className} ${
        isDarkMode ? "bg-gray-700" : "bg-gray-200"
      }`}
    >
      <div
        className="h-full transition-all duration-1000 ease-out animate-progress-fill bg-gradient-to-r from-blue-500 to-purple-600"
        style={{ width: `${progress}%` }}
      />
    </div>
  );

  const CircularProgress = ({ progress, size = 120 }) => {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={isDarkMode ? "#374151" : "#E5E7EB"}
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="url(#gradient)"
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className={`text-2xl font-bold ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {progress}%
          </span>
        </div>
      </div>
    );
  };

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

        <main className="flex-1 p-5 lg:p-8 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div
              className={`absolute top-10 right-10 w-32 h-32 rounded-full opacity-10 blur-3xl animate-float ${
                isDarkMode ? "bg-purple-500" : "bg-purple-400"
              }`}
              style={{ animationDelay: "0s" }}
            />
            <div
              className={`absolute bottom-20 left-10 w-24 h-24 rounded-full opacity-15 blur-2xl animate-float ${
                isDarkMode ? "bg-blue-500" : "bg-blue-400"
              }`}
              style={{ animationDelay: "2s" }}
            />
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="mb-8 animate-fade-in">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1
                    className={`text-3xl font-bold mb-2 ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Track Progress
                  </h1>
                </div>
                <div className="flex space-x-2">
                  {["week", "month"].map((timeframe) => (
                    <button
                      key={timeframe}
                      onClick={() => setSelectedTimeframe(timeframe)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                        selectedTimeframe === timeframe
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white transform scale-105"
                          : isDarkMode
                          ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                          : "bg-white text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                icon={BookOpen}
                title="Total Lessons"
                value={animatedStats.totalLessons}
                subtitle="Available"
                delay={0}
              />
              <StatCard
                icon={CheckCircle}
                title="Completed"
                value={animatedStats.completedLessons}
                subtitle="Lessons Done"
                delay={100}
              />
              <StatCard
                icon={Zap}
                title="XP Points"
                value={animatedStats.xpPoints}
                subtitle="Total Earned"
                delay={200}
              />
              <StatCard
                icon={Flame}
                title="Learning Streak"
                value={animatedStats.streak}
                subtitle="Days in a row"
                delay={300}
              />
            </div>

            <div className="grid lg:grid-cols-3 gap-8 mb-8">
              <div
                className={`lg:col-span-2 p-6 rounded-xl shadow-lg animate-slide-up ${
                  isDarkMode
                    ? "bg-gray-800 border border-gray-700"
                    : "bg-white border border-gray-200"
                }`}
                style={{ animationDelay: "400ms" }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2
                    className={`text-xl font-semibold ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Course Progress
                  </h2>
                  <button
                    className={`text-sm hover:opacity-80 transition-opacity ${
                      isDarkMode ? "text-blue-400" : "text-blue-600"
                    }`}
                  >
                    View All
                  </button>
                </div>
                <div className="space-y-6">
                  {courses.map((course, index) => (
                    <div
                      key={course.id}
                      className="animate-slide-in-right"
                      style={{ animationDelay: `${500 + index * 100}ms` }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3
                          className={`font-medium ${
                            isDarkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {course.title}
                        </h3>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            course.status === "Completed"
                              ? "text-green-700 bg-green-100"
                              : course.status === "In Progress"
                              ? "text-white bg-gradient-to-r from-blue-500 to-purple-600"
                              : "text-orange-700 bg-orange-100"
                          }`}
                        >
                          {course.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`text-sm ${
                            isDarkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          {course.completedLessons}/{course.totalLessons}{" "}
                          lessons • {course.timeSpent}
                        </span>
                        <span
                          className={`text-sm font-medium ${
                            isDarkMode ? "text-blue-400" : "text-blue-600"
                          }`}
                        >
                          {course.progress}%
                        </span>
                      </div>
                      <ProgressBar progress={course.progress} />
                    </div>
                  ))}
                </div>
              </div>

              <div
                className={`p-6 rounded-xl shadow-lg animate-slide-up ${
                  isDarkMode
                    ? "bg-gray-800 border border-gray-700"
                    : "bg-white border border-gray-200"
                }`}
                style={{ animationDelay: "600ms" }}
              >
                <h2
                  className={`text-xl font-semibold mb-6 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Weekly Goal
                </h2>
                <div className="flex flex-col items-center">
                  <CircularProgress
                    progress={(user.completedThisWeek / user.weeklyGoal) * 100}
                  />
                  <div className="text-center mt-4">
                    <p
                      className={`text-2xl font-bold ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {user.completedThisWeek}/{user.weeklyGoal}
                    </p>
                    <p
                      className={`text-sm ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Lessons This Week
                    </p>
                    {user.completedThisWeek >= user.weeklyGoal && (
                      <div className="mt-2 px-3 py-1 rounded-full text-xs font-medium text-white animate-bounce bg-gradient-to-r from-green-500 to-emerald-600">
                        🎉 Goal Achieved!
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`p-6 rounded-xl shadow-lg animate-slide-up ${
                isDarkMode
                  ? "bg-gray-800 border border-gray-700"
                  : "bg-white border border-gray-200"
              }`}
              style={{ animationDelay: "1000ms" }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2
                  className={`text-xl font-semibold ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Learning Insights
                </h2>
                <BarChart3
                  className={`w-6 h-6 ${
                    isDarkMode ? "text-blue-400" : "text-blue-600"
                  }`}
                />
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div
                    className={`text-3xl font-bold mb-2 animate-count-up ${
                      isDarkMode ? "text-blue-400" : "text-blue-600"
                    }`}
                  >
                    89%
                  </div>
                  <p
                    className={`text-sm ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Average Quiz Score
                  </p>
                </div>
                <div className="text-center">
                  <div
                    className={`text-3xl font-bold mb-2 animate-count-up ${
                      isDarkMode ? "text-blue-400" : "text-blue-600"
                    }`}
                  >
                    2.5h
                  </div>
                  <p
                    className={`text-sm ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Daily Average Study Time
                  </p>
                </div>
                <div className="text-center">
                  <div
                    className={`text-3xl font-bold mb-2 animate-count-up ${
                      isDarkMode ? "text-blue-400" : "text-blue-600"
                    }`}
                  >
                    95%
                  </div>
                  <p
                    className={`text-sm ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Lesson Completion Rate
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes progressFill {
          from {
            width: 0%;
          }
        }

        @keyframes countUp {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
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

        .animate-slide-up {
          animation: slideUp 0.6s ease-out both;
        }

        .animate-slide-in-right {
          animation: slideInRight 0.6s ease-out both;
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out;
        }

        .animate-progress-fill {
          animation: progressFill 1s ease-out;
        }

        .animate-count-up {
          animation: countUp 0.8s ease-out;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default MyProgress;
