import React from "react";
import LearningMilestones from "./Milestone";
import StudentLayout from "../StudentLayout";
import {
  IoBookOutline as IoBook2,
  IoTimerOutline,
  IoMedalOutline,
  IoFlameOutline,
} from "react-icons/io5";

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
    <div className="space-y-6 sm:space-y-8">
      {/* Stats Grid */}
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
            className={`relative p-4 sm:p-6 rounded-2xl border transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 group cursor-pointer ${
              isDarkMode
                ? "bg-gray-800 border-gray-700 shadow-lg shadow-gray-900/50"
                : "bg-white border-gray-200 shadow-md shadow-gray-200/50"
            }`}
          >
            <div
              className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-r ${stat.color}`}
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

      {/* Learning Milestones */}
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
  );
};

export default Dashboard;
