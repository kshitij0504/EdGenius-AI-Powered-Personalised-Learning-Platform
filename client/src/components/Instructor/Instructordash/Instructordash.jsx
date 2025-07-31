import { useState, useEffect } from "react";
import {
  BookOpenIcon,
  Bars3Icon,
  BellIcon,
  UserGroupIcon,
  TrophyIcon,
  ClockIcon,
  EyeIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/outline";
import Sidebar from "../Instructorsidebar/Instructorsidebar";
import MyCoursesPage from "../Course/Course";
import EnrolledStudent from "../Student/EnrollStudent";
import ContactPage from "../../student/Contact/conatct";

const DashboardPage = ({ isAnimated }) => {
  const stats = [
    {
      title: "Total Students",
      value: "1,247",
      change: "+12%",
      icon: UserGroupIcon,
      trend: "up",
    },
    {
      title: "Active Courses",
      value: "24",
      change: "+3",
      icon: BookOpenIcon,
      trend: "up",
    },
    {
      title: "Completion Rate",
      value: "87%",
      change: "+5%",
      icon: TrophyIcon,
      trend: "up",
    },
    {
      title: "Avg. Engagement",
      value: "92%",
      change: "-2%",
      icon: EyeIcon,
      trend: "down",
    },
  ];

  const recentCourses = [
    {
      title: "Advanced JavaScript",
      description: "Comprehensive course covering modern JS concepts",
      students: 342,
      progress: 75,
      lastActive: "2 hours ago",
    },
    {
      title: "React Fundamentals",
      description: "Learn React from basics to advanced concepts",
      students: 289,
      progress: 60,
      lastActive: "5 hours ago",
    },
    {
      title: "Python for AI",
      description: "Python programming focused on AI applications",
      students: 156,
      progress: 40,
      lastActive: "1 day ago",
    },
  ];

  const activities = [
    {
      icon: UserGroupIcon,
      title: "New student enrolled",
      description: "Sarah Johnson joined Advanced JavaScript",
      time: "2 hours ago",
    },
    {
      icon: TrophyIcon,
      title: "Course completed",
      description: "15 students completed React Fundamentals",
      time: "4 hours ago",
    },
    {
      icon: BookOpenIcon,
      title: "New lesson published",
      description: "Added Chapter 5 to Python for AI",
      time: "1 day ago",
    },
    {
      icon: EyeIcon,
      title: "High engagement",
      description: "Advanced JavaScript reached 95% engagement",
      time: "2 days ago",
    },
  ];

  return (
    <div className={`space-y-8 ${isAnimated ? "animate-fade-in" : ""}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-[var(--color-edgenius-accent-light)]/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[var(--color-edgenius-text-secondary)] text-sm font-medium mb-1">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold text-[var(--color-edgenius-text-primary)]">
                  {stat.value}
                </p>
                <div className="flex items-center mt-2">
                  {stat.trend === "up" ? (
                    <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
                  ) : (
                    <ArrowDownIcon className="h-4 w-4 text-red-500 mr-1" />
                  )}
                  <span
                    className={`text-sm font-medium ${
                      stat.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className="bg-gradient-to-br from-[var(--color-edgenius-accent-medium)] to-[var(--color-edgenius-accent-dark)] p-3 rounded-xl">
                <stat.icon className="h-8 w-8 text-[var(--color-edgenius-button-text)]" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-[var(--color-edgenius-text-primary)]">
              Recent Courses
            </h3>
          </div>
          <div className="space-y-4">
            {recentCourses.map((course, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-[var(--color-edgenius-text-primary)] mb-2">
                      {course.title}
                    </h4>
                    <p className="text-[var(--color-edgenius-text-secondary)] text-sm mb-4">
                      {course.description}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-[var(--color-edgenius-text-secondary)]">
                      <div className="flex items-center">
                        <UserGroupIcon className="h-4 w-4 mr-1" />
                        {course.students} students
                      </div>
                      <div className="flex items-center">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        {course.lastActive}
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-[var(--color-edgenius-accent-light)] to-[var(--color-edgenius-accent-medium)] p-2 rounded-lg">
                    <BookOpenIcon className="h-6 w-6 text-[var(--color-edgenius-button-text)]" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--color-edgenius-text-secondary)]">
                      Progress
                    </span>
                    <span className="font-medium text-[var(--color-edgenius-text-primary)]">
                      {course.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-[var(--color-edgenius-bg-lightest)] rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-[var(--color-edgenius-accent-light)] to-[var(--color-edgenius-accent-medium)] h-2 rounded-full transition-all duration-500"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-xl">
          <h3 className="text-xl font-bold text-[var(--color-edgenius-text-primary)] mb-6">
            Recent Activity
          </h3>
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 p-3 hover:bg-[var(--color-edgenius-bg-lightest)] rounded-lg transition-colors"
              >
                <div className="bg-gradient-to-br from-[var(--color-edgenius-accent-medium)] to-[var(--color-edgenius-accent-dark)] p-2 rounded-lg">
                  <activity.icon className="h-4 w-4 text-[var(--color-edgenius-button-text)]" />
                </div>
                <div className="flex-1">
                  <p className="text-[var(--color-edgenius-text-primary)] font-medium">
                    {activity.title}
                  </p>
                  <p className="text-[var(--color-edgenius-text-secondary)] text-sm">
                    {activity.description}
                  </p>
                  <p className="text-[var(--color-edgenius-text-secondary)]/70 text-xs mt-1">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const EdgeniusInstructorDashboard = () => {
  const [currentPage, setCurrentPage] = useState("/dashboard");
  const [notifications] = useState(3);
  const [isAnimated, setIsAnimated] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const user = {
    name: "Dr. Sarah Wilson",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    level: 7,
    xpPoints: 2450,
  };

  useEffect(() => {
    setIsAnimated(true);
  }, []);

  const getPageTitle = () => {
    switch (currentPage) {
      case "/dashboard":
        return "Dashboard Overview";
      case "/courses":
        return "My Courses";
      case "/students":
        return "Enrolled Students";
      case "/settings":
        return "Settings";
      case "/contact":
        return "Conatct";
      default:
        return "Dashboard";
    }
  };

  const getPageSubtitle = () => {
    switch (currentPage) {
      case "/dashboard":
        return "Welcome back, Dr. Wilson! Here's what's happening with your courses.";
      case "/courses":
        return "Create, manage, and track your course content and performance.";
      case "/students":
        return "Monitor student progress and engagement across all your courses.";
      case "/settings":
        return "Customize your account preferences and platform settings.";
      case "/Contact":
        return "Send Query, and get support when you need it.";
      default:
        return "";
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderContent = () => {
    switch (currentPage) {
      case "/dashboard":
        return <DashboardPage isAnimated={isAnimated} />;
      case "/courses":
        return <MyCoursesPage />;
      case "/students":
        return <EnrolledStudent />;
      case "/settings":
        return <SettingsPage />;
      case "/help":
        return <ContactPage />;
      default:
        return <DashboardPage isAnimated={isAnimated} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[var(--color-edgenius-bg-lightest)] to-[var(--color-edgenius-accent-light)]/30">
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-3 text-[var(--color-edgenius-accent-dark)] bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>
      </div>

      <Sidebar
        user={user}
        currentPage={currentPage}
        unreadNotifications={notifications}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        onPageChange={handlePageChange}
      />

      <main className="flex-1 p-4 lg:p-8 lg:ml-0">
        <header className="flex justify-between items-center mb-8 mt-16 lg:mt-0">
          <div>
            <h2 className="text-3xl font-bold text-[var(--color-edgenius-text-primary)] mb-2">
              {getPageTitle()}
            </h2>
            <p className="text-[var(--color-edgenius-text-secondary)]">
              {getPageSubtitle()}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="p-3 text-[var(--color-edgenius-text-secondary)] hover:text-[var(--color-edgenius-accent-dark)] bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 relative">
                <BellIcon className="h-6 w-6" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {notifications}
                  </span>
                )}
              </button>
            </div>
          </div>
        </header>

        <div className="relative">{renderContent()}</div>
      </main>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.6s ease-in-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default EdgeniusInstructorDashboard;
