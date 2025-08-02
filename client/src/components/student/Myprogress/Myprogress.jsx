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

const MyProgress = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState("week");
  const [animatedStats, setAnimatedStats] = useState({
    totalLessons: 0,
    completedLessons: 0,
    xpPoints: 0,
    streak: 0,
  });

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

  const weeklyActivity = [
    { day: "Mon", lessons: 2, xp: 180 },
    { day: "Tue", lessons: 1, xp: 95 },
    { day: "Wed", lessons: 3, xp: 240 },
    { day: "Thu", lessons: 0, xp: 0 },
    { day: "Fri", lessons: 2, xp: 160 },
    { day: "Sat", lessons: 1, xp: 85 },
    { day: "Sun", lessons: 2, xp: 190 },
  ];

  const achievements = [
    {
      id: 1,
      title: "First Lesson",
      description: "Complete your first lesson",
      earned: true,
      date: "2024-01-15",
    },
    {
      id: 2,
      title: "Week Warrior",
      description: "7 days learning streak",
      earned: true,
      date: "2024-01-22",
    },
    {
      id: 3,
      title: "Quiz Master",
      description: "Score 90%+ on 5 quizzes",
      earned: true,
      date: "2024-02-01",
    },
    {
      id: 4,
      title: "Course Crusher",
      description: "Complete first course",
      earned: true,
      date: "2024-02-15",
    },
    {
      id: 5,
      title: "Speed Learner",
      description: "Complete 10 lessons in one day",
      earned: false,
      date: null,
    },
    {
      id: 6,
      title: "Knowledge Seeker",
      description: "Reach 2000 XP points",
      earned: false,
      date: null,
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
      className="p-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-500 animate-slide-up"
      style={{
        backgroundColor: "white",
        animationDelay: `${delay}ms`,
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div
          className="p-3 rounded-lg"
          style={{ backgroundColor: "var(--color-edgenius-background-light)" }}
        >
          <Icon
            className="w-6 h-6"
            style={{ color: "var(--color-edgenius-accent-medium)" }}
          />
        </div>
        <div className="text-right">
          <div
            className="text-2xl font-bold animate-count-up"
            style={{ color: "var(--color-edgenius-text-primary)" }}
          >
            {value}
          </div>
          <div
            className="text-sm"
            style={{ color: "var(--color-edgenius-text-secondary)" }}
          >
            {subtitle}
          </div>
        </div>
      </div>
      <h3
        className="font-semibold"
        style={{ color: "var(--color-edgenius-text-primary)" }}
      >
        {title}
      </h3>
    </div>
  );

  const ProgressBar = ({ progress, className = "" }) => (
    <div
      className={`w-full h-2 rounded-full overflow-hidden ${className}`}
      style={{ backgroundColor: "var(--color-edgenius-background-light)" }}
    >
      <div
        className="h-full transition-all duration-1000 ease-out animate-progress-fill"
        style={{
          backgroundColor: "var(--color-edgenius-accent-dark)",
          width: `${progress}%`,
        }}
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
            stroke="var(--color-edgenius-background-light)"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="var(--color-edgenius-accent-dark)"
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="text-2xl font-bold"
            style={{ color: "var(--color-edgenius-text-primary)" }}
          >
            {progress}%
          </span>
        </div>
      </div>
    );
  };

  return (
    <div
      className="flex min-h-screen bg-[var(--color-edgenius-background-light)]"
      style={{ backgroundColor: "var(--color-edgenius-background-light)" }}
    >
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

      <div className="flex-1 p-5 lg:p-8">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="lg:hidden p-2 rounded-lg"
          style={{
            backgroundColor: "var(--color-edgenius-background-light)",
            color: "black",
          }}
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="max-w-7xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1
                  className="text-3xl font-bold mb-2"
                  style={{ color: "var(--color-edgenius-text-primary)" }}
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
                        ? "text-white transform scale-105"
                        : "hover:opacity-80"
                    }`}
                    style={{
                      backgroundColor:
                        selectedTimeframe === timeframe
                          ? "var(--color-edgenius-accent-dark)"
                          : "white",
                      color:
                        selectedTimeframe === timeframe
                          ? "white"
                          : "var(--color-edgenius-text-secondary)",
                    }}
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
              className="lg:col-span-2 p-6 rounded-xl shadow-lg animate-slide-up"
              style={{ backgroundColor: "white", animationDelay: "400ms" }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2
                  className="text-xl font-semibold"
                  style={{ color: "var(--color-edgenius-text-primary)" }}
                >
                  Course Progress
                </h2>
                <button
                  className="text-sm hover:opacity-80 transition-opacity"
                  style={{ color: "var(--color-edgenius-accent-dark)" }}
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
                        className="font-medium"
                        style={{ color: "var(--color-edgenius-text-primary)" }}
                      >
                        {course.title}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          course.status === "Completed"
                            ? "text-green-700 bg-green-100"
                            : course.status === "In Progress"
                            ? "text-white"
                            : "text-orange-700 bg-orange-100"
                        }`}
                        style={{
                          backgroundColor:
                            course.status === "In Progress"
                              ? "var(--color-edgenius-accent-medium)"
                              : undefined,
                        }}
                      >
                        {course.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className="text-sm"
                        style={{
                          color: "var(--color-edgenius-text-secondary)",
                        }}
                      >
                        {course.completedLessons}/{course.totalLessons} lessons
                        • {course.timeSpent}
                      </span>
                      <span
                        className="text-sm font-medium"
                        style={{ color: "var(--color-edgenius-accent-dark)" }}
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
              className="p-6 rounded-xl shadow-lg animate-slide-up"
              style={{ backgroundColor: "white", animationDelay: "600ms" }}
            >
              <h2
                className="text-xl font-semibold mb-6"
                style={{ color: "var(--color-edgenius-text-primary)" }}
              >
                Weekly Goal
              </h2>
              <div className="flex flex-col items-center">
                <CircularProgress
                  progress={(user.completedThisWeek / user.weeklyGoal) * 100}
                />
                <div className="text-center mt-4">
                  <p
                    className="text-2xl font-bold"
                    style={{ color: "var(--color-edgenius-text-primary)" }}
                  >
                    {user.completedThisWeek}/{user.weeklyGoal}
                  </p>
                  <p
                    className="text-sm"
                    style={{ color: "var(--color-edgenius-text-secondary)" }}
                  >
                    Lessons This Week
                  </p>
                  {user.completedThisWeek >= user.weeklyGoal && (
                    <div
                      className="mt-2 px-3 py-1 rounded-full text-xs font-medium text-white animate-bounce"
                      style={{
                        backgroundColor: "var(--color-edgenius-accent-dark)",
                      }}
                    >
                      🎉 Goal Achieved!
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div
            className="p-6 rounded-xl shadow-lg animate-slide-up"
            style={{ backgroundColor: "white", animationDelay: "1000ms" }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2
                className="text-xl font-semibold"
                style={{ color: "var(--color-edgenius-text-primary)" }}
              >
                Learning Insights
              </h2>
              <BarChart3
                className="w-6 h-6"
                style={{ color: "var(--color-edgenius-accent-medium)" }}
              />
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div
                  className="text-3xl font-bold mb-2 animate-count-up"
                  style={{ color: "var(--color-edgenius-accent-dark)" }}
                >
                  89%
                </div>
                <p
                  className="text-sm"
                  style={{ color: "var(--color-edgenius-text-secondary)" }}
                >
                  Average Quiz Score
                </p>
              </div>
              <div className="text-center">
                <div
                  className="text-3xl font-bold mb-2 animate-count-up"
                  style={{ color: "var(--color-edgenius-accent-dark)" }}
                >
                  2.5h
                </div>
                <p
                  className="text-sm"
                  style={{ color: "var(--color-edgenius-text-secondary)" }}
                >
                  Daily Average Study Time
                </p>
              </div>
              <div className="text-center">
                <div
                  className="text-3xl font-bold mb-2 animate-count-up"
                  style={{ color: "var(--color-edgenius-accent-dark)" }}
                >
                  95%
                </div>
                <p
                  className="text-sm"
                  style={{ color: "var(--color-edgenius-text-secondary)" }}
                >
                  Lesson Completion Rate
                </p>
              </div>
            </div>
          </div>
        </div>
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

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
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

        @keyframes pulseOnce {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        @keyframes bounceSlow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        .animate-slide-up {
          animation: slideUp 0.6s ease-out both;
        }

        .animate-slide-in-right {
          animation: slideInRight 0.6s ease-out both;
        }

        .animate-slide-in-left {
          animation: slideInLeft 0.6s ease-out both;
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

        .animate-pulse-slow {
          animation: pulseOnce 2s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounceSlow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default MyProgress;
