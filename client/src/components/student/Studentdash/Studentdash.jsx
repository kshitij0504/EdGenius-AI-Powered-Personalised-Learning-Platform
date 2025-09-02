// import React from "react";
// import LearningMilestones from "./Milestone";
// import StudentLayout from "../StudentLayout";
// import {
//   IoBookOutline as IoBook2,
//   IoTimerOutline,
//   IoMedalOutline,
//   IoFlameOutline,
// } from "react-icons/io5";

// const Dashboard = () => {
//   return (
//     <StudentLayout>
//       <DashboardContent />
//     </StudentLayout>
//   );
// };

// const DashboardContent = ({ isDarkMode, user }) => {
//   const milestones = [
//     {
//       id: 1,
//       title: "React Hooks Certification",
//       description: "Master modern React patterns",
//       achieved: true,
//       date: "2025-06-15",
//     },
//     {
//       id: 2,
//       title: "Python Fundamentals Badge",
//       description: "Complete Python basics course",
//       achieved: true,
//       date: "2025-05-20",
//     },
//     {
//       id: 3,
//       title: "Completed 50 Lessons",
//       description: "Finish 50 interactive lessons",
//       achieved: false,
//       target: 50,
//       current: 42,
//     },
//     {
//       id: 4,
//       title: "Full-Stack Developer",
//       description: "Complete the full-stack learning path",
//       achieved: false,
//       target: 100,
//       current: 65,
//     },
//   ];

//   return (
//     <div className="space-y-6 sm:space-y-8">
//       {/* Stats Grid */}
//       <div
//         className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 animate-fade-in-up"
//         style={{ animationDelay: "0.2s" }}
//       >
//         {[
//           {
//             label: "Active Courses",
//             value: "3",
//             icon: (
//               <IoBook2
//                 className={`text-3xl ${isDarkMode ? "text-white" : ""}`}
//               />
//             ),
//             color: isDarkMode
//               ? "from-blue-600 to-blue-700"
//               : "from-blue-500 to-blue-600",
//           },
//           {
//             label: "Hours Learned",
//             value: "127",
//             icon: (
//               <IoTimerOutline
//                 className={`text-3xl ${isDarkMode ? "text-white" : ""}`}
//               />
//             ),
//             color: isDarkMode
//               ? "from-purple-600 to-purple-700"
//               : "from-purple-500 to-purple-600",
//           },
//           {
//             label: "Certificates",
//             value: "5",
//             icon: (
//               <IoMedalOutline
//                 className={`text-3xl ${isDarkMode ? "text-white" : ""}`}
//               />
//             ),
//             color: isDarkMode
//               ? "from-green-600 to-green-700"
//               : "from-green-500 to-green-600",
//           },
//           {
//             label: "Streak Days",
//             value: "23",
//             icon: (
//               <IoFlameOutline
//                 className={`text-3xl ${isDarkMode ? "text-white" : ""}`}
//               />
//             ),
//             color: isDarkMode
//               ? "from-red-600 to-red-700"
//               : "from-red-500 to-red-600",
//           },
//         ].map((stat, index) => (
//           <div
//             key={stat.label}
//             className={`relative p-4 sm:p-6 rounded-2xl border transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 group cursor-pointer ${
//               isDarkMode
//                 ? "bg-gray-800 border-gray-700 shadow-lg shadow-gray-900/50"
//                 : "bg-white border-gray-200 shadow-md shadow-gray-200/50"
//             }`}
//           >
//             <div
//               className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-r ${stat.color}`}
//             />

//             <div className="relative z-10">
//               <div className="flex items-center justify-between mb-3 sm:mb-4">
//                 <div
//                   className={`text-3xl sm:text-4xl p-2 sm:p-3 rounded-xl group-hover:scale-110 transition-transform duration-300 ${
//                     isDarkMode ? "bg-gray-700" : "bg-gray-100"
//                   }`}
//                 >
//                   {stat.icon}
//                 </div>
//                 <div className="text-right">
//                   <p
//                     className={`text-xs sm:text-sm font-semibold mb-1 ${
//                       isDarkMode ? "text-gray-400" : "text-gray-600"
//                     }`}
//                   >
//                     {stat.label}
//                   </p>
//                   <p
//                     className={`text-2xl sm:text-3xl font-black ${
//                       isDarkMode ? "text-white" : "text-gray-900"
//                     }`}
//                   >
//                     {stat.value}
//                   </p>
//                 </div>
//               </div>

