import {
  UserGroupIcon,
  BookOpenIcon,
  ChartBarSquareIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";

const DashboardHome = () => {
  const stats = [
    {
      id: 1,
      name: "Total Students",
      value: "1,250",
      icon: UserGroupIcon,
      color: "text-blue-500",
    },
    {
      id: 2,
      name: "Total Courses",
      value: "15",
      icon: BookOpenIcon,
      color: "text-green-500",
    },
    {
      id: 3,
      name: "Average Course Rating",
      value: "4.7 / 5",
      icon: ChartBarSquareIcon,
      color: "text-yellow-500",
    },
    {
      id: 4,
      name: "New Enrollments (Last 30 days)",
      value: "+85",
      icon: AcademicCapIcon,
      color: "text-purple-500",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      user: "Michael Chen",
      action: "enrolled in",
      course: "Advanced JavaScript",
      timestamp: "10 minutes ago",
    },
    {
      id: 2,
      user: "Emily Davis",
      action: "completed a lesson in",
      course: "React Fundamentals",
      timestamp: "1 hour ago",
    },
    {
      id: 3,
      user: "You",
      action: "published a new course",
      course: "Data Science with Python",
      timestamp: "2 hours ago",
    },
    {
      id: 4,
      user: "Sarah Johnson",
      action: "submitted an assignment in",
      course: "Python for AI",
      timestamp: "5 hours ago",
    },
  ];

  const coursePerformance = [
    {
      id: 1,
      title: "Advanced JavaScript",
      rating: 4.8,
      students: 342,
    },
    {
      id: 2,
      title: "React Fundamentals",
      rating: 4.6,
      students: 289,
    },
    {
      id: 3,
      title: "Python for AI",
      rating: 4.9,
      students: 156,
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div>
        <h3 className="text-3xl font-extrabold text-[var(--color-edgenius-text-primary)] mb-2">
          Hello, Dr. Eleanor Vance!
        </h3>
        <p className="text-[var(--color-edgenius-text-secondary)]">
          Welcome back to your instructor dashboard. Here’s an overview of your
          progress.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[var(--color-edgenius-text-secondary)] text-sm font-medium mb-1">
                  {stat.name}
                </p>
                <p className="text-3xl font-bold text-[var(--color-edgenius-text-primary)]">
                  {stat.value}
                </p>
              </div>
              <stat.icon
                className={`h-12 w-12 ${stat.color} opacity-70 transition-transform duration-300 group-hover:scale-110`}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-xl">
          <h4 className="text-xl font-bold text-[var(--color-edgenius-text-primary)] mb-4">
            Recent Activity
          </h4>
          <ul className="space-y-4">
            {recentActivities.map((activity) => (
              <li
                key={activity.id}
                className="flex items-center space-x-3 p-3 bg-[var(--color-edgenius-bg-lightest)] rounded-xl hover:bg-gray-100 transition-colors duration-200"
              >
                <span className="h-2 w-2 bg-[var(--color-edgenius-accent-medium)] rounded-full animate-pulse"></span>
                <p className="text-[var(--color-edgenius-text-primary)] flex-1">
                  <span className="font-semibold">{activity.user}</span>{" "}
                  {activity.action}{" "}
                  <span className="font-semibold">{activity.course}</span>
                </p>
                <span className="text-xs text-[var(--color-edgenius-text-secondary)]">
                  {activity.timestamp}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-1 bg-white rounded-2xl p-6 shadow-xl">
          <h4 className="text-xl font-bold text-[var(--color-edgenius-text-primary)] mb-4">
            Top Courses
          </h4>
          <ul className="space-y-4">
            {coursePerformance.map((course) => (
              <li
                key={course.id}
                className="flex justify-between items-center pb-4 border-b last:border-b-0"
              >
                <div>
                  <p className="font-semibold text-[var(--color-edgenius-text-primary)]">
                    {course.title}
                  </p>
                  <div className="flex items-center text-sm text-[var(--color-edgenius-text-secondary)]">
                    <AcademicCapIcon className="h-4 w-4 mr-1" />
                    <span>{course.students} students</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-lg font-bold text-yellow-500 mr-1">
                    ★
                  </span>
                  <span className="text-lg font-bold text-[var(--color-edgenius-text-primary)]">
                    {course.rating}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
