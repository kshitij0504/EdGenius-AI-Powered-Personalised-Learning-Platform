// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   BookOpenIcon,
//   UserGroupIcon,
//   ClockIcon,
//   PlusIcon,
//   StarIcon,
//   PencilIcon,
//   TrashIcon,
//   Bars3Icon,
// } from "@heroicons/react/24/outline";
// import Sidebar from "../Instructorsidebar/Instructorsidebar";
// import { getAllCourses } from "../../../helpers/API/courseApi";
// import Cookies from "js-cookie";

// const MyCoursesPage = () => {
//   const navigate = useNavigate();

//   const user = {
//     name: "Dr. Eleanor Vance",
//     avatar: "https://randomuser.me/api/portraits/women/44.jpg",
//     level: 12,
//     xpPoints: 3450,
//   };

//   const [courses, setCourses] = useState([]);
//   const [isSidebarHovered, setIsSidebarHovered] = useState(false); // ✅ track sidebar hover

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const response = await getAllCourses();
//         console.log("Courses fetched:", response.data);
//         setCourses(response.data.data);
//       } catch (err) {
//         console.error(
//           "Error fetching courses:",
//           err.response?.data || err.message
//         );
//       }
//     };

//     fetchCourses();
//   }, []);

//   const handleDeleteCourse = (courseId) => {
//     setCourses(courses.filter((course) => course.id !== courseId));
//   };

//   const handleEditCourse = (courseId) => {
//     navigate(`/instructor/editcourse/${courseId}`);
//   };

//   const handleAddCourse = () => {
//     navigate("/instructor/createcourse");
//   };

//   const handleAddContent = (courseId) => {
//     navigate(`/instructor/addcontent/${courseId}`);
//   };

//   return (
//     <div className="flex min-h-screen bg-[var(--color-edgenius-bg-lightest)]">
//       {/* Sidebar */}
//       <Sidebar user={user} onHoverChange={setIsSidebarHovered} />

//       {/* Main content */}
//       <div
//         className={`flex-1 flex flex-col p-4 md:p-8 transition-all duration-300 ease-in-out
//           ${isSidebarHovered ? "ml-64" : "ml-20"}`} // ✅ adjust with sidebar
//       >
//         {/* Header */}
//         <header className="lg:hidden sticky top-0 bg-[var(--color-edgenius-bg-lightest)]">
//           <div className="flex items-center justify-between h-16 mt-[-20px]">
//             <button
//               className="text-[var(--color-edgenius-text-primary)] hover:bg-gray-100 rounded-md transition-colors"
//               aria-label="Open sidebar"
//             >
//               <Bars3Icon className="h-6 w-6" />
//             </button>
//             <div className="w-10 h-10"></div>
//           </div>
//         </header>

//         <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
//           <div>
//             <h3 className="text-3xl font-bold text-[var(--color-edgenius-text-primary)] mb-2">
//               My Courses
//             </h3>
//             <p className="text-[var(--color-edgenius-text-secondary)]">
//               Manage your courses, content, and track performance.
//             </p>
//           </div>
//           <button
//             onClick={handleAddCourse}
//             className="mt-4 md:mt-0 bg-gradient-to-r from-[var(--color-edgenius-accent-medium)] to-[var(--color-edgenius-accent-dark)] text-[var(--color-edgenius-button-text)] px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 font-semibold"
//           >
//             <PlusIcon className="h-5 w-5" />
//             <span>Create New Course</span>
//           </button>
//         </div>

//         {/* Courses Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {courses.map((course) => (
//             <div
//               key={course.id}
//               className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-[var(--color-edgenius-accent-light)]"
//             >
//               <div className="relative">
//                 <img
//                   src={course.thumbnailUrl}
//                   alt={course.title}
//                   className="w-full h-40 object-cover"
//                 />
//                 <div
//                   className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
//                     course.published
//                       ? "bg-green-100 text-green-800"
//                       : "bg-yellow-100 text-yellow-800"
//                   }`}
//                 >
//                   {course.published ? "Published" : "Draft"}
//                 </div>
//               </div>

