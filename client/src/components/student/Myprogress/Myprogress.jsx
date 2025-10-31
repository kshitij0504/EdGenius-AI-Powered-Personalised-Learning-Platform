import {
  BookOpen,
  CheckCircle,
  Zap,
  Flame,
  TrendingUp,
  Clock,
} from "lucide-react";
import StudentLayout from "../StudentLayout";
import { useEffect, useState } from "react";
import axios from "axios";

const MyProgress = () => {
  return (
    <StudentLayout>
      <MyProgressContent />
    </StudentLayout>
  );
};

const MyProgressContent = ({ isDarkMode, user }) => {
  const [stats, setStats] = useState({
    totalLessons: 0,
    completedLessons: 0,
    xpPoints: 0,
    streak: 0,
    completedThisWeek: 0,
    weeklyGoal: 10,
    avgDailyStudyTime: "0h",
    completionRate: 0,
  });

  const [courses, setCourses] = useState([]); // Initialize as empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState("week");

  // Fetch user stats and course progress
  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch user statistics
        const statsResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/progress/stats`, {
          withCredentials: true,
        });
        console.log(statsResponse.data.totalLessons);
        
        setStats(statsResponse.data);

        // Fetch all courses with progress
        const coursesResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/progress/overview`, {
          withCredentials: true,
        });
        console.log(coursesResponse.data);
        
        setCourses(coursesResponse.data.courses || []); // Ensure it's always an array
      } catch (error) {
        console.error("Error fetching progress data:", error);
        setError(error.response?.data?.error || "Failed to load progress data");
        setCourses([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchProgressData();
    } else {
      setLoading(false);
    }
  }, [user]);

  const StatCard = ({
    icon: Icon,
    title,
    value,
    subtitle,
    gradient = false,
  }) => (
    <div
      className={`p-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 ${
        isDarkMode
          ? "bg-gray-800 border border-gray-700"
          : "bg-white border border-gray-200"
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div
          className={`p-3 rounded-lg ${
            gradient
              ? "bg-gradient-to-br from-blue-500 to-purple-600"
              : isDarkMode
              ? "bg-gray-700"
              : "bg-blue-50"
          }`}
        >
          <Icon
            className={`w-6 h-6 ${
              gradient
                ? "text-white"
                : isDarkMode
                ? "text-blue-400"
                : "text-blue-600"
            }`}
          />
        </div>
        <div className="text-right">
          <div
            className={`text-3xl font-bold ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {value}
          </div>
          <div
            className={`text-sm mt-1 ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {subtitle}
          </div>
        </div>
      </div>
      <h3
        className={`font-semibold text-sm ${
          isDarkMode ? "text-gray-300" : "text-gray-700"
        }`}
      >
        {title}
      </h3>
    </div>
  );

  const ProgressBar = ({ progress }) => (
    <div
      className={`w-full h-2.5 rounded-full overflow-hidden ${
        isDarkMode ? "bg-gray-700" : "bg-gray-200"
      }`}
    >
      <div
        className="h-full transition-all duration-500 ease-out bg-gradient-to-r from-blue-500 to-purple-600"
        style={{ width: `${Math.min(progress, 100)}%` }}
      />
    </div>
  );

  const CircularProgress = ({ progress, size = 140 }) => {
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const safeProgress = Math.min(Math.max(progress, 0), 100);
    const strokeDashoffset =
      circumference - (safeProgress / 100) * circumference;

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={isDarkMode ? "#374151" : "#E5E7EB"}
            strokeWidth="10"
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="url(#gradient)"
            strokeWidth="10"
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
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <span
            className={`text-3xl font-bold ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {Math.round(safeProgress)}%
          </span>
          <span
            className={`text-xs mt-1 ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Complete
          </span>
        </div>
      </div>
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p
              className={`text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Loading your progress...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-64">
          <div
            className={`text-center p-6 rounded-lg ${
              isDarkMode
                ? "bg-gray-800 border border-gray-700"
                : "bg-white border border-gray-200"
            }`}
          >
            <p
              className={`text-lg mb-2 ${
                isDarkMode ? "text-red-400" : "text-red-600"
              }`}
            >
              Error loading progress
            </p>
            <p
              className={`text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {error}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // No user state
  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-64">
          <div
            className={`text-lg ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Please log in to view your progress
          </div>
        </div>
      </div>
    );
  }

  const weeklyProgress =
    stats.weeklyGoal > 0
      ? (stats.completedThisWeek / stats.weeklyGoal) * 100
      : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1
            className={`text-3xl font-bold mb-2 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            My Learning Progress
          </h1>
          <p
            className={`text-sm ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Track your learning journey and achievements
          </p>
        </div>
        <div className="flex space-x-2">
          {["week", "month"].map((timeframe) => (
            <button
              key={timeframe}
              onClick={() => setSelectedTimeframe(timeframe)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedTimeframe === timeframe
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                  : isDarkMode
                  ? "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700"
                  : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={BookOpen}
          title="Total Lessons"
          value={stats.totalLessons || 0}
          subtitle="Available"
        />
        <StatCard
          icon={CheckCircle}
          title="Completed"
          value={stats.completedLessons || 0}
          subtitle="Lessons Done"
        />
        <StatCard
          icon={Zap}
          title="XP Points"
          value={stats.xpPoints || 0}
          subtitle="Total Earned"
          gradient={true}
        />
        <StatCard
          icon={Flame}
          title="Learning Streak"
          value={`${stats.streak || 0} 🔥`}
          subtitle="Days in a row"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8 mb-8">
        {/* Course Progress */}
        <div
          className={`lg:col-span-2 p-6 rounded-xl shadow-lg ${
            isDarkMode
              ? "bg-gray-800 border border-gray-700"
              : "bg-white border border-gray-200"
          }`}
        >
          <div className="flex items-center justify-between mb-6">
            <h2
              className={`text-xl font-bold ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Course Progress
            </h2>
            <span
              className={`text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {courses?.length || 0} Enrolled
            </span>
          </div>

          {!courses || courses.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen
                className={`w-16 h-16 mx-auto mb-4 ${
                  isDarkMode ? "text-gray-600" : "text-gray-300"
                }`}
              />
              <p
                className={`text-lg mb-2 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                No courses enrolled yet
              </p>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-gray-500" : "text-gray-500"
                }`}
              >
                Start learning by enrolling in a course
              </p>
            </div>
          ) : (
            <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
              {courses.map((course) => (
                <div
                  key={course.courseId}
                  className={`p-4 rounded-lg transition-all hover:shadow-md ${
                    isDarkMode
                      ? "bg-gray-750 hover:bg-gray-700"
                      : "bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-start gap-4 mb-3">
                    {course.thumbnail && (
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/64?text=Course";
                        }}
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3
                          className={`font-semibold text-lg truncate ${
                            isDarkMode ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {course.title}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0 ${
                            course.status === "Completed"
                              ? "bg-green-100 text-green-700"
                              : course.status === "In Progress"
                              ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {course.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 mb-3">
                        <span
                          className={`text-sm flex items-center gap-1 ${
                            isDarkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          <BookOpen className="w-4 h-4" />
                          {course.completedLessons}/{course.totalLessons}{" "}
                          lessons
                        </span>
                        <span
                          className={`text-sm flex items-center gap-1 ${
                            isDarkMode ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          <Clock className="w-4 h-4" />
                          {course.timeSpent || "0h 0m"}
                        </span>
                        <span
                          className={`text-sm font-semibold ml-auto ${
                            isDarkMode ? "text-blue-400" : "text-blue-600"
                          }`}
                        >
                          {course.progressPercentage || 0}%
                        </span>
                      </div>
                      <ProgressBar progress={course.progressPercentage || 0} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
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
            className={`text-xl font-bold mb-6 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Weekly Goal
          </h2>
          <div className="flex flex-col items-center">
            <CircularProgress progress={weeklyProgress} />
            <div className="text-center mt-6">
              <p
                className={`text-2xl font-bold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {stats.completedThisWeek || 0}/{stats.weeklyGoal || 10}
              </p>
              <p
                className={`text-sm mt-1 ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Lessons This Week
              </p>
            </div>
            {stats.completedThisWeek >= stats.weeklyGoal &&
              stats.weeklyGoal > 0 && (
                <div className="mt-4 px-4 py-2 rounded-full text-sm font-medium text-white bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg animate-pulse">
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
            className={`text-xl font-bold ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Learning Insights
          </h2>
          <TrendingUp
            className={`w-6 h-6 ${
              isDarkMode ? "text-blue-400" : "text-blue-600"
            }`}
          />
        </div>
        <div className="grid sm:grid-cols-3 gap-6">
          <div
            className={`text-center p-6 rounded-lg ${
              isDarkMode
                ? "bg-gradient-to-br from-gray-700 to-gray-750"
                : "bg-gradient-to-br from-blue-50 to-purple-50"
            }`}
          >
            <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              {stats.completionRate || 0}%
            </div>
            <p
              className={`text-sm font-medium ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Completion Rate
            </p>
          </div>
          <div
            className={`text-center p-6 rounded-lg ${
              isDarkMode
                ? "bg-gradient-to-br from-gray-700 to-gray-750"
                : "bg-gradient-to-br from-blue-50 to-purple-50"
            }`}
          >
            <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              {stats.avgDailyStudyTime || "0h"}
            </div>
            <p
              className={`text-sm font-medium ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Avg. Daily Study Time
            </p>
          </div>
          <div
            className={`text-center p-6 rounded-lg ${
              isDarkMode
                ? "bg-gradient-to-br from-gray-700 to-gray-750"
                : "bg-gradient-to-br from-blue-50 to-purple-50"
            }`}
          >
            <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              {courses?.length || 0}
            </div>
            <p
              className={`text-sm font-medium ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Active Courses
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProgress;
