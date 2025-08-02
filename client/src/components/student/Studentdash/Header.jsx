// import { Bars3Icon } from "@heroicons/react/24/outline";
// import {
//   IoSearchOutline,
//   IoHomeOutline,
//   IoBookOutline,
//   IoChatbubbleEllipsesOutline,
//   IoNotificationsOutline,
// } from "react-icons/io5";

// const Header = ({ user, toggleSidebar }) => {
//   return (
//     <header className="bg-white shadow-md py-4 px-6 flex items-center justify-between relative z-20">
//       <button
//         onClick={toggleSidebar}
//         className="lg:hidden text-[var(--color-edgenius-text-dark)] hover:text-[var(--color-edgenius-primary)] focus:outline-none"
//         aria-label="Toggle sidebar"
//       >
//         <Bars3Icon className="h-7 w-7" />
//       </button>

//       <div
//         className="relative flex-grow mx-10 max-w-xl animate-fade-in-up"
//         style={{ animationDelay: "0.1s" }}
//       >
//         <input
//           type="text"
//           placeholder="Search courses, skills, or mentors..."
//           className="w-full pl-12 pr-6 py-3 rounded-full bg-white border border-[var(--color-edgenius-accent-light)] focus:outline-none focus:ring-3 focus:ring-[var(--color-edgenius-accent-medium)] focus:border-transparent text-[var(--color-edgenius-text-primary)] transition-all duration-300 placeholder-[var(--color-edgenius-text-secondary)]"
//         />
//         <IoSearchOutline className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--color-edgenius-accent-dark)] text-xl" />
//       </div>

//       <nav className="flex items-center space-x-6">
//         <ul className="flex items-center space-x-7 text-[var(--color-edgenius-text-primary)]">
//           {["Home", "Course", "Chatbot"].map((item, index) => (
//             <li
//               key={item}
//               className="animate-fade-in-up"
//               style={{ animationDelay: `${0.2 + index * 0.05}s` }}
//             >
//               <a href="#" className="flex flex-col items-center group relative">
//                 {item === "Home" && (
//                   <IoHomeOutline className="text-2xl group-hover:text-[var(--color-edgenius-accent-medium)] transition-colors group-hover:scale-110" />
//                 )}
//                 {item === "Course" && (
//                   <IoBookOutline className="text-2xl group-hover:text-[var(--color-edgenius-accent-medium)] transition-colors group-hover:scale-110" />
//                 )}
//                 {item === "Chatbot" && (
//                   <IoChatbubbleEllipsesOutline className="text-2xl group-hover:text-[var(--color-edgenius-accent-medium)] transition-colors group-hover:scale-110" />
//                 )}
//                 <span className="text-xs mt-1 font-medium group-hover:text-[var(--color-edgenius-accent-medium)] transition-colors">
//                   {item}
//                 </span>
//                 <span className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[var(--color-edgenius-accent-medium)] rounded-full group-hover:w-full transition-all duration-300"></span>
//               </a>
//             </li>
//           ))}
//         </ul>

//         <div
//           className="flex items-center space-x-5 ml-8 animate-fade-in-up"
//           style={{ animationDelay: "0.4s" }}
//         >
//           <button className="relative p-2 rounded-full text-[var(--color-edgenius-accent-dark)] hover:bg-[rgba(145,200,228,0.3)] transition-colors">
//             {" "}
//             <IoNotificationsOutline className="text-2xl" />
//             {user.unreadNotifications > 0 && (
//               <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold leading-none text-[var(--color-edgenius-button-text)] bg-red-500 rounded-full transform translate-x-1/4 -translate-y-1/4 animate-bounce-subtle">
//                 {user.unreadNotifications}
//               </span>
//             )}
//           </button>
//           <div className="flex items-center space-x-3 cursor-pointer group">
//             <img
//               src={user.avatar}
//               alt={user.name}
//               className="w-11 h-11 rounded-full border-2 border-[var(--color-edgenius-accent-medium)] object-cover shadow-sm group-hover:scale-105 transition-transform duration-300"
//             />
//             <span className="font-semibold text-[var(--color-edgenius-text-primary)] hidden md:block group-hover:text-[var(--color-edgenius-accent-medium)] transition-colors">
//               {user.name.split(" ")[0]}
//             </span>
//           </div>
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Header;
import { Bars3Icon } from "@heroicons/react/24/outline";
import {
  IoSearchOutline,
  IoHomeOutline,
  IoBookOutline,
  IoChatbubbleEllipsesOutline,
  IoNotificationsOutline,
  IoMoonOutline,
  IoSunnyOutline,
} from "react-icons/io5";
import { useState, useEffect } from "react";