//               <div className="p-4">
//                 <h4 className="text-xl font-bold text-[var(--color-edgenius-text-primary)] mb-2">
//                   {course.title}
//                 </h4>
//                 <p className="text-[var(--color-edgenius-text-secondary)] text-sm mb-4 line-clamp-2">
//                   {course.description}
//                 </p>

//                 <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-[var(--color-edgenius-text-secondary)]">
//                   <div className="flex items-center">
//                     <UserGroupIcon className="h-4 w-4 mr-1 text-[var(--color-edgenius-accent-medium)]" />
//                     {course.studentsCount || 0} students
//                   </div>
//                   <div className="flex items-center">
//                     <BookOpenIcon className="h-4 w-4 mr-1 text-[var(--color-edgenius-accent-medium)]" />
//                     {course.lessonsCount || 0} lessons
//                   </div>
//                   <div className="flex items-center">
//                     <ClockIcon className="h-4 w-4 mr-1 text-[var(--color-edgenius-accent-medium)]" />
//                     {course.duration || "N/A"}
//                   </div>
//                   <div className="flex items-center">
//                     <StarIcon className="h-4 w-4 mr-1 text-yellow-500" />
//                     {course.rating || "N/A"}
//                   </div>
//                 </div>

//                 <div className="flex items-center justify-between">
//                   <span className="text-xs text-[var(--color-edgenius-text-secondary)]">
//                     Updated{" "}
//                     {course.updatedAt
//                       ? new Date(course.updatedAt).toLocaleDateString()
//                       : "N/A"}
//                   </span>
//                   <div className="flex space-x-2">
//                     <button
//                       onClick={() => handleAddContent(course.id)}
//                       className="p-2 text-[var(--color-edgenius-accent-dark)] hover:bg-[var(--color-edgenius-accent-light)]/20 rounded-lg transition-colors"
//                     >
//                       <PlusIcon className="h-4 w-4" />
//                     </button>
//                     <button
//                       onClick={() => handleEditCourse(course.id)}
//                       className="p-2 text-[var(--color-edgenius-accent-dark)] hover:bg-[var(--color-edgenius-accent-light)]/20 rounded-lg transition-colors"
//                     >
//                       <PencilIcon className="h-4 w-4" />
//                     </button>
//                     <button
//                       onClick={() => handleDeleteCourse(course.id)}
//                       className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
//                     >
//                       <TrashIcon className="h-4 w-4" />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyCoursesPage;
import { useState, useEffect } from "react";
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
import { getCoursesByInstructor } from "../../../helpers/API/courseApi";
import Cookies from "js-cookie";

