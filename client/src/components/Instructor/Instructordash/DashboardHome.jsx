import {
  UserGroupIcon,
  BookOpenIcon,
  ChartBarIcon,
  AcademicCapIcon,
  StarIcon,
} from "@heroicons/react/24/outline";

const DashboardHome = () => {
  const stats = [
    {
      id: 1,
      name: "Total Students",
      value: "1,250",
      icon: UserGroupIcon,
      change: "+12%",
      changeType: "increase",
      color: "blue",
    },
    {
      id: 2,
      name: "Active Courses",
      value: "15",
      icon: BookOpenIcon,
      change: "+2",
      changeType: "increase",
      color: "green",
    },
    {
      id: 3,
      name: "Course Rating",
      value: "4.7",
      icon: StarIcon,
      change: "+0.2",
      changeType: "increase",
      color: "yellow",
    },
    {
      id: 4,
      name: "New Enrollments",
      value: "85",
      icon: AcademicCapIcon,
      change: "+23%",
      changeType: "increase",
      color: "purple",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      user: "Michael Chen",
      action: "enrolled in",
      course: "Advanced JavaScript",
      timestamp: "10 min ago",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    },
    {
      id: 2,
      user: "Emily Davis",
      action: "completed lesson in",
      course: "React Fundamentals",
      timestamp: "1 hour ago",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b278?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    },
    {
      id: 3,
      user: "Sarah Johnson",
      action: "submitted assignment in",
      course: "Python for AI",
      timestamp: "2 hours ago",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    },
    {
      id: 4,
      user: "David Wilson",
      action: "started",
      course: "Node.js Backend",
      timestamp: "3 hours ago",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    },
  ];

  const topCourses = [
    {
      id: 1,
      title: "Advanced JavaScript",
      rating: 4.8,
      students: 342,
      progress: 85,
      category: "Programming",
    },
    {
      id: 2,
      title: "React Fundamentals",
      rating: 4.6,
      students: 289,
      progress: 92,
      category: "Frontend",
    },
    {
      id: 3,
      title: "Python for AI",
      rating: 4.9,
      students: 156,
      progress: 78,
      category: "AI/ML",
    },
    {
      id: 4,
      title: "Node.js Backend",
      rating: 4.5,
      students: 203,
      progress: 65,
      category: "Backend",
    },
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      blue: "bg-blue-50 text-blue-600",
      green: "bg-green-50 text-green-600",
      yellow: "bg-yellow-50 text-yellow-600",
      purple: "bg-purple-50 text-purple-600",
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <div className="space-y-8">
      {/* Enhanced Header */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, Dr. Eleanor Vance
            </h1>
            <p className="text-lg text-gray-600">
              Here's an overview of your teaching dashboard
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-10">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="bg-white rounded-2xl border border-gray-200 p-8 hover:border-gray-300 hover:shadow-lg transition-all duration-300 group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-6">
              <div className={`p-3 rounded-xl ${getColorClasses(stat.color)}`}>
                <stat.icon className="h-7 w-7" />
              </div>
              <span className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                {stat.change}
              </span>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                {stat.value}
              </p>
              <p className="text-base text-gray-600">{stat.name}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Enhanced Recent Activity */}
        <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-gray-900">
              Recent Activity
            </h2>
            <button className="text-base text-blue-600 hover:text-blue-700 font-medium hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors">
              View all
            </button>
          </div>
          <div className="space-y-6">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center space-x-6 p-4 hover:bg-gray-50 rounded-xl transition-colors duration-200 group"
              >
                <img
                  src={activity.avatar}
                  alt={activity.user}
                  className="w-14 h-14 rounded-full object-cover border-2 border-gray-200 group-hover:border-blue-200 transition-colors"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-base text-gray-900">
                    <span className="font-semibold">{activity.user}</span>{" "}
                    {activity.action}{" "}
                    <span className="font-semibold text-blue-600">
                      {activity.course}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {activity.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Top Courses */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-semibold text-gray-900">
              Top Courses
            </h2>
            <button className="text-base text-blue-600 hover:text-blue-700 font-medium hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors">
              View all
            </button>
          </div>
          <div className="space-y-6">
            {topCourses.map((course) => (
              <div
                key={course.id}
                className="space-y-4 p-4 hover:bg-gray-50 rounded-xl transition-colors duration-200 group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {course.title}
                    </h3>
                    <span className="inline-block bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-md mb-3">
                      {course.category}
                    </span>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <StarIcon className="h-5 w-5 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 ml-1 font-medium">
                          {course.rating}
                        </span>
                      </div>
                      <span className="text-sm text-gray-600 font-medium">
                        {course.students} students
                      </span>
                    </div>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500 group-hover:from-blue-600 group-hover:to-blue-700"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-600 font-medium text-right">
                  {course.progress}% complete
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
