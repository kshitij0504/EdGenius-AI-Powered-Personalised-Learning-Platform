// import {
//   UserGroupIcon,
//   BookOpenIcon,
//   ChartBarIcon,
//   AcademicCapIcon,
//   StarIcon,
// } from "@heroicons/react/24/outline";

// const DashboardHome = () => {
//   const stats = [
//     {
//       id: 1,
//       name: "Total Students",
//       value: "1,250",
//       icon: UserGroupIcon,
//       change: "+12%",
//       changeType: "increase",
//       color: "blue",
//     },
//     {
//       id: 2,
//       name: "Active Courses",
//       value: "15",
//       icon: BookOpenIcon,
//       change: "+2",
//       changeType: "increase",
//       color: "green",
//     },
//     {
//       id: 3,
//       name: "Course Rating",
//       value: "4.7",
//       icon: StarIcon,
//       change: "+0.2",
//       changeType: "increase",
//       color: "yellow",
//     },
//     {
//       id: 4,
//       name: "New Enrollments",
//       value: "85",
//       icon: AcademicCapIcon,
//       change: "+23%",
//       changeType: "increase",
//       color: "purple",
//     },
//   ];

//   const recentActivities = [
//     {
//       id: 1,
//       user: "Michael Chen",
//       action: "enrolled in",
//       course: "Advanced JavaScript",
//       timestamp: "10 min ago",
//       avatar:
//         "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
//     },
//     {
//       id: 2,
//       user: "Emily Davis",
//       action: "completed lesson in",
//       course: "React Fundamentals",
//       timestamp: "1 hour ago",
//       avatar:
//         "https://images.unsplash.com/photo-1494790108755-2616b612b278?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
//     },
//     {
//       id: 3,
//       user: "Sarah Johnson",
//       action: "submitted assignment in",
//       course: "Python for AI",
//       timestamp: "2 hours ago",
//       avatar:
//         "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
//     },
//     {
//       id: 4,
//       user: "David Wilson",
//       action: "started",
//       course: "Node.js Backend",
//       timestamp: "3 hours ago",
//       avatar:
//         "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
//     },
//   ];

//   const topCourses = [
//     {
//       id: 1,
//       title: "Advanced JavaScript",
//       rating: 4.8,
//       students: 342,
//       progress: 85,
//       category: "Programming",
//     },
//     {
//       id: 2,
//       title: "React Fundamentals",
//       rating: 4.6,
//       students: 289,
//       progress: 92,
//       category: "Frontend",
//     },
//     {
//       id: 3,
//       title: "Python for AI",
//       rating: 4.9,
//       students: 156,
//       progress: 78,
//       category: "AI/ML",
//     },
//     {
//       id: 4,
//       title: "Node.js Backend",
//       rating: 4.5,
//       students: 203,
//       progress: 65,
//       category: "Backend",
//     },
//   ];

//   const getColorClasses = (color) => {
//     const colorMap = {
//       blue: "bg-blue-50 text-blue-600",
//       green: "bg-green-50 text-green-600",
//       yellow: "bg-yellow-50 text-yellow-600",
//       purple: "bg-purple-50 text-purple-600",
//     };
//     return colorMap[color] || colorMap.blue;
//   };

