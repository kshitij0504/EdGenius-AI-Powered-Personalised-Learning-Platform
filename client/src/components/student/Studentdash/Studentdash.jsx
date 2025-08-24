// import Header from "./Header";
// import React, { useState } from "react";
// import HeroSection from "./Herosection";
// import LearningMilestones from "./Milestone";
// import Sidebar from "../Studentsidebar/Studentsidebar";

// const Dashboard = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const user = {
//     name: "Aisha Sharma",
//     avatar: "https://randomuser.me/api/portraits/women/68.jpg",
//     learningGoal: "Become a Full-stack Web Developer",
//     currentCourseSlug: "react-hooks-context",
//     currentLessonTitle: "Mastering State with useState",
//     lessonProgress: 75,
//     diagnosticTaken: true,
//     upcomingQuiz: "React Fundamentals Quiz",
//     unreadNotifications: 2,
//     xpPoints: 1250,
//     level: 7,
//   };

//   const milestones = [
//     {
//       id: 1,
//       title: "React Hooks Certification",
//       achieved: true,
//       date: "2025-06-15",
//     },
//     {
//       id: 2,
//       title: "Python Fundamentals Badge",
//       achieved: true,
//       date: "2025-05-20",
//     },
//     {
//       id: 3,
//       title: "Completed 50 Lessons",
//       achieved: false,
//       target: 50,
//       current: 42,
//     },
//   ];

//   const handleContinueLesson = () => {
//     alert(`Navigating to lesson: ${user.currentLessonTitle}`);
//   };

//   return (
//     <div className="flex min-h-screen bg-[var(--color-edgenius-background-light)]">
//       {isSidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
//           onClick={() => setIsSidebarOpen(false)}
//         ></div>
//       )}

//       <Sidebar
//         user={user}
//         unreadNotifications={user.unreadNotifications}
//         isSidebarOpen={isSidebarOpen}
//         setIsSidebarOpen={setIsSidebarOpen}
//       />

//       <div className="flex-1 flex flex-col">
//         {" "}
//         <Header user={user} />
//         <main className="flex-1 container mx-auto px-4 py-10">
//           <HeroSection user={user} onContinue={handleContinueLesson} />
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-12">
//             <div className="lg:col-span-2 space-y-10">
//               <LearningMilestones
//                 milestones={milestones}
//                 xpPoints={user.xpPoints}
//                 level={user.level}
//               />
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import React, { useState, useEffect } from "react";
import {
  BookOpen,
  Activity,
  Trophy,
  Clock,
  TrendingUp,
  Play,
  Users,
  Star,
  Calendar,
  Target,
  Zap,
  ChevronRight,
  Award,
  Brain,
  CheckCircle,
  ArrowRight,
  Bell,
  Search,
  Filter,
  Bookmark,
  Share2,
  Settings,
  Menu,
  X,
  Home,
  Book,
  User,
  MoreHorizontal,
  PieChart,
  Layout,
  Layers,
  Globe,
  MessageSquare,
  Sparkles,
  GraduationCap,
  Briefcase,
  FileText,
  HelpCircle,
  LogOut,
  ChevronLeft,
} from "lucide-react";

