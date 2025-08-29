import { useState, useEffect } from "react";
import {
  BookOpenIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  Bars3Icon,
  ChevronDownIcon,
  ChevronRightIcon,
  PlayIcon,
  DocumentTextIcon,
  AcademicCapIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import Sidebar from "../Instructorsidebar/Instructorsidebar";
import {
  getModules,
  createModule,
  updateModule,
  deleteModule,
} from "../../../helpers/API/moduleApi";
import {
  getLessonsByModule,
  createLesson,
  updateLesson,
  deleteLesson,
} from "../../../helpers/API/lessonApi";
import { useParams } from "react-router-dom";

const AddContentPage = () => {
  const { courseId } = useParams();
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);
  const user = {
    name: "Dr. Eleanor Vance",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    level: 12,
    xpPoints: 3450,
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedChapters, setExpandedChapters] = useState({});
  const [isAddingChapter, setIsAddingChapter] = useState(false);
  const [isAddingLesson, setIsAddingLesson] = useState(null);
  const [editingChapter, setEditingChapter] = useState(null);
  const [editingLesson, setEditingLesson] = useState(null);

  const [courseData, setCourseData] = useState({ title: "", chapters: [] });
  const [newChapter, setNewChapter] = useState({ title: "" });
  const [newLesson, setNewLesson] = useState({
    title: "",
    content: "",
    videoUrl: "",
  });

  const fetchModules = async () => {
    try {
      const res = await getModules(courseId);
      const modules = res.data.data;

      const withLessons = await Promise.all(
        modules.map(async (m) => {
          const lessonsRes = await getLessonsByModule(m.id);
          return { ...m, lessons: lessonsRes.data.data };
        })
      );

      setCourseData({ title: "Your Course Title", chapters: withLessons });
    } catch (err) {
      console.error("Error fetching modules:", err);
    }
  };

  useEffect(() => {
    if (courseId) fetchModules();
  }, [courseId]);

  const toggleChapter = (chapterId) => {
    setExpandedChapters((prev) => ({ ...prev, [chapterId]: !prev[chapterId] }));
  };

  const handleAddChapter = async (title) => {
    try {
      await createModule(courseId, { title });
      await fetchModules();
      setNewChapter({ title: "" });
      setIsAddingChapter(false);
    } catch (err) {
      console.error("Error adding chapter:", err);
    }
  };

  const handleDeleteChapter = async (chapterId) => {
    try {
      await deleteModule(chapterId);
      await fetchModules();
    } catch (err) {
      console.error("Error deleting chapter:", err);
    }
  };

  const handleEditChapter = async (chapterId, newTitle) => {
    try {
      await updateModule(chapterId, { title: newTitle });
      await fetchModules();
      setEditingChapter(null);
    } catch (err) {
      console.error("Error editing chapter:", err);
    }
  };

  const handleAddLesson = async (chapterId, { title, content, videoUrl }) => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("moduleId", chapterId);
      if (videoUrl) {
        formData.append("video", videoUrl);
      }

      console.log("Sending lesson data:", [...formData.entries()]);

      await createLesson(formData);

      await fetchModules();
      setNewLesson({ title: "", content: "", videoUrl: "" });
      setIsAddingLesson(null);
    } catch (err) {
      console.error("Error adding lesson:", err.response?.data || err.message);
    }
  };

  const handleDeleteLesson = async (lessonId) => {
    try {
      await deleteLesson(lessonId);
      await fetchModules();
    } catch (err) {
      console.error("Error deleting lesson:", err);
    }
  };

  const handleEditLesson = async (lessonId, updatedData) => {
    try {
      await updateLesson(lessonId, updatedData);
      await fetchModules();
      setEditingLesson(null);
    } catch (err) {
      console.error("Error editing lesson:", err);
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
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
        <header className="lg:hidden sticky top-0 bg-[color:var(--color-bg)] z-20">
          <div className="flex items-center justify-between h-16 mt-[-20px]">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="text-[color:var(--text-dashboard-secondary)] hover:bg-gray-100 rounded-md p-2 transition-colors"
              aria-label="Open sidebar"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
            <div className="w-10 h-10"></div>
          </div>
        </header>

        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h1 className="text-3xl font-bold text-[color:var(--text-dashboard-primary)] mb-2">
                Course Content
              </h1>
              <p className="text-[color:var(--text-dashboard-secondary)] mb-3">
                Managing content for:{" "}
                <span className="font-semibold text-[color:var(--text-dashboard-primary)]">
                  {courseData.title}
                </span>
              </p>
              <div className="flex items-center space-x-6 text-sm text-[color:var(--text-dashboard-tertiary)]">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 bg-blue-100 rounded-lg">
                    <AcademicCapIcon className="h-4 w-4 text-blue-600" />
                  </div>
                  <span>{courseData.chapters.length} chapters</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 bg-green-100 rounded-lg">
                    <BookOpenIcon className="h-4 w-4 text-green-600" />
                  </div>
                  <span>
                    {courseData.chapters.reduce(
                      (total, chapter) => total + chapter.lessons.length,
                      0
                    )}{" "}
                    lessons
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsAddingChapter(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors shadow-sm"
            >
              <PlusIcon className="h-5 w-5" />
              <span>Add New Chapter</span>
            </button>
          </div>
        </div>

        {isAddingChapter && (
          <div className="bg-[color:var(--color-card)] rounded-xl shadow-sm border border-[color:var(--color-card-border)] p-6 mb-6 animate-fade-in-up">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <PlusIcon className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-[color:var(--text-dashboard-primary)]">
                Add New Chapter
              </h3>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Enter chapter title..."
                value={newChapter.title}
                onChange={(e) => setNewChapter({ title: e.target.value })}
                className="flex-1 px-4 py-3 border border-[color:var(--border-dashboard-light)] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-[color:var(--color-card)] text-[color:var(--text-dashboard-primary)]"
              />
              <div className="flex space-x-3">
                <button
                  onClick={() => handleAddChapter(newChapter.title)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Add Chapter
                </button>
                <button
                  onClick={() => {
                    setIsAddingChapter(false);
                    setNewChapter({ title: "" });
                  }}
                  className="bg-gray-100 hover:bg-gray-200 text-[color:var(--text-dashboard-secondary)] px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {courseData.chapters.map((chapter, chapterIndex) => (
            <div
              key={chapter.id}
              className="bg-white rounded-xl shadow-sm border border-[color:var(--color-card-border)] overflow-hidden transition-all duration-300 hover:shadow-md"
            >
              <div className="px-6 py-4 bg-white border-b border-[color:var(--border-dashboard-light)]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <button
                      onClick={() => toggleChapter(chapter.id)}
                      className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      {expandedChapters[chapter.id] ? (
                        <ChevronDownIcon className="h-5 w-5 text-[color:var(--text-dashboard-secondary)]" />
                      ) : (
                        <ChevronRightIcon className="h-5 w-5 text-[color:var(--text-dashboard-secondary)]" />
                      )}
                    </button>

                    {editingChapter === chapter.id ? (
                      <input
                        type="text"
                        defaultValue={chapter.title}
                        onBlur={(e) =>
                          handleEditChapter(chapter.id, e.target.value)
                        }
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            handleEditChapter(chapter.id, e.target.value);
                          }
                        }}
                        className="flex-1 px-3 py-2 border border-[color:var(--border-dashboard-light)] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-[color:var(--color-card)] text-[color:var(--text-dashboard-primary)]"
                        autoFocus
                      />
                    ) : (
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-[color:var(--text-dashboard-primary)]">
                          Chapter {chapterIndex + 1}: {chapter.title}
                        </h3>
                        <p className="text-sm text-[color:var(--text-dashboard-tertiary)] mt-1">
                          {chapter.lessons.length} lessons
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setIsAddingLesson(chapter.id)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Add Lesson"
                    >
                      <PlusIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setEditingChapter(chapter.id)}
                      className="p-2 text-[color:var(--text-dashboard-secondary)] hover:bg-gray-100 rounded-lg transition-colors"
                      title="Edit Chapter"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteChapter(chapter.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Chapter"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Add Lesson Form */}
              {isAddingLesson === chapter.id && (
                <div className="p-6 bg-[color:var(--bg-dashboard-secondary)] border-b border-[color:var(--border-dashboard-light)]">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <DocumentTextIcon className="h-5 w-5 text-green-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-[color:var(--text-dashboard-primary)]">
                      Add New Lesson
                    </h4>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[color:var(--text-dashboard-secondary)] mb-2">
                        Lesson Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Enter lesson title..."
                        value={newLesson.title}
                        onChange={(e) =>
                          setNewLesson({ ...newLesson, title: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-[color:var(--border-dashboard-light)] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-[color:var(--color-card)] text-[color:var(--text-dashboard-primary)]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[color:var(--text-dashboard-secondary)] mb-2">
                        Lesson Content
                      </label>
                      <textarea
                        placeholder="Enter lesson content (optional)..."
                        value={newLesson.content}
                        onChange={(e) =>
                          setNewLesson({
                            ...newLesson,
                            content: e.target.value,
                          })
                        }
                        rows="3"
                        className="w-full px-4 py-3 border border-[color:var(--border-dashboard-light)] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none bg-[color:var(--color-card)] text-[color:var(--text-dashboard-primary)]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[color:var(--text-dashboard-secondary)] mb-2">
                        Video File
                      </label>
                      <div className="border-2 border-dashed border-[color:var(--border-dashboard-light)] rounded-lg p-4 hover:border-gray-400 transition-colors">
                        <input
                          type="file"
                          accept="video/*"
                          onChange={(e) =>
                            setNewLesson({
                              ...newLesson,
                              video: e.target.files[0],
                            })
                          }
                          className="hidden"
                          id={`video-upload-${chapter.id}`}
                        />
                        <label
                          htmlFor={`video-upload-${chapter.id}`}
                          className="cursor-pointer flex flex-col items-center"
                        >
                          <PhotoIcon className="h-8 w-8 text-[color:var(--text-dashboard-tertiary)] mb-2" />
                          <p className="text-sm text-[color:var(--text-dashboard-secondary)]">
                            Click to upload video file
                          </p>
                          <p className="text-xs text-[color:var(--text-dashboard-tertiary)]">
                            MP4, MOV, AVI files supported
                          </p>
                        </label>
                      </div>
                    </div>
                    <div className="flex space-x-3 pt-2">
                      <button
                        onClick={() =>
                          handleAddLesson(chapter.id, {
                            title: newLesson.title,
                            content: newLesson.content,
                            videoUrl: newLesson.video,
                          })
                        }
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                      >
                        Add Lesson
                      </button>
                      <button
                        onClick={() => {
                          setIsAddingLesson(null);
                          setNewLesson({
                            title: "",
                            content: "",
                            videoUrl: "",
                          });
                        }}
                        className="bg-gray-100 hover:bg-gray-200 text-[color:var(--text-dashboard-secondary)] px-6 py-3 rounded-lg font-semibold transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {expandedChapters[chapter.id] && (
                <div>
                  {chapter.lessons.length === 0 ? (
                    <div className="p-12 text-center text-[color:var(--text-dashboard-tertiary)]">
                      <BookOpenIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <h4 className="text-lg font-medium text-[color:var(--text-dashboard-primary)] mb-2">
                        No lessons yet
                      </h4>
                      <p className="text-sm">
                        Click the + button to add your first lesson to this
                        chapter.
                      </p>
                    </div>
                  ) : (
                    <div className="divide-y divide-[color:var(--border-dashboard-light)]">
                      {chapter.lessons.map((lesson, lessonIndex) => (
                        <div
                          key={lesson.id}
                          className="p-4 hover:bg-[color:var(--bg-dashboard-secondary)] transition-colors"
                        >
                          {editingLesson === lesson.id ? (
                            <div className="space-y-3">
                              <input
                                type="text"
                                defaultValue={lesson.title}
                                onChange={(e) =>
                                  setNewLesson({
                                    ...newLesson,
                                    title: e.target.value,
                                  })
                                }
                                className="w-full px-3 py-2 border border-[color:var(--border-dashboard-light)] rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-[color:var(--color-card)] text-[color:var(--text-dashboard-primary)]"
                              />
                              <div className="flex space-x-2">
                                <button
                                  onClick={() =>
                                    handleEditLesson(lesson.id, {
                                      title: newLesson.title,
                                    })
                                  }
                                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={() => setEditingLesson(null)}
                                  className="bg-gray-100 hover:bg-gray-200 text-[color:var(--text-dashboard-secondary)] px-4 py-2 rounded-lg font-medium transition-colors"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                                  {lessonIndex + 1}
                                </div>
                                <div>
                                  <h5 className="font-semibold text-[color:var(--text-dashboard-primary)]">
                                    {lesson.title}
                                  </h5>
                                  <div className="flex items-center space-x-4 text-xs text-[color:var(--text-dashboard-tertiary)] mt-1">
                                    {lesson.content && (
                                      <div className="flex items-center space-x-1">
                                        <DocumentTextIcon className="h-3 w-3" />
                                        <span>Content</span>
                                      </div>
                                    )}
                                    {lesson.videoUrl && (
                                      <div className="flex items-center space-x-1">
                                        <PlayIcon className="h-3 w-3" />
                                        <span>Video</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => {
                                    setEditingLesson(lesson.id);
                                    setNewLesson({
                                      title: lesson.title,
                                      content: lesson.content,
                                      videoUrl: lesson.videoUrl || "",
                                    });
                                  }}
                                  className="p-2 text-[color:var(--text-dashboard-secondary)] hover:bg-gray-100 rounded-lg transition-colors"
                                  title="Edit Lesson"
                                >
                                  <PencilIcon className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteLesson(lesson.id)}
                                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                  title="Delete Lesson"
                                >
                                  <TrashIcon className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {courseData.chapters.length === 0 && (
          <div className="bg-[color:var(--color-card)] rounded-xl shadow-sm border border-[color:var(--color-card-border)] p-12 text-center">
            <AcademicCapIcon className="h-16 w-16 mx-auto mb-6 text-gray-300" />
            <h3 className="text-xl font-semibold text-[color:var(--text-dashboard-primary)] mb-3">
              No chapters yet
            </h3>
            <p className="text-[color:var(--text-dashboard-secondary)] mb-6 max-w-md mx-auto">
              Start building your course by adding your first chapter. You can
              organize your content into chapters and lessons.
            </p>
            <button
              onClick={() => setIsAddingChapter(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 mx-auto transition-colors"
            >
              <PlusIcon className="h-5 w-5" />
              <span>Add Your First Chapter</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddContentPage;
