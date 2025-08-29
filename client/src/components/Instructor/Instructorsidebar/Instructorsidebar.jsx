// import { useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   BookOpenIcon,
//   AcademicCapIcon,
//   HomeIcon,
//   Cog6ToothIcon,
//   ChatBubbleBottomCenterTextIcon,
//   ChevronRightIcon,
// } from "@heroicons/react/24/outline";
// import { TbBrain } from "react-icons/tb";

// const Sidebar = ({ user, onHoverChange }) => {
//   const [isHovered, setIsHovered] = useState(false);

//   const handleMouseEnter = () => {
//     setIsHovered(true);
//     onHoverChange && onHoverChange(true);
//   };

//   const handleMouseLeave = () => {
//     setIsHovered(false);
//     onHoverChange && onHoverChange(false);
//   };

//   const navItems = [
//     {
//       name: "Dashboard",
//       icon: HomeIcon,
//       href: "/Instructordash",
//       active: true,
//     },
//     { name: "My Courses", icon: BookOpenIcon, href: "/instructor/courses" },
//     { name: "Students", icon: AcademicCapIcon, href: "/instructor/students" },
//   ];

//   const utilityItems = [
//     { name: "Settings", icon: Cog6ToothIcon, href: "/instructor/settings" },
//     { name: "Support", icon: ChatBubbleBottomCenterTextIcon, href: "/contact" },
//   ];

//   return (
//     <aside
//       className={`fixed top-0 left-0 h-screen z-40
//         bg-white border-r border-gray-200 shadow-lg flex flex-col
//         transition-all duration-300 ease-in-out
//         ${isHovered ? "w-64" : "w-20"}`}
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//     >
//       {/* Header */}
//       <div className="flex items-center justify-between h-16 px-4 border-b border-gray-100">
//         <div className="flex items-center space-x-3 min-w-0">
//           <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
//             <TbBrain className="text-white text-2xl" />
//           </div>
//           <h1
//             className={`text-xl font-semibold text-gray-900 transition-all duration-300 ${
//               isHovered ? "opacity-100 w-auto" : "opacity-0 w-0"
//             }`}
//           >
//             Edgenius
//           </h1>
//         </div>
//         <div
//           className={`transition-all duration-300 ${
//             isHovered ? "opacity-0" : "opacity-100"
//           }`}
//         >
//           <ChevronRightIcon className="h-5 w-5 text-gray-400" />
//         </div>
//       </div>

//       {/* Navigation */}
//       <nav className="flex-1 px-3 py-6">
//         <div className="space-y-4">
//           {navItems.map((item) => (
//             <Link
//               key={item.name}
//               to={item.href}
//               className={`group/item flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 ease-in-out relative cursor-pointer
//                 ${
//                   item.active
//                     ? "bg-blue-100 text-blue-700"
//                     : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
//                 }`}
//               title={!isHovered ? item.name : ""}
//             >
//               <item.icon className="h-6 w-6 flex-shrink-0" />
//               <span
//                 className={`ml-3 transition-all duration-300 whitespace-nowrap ${
//                   isHovered ? "opacity-100 w-auto" : "opacity-0 w-0 ml-0"
//                 }`}
//               >
//                 {item.name}
//               </span>
//             </Link>
//           ))}
//         </div>

//         {/* Utility Section */}
//         <div className="mt-8 pt-6 border-t border-gray-100">
//           <div className="space-y-2">
//             {utilityItems.map((item) => (
//               <Link
//                 key={item.name}
//                 to={item.href}
//                 className="group/item flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 ease-in-out cursor-pointer text-gray-600 hover:text-blue-600 hover:bg-blue-50"
//                 title={!isHovered ? item.name : ""}
//               >
//                 <item.icon className="h-6 w-6 flex-shrink-0" />
//                 <span
//                   className={`ml-3 transition-all duration-300 whitespace-nowrap ${
//                     isHovered ? "opacity-100 w-auto" : "opacity-0 w-0 ml-0"
//                   }`}
//                 >
//                   {item.name}
//                 </span>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </nav>