//               <div
//                 className={`h-1.5 sm:h-2 rounded-full ${
//                   isDarkMode ? "bg-gray-700" : "bg-gray-200"
//                 }`}
//               >
//                 <div
//                   className={`h-1.5 sm:h-2 rounded-full transition-all duration-1000 group-hover:animate-pulse bg-gradient-to-r ${stat.color}`}
//                   style={{ width: `${60 + index * 10}%` }}
//                 />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Learning Milestones */}
//       <div className="animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
//         <LearningMilestones
//           milestones={milestones}
//           xpPoints={user.xpPoints}
//           level={user.level}
//           isDarkMode={isDarkMode}
//         />
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import React from "react";
import LearningMilestones from "./Milestone";
import StudentLayout from "../StudentLayout";
import {
  IoBookOutline as IoBook2,
  IoTimerOutline,
  IoMedalOutline,
  IoFlameOutline,
  IoStatsChartOutline,
  IoTrendingUpOutline,
  IoLayersOutline,
  IoCalendarOutline,
  IoPieChartOutline,
} from "react-icons/io5";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";

const Dashboard = () => {
  return (
    <StudentLayout>
      <DashboardContent />
    </StudentLayout>
  );
};

const DashboardContent = ({ isDarkMode, user }) => {
  const milestones = [
    {
      id: 1,
      title: "React Hooks Certification",
      description: "Master modern React patterns",
      achieved: true,
      date: "2025-06-15",
      category: "Frontend Development",
      points: 500,
      difficulty: "Intermediate",
    },
    {
      id: 2,
      title: "Python Fundamentals Badge",
      description: "Complete Python basics course",
      achieved: true,
      date: "2025-05-20",
      category: "Backend Development",
      points: 350,
      difficulty: "Beginner",
    },
    {
      id: 3,
      title: "Completed 50 Lessons",
      description: "Finish 50 interactive lessons",
      achieved: false,
      target: 50,
      current: 42,
      category: "Learning Progress",
      estimatedPoints: 200,
      difficulty: "Ongoing",
    },
    {
      id: 4,
      title: "Full-Stack Developer",
      description: "Complete the full-stack learning path",
      achieved: false,
      target: 100,
      current: 65,
      category: "Career Path",
      estimatedPoints: 1000,
      difficulty: "Advanced",
    },
  ];

  const weeklyProgressData = [
    { day: "Mon", hours: 2.5, lessons: 8 },
    { day: "Tue", hours: 3.2, lessons: 12 },
    { day: "Wed", hours: 1.8, lessons: 6 },
    { day: "Thu", hours: 4.1, lessons: 15 },
    { day: "Fri", hours: 3.7, lessons: 11 },
    { day: "Sat", hours: 2.9, lessons: 9 },
    { day: "Sun", hours: 1.5, lessons: 5 },
  ];

  const monthlyProgressData = [
    { month: "Jan", completed: 15, started: 22 },
    { month: "Feb", completed: 28, started: 35 },
    { month: "Mar", completed: 32, started: 41 },
    { month: "Apr", completed: 45, started: 52 },
    { month: "May", completed: 38, started: 47 },
    { month: "Jun", completed: 41, started: 48 },
  ];

  const skillsData = [
    { name: "Frontend", value: 75, color: "#3b82f6" },
    { name: "Backend", value: 60, color: "#10b981" },
    { name: "Database", value: 45, color: "#8b5cf6" },
    { name: "DevOps", value: 30, color: "#ef4444" },
  ];

  return (
    <div className="space-y-8">
      <div
        className={`p-6 rounded-2xl ${
          isDarkMode
            ? "bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 border border-gray-700"
            : "bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200"
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          <div className="lg:col-span-2">
            <h1
              className={`text-3xl font-bold mb-2 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Learning Analytics Dashboard
            </h1>
            <p
              className={`text-lg mb-4 ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Track your progress with detailed insights and visual analytics
            </p>
            <div className="flex flex-wrap gap-3">
              <div
                className={`px-4 py-2 rounded-lg ${
                  isDarkMode
                    ? "bg-blue-600 text-white"
                    : "bg-blue-600 text-white"
                }`}
              >
                Level {user?.level || 12}
              </div>
              <div
                className={`px-4 py-2 rounded-lg ${
                  isDarkMode
                    ? "bg-purple-600 text-white"
                    : "bg-purple-600 text-white"
                }`}
              >
                {user?.xpPoints || 2350} XP
              </div>
              <div
                className={`px-4 py-2 rounded-lg ${
                  isDarkMode
                    ? "bg-green-600 text-white"
                    : "bg-green-600 text-white"
                }`}
              >
                85% Progress
              </div>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div
              className={`p-4 rounded-xl ${
                isDarkMode ? "bg-gray-700" : "bg-white"
              }`}
            >
              <ResponsiveContainer width={200} height={120}>
                <PieChart>
                  <Pie
                    data={skillsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={50}
                    dataKey="value"
                    startAngle={90}
                    endAngle={450}
                  >
                    {skillsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <p
                className={`text-xs text-center mt-2 ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Skills Distribution
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {[
          {
            label: "Active Courses",
            value: "12",
            change: "+3 this month",
            icon: <IoBook2 className="text-2xl text-white" />,
            gradient: isDarkMode
              ? "bg-gradient-to-br from-blue-600 to-blue-700"
              : "bg-gradient-to-br from-blue-500 to-blue-600",
            chartData: [65, 75, 85, 70, 90, 85, 95],
          },
          {
            label: "Study Hours",
            value: "127",
            change: "+12h this week",
            icon: <IoTimerOutline className="text-2xl text-white" />,
            gradient: isDarkMode
              ? "bg-gradient-to-br from-purple-600 to-purple-700"
              : "bg-gradient-to-br from-purple-500 to-purple-600",
            chartData: [40, 55, 35, 65, 45, 75, 60],
          },
          {
            label: "Certificates",
            value: "8",
            change: "+2 earned",
            icon: <IoMedalOutline className="text-2xl text-white" />,
            gradient: isDarkMode
              ? "bg-gradient-to-br from-green-600 to-green-700"
              : "bg-gradient-to-br from-green-500 to-green-600",
            chartData: [20, 40, 30, 60, 45, 70, 85],
          },
          {
            label: "Learning Streak",
            value: "23",
            change: "Best: 45 days",
            icon: <IoFlameOutline className="text-2xl text-white" />,
            gradient: isDarkMode
              ? "bg-gradient-to-br from-red-600 to-red-700"
              : "bg-gradient-to-br from-red-500 to-red-600",
            chartData: [80, 85, 90, 75, 95, 100, 90],
          },
        ].map((stat, index) => (
          <div
            key={stat.label}
            className={`relative overflow-hidden rounded-xl ${stat.gradient} p-6 text-white`}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm opacity-80 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold mb-2">{stat.value}</p>
                <p className="text-xs opacity-70">{stat.change}</p>
              </div>
              <div className="p-2 bg-white/20 rounded-lg">{stat.icon}</div>
            </div>
            <div className="h-8">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stat.chartData.map((value, i) => ({ value }))}>
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="rgba(255,255,255,0.6)"
                    fill="rgba(255,255,255,0.2)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div
          className={`p-6 rounded-xl ${
            isDarkMode
              ? "bg-gray-800 border border-gray-700"
              : "bg-white border border-gray-200 shadow-sm"
          }`}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <IoStatsChartOutline
                className={`text-xl mr-3 ${
                  isDarkMode ? "text-blue-400" : "text-blue-600"
                }`}
              />
              <h3
                className={`text-lg font-semibold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Weekly Activity
              </h3>
            </div>
            <div
              className={`px-3 py-1 rounded-full text-xs ${
                isDarkMode
                  ? "bg-gray-700 text-gray-300"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              Last 7 days
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={weeklyProgressData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={isDarkMode ? "#374151" : "#e5e7eb"}
              />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: isDarkMode ? "#9ca3af" : "#6b7280",
                  fontSize: 12,
                }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: isDarkMode ? "#9ca3af" : "#6b7280",
                  fontSize: 12,
                }}
              />
              <Line
                type="monotone"
                dataKey="hours"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "#3b82f6", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div
          className={`p-6 rounded-xl ${
            isDarkMode
              ? "bg-gray-800 border border-gray-700"
              : "bg-white border border-gray-200 shadow-sm"
          }`}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <IoPieChartOutline
                className={`text-xl mr-3 ${
                  isDarkMode ? "text-purple-400" : "text-purple-600"
                }`}
              />
              <h3
                className={`text-lg font-semibold ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Monthly Progress
              </h3>
            </div>
            <div
              className={`px-3 py-1 rounded-full text-xs ${
                isDarkMode
                  ? "bg-gray-700 text-gray-300"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              6 months
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyProgressData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={isDarkMode ? "#374151" : "#e5e7eb"}
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: isDarkMode ? "#9ca3af" : "#6b7280",
                  fontSize: 12,
                }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{
                  fill: isDarkMode ? "#9ca3af" : "#6b7280",
                  fontSize: 12,
                }}
              />
              <Bar dataKey="completed" fill="#10b981" radius={4} />
              <Bar dataKey="started" fill="#8b5cf6" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <LearningMilestones
        milestones={milestones}
        xpPoints={user?.xpPoints || 2350}
        level={user?.level || 12}
        isDarkMode={isDarkMode}
      />
    </div>
  );
};

export default Dashboard;
