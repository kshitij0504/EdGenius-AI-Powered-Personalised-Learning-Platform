import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Menu,
  Upload,
  Image,
  DollarSign,
  Tag,
  FileText,
  BookOpen,
  Eye,
  Save,
  X,
  Settings,
  ImageIcon,
} from "lucide-react";
import Sidebar from "../Instructorsidebar/Instructorsidebar";
import { createCourse } from "../../../helpers/API/courseApi";

const CreateCoursePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const user = {
    name: "Dr. Eleanor Vance",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    level: 12,
    xpPoints: 3450,
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    thumbnailFile: null,
    category: "",
    price: 0,
    published: false,
  });

  const categories = [
    "Development",
    "Design",
    "Marketing",
    "Business",
    "AI & Machine Learning",
    "Data Science",
    "Photography",
    "Music",
    "Health & Fitness",
    "Personal Development",
  ];

  useEffect(() => {
    if (formData.title && !isEditing) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setFormData((prev) => ({ ...prev, slug }));
    }
  }, [formData.title, isEditing]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : files ? files[0] : value,
    }));

    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => setPreviewImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        setFormData((prev) => ({ ...prev, thumbnailFile: file }));
        const reader = new FileReader();
        reader.onload = (e) => setPreviewImage(e.target.result);
        reader.readAsDataURL(file);
      }
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, thumbnailFile: null }));
    setPreviewImage(null);
  };

  const handleSubmit = async (e) => {
    console.log("Submitting form with data:", formData);
    e.preventDefault();
    setIsLoading(true);

    try {
      const courseData = {
        title: formData.title,
        slug: formData.slug,
        description: formData.description,
        category: formData.category,
        price: parseFloat(formData.price),
        published: formData.published,
        thumbnail: formData.thumbnailFile,
      };

      const response = await createCourse(courseData);
      console.log("Course created:", response.data);

      navigate("/instructor/courses");
    } catch (err) {
      console.error(
        "Error creating course:",
        err.response?.data || err.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
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
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out 
          ${isSidebarHovered ? "ml-64" : "ml-20"}`}
      >
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden text-gray-600 hover:bg-gray-100 p-2 rounded-md transition-colors mr-3"
                aria-label="Open sidebar"
              >
                <Menu className="h-6 w-6" />
              </button>
              <button
                onClick={() => navigate("/instructor/courses")}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors mr-3"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {isEditing ? "Edit Course" : "Create New Course"}
                </h1>
                <p className="text-gray-600 text-sm">
                  {isEditing
                    ? "Update your course details"
                    : "Fill in the details to create your new course"}
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => navigate("/instructor/courses")}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium flex items-center disabled:opacity-50"
                disabled={isLoading}
              >
                <Save className="h-4 w-4 mr-2" />
                {isLoading
                  ? "Saving..."
                  : isEditing
                  ? "Update Course"
                  : "Create Course"}
              </button>
            </div>
          </div>
        </header>

        <div className="flex-1 p-6 overflow-hidden">
          <form onSubmit={handleSubmit} className="h-full">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
              <div className="lg:col-span-2 space-y-6 overflow-y-auto">
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                  <div className="flex items-center mb-6">
                    <div className="p-2 bg-blue-50 rounded-lg mr-3">
                      <BookOpen className="h-5 w-5 text-blue-600" />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      Course Information
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Course Title *
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Enter course title..."
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Course Slug *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="slug"
                          value={formData.slug}
                          onChange={handleChange}
                          className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="course-slug"
                          required
                        />
                        <Tag className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        URL-friendly version of the title
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description *
                      </label>
                      <div className="relative">
                        <textarea
                          rows="4"
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                          placeholder="Describe what students will learn..."
                          required
                        />
                        <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                  <div className="flex items-center mb-6">
                    <div className="p-2 bg-purple-50 rounded-lg mr-3">
                      <Settings className="h-5 w-5 text-purple-600" />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      Course Details
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category *
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        required
                      >
                        <option value="">Select a category</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price ($) *
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={handleChange}
                          className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="0.00"
                          step="0.01"
                          min="0"
                          required
                        />
                        <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 text-gray-600 mr-3" />
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">
                            Publish Course
                          </h3>
                          <p className="text-xs text-gray-500">
                            Make this course visible to students
                          </p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="published"
                          checked={formData.published}
                          onChange={handleChange}
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm h-fit">
                  <div className="flex items-center mb-6">
                    <div className="p-2 bg-green-50 rounded-lg mr-3">
                      <ImageIcon className="h-5 w-5 text-green-600" />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      Course Thumbnail
                    </h2>
                  </div>

                  <div
                    className={`border-2 border-dashed rounded-lg p-6 text-center transition-all relative ${
                      dragActive
                        ? "border-blue-400 bg-blue-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    {previewImage ? (
                      <div className="relative">
                        <img
                          src={previewImage}
                          alt="Course thumbnail preview"
                          className="w-full h-32 object-cover rounded-lg mx-auto"
                        />
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        >
                          <X className="h-3 w-3" />
                        </button>
                        <p className="text-xs text-gray-500 mt-3">
                          Click to replace or drag a new image
                        </p>
                      </div>
                    ) : (
                      <div>
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-3" />
                        <p className="text-sm font-medium text-gray-700 mb-1">
                          Upload Thumbnail
                        </p>
                        <p className="text-xs text-gray-500 mb-2">
                          Drag and drop or click to select
                        </p>
                        <p className="text-xs text-gray-400">
                          Recommended: 1280x720px
                        </p>
                      </div>
                    )}
                    <input
                      type="file"
                      name="thumbnailFile"
                      accept="image/*"
                      onChange={handleChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Course Preview
                  </h3>

                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="h-32 bg-gray-100 flex items-center justify-center">
                      {previewImage ? (
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-center">
                          <Image className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-xs text-gray-500">
                            No image uploaded
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      <div className="mb-2">
                        <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          {formData.category || "No Category"}
                        </span>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm">
                        {formData.title || "Course Title"}
                      </h4>
                      <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                        {formData.description ||
                          "Course description will appear here..."}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-gray-900">
                          ${formData.price || "0.00"}
                        </span>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            formData.published
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {formData.published ? "Published" : "Draft"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCoursePage;
