import { useState } from "react";
import {
  BookOpenIcon,
  XMarkIcon,
  UserGroupIcon,
  ClockIcon,
  PlusIcon,
  StarIcon,
  PencilIcon,
  TrashIcon
} from "@heroicons/react/24/outline";

const MyCoursesPage = () => {
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Advanced JavaScript",
      description:
        "Comprehensive course covering modern JS concepts, ES6+, and advanced patterns",
      students: 342,
      lessons: 24,
      duration: "8 weeks",
      status: "Published",
      rating: 4.8,
      lastUpdated: "2 days ago",
      thumbnail:
        "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=300&h=200&fit=crop",
    },
    {
      id: 2,
      title: "React Fundamentals",
      description:
        "Learn React from basics to advanced concepts with hands-on projects",
      students: 289,
      lessons: 18,
      duration: "6 weeks",
      status: "Published",
      rating: 4.6,
      lastUpdated: "1 week ago",
      thumbnail:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop",
    },
    {
      id: 3,
      title: "Python for AI",
      description:
        "Python programming focused on AI applications and machine learning",
      students: 156,
      lessons: 32,
      duration: "10 weeks",
      status: "Draft",
      rating: 4.9,
      lastUpdated: "3 days ago",
      thumbnail:
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=300&h=200&fit=crop",
    },
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  const handleDeleteCourse = (courseId) => {
    setCourses(courses.filter((course) => course.id !== courseId));
  };

  const handleEditCourse = (course) => {
    setEditingCourse(course);
    setShowCreateModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-3xl font-bold text-[var(--color-edgenius-text-primary)] mb-2">
            My Courses
          </h3>
          <p className="text-[var(--color-edgenius-text-secondary)]">
            Manage your courses, content, and track performance
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-gradient-to-r from-[var(--color-edgenius-accent-medium)] to-[var(--color-edgenius-accent-dark)] text-[var(--color-edgenius-button-text)] px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
        >
          <PlusIcon className="h-5 w-5" />
          <span>Create New Course</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
          >
            <div className="relative">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div
                className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
                  course.status === "Published"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {course.status}
              </div>
            </div>

            <div className="p-6">
              <h4 className="text-xl font-bold text-[var(--color-edgenius-text-primary)] mb-2">
                {course.title}
              </h4>
              <p className="text-[var(--color-edgenius-text-secondary)] text-sm mb-4 line-clamp-2">
                {course.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-[var(--color-edgenius-text-secondary)]">
                <div className="flex items-center">
                  <UserGroupIcon className="h-4 w-4 mr-1" />
                  {course.students} students
                </div>
                <div className="flex items-center">
                  <BookOpenIcon className="h-4 w-4 mr-1" />
                  {course.lessons} lessons
                </div>
                <div className="flex items-center">
                  <ClockIcon className="h-4 w-4 mr-1" />
                  {course.duration}
                </div>
                <div className="flex items-center">
                  <StarIcon className="h-4 w-4 mr-1 text-yellow-500" />
                  {course.rating}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-[var(--color-edgenius-text-secondary)]">
                  Updated {course.lastUpdated}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditCourse(course)}
                    className="p-2 text-[var(--color-edgenius-accent-dark)] hover:bg-[var(--color-edgenius-bg-lightest)] rounded-lg transition-colors"
                  >
                    <PencilIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteCourse(course.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-[var(--color-edgenius-text-primary)]">
                {editingCourse ? "Edit Course" : "Create New Course"}
              </h3>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setEditingCourse(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--color-edgenius-text-primary)] mb-2">
                  Course Title
                </label>
                <input
                  type="text"
                  className="w-full p-3 border border-[var(--color-edgenius-accent-light)] rounded-lg focus:ring-2 focus:ring-[var(--color-edgenius-accent-medium)] focus:border-transparent"
                  placeholder="Enter course title"
                  defaultValue={editingCourse?.title || ""}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--color-edgenius-text-primary)] mb-2">
                  Description
                </label>
                <textarea
                  rows="4"
                  className="w-full p-3 border border-[var(--color-edgenius-accent-light)] rounded-lg focus:ring-2 focus:ring-[var(--color-edgenius-accent-medium)] focus:border-transparent"
                  placeholder="Enter course description"
                  defaultValue={editingCourse?.description || ""}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-edgenius-text-primary)] mb-2">
                    Duration
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border border-[var(--color-edgenius-accent-light)] rounded-lg focus:ring-2 focus:ring-[var(--color-edgenius-accent-medium)] focus:border-transparent"
                    placeholder="e.g., 8 weeks"
                    defaultValue={editingCourse?.duration || ""}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-edgenius-text-primary)] mb-2">
                    Status
                  </label>
                  <select className="w-full p-3 border border-[var(--color-edgenius-accent-light)] rounded-lg focus:ring-2 focus:ring-[var(--color-edgenius-accent-medium)] focus:border-transparent">
                    <option value="Draft">Draft</option>
                    <option value="Published">Published</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false);
                    setEditingCourse(null);
                  }}
                  className="px-6 py-2 text-[var(--color-edgenius-text-secondary)] border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-[var(--color-edgenius-accent-medium)] to-[var(--color-edgenius-accent-dark)] text-[var(--color-edgenius-button-text)] rounded-lg hover:shadow-lg transition-all duration-200"
                >
                  {editingCourse ? "Update Course" : "Create Course"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCoursesPage;
