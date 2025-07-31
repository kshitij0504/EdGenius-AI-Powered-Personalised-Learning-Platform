import { useState } from "react";
import {
  ChartBarSquareIcon,
  UserGroupIcon,
  TrophyIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

const EnrolledStudent = () => {
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-3xl font-bold text-[var(--color-edgenius-text-primary)] mb-2">
            Enrolled Students
          </h3>
          <p className="text-[var(--color-edgenius-text-secondary)]">
            Monitor student progress and engagement across your courses
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="p-3 border border-[var(--color-edgenius-accent-light)] rounded-lg focus:ring-2 focus:ring-[var(--color-edgenius-accent-medium)] bg-white"
          >
            {courses.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[var(--color-edgenius-text-secondary)] text-sm font-medium mb-1">
                Total Students
              </p>
              <p className="text-3xl font-bold text-[var(--color-edgenius-text-primary)]">
                {students.length}
              </p>
            </div>
            <UserGroupIcon className="h-8 w-8 text-[var(--color-edgenius-accent-medium)]" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[var(--color-edgenius-text-secondary)] text-sm font-medium mb-1">
                Active Students
              </p>
              <p className="text-3xl font-bold text-[var(--color-edgenius-text-primary)]">
                {students.filter((s) => s.status === "Active").length}
              </p>
            </div>
            <TrophyIcon className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between">
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
            <ChartBarSquareIcon className="h-8 w-8 text-[var(--color-edgenius-accent-medium)]" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[var(--color-edgenius-text-secondary)] text-sm font-medium mb-1">
                This Month
              </p>
              <p className="text-3xl font-bold text-[var(--color-edgenius-text-primary)]">
                12
              </p>
            </div>
            <PlusIcon className="h-8 w-8 text-[var(--color-edgenius-accent-light)]" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h4 className="text-xl font-semibold text-[var(--color-edgenius-text-primary)]">
            Student Details
          </h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[var(--color-edgenius-bg-lightest)]">
              <tr>
                <th className="text-left p-4 font-semibold text-[var(--color-edgenius-text-primary)]">
                  Student
                </th>
                <th className="text-left p-4 font-semibold text-[var(--color-edgenius-text-primary)]">
                  Course
                </th>
                <th className="text-left p-4 font-semibold text-[var(--color-edgenius-text-primary)]">
                  Progress
                </th>
                <th className="text-left p-4 font-semibold text-[var(--color-edgenius-text-primary)]">
                  Status
                </th>
                <th className="text-left p-4 font-semibold text-[var(--color-edgenius-text-primary)]">
                  Last Active
                </th>
                <th className="text-left p-4 font-semibold text-[var(--color-edgenius-text-primary)]">
                  Joined
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr
                  key={student.id}
                  className="border-b border-gray-100 hover:bg-[var(--color-edgenius-bg-lightest)] transition-colors"
                >
                  <td className="p-4">
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
                  <td className="p-4">
                    <span className="bg-[var(--color-edgenius-accent-light)]/20 text-[var(--color-edgenius-accent-dark)] px-3 py-1 rounded-full text-sm font-medium">
                      {student.course}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
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
                  <td className="p-4">
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
                  <td className="p-4 text-[var(--color-edgenius-text-secondary)]">
                    {student.lastActive}
                  </td>
                  <td className="p-4 text-[var(--color-edgenius-text-secondary)]">
                    {student.joinedDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default EnrolledStudent;
