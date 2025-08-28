import { useState } from "react";
import {
  ChartBarSquareIcon,
  UserGroupIcon,
  TrophyIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import Sidebar from "../Instructorsidebar/Instructorsidebar";
import { Bars3Icon } from "@heroicons/react/24/outline";

const EnrolledStudent = () => {
  const user = {
    name: "Dr. Eleanor Vance",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    level: 12,
    xpPoints: 3450,
  };
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [students] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      course: "Advanced JavaScript",
      progress: 75,
      lastActive: "2 hours ago",
      status: "Active",
      joinedDate: "Jan 15, 2024",
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.chen@email.com",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      course: "React Fundamentals",
      progress: 60,
      lastActive: "1 day ago",
      status: "Active",
      joinedDate: "Jan 20, 2024",
    },
    {
      id: 3,
      name: "Emily Davis",
      email: "emily.davis@email.com",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      course: "Python for AI",
      progress: 40,
      lastActive: "3 days ago",
      status: "Inactive",
      joinedDate: "Jan 10, 2024",
    },
    {
      id: 4,
      name: "David Wilson",
      email: "david.wilson@email.com",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      course: "Advanced JavaScript",
      progress: 90,
      lastActive: "5 hours ago",
      status: "Active",
      joinedDate: "Dec 28, 2023",
    },
  ]);

  const [selectedCourse, setSelectedCourse] = useState("All Courses");
  const courses = [
    "All Courses",
    "Advanced JavaScript",
    "React Fundamentals",
    "Python for AI",
  ];

  const filteredStudents =
    selectedCourse === "All Courses"
      ? students
      : students.filter((student) => student.course === selectedCourse);

  return (
    <div className="flex min-h-screen bg-[var(--color-edgenius-bg-lightest)]">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <Sidebar
        user={user}
        onHoverChange={setIsSidebarHovered}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div
        className={`flex-1 flex flex-col p-4 md:p-8 transition-all duration-300 ease-in-out 
          ${isSidebarHovered ? "ml-64" : "ml-20"}`}
      >
        <header className="lg:hidden sticky top-0 bg-[var(--color-edgenius-bg-lightest)]">
          <div className="flex items-center justify-between h-16 mt-[-20px]">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="text-[var(--color-edgenius-text-primary)] hover:bg-gray-100 rounded-md transition-colors"
              aria-label="Open sidebar"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
            <div className="w-10 h-10"></div>
          </div>
        </header>

        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 md:mb-8">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-[var(--color-edgenius-text-primary)] mb-1">
              Enrolled Students
            </h3>
            <p className="text-sm md:text-base text-[var(--color-edgenius-text-secondary)]">
              Monitor student progress and engagement across your courses.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full p-3 border border-[var(--color-edgenius-accent-light)] rounded-lg focus:ring-2 focus:ring-[var(--color-edgenius-accent-medium)] focus:border-transparent outline-none bg-white text-[var(--color-edgenius-text-primary)]"
            >
              {courses.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-md md:shadow-xl border border-[var(--color-edgenius-accent-light)]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[var(--color-edgenius-text-secondary)] text-sm font-medium mb-1">
                  Total Students
                </p>
                <p className="text-3xl font-bold text-[var(--color-edgenius-text-primary)]">
                  {students.length}
                </p>
              </div>
              <div className="p-2 bg-[var(--color-edgenius-accent-light)]/20 rounded-lg">
                <UserGroupIcon className="h-6 w-6 text-[var(--color-edgenius-accent-medium)]" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md md:shadow-xl border border-[var(--color-edgenius-accent-light)]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[var(--color-edgenius-text-secondary)] text-sm font-medium mb-1">
                  Active Students
                </p>
                <p className="text-3xl font-bold text-[var(--color-edgenius-text-primary)]">
                  {students.filter((s) => s.status === "Active").length}
                </p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <TrophyIcon className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md md:shadow-xl border border-[var(--color-edgenius-accent-light)]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[var(--color-edgenius-text-secondary)] text-sm font-medium mb-1">
                  Avg Progress
                </p>
                <p className="text-3xl font-bold text-[var(--color-edgenius-text-primary)]">
                  {Math.round(
                    students.reduce((acc, s) => acc + s.progress, 0) /
                      students.length
                  )}
                  %
                </p>
              </div>
              <div className="p-2 bg-[var(--color-edgenius-accent-light)]/20 rounded-lg">
                <ChartBarSquareIcon className="h-6 w-6 text-[var(--color-edgenius-accent-medium)]" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md md:shadow-xl border border-[var(--color-edgenius-accent-light)]">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[var(--color-edgenius-text-secondary)] text-sm font-medium mb-1">
                  New Students
                </p>
                <p className="text-3xl font-bold text-[var(--color-edgenius-text-primary)]">
                  12
                </p>
              </div>
              <div className="p-2 bg-[var(--color-edgenius-accent-light)]/20 rounded-lg">
                <PlusIcon className="h-6 w-6 text-[var(--color-edgenius-accent-light)]" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md md:shadow-xl overflow-hidden border border-[var(--color-edgenius-accent-light)]">
          <div className="p-4 md:p-6 border-b border-[var(--color-edgenius-accent-light)]">
            <h4 className="text-lg md:text-xl font-semibold text-[var(--color-edgenius-text-primary)]">
              Student Details
            </h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[var(--color-edgenius-bg-lightest)]">
                <tr>
                  <th className="text-left p-4 font-semibold text-[var(--color-edgenius-text-primary)] whitespace-nowrap">
                    Student
                  </th>
                  <th className="text-left p-4 font-semibold text-[var(--color-edgenius-text-primary)] whitespace-nowrap">
                    Course
                  </th>
                  <th className="text-left p-4 font-semibold text-[var(--color-edgenius-text-primary)] whitespace-nowrap">
                    Progress
                  </th>
                  <th className="text-left p-4 font-semibold text-[var(--color-edgenius-text-primary)] whitespace-nowrap">
                    Status
                  </th>
                  <th className="text-left p-4 font-semibold text-[var(--color-edgenius-text-primary)] whitespace-nowrap">
                    Last Active
                  </th>
                  <th className="text-left p-4 font-semibold text-[var(--color-edgenius-text-primary)] whitespace-nowrap">
                    Joined
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student, index) => (
                  <tr
                    key={student.id}
                    className={`hover:bg-[var(--color-edgenius-bg-lightest)] transition-colors ${
                      index < filteredStudents.length - 1
                        ? "border-b border-[var(--color-edgenius-accent-light)]"
                        : ""
                    }`}
                  >
                    <td className="p-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <img
                          src={student.avatar}
                          alt={student.name}
                          className="w-10 h-10 rounded-full border-2 border-[var(--color-edgenius-accent-light)]"
                        />
                        <div>
                          <p className="font-semibold text-[var(--color-edgenius-text-primary)]">
                            {student.name}
                          </p>
                          <p className="text-sm text-[var(--color-edgenius-text-secondary)]">
                            {student.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <span className="bg-[var(--color-edgenius-accent-light)]/20 text-[var(--color-edgenius-accent-dark)] px-3 py-1 rounded-full text-sm font-medium">
                        {student.course}
                      </span>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-[var(--color-edgenius-accent-light)] to-[var(--color-edgenius-accent-medium)] h-2 rounded-full"
                            style={{ width: `${student.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-[var(--color-edgenius-text-primary)]">
                          {student.progress}%
                        </span>
                      </div>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          student.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {student.status}
                      </span>
                    </td>
                    <td className="p-4 whitespace-nowrap text-[var(--color-edgenius-text-secondary)]">
                      {student.lastActive}
                    </td>
                    <td className="p-4 whitespace-nowrap text-[var(--color-edgenius-text-secondary)]">
                      {student.joinedDate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EnrolledStudent;
