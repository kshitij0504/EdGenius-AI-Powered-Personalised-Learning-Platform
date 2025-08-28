import { BookOpen, CheckCircle, Zap, Flame, BarChart3 } from "lucide-react";
import StudentLayout from "../StudentLayout";
import { useEffect, useState } from "react";

const MyProgress = () => {
  return (
    <StudentLayout>
      {/* StudentLayout will pass isDarkMode and user as props to children */}
      <MyProgressContent />
    </StudentLayout>
  );
};

const MyProgressContent = ({ isDarkMode, user }) => {
  const [animatedStats, setAnimatedStats] = useState({
    totalLessons: 0,
    completedLessons: 0,
    xpPoints: 0,
    streak: 0,
  });

  const [selectedTimeframe, setSelectedTimeframe] = useState("week");

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

  // Animate stats when user data changes
  useEffect(() => {
    if (user) {
      const timer = setTimeout(() => {
        setAnimatedStats({
          totalLessons: user.totalLessons || 0,
          completedLessons: user.completedLessons || 0,
          xpPoints: user.xpPoints || 0,
          streak: user.streak || 0,
        });
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [user]);

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

  const ProgressBar = ({ progress }) => (
    <div
      className={`w-full h-2 rounded-full overflow-hidden ${
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
            {Math.round(progress)}%
          </span>
        </div>
      </div>
    );
  };

  // Add safety checks for user data
  if (!user) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-500">Loading user data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1
          className={`text-3xl font-bold ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Track Progress
        </h1>
        <div className="flex space-x-2">
          {["week", "month"].map((timeframe) => (
            <button
              key={timeframe}
              onClick={() => setSelectedTimeframe(timeframe)}
              className={`px-4 py-2 rounded-lg font-medium ${
                selectedTimeframe === timeframe
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                  : isDarkMode
                  ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={BookOpen}
          title="Total Lessons"
          value={animatedStats.totalLessons}
          subtitle="Available"
        />
        <StatCard
          icon={CheckCircle}
          title="Completed"
          value={animatedStats.completedLessons}
          subtitle="Lessons Done"
        />
        <StatCard
          icon={Zap}
          title="XP Points"
          value={animatedStats.xpPoints}
          subtitle="Total Earned"
        />
        <StatCard
          icon={Flame}
          title="Learning Streak"
          value={animatedStats.streak}
          subtitle="Days in a row"
        />
      </div>

      {/* Course Progress */}
      <div className="grid lg:grid-cols-3 gap-8 mb-8">
        <div
          className={`lg:col-span-2 p-6 rounded-xl shadow-lg ${
            isDarkMode
              ? "bg-gray-800 border border-gray-700"
              : "bg-white border border-gray-200"
          }`}
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
              className={`text-sm ${
                isDarkMode ? "text-blue-400" : "text-blue-600"
              }`}
            >
              View All
            </button>
          </div>
          <div className="space-y-6">
            {courses.map((course) => (
              <div key={course.id}>
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
                    {course.completedLessons}/{course.totalLessons} lessons •{" "}
                    {course.timeSpent}
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

        {/* Weekly Goal */}
        <div
          className={`p-6 rounded-xl shadow-lg ${
            isDarkMode
              ? "bg-gray-800 border border-gray-700"
              : "bg-white border border-gray-200"
          }`}
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
              progress={
                user.weeklyGoal > 0
                  ? (user.completedThisWeek / user.weeklyGoal) * 100
                  : 0
              }
            />
            <div className="text-center mt-4">
              <p
                className={`text-2xl font-bold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {user.completedThisWeek || 0}/{user.weeklyGoal || 0}
              </p>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Lessons This Week
              </p>
            </div>
            {user.completedThisWeek >= user.weeklyGoal && user.weeklyGoal > 0 && (
              <div className="mt-2 px-3 py-1 rounded-full text-xs font-medium text-white animate-bounce bg-gradient-to-r from-green-500 to-emerald-600">
                🎉 Goal Achieved!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Learning Insights */}
      <div
        className={`p-6 rounded-xl shadow-lg ${
          isDarkMode
            ? "bg-gray-800 border border-gray-700"
            : "bg-white border border-gray-200"
        }`}
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
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div>
            <div
              className={`text-3xl font-bold ${
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
          <div>
            <div
              className={`text-3xl font-bold ${
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
          <div>
            <div
              className={`text-3xl font-bold ${
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
  );
};

export default MyProgress;
