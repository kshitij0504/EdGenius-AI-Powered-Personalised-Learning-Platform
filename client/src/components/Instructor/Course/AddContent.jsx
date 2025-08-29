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
  const [newLessonTitle, setNewLessonTitle] = useState(""); // <-- add this
  const [newLessonContent, setNewLessonContent] = useState("");

  const [courseData, setCourseData] = useState({ title: "", chapters: [] });
  const [newChapter, setNewChapter] = useState({ title: "" });
  const [newLesson, setNewLesson] = useState({
    title: "",
    content: "",
    videoUrl: "",
  });

  // fetch modules + lessons
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

  // ------------------ CHAPTER HANDLERS ------------------
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
        formData.append("video", videoUrl); // must be a File object
      }

      console.log("Sending lesson data:", [...formData.entries()]);

      await createLesson(formData);

      await fetchModules(); // refresh UI after adding lesson
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

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h3 className="text-3xl font-bold text-[var(--color-edgenius-text-primary)] mb-2">
              Course Content
            </h3>
            <p className="text-[var(--color-edgenius-text-secondary)] mb-2">
              Managing content for:{" "}
              <span className="font-semibold">{courseData.title}</span>
            </p>
            <div className="flex items-center space-x-4 text-sm text-[var(--color-edgenius-text-secondary)]">
              <div className="flex items-center">
                <AcademicCapIcon className="h-4 w-4 mr-1 text-[var(--color-edgenius-accent-medium)]" />
                {courseData.chapters.length} chapters
              </div>
              <div className="flex items-center">
                <BookOpenIcon className="h-4 w-4 mr-1 text-[var(--color-edgenius-accent-medium)]" />
                {courseData.chapters.reduce(
                  (total, chapter) => total + chapter.lessons.length,
                  0
                )}{" "}
                lessons
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsAddingChapter(true)}
            className="mt-4 md:mt-0 bg-gradient-to-r from-[var(--color-edgenius-accent-medium)] to-[var(--color-edgenius-accent-dark)] text-[var(--color-edgenius-button-text)] px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 font-semibold"
          >
            <PlusIcon className="h-5 w-5" />
            <span>Add New Chapter</span>
          </button>
        </div>

        {/* Add New Chapter Form */}
        {isAddingChapter && (
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-[var(--color-edgenius-accent-light)] animate-fadeIn">
            <h4 className="text-xl font-bold text-[var(--color-edgenius-text-primary)] mb-4">
              Add New Chapter
            </h4>
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Chapter title"
                value={newChapter.title}
                onChange={(e) => setNewChapter({ title: e.target.value })}
                className="flex-1 px-4 py-3 border border-[var(--color-edgenius-accent-light)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-edgenius-accent-medium)] transition-all"
              />
              <div className="flex space-x-2">
                <button
                  onClick={() => handleAddChapter(newChapter.title)}
                  className="bg-[var(--color-edgenius-accent-dark)] text-[var(--color-edgenius-button-text)] px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-200 font-semibold"
                >
                  Add Chapter
                </button>
                <button
                  onClick={() => {
                    setIsAddingChapter(false);
                    setNewChapter({ title: "" });
                  }}
                  className="bg-gray-500 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-200 font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Chapters List */}
        <div className="space-y-4">
          {courseData.chapters.map((chapter, chapterIndex) => (
            <div
              key={chapter.id}
              className="bg-white rounded-2xl shadow-xl border border-[var(--color-edgenius-accent-light)] overflow-hidden transition-all duration-300 hover:shadow-2xl"
            >
              {/* Chapter Header */}
              <div className="p-6 bg-gradient-to-r from-[var(--color-edgenius-accent-light)]/20 to-[var(--color-edgenius-accent-medium)]/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <button
                      onClick={() => toggleChapter(chapter.id)}
                      className="text-[var(--color-edgenius-accent-dark)] hover:bg-[var(--color-edgenius-accent-light)]/30 rounded-lg p-2 transition-colors"
                    >
                      {expandedChapters[chapter.id] ? (
                        <ChevronDownIcon className="h-5 w-5" />
                      ) : (
                        <ChevronRightIcon className="h-5 w-5" />
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
                        className="flex-1 px-3 py-2 border border-[var(--color-edgenius-accent-light)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-edgenius-accent-medium)]"
                        autoFocus
                      />
                    ) : (
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-[var(--color-edgenius-text-primary)]">
                          Chapter {chapterIndex + 1}: {chapter.title}
                        </h4>
                        <p className="text-sm text-[var(--color-edgenius-text-secondary)]">
                          {chapter.lessons.length} lessons
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => setIsAddingLesson(chapter.id)}
                      className="p-2 text-[var(--color-edgenius-accent-dark)] hover:bg-[var(--color-edgenius-accent-light)]/30 rounded-lg transition-colors"
                      title="Add Lesson"
                    >
                      <PlusIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setEditingChapter(chapter.id)}
                      className="p-2 text-[var(--color-edgenius-accent-dark)] hover:bg-[var(--color-edgenius-accent-light)]/30 rounded-lg transition-colors"
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
                <div className="p-6 border-t border-[var(--color-edgenius-accent-light)]/30 bg-[var(--color-edgenius-bg-lightest)]">
                  <h5 className="text-lg font-semibold text-[var(--color-edgenius-text-primary)] mb-4">
                    Add New Lesson
                  </h5>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Lesson title"
                      value={newLesson.title}
                      onChange={(e) =>
                        setNewLesson({ ...newLesson, title: e.target.value })
                      }
                      className="w-full px-4 py-3 border rounded-xl"
                    />
                    <textarea
                      placeholder="Lesson content (optional)"
                      value={newLesson.content}
                      onChange={(e) =>
                        setNewLesson({ ...newLesson, content: e.target.value })
                      }
                      rows="3"
                      className="w-full px-4 py-3 border rounded-xl resize-none"
                    />
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) =>
                        setNewLesson({ ...newLesson, video: e.target.files[0] })
                      }
                      placeholder="Video URL (optional)"
                      className="w-full px-4 py-3 border rounded-xl"
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={() =>
                          handleAddLesson(chapter.id, {
                            title: newLesson.title,
                            content: newLesson.content,
                            videoUrl: newLesson.video,
                          })
                        }
                        className="bg-[var(--color-edgenius-accent-dark)] text-white px-6 py-3 rounded-xl"
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
                        className="bg-gray-500 text-white px-6 py-3 rounded-xl"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Lessons List */}
              {expandedChapters[chapter.id] && (
                <div className="border-t border-[var(--color-edgenius-accent-light)]/30">
                  {chapter.lessons.length === 0 ? (
                    <div className="p-8 text-center text-[var(--color-edgenius-text-secondary)]">
                      <BookOpenIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>
                        No lessons yet. Click the + button to add your first
                        lesson.
                      </p>
                    </div>
                  ) : (
                    <div className="divide-y divide-[var(--color-edgenius-accent-light)]/30">
                      {chapter.lessons.map((lesson, lessonIndex) => (
                        <div
                          key={lesson.id}
                          className="p-4 hover:bg-[var(--color-edgenius-bg-lightest)] transition-colors"
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
                                className="w-full px-3 py-2 border border-[var(--color-edgenius-accent-light)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-edgenius-accent-medium)]"
                              />
                              <div className="flex space-x-2">
                                <button
                                  onClick={() =>
                                    handleEditLesson(chapter.id, lesson.id, {
                                      title: newLesson.title,
                                    })
                                  }
                                  className="bg-[var(--color-edgenius-accent-dark)] text-white px-4 py-2 rounded-lg hover:shadow-md transition-all"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={() => setEditingLesson(null)}
                                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:shadow-md transition-all"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0 w-8 h-8 bg-[var(--color-edgenius-accent-light)] text-[var(--color-edgenius-text-primary)] rounded-full flex items-center justify-center text-sm font-semibold">
                                  {lessonIndex + 1}
                                </div>
                                <div>
                                  <h6 className="font-semibold text-[var(--color-edgenius-text-primary)]">
                                    {lesson.title}
                                  </h6>
                                  <div className="flex items-center space-x-4 text-xs text-[var(--color-edgenius-text-secondary)] mt-1">
                                    {lesson.content && (
                                      <div className="flex items-center">
                                        <DocumentTextIcon className="h-3 w-3 mr-1" />
                                        Content
                                      </div>
                                    )}
                                    {lesson.videoUrl && (
                                      <div className="flex items-center">
                                        <PlayIcon className="h-3 w-3 mr-1" />
                                        Video
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
                                  className="p-2 text-[var(--color-edgenius-accent-dark)] hover:bg-[var(--color-edgenius-accent-light)]/20 rounded-lg transition-colors"
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
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center border border-[var(--color-edgenius-accent-light)]">
            <AcademicCapIcon className="h-16 w-16 mx-auto mb-6 text-[var(--color-edgenius-accent-medium)] opacity-50" />
            <h4 className="text-2xl font-bold text-[var(--color-edgenius-text-primary)] mb-4">
              No chapters yet
            </h4>
            <p className="text-[var(--color-edgenius-text-secondary)] mb-6 max-w-md mx-auto">
              Start building your course by adding your first chapter. You can
              organize your content into chapters and lessons.
            </p>
            <button
              onClick={() => setIsAddingChapter(true)}
              className="bg-gradient-to-r from-[var(--color-edgenius-accent-medium)] to-[var(--color-edgenius-accent-dark)] text-[var(--color-edgenius-button-text)] px-8 py-4 rounded-xl hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 font-semibold mx-auto"
            >
              <PlusIcon className="h-5 w-5" />
              <span>Add Your First Chapter</span>
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AddContentPage;
