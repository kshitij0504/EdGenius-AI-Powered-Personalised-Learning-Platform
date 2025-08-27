import {
  IoRibbonOutline,
  IoGiftOutline,
  IoFlashOutline,
  IoTrendingUpOutline,
  IoStarOutline,
  IoCheckmarkCircleOutline,
  IoTrophyOutline,
  IoCalendarOutline,
} from "react-icons/io5";

const MilestoneCard = ({ milestone, isDarkMode }) => {
  const isAchieved = milestone.achieved;
  const progress = isAchieved
    ? 100
    : (milestone.current / milestone.target) * 100;

  return (
    <div
      className={`relative p-6 rounded-2xl border transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 group ${
        isAchieved
          ? isDarkMode
            ? "bg-gradient-to-br from-green-900/40 to-green-800/30 border-green-600/50 shadow-lg shadow-green-900/30 hover:shadow-xl hover:shadow-green-900/40"
            : "bg-gradient-to-br from-green-50 to-green-100/80 border-green-300/60 shadow-md shadow-green-200/50 hover:shadow-lg hover:shadow-green-200/70"
          : isDarkMode
          ? "bg-gradient-to-br from-gray-800/80 to-gray-900/60 border-gray-700/60 shadow-lg shadow-gray-900/40 hover:shadow-xl hover:shadow-gray-900/60"
          : "bg-gradient-to-br from-white to-gray-50/80 border-gray-200/80 shadow-md shadow-gray-200/40 hover:shadow-lg hover:shadow-gray-200/60"
      }`}
    >
      {isAchieved && (
        <div
          className={`absolute inset-0 rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300 ${
            isDarkMode
              ? "bg-gradient-to-br from-green-400/30 to-green-600/30"
              : "bg-gradient-to-br from-green-300/40 to-green-500/40"
          }`}
        />
      )}

      <div className="relative z-10">
        <div className="flex flex-wrap items-center justify-between mb-4 gap-3">
          <div className="flex items-center">
            <div
              className={`p-3 rounded-xl mr-4 transition-all duration-300 group-hover:scale-110 ${
                isAchieved
                  ? isDarkMode
                    ? "bg-gradient-to-br from-green-500 to-green-600 shadow-lg shadow-green-900/40"
                    : "bg-gradient-to-br from-green-500 to-green-600 shadow-md shadow-green-400/30"
                  : isDarkMode
                  ? "bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg shadow-blue-900/40"
                  : "bg-gradient-to-br from-blue-500 to-blue-600 shadow-md shadow-blue-400/30"
              }`}
            >
              {isAchieved ? (
                <IoCheckmarkCircleOutline className="text-xl text-white drop-shadow-sm" />
              ) : (
                <IoRibbonOutline className="text-xl text-white drop-shadow-sm" />
              )}
            </div>
            <div>
              <h4
                className={`text-lg font-semibold transition-colors duration-300 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {milestone.title}
              </h4>
              {milestone.description && (
                <p
                  className={`text-sm mt-1 transition-colors duration-300 ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {milestone.description}
                </p>
              )}
            </div>
          </div>

          {isAchieved && (
            <div className="flex items-center space-x-1 px-3 py-1 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full shadow-lg animate-pulse">
              <IoTrophyOutline className="text-white text-sm" />
              <span className="text-white text-xs font-semibold">Achieved</span>
            </div>
          )}
        </div>

        {isAchieved ? (
          <div className="space-y-4">
            <div
              className={`p-4 rounded-xl border transition-all duration-300 ${
                isDarkMode
                  ? "bg-gradient-to-r from-gray-900/60 to-gray-800/40 border-green-700/40 shadow-inner"
                  : "bg-gradient-to-r from-green-50/80 to-green-100/60 border-green-300/60 shadow-inner"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <IoCalendarOutline
                    className={`text-lg ${
                      isDarkMode ? "text-green-400" : "text-green-600"
                    }`}
                  />
                  <span
                    className={`text-sm font-medium ${
                      isDarkMode ? "text-green-300" : "text-green-700"
                    }`}
                  >
                    Completed on:
                  </span>
                </div>
                <span
                  className={`text-sm font-bold ${
                    isDarkMode ? "text-green-200" : "text-green-800"
                  }`}
                >
                  {milestone.date}
                </span>
              </div>
              <div
                className={`flex items-center space-x-2 text-sm ${
                  isDarkMode ? "text-green-300" : "text-green-700"
                }`}
              >
                <span>🎉</span>
                <span className="font-medium">
                  Congratulations! You've completed this milestone.
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span
                className={`text-sm font-medium transition-colors duration-300 ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Progress
              </span>
              <div className="flex items-center space-x-2">
                <span
                  className={`text-sm font-bold transition-colors duration-300 ${
                    isDarkMode ? "text-blue-400" : "text-blue-600"
                  }`}
                >
                  {milestone.current} / {milestone.target}
                </span>
                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${
                    isDarkMode
                      ? "bg-blue-900/50 text-blue-300 border border-blue-700/50"
                      : "bg-blue-100 text-blue-700 border border-blue-200"
                  }`}
                >
                  {Math.round(progress)}%
                </span>
              </div>
            </div>

            <div className="relative">
              <div
                className={`w-full rounded-full h-3 transition-colors duration-300 ${
                  isDarkMode ? "bg-gray-700" : "bg-gray-200"
                }`}
              >
                <div
                  className={`h-3 rounded-full transition-all duration-500 relative overflow-hidden ${
                    isDarkMode
                      ? "bg-gradient-to-r from-blue-500 to-blue-600"
                      : "bg-gradient-to-r from-blue-500 to-blue-600"
                  }`}
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
              </div>
            </div>

            <div
              className={`flex items-center justify-between text-xs transition-colors duration-300 ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              <div className="flex items-center space-x-2">
                <IoFlashOutline className="text-sm" />
                <span className="font-medium">
                  Keep going! You're doing great.
                </span>
              </div>
              <span className="font-semibold">
                {milestone.target - milestone.current} left
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const LearningMilestones = ({ milestones, xpPoints, level, isDarkMode }) => {
  const achievedCount = milestones.filter((m) => m.achieved).length;
  const totalMilestones = milestones.length;
  const completionRate =
    totalMilestones > 0 ? (achievedCount / totalMilestones) * 100 : 0;

  return (
    <section
      className={`p-8 rounded-2xl border transition-all duration-300 ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900/80 to-gray-800/60 border-gray-700/60 shadow-xl shadow-gray-900/50"
          : "bg-gradient-to-br from-white to-gray-50/80 border-gray-200/80 shadow-lg shadow-gray-200/40"
      }`}
    >
      <div className="text-center mb-8">
        <div
          className={`inline-flex items-center px-6 py-3 rounded-full text-white font-semibold text-sm mb-6 shadow-lg transition-all duration-300 hover:scale-105 ${
            isDarkMode
              ? "bg-gradient-to-r from-blue-600 to-blue-700 shadow-blue-900/40"
              : "bg-gradient-to-r from-blue-500 to-blue-600 shadow-blue-400/30"
          }`}
        >
          <IoTrendingUpOutline className="mr-2 text-lg" />
          Learning Milestones
        </div>
        <h3
          className={`text-3xl font-bold mb-3 transition-colors duration-300 ${
            isDarkMode
              ? "text-white bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent"
              : "text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
          }`}
        >
          Your Learning Journey
        </h3>
        <p
          className={`text-lg max-w-2xl mx-auto transition-colors duration-300 ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Track your progress and celebrate your achievements as you advance
          through your learning path.
        </p>

        {totalMilestones > 0 && (
          <div className="mt-6">
            <div
              className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${
                isDarkMode
                  ? "bg-gray-800/60 border border-gray-700/60"
                  : "bg-gray-100/80 border border-gray-200/80"
              }`}
            >
              <span
                className={`text-sm font-medium ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Overall Progress:
              </span>
              <span
                className={`text-sm font-bold ${
                  isDarkMode ? "text-blue-400" : "text-blue-600"
                }`}
              >
                {Math.round(completionRate)}%
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          {
            label: "XP Points",
            value: xpPoints.toLocaleString(),
            color: isDarkMode
              ? "bg-gradient-to-br from-blue-600 to-blue-700"
              : "bg-gradient-to-br from-blue-500 to-blue-600",
            icon: <IoFlashOutline className="text-2xl" />,
            shadowColor: isDarkMode
              ? "shadow-blue-900/40"
              : "shadow-blue-400/30",
          },
          {
            label: "Current Level",
            value: level,
            color: isDarkMode
              ? "bg-gradient-to-br from-purple-600 to-purple-700"
              : "bg-gradient-to-br from-purple-500 to-purple-600",
            icon: <IoStarOutline className="text-2xl" />,
            shadowColor: isDarkMode
              ? "shadow-purple-900/40"
              : "shadow-purple-400/30",
          },
          {
            label: "Achievements",
            value: `${achievedCount}/${totalMilestones}`,
            color: isDarkMode
              ? "bg-gradient-to-br from-green-600 to-green-700"
              : "bg-gradient-to-br from-green-500 to-green-600",
            icon: <IoGiftOutline className="text-2xl" />,
            shadowColor: isDarkMode
              ? "shadow-green-900/40"
              : "shadow-green-400/30",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className={`p-6 rounded-2xl text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1 ${stat.color} ${stat.shadowColor}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90 mb-2 font-medium">
                  {stat.label}
                </p>
                <p className="text-3xl font-bold drop-shadow-sm">
                  {stat.value}
                </p>
              </div>
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl shadow-inner">
                {stat.icon}
              </div>
            </div>
            <div className="mt-4 h-1 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-1 bg-white/60 rounded-full transition-all duration-1000"
                style={{ width: `${60 + i * 15}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {milestones.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {milestones.map((milestone, index) => (
            <div
              key={milestone.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <MilestoneCard milestone={milestone} isDarkMode={isDarkMode} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div
            className={`p-12 rounded-2xl inline-block mb-6 transition-colors duration-300 ${
              isDarkMode
                ? "bg-gradient-to-br from-gray-800/60 to-gray-900/40"
                : "bg-gradient-to-br from-gray-100/80 to-gray-200/60"
            }`}
          >
            <IoRibbonOutline
              className={`text-6xl transition-colors duration-300 ${
                isDarkMode ? "text-gray-500" : "text-gray-400"
              }`}
            />
          </div>
          <h4
            className={`text-xl font-semibold mb-3 transition-colors duration-300 ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            No Milestones Yet
          </h4>
          <p
            className={`max-w-md mx-auto transition-colors duration-300 ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Keep learning to unlock your first milestone! Your achievements will
            appear here as you progress through your courses.
          </p>
        </div>
      )}
    </section>
  );
};

export default LearningMilestones;
