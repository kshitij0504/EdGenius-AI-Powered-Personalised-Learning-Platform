import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpenIcon,
  UserGroupIcon,
  ClockIcon,
  PlusIcon,
  StarIcon,
  PencilIcon,
  TrashIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import Sidebar from "../Instructorsidebar/Instructorsidebar";

const MyCoursesPage = () => {
  const navigate = useNavigate();

  const user = {
    name: "Dr. Eleanor Vance",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    level: 12,
    xpPoints: 3450,
  };
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [courses, setCourses] = useState([
    {
      id: "1",
      title: "Advanced JavaScript",
      description:
        "Comprehensive course covering modern JS concepts, ES6+, and advanced patterns",
      students: 342,
      lessons: 24,
      duration: "8 weeks",
      published: true,
      rating: 4.8,
      lastUpdated: "2 days ago",
      thumbnail:
        "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=300&h=200&fit=crop",
      price: 99.99,
      category: "Development",
      slug: "advanced-javascript",
    },
    {
      id: "2",
      title: "React Fundamentals",
      description:
        "Learn React from basics to advanced concepts with hands-on projects",
      students: 289,
      lessons: 18,
      duration: "6 weeks",
      published: true,
      rating: 4.6,
      lastUpdated: "1 week ago",
      thumbnail:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop",
      price: 129.99,
      category: "Development",
      slug: "react-fundamentals",
    },
    {
      id: "3",
      title: "Python for AI",
      description:
        "Python programming focused on AI applications and machine learning",
      students: 156,
      lessons: 32,
      duration: "10 weeks",
      published: false,
      rating: 4.9,
      lastUpdated: "3 days ago",
      thumbnail:
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=300&h=200&fit=crop",
      price: 149.99,
      category: "AI & Machine Learning",
      slug: "python-for-ai",
    },
  ]);

  const handleDeleteCourse = (courseId) => {
    setCourses(courses.filter((course) => course.id !== courseId));
  };

  const handleEditCourse = (courseId) => {
    navigate(`/instructor/editcourse`);
  };

  const handleAddCourse = () => {
    navigate("/instructor/createcourse");
  };

  const handleAddContent = () => {
    navigate("/instructor/addcontent");
  };

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
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div className="flex-1 flex flex-col p-4 md:p-8 transition-all duration-300 ease-in-out">
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

        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h3 className="text-3xl font-bold text-[var(--color-edgenius-text-primary)] mb-2">
              My Courses
            </h3>
            <p className="text-[var(--color-edgenius-text-secondary)]">
              Manage your courses, content, and track performance.
            </p>
          </div>
          <button
            onClick={handleAddCourse}
            className="mt-4 md:mt-0 bg-gradient-to-r from-[var(--color-edgenius-accent-medium)] to-[var(--color-edgenius-accent-dark)] text-[var(--color-edgenius-button-text)] px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 font-semibold"
          >
            <PlusIcon className="h-5 w-5" />
            <span>Create New Course</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-[var(--color-edgenius-accent-light)]"
            >
              <div className="relative">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-40 object-cover"
                />
                <div
                  className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
                    course.published
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {course.published ? "Published" : "Draft"}
                </div>
              </div>

              <div className="p-4">
                <h4 className="text-xl font-bold text-[var(--color-edgenius-text-primary)] mb-2">
                  {course.title}
                </h4>
                <p className="text-[var(--color-edgenius-text-secondary)] text-sm mb-4 line-clamp-2">
                  {course.description}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-[var(--color-edgenius-text-secondary)]">
                  <div className="flex items-center">
                    <UserGroupIcon className="h-4 w-4 mr-1 text-[var(--color-edgenius-accent-medium)]" />
                    {course.students} students
                  </div>
                  <div className="flex items-center">
                    <BookOpenIcon className="h-4 w-4 mr-1 text-[var(--color-edgenius-accent-medium)]" />
                    {course.lessons} lessons
                  </div>
                  <div className="flex items-center">
                    <ClockIcon className="h-4 w-4 mr-1 text-[var(--color-edgenius-accent-medium)]" />
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
                      onClick={() => handleAddContent(course.id)}
                      className="p-2 text-[var(--color-edgenius-accent-dark)] hover:bg-[var(--color-edgenius-accent-light)]/20 rounded-lg transition-colors"
                    >
                      <PlusIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleEditCourse(course.id)}
                      className="p-2 text-[var(--color-edgenius-accent-dark)] hover:bg-[var(--color-edgenius-accent-light)]/20 rounded-lg transition-colors"
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
      </div>
    </div>
  );
};

export default MyCoursesPage;