const StudentDashboard = () => {
  const [user, setUser] = useState({
    name: "Alex Johnson",
    avatar:
      "https://ui-avatars.com/api/?name=Alex+Johnson&background=4f46e5&color=fff&size=128",
    level: "Intermediate",
    xp: 2480,
    nextLevelXp: 3000,
    streak: 12,
    rank: "#247",
  });

  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchFocused, setSearchFocused] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState("Dashboard");

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const [stats, setStats] = useState([
    {
      id: 1,
      label: "Courses Enrolled",
      value: 8,
      change: "+2 this month",
      changePercent: 25,
      icon: BookOpen,
      color: "from-violet-500 via-purple-500 to-indigo-600",
      bgColor: "bg-violet-50",
      textColor: "text-violet-700",
      trend: "up",
    },
    {
      id: 2,
      label: "Hours Learned",
      value: 147,
      change: "+12 this week",
      changePercent: 8.9,
      icon: Clock,
      color: "from-emerald-500 via-teal-500 to-cyan-600",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-700",
      trend: "up",
    },
    {
      id: 3,
      label: "Certificates",
      value: 3,
      change: "+1 this month",
      changePercent: 33,
      icon: Award,
      color: "from-orange-500 via-amber-500 to-yellow-500",
      bgColor: "bg-orange-50",
      textColor: "text-orange-700",
      trend: "up",
    },
    {
      id: 4,
      label: "AI Score",
      value: 85,
      change: "+5 points",
      changePercent: 6.3,
      icon: Brain,
      color: "from-pink-500 via-rose-500 to-red-500",
      bgColor: "bg-pink-50",
      textColor: "text-pink-700",
      trend: "up",
    },
  ]);

  const [recentCourses, setRecentCourses] = useState([
    {
      id: 1,
      title: "Advanced Machine Learning with EdgeAI",
      instructor: "Dr. Sarah Chen",
      progress: 75,
      thumbnail:
        "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=300&fit=crop&crop=center",
      duration: "6h 30m",
      lessons: 24,
      difficulty: "Intermediate",
      rating: 4.8,
      studentsCount: 1247,
      nextLesson: "Neural Networks with Edge Computing",
      lastAccessed: "2 hours ago",
      category: "AI & ML",
    },
    {
      id: 2,
      title: "Modern Web Development Stack",
      instructor: "Mark Thompson",
      progress: 42,
      thumbnail:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=300&fit=crop&crop=center",
      duration: "8h 15m",
      lessons: 32,
      difficulty: "Beginner",
      rating: 4.9,
      studentsCount: 2156,
      nextLesson: "State Management with Edge",
      lastAccessed: "1 day ago",
      category: "Development",
    },
    {
      id: 3,
      title: "Data Science & Edge Analytics",
      instructor: "Prof. Emily Rodriguez",
      progress: 15,
      thumbnail:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=300&fit=crop&crop=center",
      duration: "12h 45m",
      lessons: 48,
      difficulty: "Advanced",
      rating: 4.7,
      studentsCount: 892,
      nextLesson: "Edge Computing Fundamentals",
      lastAccessed: "3 days ago",
      category: "Data Science",
    },
  ]);

  const [upcomingTasks, setUpcomingTasks] = useState([
    {
      id: 1,
      title: "Complete ML Quiz #3",
      course: "Machine Learning Fundamentals",
      dueDate: "Today",
      dueTime: "11:30 PM",
      priority: "high",
      type: "quiz",
      estimatedTime: "30 min",
    },
    {
      id: 2,
      title: "Submit React Project",
      course: "Web Development with React",
      dueDate: "Tomorrow",
      dueTime: "6:00 PM",
      priority: "medium",
      type: "assignment",
      estimatedTime: "2 hours",
    },
    {
      id: 3,
      title: "Watch Python Basics",
      course: "Data Science with Python",
      dueDate: "Nov 25",
      dueTime: "Any time",
      priority: "low",
      type: "lesson",
      estimatedTime: "45 min",
    },
    {
      id: 4,
      title: "Join Live Session",
      course: "Machine Learning Fundamentals",
      dueDate: "Nov 22",
      dueTime: "3:00 PM",
      priority: "high",
      type: "live",
      estimatedTime: "1 hour",
    },
  ]);

  const [achievements, setAchievements] = useState([
    { id: 1, title: "Edge Pioneer", icon: "🚀", earned: true, date: "Nov 15" },
    { id: 2, title: "7 Day Streak", icon: "🔥", earned: true, date: "Nov 18" },
    {
      id: 3,
      title: "Knowledge Master",
      icon: "🧠",
      earned: true,
      date: "Nov 10",
    },
    { id: 4, title: "Speed Learner", icon: "⚡", earned: false, progress: 60 },
    {
      id: 5,
      title: "Community Helper",
      icon: "🤝",
      earned: false,
      progress: 30,
    },
  ]);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Beginner":
        return "text-emerald-700 bg-emerald-100 border-emerald-200";
      case "Intermediate":
        return "text-violet-700 bg-violet-100 border-violet-200";
      case "Advanced":
        return "text-orange-700 bg-orange-100 border-orange-200";
      default:
        return "text-gray-700 bg-gray-100 border-gray-200";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "border-l-red-500 bg-gradient-to-r from-red-50 to-red-50/50 border-red-100";
      case "medium":
        return "border-l-violet-500 bg-gradient-to-r from-violet-50 to-violet-50/50 border-violet-100";
      case "low":
        return "border-l-emerald-500 bg-gradient-to-r from-emerald-50 to-emerald-50/50 border-emerald-100";
      default:
        return "border-l-gray-500 bg-gradient-to-r from-gray-50 to-gray-50/50 border-gray-100";
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case "quiz":
        return <Brain className="w-4 h-4" />;
      case "assignment":
        return <BookOpen className="w-4 h-4" />;
      case "lesson":
        return <Play className="w-4 h-4" />;
      case "live":
        return <Users className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  const navItems = [
    { icon: Home, label: "Dashboard", active: true },
    { icon: BookOpen, label: "Courses" },
    { icon: PieChart, label: "Analytics" },
    { icon: Trophy, label: "Achievements" },
    { icon: Calendar, label: "Schedule" },
    { icon: MessageSquare, label: "Community" },
    { icon: Briefcase, label: "Career Hub" },
    { icon: FileText, label: "Resources" },
  ];

  const bottomNavItems = [
    { icon: User, label: "Profile" },
    { icon: Settings, label: "Settings" },
    { icon: HelpCircle, label: "Help & Support" },
    { icon: LogOut, label: "Logout" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50/30 relative">
      {/* Enhanced Background with Edgenius Theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-96 -right-96 w-[48rem] h-[48rem] bg-gradient-to-br from-violet-500/10 via-purple-500/5 to-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute -bottom-96 -left-96 w-[48rem] h-[48rem] bg-gradient-to-br from-emerald-500/8 via-teal-500/5 to-cyan-500/8 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "3s" }}
        ></div>
        <div
          className="absolute top-1/3 left-1/3 w-[32rem] h-[32rem] bg-gradient-to-br from-pink-500/5 via-rose-500/3 to-orange-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "6s" }}
        ></div>
      </div>

      {/* Geometric Floating Elements - Edgenius Style */}
      <div
        className="absolute top-20 left-20 w-3 h-3 bg-violet-400 rounded-full animate-bounce opacity-60"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute top-40 right-32 w-2 h-8 bg-emerald-400 rounded-full animate-bounce opacity-60"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute bottom-40 left-32 w-4 h-4 bg-orange-400 rounded-full animate-bounce opacity-60"
        style={{ animationDelay: "3s" }}
      ></div>
      <div
        className="absolute top-60 right-20 w-6 h-2 bg-pink-400 rounded-full animate-bounce opacity-60"
        style={{ animationDelay: "4s" }}
      ></div>

      <div className="flex relative z-10">
        {/* Modern Sidebar - Edgenius Theme */}
        <div
          className={`fixed inset-y-0 left-0 bg-white/95 backdrop-blur-xl shadow-2xl transform transition-all duration-300 ease-in-out z-20 border-r border-violet-100/50 ${
            sidebarCollapsed ? "w-20" : "w-72"
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className={`p-6 ${sidebarCollapsed ? "p-4" : ""}`}>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Layers className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full"></div>
                  </div>
                  {!sidebarCollapsed && (
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">
                        EdgeGenius
                      </h2>
                      <p className="text-xs text-gray-500">Learning Platform</p>
                    </div>
                  )}
                </div>
                <button
                  className="p-2 rounded-lg hover:bg-violet-100 transition-colors"
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                >
                  <ChevronLeft
                    className={`w-5 h-5 text-violet-600 transition-transform ${
                      sidebarCollapsed ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>

              {/* Search */}
              {!sidebarCollapsed && (
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Quick search..."
                    className="w-full pl-10 pr-4 py-3 bg-violet-50 rounded-xl border border-violet-100 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent text-sm"
                  />
                </div>
              )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 pb-4 overflow-y-auto">
              <div className="space-y-1">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  const isActive = activeNavItem === item.label;
                  return (
                    <button
                      key={index}
                      onClick={() => setActiveNavItem(item.label)}
                      className={`flex items-center w-full p-3 rounded-xl transition-all group relative ${
                        isActive
                          ? "bg-gradient-to-r from-violet-500 to-indigo-600 text-white shadow-lg"
                          : "text-gray-700 hover:bg-violet-50 hover:text-violet-700"
                      }`}
                    >
                      {isActive && (
                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-white rounded-r-full"></div>
                      )}
                      <Icon
                        className={`w-5 h-5 ${
                          sidebarCollapsed ? "mx-auto" : "mr-3"
                        }`}
                      />
                      {!sidebarCollapsed && (
                        <span className="font-medium">{item.label}</span>
                      )}
                      {!sidebarCollapsed && isActive && (
                        <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Divider */}
              <div className="my-6 border-t border-gray-200"></div>

              {/* Bottom Navigation */}
              <div className="space-y-1">
                {bottomNavItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={index}
                      className="flex items-center w-full p-3 rounded-xl text-gray-700 hover:bg-violet-50 hover:text-violet-700 transition-all group"
                    >
                      <Icon
                        className={`w-5 h-5 ${
                          sidebarCollapsed ? "mx-auto" : "mr-3"
                        }`}
                      />
                      {!sidebarCollapsed && (
                        <span className="font-medium">{item.label}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </nav>

            {/* User Profile */}
            {!sidebarCollapsed && (
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center p-3 rounded-xl bg-gradient-to-r from-violet-50 to-indigo-50 border border-violet-100">
                  <img
                    src={user.avatar}
                    alt="Profile"
                    className="w-12 h-12 rounded-xl border-2 border-violet-200"
                  />
                  <div className="ml-3 flex-1 min-w-0">
                    <div className="text-sm font-semibold text-gray-800 truncate">
                      {user.name}
                    </div>
                    <div className="text-xs text-gray-600">
                      Level: {user.level}
                    </div>
                    <div className="text-xs text-violet-600 font-medium">
                      {user.xp} XP
                    </div>
                  </div>
                  <div className="ml-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-indigo-600 rounded-lg flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div
          className={`flex-1 transition-all duration-300 ${
            sidebarCollapsed ? "ml-20" : "ml-72"
          }`}
        >
          <div className="p-8 max-w-[1600px] mx-auto">
            {/* Header */}
            <div className="mb-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
                <div className="flex items-center space-x-6 mb-6 lg:mb-0">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 to-indigo-600 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
                    <div className="relative">
                      <img
                        src={user.avatar}
                        alt="Profile"
                        className="w-20 h-20 rounded-2xl shadow-2xl border-4 border-white"
                      />
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-violet-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                        <GraduationCap className="w-4 h-4 text-white" />
                      </div>
                      <div className="absolute -top-2 -left-2 px-2 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold rounded-full shadow-lg">
                        {user.rank}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <h1 className="text-4xl lg:text-5xl font-bold text-gray-800">
                        Welcome back,{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500">
                          {user.name.split(" ")[0]}
                        </span>
                        !
                      </h1>
                      <div className="animate-wave text-2xl">👋</div>
                    </div>
                    <p className="text-gray-600 text-lg mb-2">
                      Ready to explore the edge of knowledge?
                    </p>
                    <div className="text-sm text-gray-500">
                      {currentTime.toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}{" "}
                      •{" "}
                      {currentTime.toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="relative group">
                    <div
                      className={`absolute -inset-0.5 bg-gradient-to-r from-violet-500 to-indigo-600 rounded-2xl blur opacity-0 ${
                        searchFocused ? "opacity-30" : "group-hover:opacity-20"
                      } transition duration-300`}
                    ></div>
                    <div className="relative">
                      <Search
                        className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${
                          searchFocused ? "text-violet-500" : "text-gray-400"
                        }`}
                      />
                      <input
                        type="text"
                        placeholder="Search courses, instructors..."
                        onFocus={() => setSearchFocused(true)}
                        onBlur={() => setSearchFocused(false)}
                        className="pl-12 pr-4 py-4 bg-white/90 backdrop-blur-xl rounded-2xl border-2 border-violet-100 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent w-80 shadow-xl transition-all"
                      />
                    </div>
                  </div>
                  <button className="relative p-4 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all group border border-violet-100">
                    <Bell className="w-6 h-6 text-violet-600 group-hover:text-violet-700 transition-colors" />
                    <span className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg animate-pulse">
                      3
                    </span>
                  </button>
                  <button className="p-4 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all group border border-violet-100">
                    <Settings className="w-6 h-6 text-gray-600 group-hover:text-violet-600 transition-colors" />
                  </button>
                </div>
              </div>

              {/* Enhanced User Progress */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
                <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-violet-100">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="grid grid-cols-3 gap-8 mb-6 lg:mb-0">
                      <div className="text-center group cursor-pointer">
                        <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-indigo-600 group-hover:from-violet-600 group-hover:to-indigo-700 transition-colors">
                          {user.level}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          Current Level
                        </div>
                      </div>
                      <div className="text-center group cursor-pointer">
                        <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500 group-hover:from-emerald-600 group-hover:to-teal-600 transition-colors">
                          {user.streak}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          Day Streak 🔥
                        </div>
                      </div>
                      <div className="text-center group cursor-pointer">
                        <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500 group-hover:from-orange-600 group-hover:to-pink-600 transition-colors">
                          {user.xp}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          Edge Points
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 lg:max-w-md lg:ml-12">
                      <div className="flex justify-between text-sm text-gray-600 mb-3">
                        <span className="font-medium">
                          Progress to Next Level
                        </span>
                        <span className="font-bold">
                          {user.xp}/{user.nextLevelXp} XP
                        </span>
                      </div>
                      <div className="relative w-full bg-gray-200 rounded-full h-4 shadow-inner">
                        <div
                          className="h-4 rounded-full bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 transition-all duration-500 shadow-lg relative overflow-hidden"
                          style={{
                            width: `${(user.xp / user.nextLevelXp) * 100}%`,
                          }}
                        >
                          <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 mt-2 text-center">
                        {user.nextLevelXp - user.xp} XP to unlock Advanced level
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat) => {
                const IconComponent = stat.icon;
                return (
                  <div key={stat.id} className="group cursor-pointer">
                    <div className="relative">
                      <div
                        className={`absolute -inset-0.5 bg-gradient-to-r ${stat.color} rounded-3xl blur opacity-0 group-hover:opacity-30 transition duration-300`}
                      ></div>
                      <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-violet-100/50 hover:shadow-2xl transition-all transform group-hover:-translate-y-1">
                        <div className="flex items-center justify-between mb-6">
                          <div
                            className={`p-4 rounded-2xl bg-gradient-to-br ${stat.color} shadow-lg group-hover:shadow-xl transition-all transform group-hover:scale-110`}
                          >
                            <IconComponent className="w-7 h-7 text-white" />
                          </div>
                          <div className="text-right">
                            <div
                              className={`flex items-center px-3 py-1 rounded-full text-xs font-bold ${stat.bgColor} ${stat.textColor} border shadow-sm`}
                            >
                              <TrendingUp className="w-3 h-3 mr-1" />+
                              {stat.changePercent}%
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="text-3xl font-bold text-gray-800 mb-2 group-hover:text-gray-900 transition-colors">
                            {stat.value}
                          </div>
                          <div className="text-sm text-gray-600 mb-2">
                            {stat.label}
                          </div>
                          <div className="text-xs text-gray-500 font-medium">
                            {stat.change}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Rest of the content remains the same but with updated color schemes */}
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Continue Learning Section - keeping existing structure but with updated colors */}
              <div className="xl:col-span-2">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-bold text-gray-800">
                    Continue Learning
                  </h2>
                  <div className="flex items-center space-x-3">
                    <button className="flex items-center px-4 py-2 bg-violet-100 hover:bg-violet-200 rounded-xl transition-colors">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </button>
                    <button className="flex items-center text-violet-600 hover:text-violet-700 font-semibold">
                      View All <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>

                <div className="space-y-8">
                  {recentCourses.map((course) => (
                    <div key={course.id} className="group cursor-pointer">
                      <div className="relative">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-3xl blur opacity-0 group-hover:opacity-20 transition duration-300"></div>
                        <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl border border-violet-100/50 overflow-hidden hover:shadow-2xl transition-all transform group-hover:-translate-y-1">
                          <div className="flex flex-col lg:flex-row">
                            <div className="relative lg:w-72 h-56 lg:h-auto overflow-hidden">
                              <img
                                src={course.thumbnail}
                                alt={course.title}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                                <button className="p-4 bg-white/95 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-2xl transform hover:scale-110">
                                  <Play className="w-8 h-8 text-violet-600" />
                                </button>
                              </div>
                              <div
                                className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-sm ${getDifficultyColor(
                                  course.difficulty
                                )}`}
                              >
                                {course.difficulty}
                              </div>
                              <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-sm text-white text-xs font-bold rounded-full">
                                {course.category}
                              </div>
                              <div className="absolute bottom-4 left-4 text-white text-sm font-medium">
                                Last watched {course.lastAccessed}
                              </div>
                            </div>

                            <div className="flex-1 p-8">
                              <div className="flex flex-col lg:flex-row lg:justify-between mb-6">
                                <div className="flex-1 mb-6 lg:mb-0">
                                  <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-violet-600 transition-colors">
                                    {course.title}
                                  </h3>
                                  <p className="text-gray-600 mb-4 flex items-center">
                                    by{" "}
                                    <span className="font-semibold ml-1">
                                      {course.instructor}
                                    </span>
                                    <Star className="w-4 h-4 text-yellow-500 fill-current ml-3 mr-1" />
                                    <span className="font-bold">
                                      {course.rating}
                                    </span>
                                  </p>
                                  <div className="flex items-center flex-wrap gap-4 text-sm text-gray-500 mb-6">
                                    <div className="flex items-center bg-violet-50 px-3 py-1 rounded-full">
                                      <Clock className="w-4 h-4 mr-2" />
                                      {course.duration}
                                    </div>
                                    <div className="flex items-center bg-violet-50 px-3 py-1 rounded-full">
                                      <BookOpen className="w-4 h-4 mr-2" />
                                      {course.lessons} lessons
                                    </div>
                                    <div className="flex items-center bg-violet-50 px-3 py-1 rounded-full">
                                      <Users className="w-4 h-4 mr-2" />
                                      {course.studentsCount} students
                                    </div>
                                  </div>
                                </div>

                                <div className="flex flex-col items-end space-y-3">
                                  <button className="flex items-center px-6 py-3 bg-gradient-to-r from-violet-500 to-indigo-600 text-white rounded-xl font-semibold hover:from-violet-600 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                                    Continue Learning
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                  </button>
                                  <div className="flex items-center space-x-2">
                                    <button className="p-2 hover:bg-violet-100 rounded-lg transition-colors">
                                      <Bookmark className="w-5 h-5 text-gray-600" />
                                    </button>
                                    <button className="p-2 hover:bg-violet-100 rounded-lg transition-colors">
                                      <Share2 className="w-5 h-5 text-gray-600" />
                                    </button>
                                    <button className="p-2 hover:bg-violet-100 rounded-lg transition-colors">
                                      <MoreHorizontal className="w-5 h-5 text-gray-600" />
                                    </button>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <div className="flex justify-between text-sm font-medium mb-3">
                                  <span className="text-gray-700">
                                    Progress: {course.progress}%
                                  </span>
                                  <span className="text-violet-600">
                                    Next: {course.nextLesson}
                                  </span>
                                </div>
                                <div className="relative w-full bg-gray-200 rounded-full h-3 shadow-inner">
                                  <div
                                    className="h-3 rounded-full bg-gradient-to-r from-violet-500 to-indigo-600 transition-all duration-500 shadow-sm relative overflow-hidden"
                                    style={{ width: `${course.progress}%` }}
                                  >
                                    <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Upcoming Tasks */}
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-3xl blur opacity-0 group-hover:opacity-20 transition duration-300"></div>
                  <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-violet-100/50">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-gray-800">
                        Upcoming Tasks
                      </h3>
                      <div className="flex items-center space-x-1">
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                        <span className="text-xs text-red-600 font-bold">
                          {
                            upcomingTasks.filter(
                              (task) => task.priority === "high"
                            ).length
                          }{" "}
                          urgent
                        </span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {upcomingTasks.map((task) => (
                        <div
                          key={task.id}
                          className={`group/task cursor-pointer p-4 rounded-2xl border-l-4 transition-all hover:shadow-lg transform hover:-translate-y-0.5 ${getPriorityColor(
                            task.priority
                          )}`}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <div
                                className={`p-2 rounded-lg ${
                                  task.priority === "high"
                                    ? "bg-red-100"
                                    : task.priority === "medium"
                                    ? "bg-violet-100"
                                    : "bg-emerald-100"
                                }`}
                              >
                                {getTypeIcon(task.type)}
                              </div>
                              <div>
                                <h4 className="text-base font-semibold text-gray-800 group-hover/task:text-violet-600 transition-colors">
                                  {task.title}
                                </h4>
                                <p className="text-sm text-gray-600">
                                  {task.course}
                                </p>
                              </div>
                            </div>
                            <button className="p-2 hover:bg-violet-100 rounded-lg transition-colors">
                              <CheckCircle className="w-5 h-5 text-gray-500 group-hover/task:text-violet-500 transition-colors" />
                            </button>
                          </div>
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4" />
                              <span>
                                {task.dueDate} • {task.dueTime}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4" />
                              <span>{task.estimatedTime}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6">
                      <button className="flex items-center justify-center w-full px-4 py-3 bg-gradient-to-r from-violet-500 to-indigo-600 text-white rounded-xl font-semibold hover:from-violet-600 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                        View All Tasks
                        <ChevronRight className="w-5 h-5 ml-2" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Achievements Section */}
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl blur opacity-0 group-hover:opacity-20 transition duration-300"></div>
                  <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-violet-100/50">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-gray-800">
                        Achievements
                      </h3>
                      <button className="flex items-center text-violet-600 hover:text-violet-700 font-semibold">
                        View All <ChevronRight className="w-4 h-4 ml-1" />
                      </button>
                    </div>
                    <div className="space-y-4">
                      {achievements.map((achievement) => (
                        <div
                          key={achievement.id}
                          className={`flex items-center p-4 rounded-2xl border transition-all hover:shadow-lg transform hover:-translate-y-0.5 ${
                            achievement.earned
                              ? "border-l-4 border-l-emerald-500 bg-gradient-to-r from-emerald-50 to-emerald-50/50"
                              : "border-l-4 border-l-gray-300 bg-gradient-to-r from-gray-50 to-gray-50/50 opacity-75"
                          }`}
                        >
                          <div
                            className={`p-3 rounded-lg ${
                              achievement.earned
                                ? "bg-emerald-100"
                                : "bg-gray-100"
                            } mr-4`}
                          >
                            <span className="text-lg">{achievement.icon}</span>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-base font-semibold text-gray-800">
                              {achievement.title}
                            </h4>
                            {achievement.earned ? (
                              <p className="text-sm text-gray-600">
                                Earned on {achievement.date}
                              </p>
                            ) : (
                              <div className="relative w-full bg-gray-200 rounded-full h-2 mt-2">
                                <div
                                  className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
                                  style={{ width: `${achievement.progress}%` }}
                                ></div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
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

export default StudentDashboard;