//   return (
//     <div className="space-y-8">
//       {/* Enhanced Header */}
//       <div className="mb-10">
//         <div className="flex items-center justify-between mb-4">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900 mb-2">
//               Welcome back, Dr. Eleanor Vance
//             </h1>
//             <p className="text-lg text-gray-600">
//               Here's an overview of your teaching dashboard
//             </p>
//           </div>
//           <div className="text-right">
//             <p className="text-sm text-gray-500">
//               {new Date().toLocaleDateString("en-US", {
//                 weekday: "long",
//                 year: "numeric",
//                 month: "long",
//                 day: "numeric",
//               })}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Enhanced Stats Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-10">
//         {stats.map((stat) => (
//           <div
//             key={stat.id}
//             className="bg-white rounded-2xl border border-gray-200 p-8 hover:border-gray-300 hover:shadow-lg transition-all duration-300 group cursor-pointer"
//           >
//             <div className="flex items-center justify-between mb-6">
//               <div className={`p-3 rounded-xl ${getColorClasses(stat.color)}`}>
//                 <stat.icon className="h-7 w-7" />
//               </div>
//               <span className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
//                 {stat.change}
//               </span>
//             </div>
//             <div>
//               <p className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
//                 {stat.value}
//               </p>
//               <p className="text-base text-gray-600">{stat.name}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
//         {/* Enhanced Recent Activity */}
//         <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-lg transition-shadow duration-300">
//           <div className="flex items-center justify-between mb-8">
//             <h2 className="text-2xl font-semibold text-gray-900">
//               Recent Activity
//             </h2>
//             <button className="text-base text-blue-600 hover:text-blue-700 font-medium hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors">
//               View all
//             </button>
//           </div>
//           <div className="space-y-6">
//             {recentActivities.map((activity) => (
//               <div
//                 key={activity.id}
//                 className="flex items-center space-x-6 p-4 hover:bg-gray-50 rounded-xl transition-colors duration-200 group"
//               >
//                 <img
//                   src={activity.avatar}
//                   alt={activity.user}
//                   className="w-14 h-14 rounded-full object-cover border-2 border-gray-200 group-hover:border-blue-200 transition-colors"
//                 />
//                 <div className="flex-1 min-w-0">
//                   <p className="text-base text-gray-900">
//                     <span className="font-semibold">{activity.user}</span>{" "}
//                     {activity.action}{" "}
//                     <span className="font-semibold text-blue-600">
//                       {activity.course}
//                     </span>
//                   </p>
//                   <p className="text-sm text-gray-500 mt-1">
//                     {activity.timestamp}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Enhanced Top Courses */}
//         <div className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-lg transition-shadow duration-300">
//           <div className="flex items-center justify-between mb-8">
//             <h2 className="text-2xl font-semibold text-gray-900">
//               Top Courses
//             </h2>
//             <button className="text-base text-blue-600 hover:text-blue-700 font-medium hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors">
//               View all
//             </button>
//           </div>
//           <div className="space-y-6">
//             {topCourses.map((course) => (
//               <div
//                 key={course.id}
//                 className="space-y-4 p-4 hover:bg-gray-50 rounded-xl transition-colors duration-200 group"
//               >
//                 <div className="flex items-start justify-between">
//                   <div className="flex-1">
//                     <h3 className="text-base font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
//                       {course.title}
//                     </h3>
//                     <span className="inline-block bg-gray-100 text-gray-600 text-xs font-medium px-2 py-1 rounded-md mb-3">
//                       {course.category}
//                     </span>
//                     <div className="flex items-center space-x-4">
//                       <div className="flex items-center">
//                         <StarIcon className="h-5 w-5 text-yellow-400 fill-current" />
//                         <span className="text-sm text-gray-600 ml-1 font-medium">
//                           {course.rating}
//                         </span>
//                       </div>
//                       <span className="text-sm text-gray-600 font-medium">
//                         {course.students} students
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="w-full bg-gray-200 rounded-full h-3">
//                   <div
//                     className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500 group-hover:from-blue-600 group-hover:to-blue-700"
//                     style={{ width: `${course.progress}%` }}
//                   ></div>
//                 </div>
//                 <div className="text-sm text-gray-600 font-medium text-right">
//                   {course.progress}% complete
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardHome;
import {
  TrendingUp,
  TrendingDown,
  Users,
  BookOpen,
  GraduationCap,
  Star,
  Calendar,
  Clock,
  DollarSign,
  MessageCircle,
  HelpCircle,
} from "lucide-react";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const DashboardHome = () => {
  const stats = [
    {
      id: 1,
      name: "Total Students",
      value: "1,250",
      icon: Users,
      change: "+12%",
      changeType: "increase",
      color: "blue",
    },
    {
      id: 2,
      name: "Active Courses",
      value: "15",
      icon: BookOpen,
      change: "+2",
      changeType: "increase",
      color: "green",
    },
    {
      id: 3,
      name: "Course Rating",
      value: "4.7",
      icon: Star,
      change: "+0.2",
      changeType: "increase",
      color: "yellow",
    },
    {
      id: 4,
      name: "New Enrollments",
      value: "85",
      icon: GraduationCap,
      change: "+23%",
      changeType: "increase",
      color: "purple",
    },
  ];

  // Earnings data
  const earningsData = [
    { month: "Jul 2020", earnings: 5200 },
    { month: "Aug 2020", earnings: 5800 },
    { month: "Sep 2020", earnings: 5400 },
    { month: "Oct 2020", earnings: 6100 },
    { month: "Nov 2020", earnings: 5900 },
    { month: "Dec 2020", earnings: 6800 },
    { month: "Jan 2021", earnings: 7200 },
    { month: "Feb 2021", earnings: 6900 },
    { month: "Mar 2021", earnings: 7500 },
    { month: "Apr 2021", earnings: 7100 },
    { month: "May 2021", earnings: 6700 },
    { month: "Jun 2021", earnings: 5800 },
  ];

  // Student activity data
  const studentActivityData = [
    { day: 1, students: 180 },
    { day: 2, students: 220 },
    { day: 3, students: 190 },
    { day: 4, students: 250 },
    { day: 5, students: 280 },
    { day: 6, students: 310 },
    { day: 7, students: 329 },
  ];

  const enrollmentData = [
    { day: 1, enrollments: 120 },
    { day: 2, enrollments: 150 },
    { day: 3, enrollments: 140 },
    { day: 4, enrollments: 180 },
    { day: 5, enrollments: 160 },
    { day: 6, enrollments: 200 },
    { day: 7, enrollments: 194 },
  ];

  const myCourses = [
    {
      id: 1,
      title: "UI/UX Design with Adobe XD",
      code: "UI/X",
      price: "$178.00",
      sold: 20,
      revenue: "$3,560",
    },
    {
      id: 2,
      title: "Front-end Web Development with React",
      code: "WDR",
      price: "$99.00",
      sold: 9,
      revenue: "$891",
    },
    {
      id: 3,
      title: "Learn PHP Basic to Advance",
      code: "PHP",
      price: "$99.00",
      sold: 10,
      revenue: "$990",
    },
    {
      id: 4,
      title: "Learn Android Development with project",
      code: "AD",
      price: "$99.00",
      sold: 10,
      revenue: "$990",
    },
    {
      id: 5,
      title: "Front-end Web Development with React",
      code: "WDR",
      price: "$99.00",
      sold: 8,
      revenue: "$792",
    },
  ];

  const studentFeedback = [
    {
      id: 1,
      name: "Abu Bin Ishtiyak",
      email: "info@softino.com",
      avatar: "AB",
      rating: 5,
      review: "Full Review",
      color: "purple",
    },
    {
      id: 2,
      name: "Ashley Lawson",
      email: "ashley@softino.com",
      avatar: "AL",
      rating: 4.5,
      review: "Full Review",
      color: "blue",
    },
    {
      id: 3,
      name: "Jane Montgomery",
      email: "jane84@example.com",
      avatar: "JM",
      rating: 4.5,
      review: "Full Review",
      color: "yellow",
    },
    {
      id: 4,
      name: "Larry Henry",
      email: "larry@example.com",
      avatar: "LH",
      rating: 4,
      review: "Full Review",
      color: "green",
    },
  ];

  const supportRequests = [
    {
      id: 1,
      name: "Vincent Lopez",
      message: "Thanks for contact us with your issues...",
      time: "6 min ago",
      status: "new",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=faces",
    },
    {
      id: 2,
      name: "Daniel Moore",
      message: "Thanks for contact us with your issues...",
      time: "2 Hours ago",
      status: "pending",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=faces",
    },
    {
      id: 3,
      name: "Larry Henry",
      message: "Thanks for contact us with your issues...",
      time: "3 Hours ago",
      status: "resolved",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=faces",
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

  const getColorClasses = (color) => {
    const colorMap = {
      blue: "bg-blue-50 text-blue-600",
      green: "bg-green-50 text-green-600",
      yellow: "bg-yellow-50 text-yellow-600",
      purple: "bg-purple-50 text-purple-600",
    };
    return colorMap[color] || colorMap.blue;
  };

  const getAvatarColor = (color) => {
    const colorMap = {
      purple: "bg-purple-500 text-white",
      blue: "bg-blue-500 text-white",
      yellow: "bg-yellow-500 text-white",
      green: "bg-green-500 text-white",
    };
    return colorMap[color] || colorMap.blue;
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              Instructor Overview
            </h1>
            <p className="text-base text-gray-600">
              Here's an overview of your teaching dashboard
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-white border border-gray-200 rounded-lg px-3 py-1.5">
              <Calendar className="h-5 w-5 text-gray-500" />
              <span className="text-sm text-gray-700">Last 30 Days</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid (smaller cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:border-gray-300 hover:shadow-md transition-all duration-300 group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`p-2.5 rounded-lg ${getColorClasses(stat.color)}`}
              >
                <stat.icon className="h-6 w-6" />
              </div>
              <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                {stat.change}
              </span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-gray-700 transition-colors">
                {stat.value}
              </p>
              <p className="text-sm text-gray-600">{stat.name}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Earnings Overview - BarChart */}
        <div className="xl:col-span-8 bg-white rounded-2xl border border-gray-200 p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Total Earnings
            </h2>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={earningsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                  tickFormatter={(value) => `$${value / 1000}k`}
                />
                <Bar
                  dataKey="earnings"
                  fill="#8b5cf6"
                  radius={[6, 6, 0, 0]}
                  barSize={28}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right sidebar - Takes 4 columns */}
        <div className="xl:col-span-4 space-y-6">
          {/* Active Students */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-purple-600">
                Active Students
              </h3>
              <div className="flex items-center text-sm text-green-500 font-medium">
                <TrendingUp className="h-4 w-4 mr-1" />
                1.63%
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-2">329</p>
            <p className="text-sm text-gray-500 mb-4">vs. last week</p>
            <div className="h-20">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={studentActivityData}>
                  <Area
                    type="monotone"
                    dataKey="students"
                    stroke="#06b6d4"
                    fill="#06b6d4"
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* New Enrollment */}
          <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-purple-600">
                New Enrollment
              </h3>
              <div className="flex items-center text-sm text-green-500 font-medium">
                <TrendingUp className="h-4 w-4 mr-1" />
                4.63%
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-2">194</p>
            <p className="text-sm text-gray-500 mb-4">vs. Yesterday</p>
            <div className="h-20">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={enrollmentData}>
                  <Area
                    type="monotone"
                    dataKey="enrollments"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.2}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* My Courses - Takes 4 columns */}
        <div className="xl:col-span-4 bg-white rounded-2xl border border-gray-200 p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">My Courses</h2>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {myCourses.map((course) => (
              <div
                key={course.id}
                className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-semibold text-gray-600">
                      {course.code}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 mb-1">
                      {course.title}
                    </p>
                    <p className="text-xs text-gray-500">{course.price}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">
                    {course.revenue}
                  </p>
                  <p className="text-xs text-gray-500">{course.sold} Sold</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Student's Feedback - Takes 4 columns */}
        <div className="xl:col-span-4 bg-white rounded-2xl border border-gray-200 p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Student's Feedback
            </h2>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {studentFeedback.map((feedback) => (
              <div key={feedback.id} className="flex items-center space-x-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${getAvatarColor(
                    feedback.color
                  )}`}
                >
                  {feedback.avatar}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {feedback.name}
                  </p>
                  <p className="text-xs text-gray-500">{feedback.email}</p>
                </div>
                <div className="text-right">
                  {renderStars(feedback.rating)}
                  <button className="text-xs text-purple-600 hover:text-purple-700 font-medium mt-1">
                    {feedback.review}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Student Support Requests - Takes 4 columns */}
        <div className="xl:col-span-4 bg-white rounded-2xl border border-gray-200 p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Student Support Requests
            </h2>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              All Requests
            </button>
          </div>
          <div className="space-y-4">
            {supportRequests.map((request) => (
              <div key={request.id} className="flex items-start space-x-3">
                <img
                  src={request.avatar}
                  alt={request.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {request.name}
                  </p>
                  <p className="text-xs text-gray-500 mb-1">
                    {request.message}
                  </p>
                  <p className="text-xs text-gray-400">{request.time}</p>
                </div>
                <div
                  className={`w-3 h-3 rounded-full ${
                    request.status === "new"
                      ? "bg-blue-500"
                      : request.status === "pending"
                      ? "bg-yellow-500"
                      : "bg-gray-400"
                  }`}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