const Header = ({ user, toggleSidebar }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check for saved theme preference or default to light mode
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.body.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.body.classList.remove("dark");
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);

    if (newDarkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <header className="bg-white dark:bg-[var(--auth-container-bg)] shadow-md py-4 px-6 flex items-center justify-between relative z-20 transition-colors duration-300">
      <button
        onClick={toggleSidebar}
        className="lg:hidden text-[var(--color-edgenius-text-dark)] hover:text-[var(--color-edgenius-primary)] focus:outline-none"
        aria-label="Toggle sidebar"
      >
        <Bars3Icon className="h-7 w-7" />
      </button>

      <div
        className="relative flex-grow mx-10 max-w-xl animate-fade-in-up"
        style={{ animationDelay: "0.1s" }}
      >
        <input
          type="text"
          placeholder="Search courses, skills, or mentors..."
          className="w-full pl-12 pr-6 py-3 rounded-full bg-white dark:bg-[var(--auth-input-bg)] border border-[var(--color-edgenius-accent-light)] dark:border-[var(--auth-input-border)] focus:outline-none focus:ring-3 focus:ring-[var(--color-edgenius-accent-medium)] dark:focus:ring-[var(--auth-input-focus)] focus:border-transparent text-[var(--color-edgenius-text-primary)] dark:text-[var(--auth-text-primary)] transition-all duration-300 placeholder-[var(--color-edgenius-text-secondary)] dark:placeholder-[var(--auth-text-secondary)]"
        />
        <IoSearchOutline className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[var(--color-edgenius-accent-dark)] dark:text-[var(--auth-text-secondary)] text-xl" />
      </div>

      <nav className="flex items-center space-x-6">
        <ul className="flex items-center space-x-7 text-[var(--color-edgenius-text-primary)] dark:text-[var(--auth-text-primary)]">
          {["Home", "Course", "Chatbot"].map((item, index) => (
            <li
              key={item}
              className="animate-fade-in-up"
              style={{ animationDelay: `${0.2 + index * 0.05}s` }}
            >
              <a href="#" className="flex flex-col items-center group relative">
                {item === "Home" && (
                  <IoHomeOutline className="text-2xl group-hover:text-[var(--color-edgenius-accent-medium)] dark:group-hover:text-[var(--auth-accent-hover)] transition-colors group-hover:scale-110" />
                )}
                {item === "Course" && (
                  <IoBookOutline className="text-2xl group-hover:text-[var(--color-edgenius-accent-medium)] dark:group-hover:text-[var(--auth-accent-hover)] transition-colors group-hover:scale-110" />
                )}
                {item === "Chatbot" && (
                  <IoChatbubbleEllipsesOutline className="text-2xl group-hover:text-[var(--color-edgenius-accent-medium)] dark:group-hover:text-[var(--auth-accent-hover)] transition-colors group-hover:scale-110" />
                )}
                <span className="text-xs mt-1 font-medium group-hover:text-[var(--color-edgenius-accent-medium)] dark:group-hover:text-[var(--auth-accent-hover)] transition-colors">
                  {item}
                </span>
                <span className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[var(--color-edgenius-accent-medium)] dark:bg-[var(--auth-accent-hover)] rounded-full group-hover:w-full transition-all duration-300"></span>
              </a>
            </li>
          ))}
        </ul>

        <div
          className="flex items-center space-x-5 ml-8 animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          {/* Dark Mode Toggle Button */}
          <button
            onClick={toggleDarkMode}
            className="relative p-2 rounded-full text-[var(--color-edgenius-accent-dark)] dark:text-[var(--auth-text-primary)] hover:bg-[rgba(145,200,228,0.3)] dark:hover:bg-[var(--auth-social-hover)] transition-all duration-300 group"
            aria-label={
              isDarkMode ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {isDarkMode ? (
              <IoSunnyOutline className="text-2xl group-hover:scale-110 transition-transform duration-300" />
            ) : (
              <IoMoonOutline className="text-2xl group-hover:scale-110 transition-transform duration-300" />
            )}
          </button>

          <button className="relative p-2 rounded-full text-[var(--color-edgenius-accent-dark)] dark:text-[var(--auth-text-primary)] hover:bg-[rgba(145,200,228,0.3)] dark:hover:bg-[var(--auth-social-hover)] transition-colors">
            <IoNotificationsOutline className="text-2xl" />
            {user.unreadNotifications > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold leading-none text-[var(--color-edgenius-button-text)] bg-red-500 rounded-full transform translate-x-1/4 -translate-y-1/4 animate-bounce-subtle">
                {user.unreadNotifications}
              </span>
            )}
          </button>

          <div className="flex items-center space-x-3 cursor-pointer group">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-11 h-11 rounded-full border-2 border-[var(--color-edgenius-accent-medium)] dark:border-[var(--auth-accent)] object-cover shadow-sm group-hover:scale-105 transition-transform duration-300"
            />
            <span className="font-semibold text-[var(--color-edgenius-text-primary)] dark:text-[var(--auth-text-primary)] hidden md:block group-hover:text-[var(--color-edgenius-accent-medium)] dark:group-hover:text-[var(--auth-accent-hover)] transition-colors">
              {user.name.split(" ")[0]}
            </span>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