const MyCoursesPage = () => {
  const navigate = useNavigate();

  const user = {
    name: "Dr. Eleanor Vance",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    level: 12,
    xpPoints: 3450,
  };

  const [courses, setCourses] = useState([]);
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getCoursesByInstructor({});
        setCourses(response.data.courses);
      } catch (err) {
        console.error(
          "Error fetching courses:",
          err.response?.data || err.message
        );
      }
    };

    fetchCourses();
  }, []);

  const handleDeleteCourse = (courseId) => {
    setCourses(courses.filter((course) => course.id !== courseId));
  };

  const handleEditCourse = (courseId) => {
    navigate(`/instructor/editcourse/${courseId}`);
  };

  const handleAddCourse = () => {
    navigate("/instructor/createcourse");
  };

  const handleAddContent = (courseId) => {
    navigate(`/instructor/addcontent/${courseId}`);
  };

  return (
    <div className="flex min-h-screen bg-[var(--color-bg)]">
      {/* Sidebar */}
      <Sidebar user={user} onHoverChange={setIsSidebarHovered} />

      {/* Main content */}
      <div
        className={`flex-1 flex flex-col p-4 md:p-8 transition-all duration-300 ease-in-out
          ${isSidebarHovered ? "ml-64" : "ml-20"}`}
      >
        {/* Header */}
        <header className="lg:hidden sticky top-0 bg-[var(--color-bg)] z-10">
          <div className="flex items-center justify-between h-16">
            <button
              className="text-[var(--color-text-primary)] hover:bg-[var(--color-card-border)] rounded-lg p-2 transition-colors"
              aria-label="Open sidebar"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
            <div className="w-10 h-10"></div>
          </div>
        </header>

        {/* Title + Button */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h3 className="text-3xl font-bold text-[var(--color-text-primary)] mb-2">
              My Courses
            </h3>
            <p className="text-[var(--color-text-secondary)]">
              Manage your courses, content, and track performance.
            </p>
          </div>
          <button
            onClick={handleAddCourse}
            className="mt-4 md:mt-0 bg-gradient-to-r from-[var(--color-accent-medium)] to-[var(--color-accent-dark)] text-white px-6 py-3 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-200 flex items-center justify-center space-x-2 font-semibold"
          >
            <PlusIcon className="h-5 w-5" />
            <span>Create New Course</span>
          </button>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-[var(--color-card)] rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-[var(--color-card-border)]"
            >
              {/* Thumbnail */}
              <div className="relative">
                <img
                  src={course.thumbnailUrl}
                  alt={course.title}
                  className="w-full h-40 object-cover"
                />
                <div
                  className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold shadow-md ${
                    course.published
                      ? "bg-[var(--color-success-bg)] text-[var(--color-success-text)]"
                      : "bg-[var(--color-warning-bg)] text-[var(--color-warning-text)]"
                  }`}
                >
                  {course.published ? "Published" : "Draft"}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5">
                <h4 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2 line-clamp-1">
                  {course.title}
                </h4>
                <p className="text-[var(--color-text-secondary)] text-sm mb-4 line-clamp-2">
                  {course.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4 text-sm text-[var(--color-text-secondary)]">
                  <div className="flex items-center">
                    <UserGroupIcon className="h-4 w-4 mr-1 text-[var(--color-accent-medium)]" />
                    {course.studentsCount || 0} students
                  </div>
                  <div className="flex items-center">
                    <BookOpenIcon className="h-4 w-4 mr-1 text-[var(--color-accent-medium)]" />
                    {course.lessonsCount || 0} lessons
                  </div>
                  <div className="flex items-center">
                    <ClockIcon className="h-4 w-4 mr-1 text-[var(--color-accent-medium)]" />
                    {course.duration || "N/A"}
                  </div>
                  <div className="flex items-center">
                    <StarIcon className="h-4 w-4 mr-1 text-[var(--color-star)]" />
                    {course.rating || "N/A"}
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[var(--color-text-secondary)]">
                    Updated{" "}
                    {course.updatedAt
                      ? new Date(course.updatedAt).toLocaleDateString()
                      : "N/A"}
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleAddContent(course.id)}
                      className="p-2 text-[var(--color-accent-dark)] hover:bg-[var(--color-accent-light)]/30 rounded-lg transition-colors"
                    >
                      <PlusIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleEditCourse(course.id)}
                      className="p-2 text-[var(--color-accent-dark)] hover:bg-[var(--color-accent-light)]/30 rounded-lg transition-colors"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteCourse(course.id)}
                      className="p-2 text-[var(--color-danger)] hover:bg-[var(--color-danger-bg)] rounded-lg transition-colors"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Empty State */}
          {courses.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-16 text-center text-[var(--color-text-secondary)]">
              <BookOpenIcon className="h-12 w-12 mb-4 text-[var(--color-accent-medium)]" />
              <p className="text-lg font-medium">No courses found</p>
              <button
                onClick={handleAddCourse}
                className="mt-6 bg-gradient-to-r from-[var(--color-accent-medium)] to-[var(--color-accent-dark)] text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-200 flex items-center space-x-2 font-semibold"
              >
                <PlusIcon className="h-5 w-5" />
                <span>Create your first course</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyCoursesPage;