//       {/* User Profile */}
//       {user && (
//         <div className="flex items-center px-3 py-4 border-t border-gray-100 bg-blue-50">
//           <img
//             src={user.avatar}
//             alt={user.name}
//             className="w-10 h-10 rounded-full object-cover flex-shrink-0 border-2 border-blue-200"
//           />
//           <div
//             className={`ml-3 min-w-0 flex-1 transition-all duration-300 ${
//               isHovered ? "opacity-100 w-auto" : "opacity-0 w-0 ml-0"
//             }`}
//           >
//             <p className="text-sm font-medium text-gray-900 truncate">
//               {user.name}
//             </p>
//             <p className="text-xs text-blue-600 truncate">
//               Level {user.level} • {user.xpPoints} XP
//             </p>
//           </div>
//         </div>
//       )}
//     </aside>
//   );
// };

// export default Sidebar;
import { useState } from "react";
import { Link, useLocation } from "react-router-dom"; // ✅ import useLocation
import {
  BookOpenIcon,
  AcademicCapIcon,
  HomeIcon,
  Cog6ToothIcon,
  ChatBubbleBottomCenterTextIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { TbBrain } from "react-icons/tb";

const Sidebar = ({ user, onHoverChange }) => {
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation(); // ✅ get current route path

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHoverChange && onHoverChange(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onHoverChange && onHoverChange(false);
  };

  const navItems = [
    { name: "Dashboard", icon: HomeIcon, href: "/Instructordash" },
    { name: "My Courses", icon: BookOpenIcon, href: "/instructor/courses" },
    { name: "Students", icon: AcademicCapIcon, href: "/instructor/students" },
  ];

  const utilityItems = [
    { name: "Settings", icon: Cog6ToothIcon, href: "/instructor/settings" },
    { name: "Support", icon: ChatBubbleBottomCenterTextIcon, href: "/contact" },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-screen z-40 
        bg-white border-r border-gray-200 shadow-lg flex flex-col 
        transition-all duration-300 ease-in-out
        ${isHovered ? "w-64" : "w-20"}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-100">
        <div className="flex items-center space-x-3 min-w-0">
          <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <TbBrain className="text-white text-2xl" />
          </div>
          <h1
            className={`text-xl font-semibold text-gray-900 transition-all duration-300 ${
              isHovered ? "opacity-100 w-auto" : "opacity-0 w-0"
            }`}
          >
            Edgenius
          </h1>
        </div>
        <div
          className={`transition-all duration-300 ${
            isHovered ? "opacity-0" : "opacity-100"
          }`}
        >
          <ChevronRightIcon className="h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6">
        <div className="space-y-4">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href; // ✅ check current path
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`group/item flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 ease-in-out relative cursor-pointer
                  ${
                    isActive
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                title={!isHovered ? item.name : ""}
              >
                <item.icon className="h-6 w-6 flex-shrink-0" />
                <span
                  className={`ml-3 transition-all duration-300 whitespace-nowrap ${
                    isHovered ? "opacity-100 w-auto" : "opacity-0 w-0 ml-0"
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Utility Section */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <div className="space-y-2">
            {utilityItems.map((item) => {
              const isActive = location.pathname === item.href; // ✅ highlight utilities too
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group/item flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 ease-in-out cursor-pointer
                    ${
                      isActive
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                  title={!isHovered ? item.name : ""}
                >
                  <item.icon className="h-6 w-6 flex-shrink-0" />
                  <span
                    className={`ml-3 transition-all duration-300 whitespace-nowrap ${
                      isHovered ? "opacity-100 w-auto" : "opacity-0 w-0 ml-0"
                    }`}
                  >
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* User Profile */}
      {user && (
        <div className="flex items-center px-3 py-4 border-t border-gray-100 bg-blue-50">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-10 h-10 rounded-full object-cover flex-shrink-0 border-2 border-blue-200"
          />
          <div
            className={`ml-3 min-w-0 flex-1 transition-all duration-300 ${
              isHovered ? "opacity-100 w-auto" : "opacity-0 w-0 ml-0"
            }`}
          >
            <p className="text-sm font-medium text-gray-900 truncate">
              {user.name}
            </p>
            <p className="text-xs text-blue-600 truncate">
              Level {user.level} • {user.xpPoints} XP
            </p>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
