import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeftIcon, Bars3Icon } from "@heroicons/react/24/outline";
import Sidebar from "../Instructorsidebar/Instructorsidebar";

const MOCK_COURSES = [
  {
    id: "1",
    title: "Advanced JavaScript",
    description:
      "Comprehensive course covering modern JS concepts, ES6+, and advanced patterns",
    thumbnail:
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=300&h=200&fit=crop",
    category: "Development",
    price: 99.99,
    published: true,
    slug: "advanced-javascript",
  },
  {
    id: "2",
    title: "React Fundamentals",
    description:
      "Learn React from basics to advanced concepts with hands-on projects",
    thumbnail:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop",
    category: "Development",
    price: 129.99,
    published: true,
    slug: "react-fundamentals",
  },
  {
    id: "3",
    title: "Python for AI",
    description:
      "Python programming focused on AI applications and machine learning",
    thumbnail:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=300&h=200&fit=crop",
    category: "AI & Machine Learning",
    price: 149.99,
    published: false,
    slug: "python-for-ai",
  },
];

const EditCoursePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    thumbnail: "",
    category: "",
    price: 0,
    published: false,
  });

  const user = {
    name: "Dr. Eleanor Vance",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    level: 12,
    xpPoints: 3450,
  };
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (isEditing) {
      const course = MOCK_COURSES.find((c) => c.id === id);
      if (course) {
        setFormData({
          title: course.title,
          slug: course.slug,
          description: course.description,
          thumbnail: course.thumbnail,
          category: course.category,
          price: course.price,
          published: course.published,
        });
      }
    }
  }, [id, isEditing]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saving course:", formData);

    navigate("/instructor/courses");
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
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate("/instructor/courses")}
            className="p-2 text-[var(--color-edgenius-text-primary)] hover:bg-[var(--color-edgenius-accent-light)]/20 rounded-lg transition-colors"
          >
            <ArrowLeftIcon className="h-6 w-6" />
          </button>
          <h3 className="text-2xl font-bold text-[var(--color-edgenius-text-primary)] ml-4">
            Edit Course
          </h3>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--color-edgenius-text-primary)] mb-2">
                Course Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-3 border border-[var(--color-edgenius-accent-light)] rounded-lg focus:ring-2 focus:ring-[var(--color-edgenius-accent-medium)] focus:border-transparent outline-none"
                placeholder="Enter course title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-edgenius-text-primary)] mb-2">
                Course Slug
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                className="w-full p-3 border border-[var(--color-edgenius-accent-light)] rounded-lg focus:ring-2 focus:ring-[var(--color-edgenius-accent-medium)] focus:border-transparent outline-none"
                placeholder="e.g., advanced-javascript"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-edgenius-text-primary)] mb-2">
                Description
              </label>
              <textarea
                rows="4"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-3 border border-[var(--color-edgenius-accent-light)] rounded-lg focus:ring-2 focus:ring-[var(--color-edgenius-accent-medium)] focus:border-transparent outline-none"
                placeholder="Enter course description"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-edgenius-text-primary)] mb-2">
                Thumbnail URL
              </label>
              <input
                type="url"
                name="thumbnail"
                value={formData.thumbnail}
                onChange={handleChange}
                className="w-full p-3 border border-[var(--color-edgenius-accent-light)] rounded-lg focus:ring-2 focus:ring-[var(--color-edgenius-accent-medium)] focus:border-transparent outline-none"
                placeholder="Enter thumbnail image URL"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--color-edgenius-text-primary)] mb-2">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full p-3 border border-[var(--color-edgenius-accent-light)] rounded-lg focus:ring-2 focus:ring-[var(--color-edgenius-accent-medium)] focus:border-transparent outline-none"
                  placeholder="e.g., Development, Design"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-edgenius-text-primary)] mb-2">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full p-3 border border-[var(--color-edgenius-accent-light)] rounded-lg focus:ring-2 focus:ring-[var(--color-edgenius-accent-medium)] focus:border-transparent outline-none"
                  placeholder="e.g., 99.99"
                  step="0.01"
                  required
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="Save"
                checked={formData.published}
                onChange={handleChange}
                className="h-4 w-4 text-[var(--color-edgenius-accent-medium)] focus:ring-[var(--color-edgenius-accent-medium)] border-gray-300 rounded"
              />
              <label className="text-sm font-medium text-[var(--color-edgenius-text-primary)]">
                Save
              </label>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={() => navigate("/instructor/courses")}
                className="px-6 py-2 text-[var(--color-edgenius-text-secondary)] border border-[var(--color-edgenius-accent-light)] rounded-lg hover:bg-[var(--color-edgenius-accent-light)]/20 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-[var(--color-edgenius-accent-medium)] to-[var(--color-edgenius-accent-dark)] text-[var(--color-edgenius-button-text)] rounded-lg hover:shadow-lg transition-all duration-200 font-semibold"
              >
                Save Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCoursePage;
