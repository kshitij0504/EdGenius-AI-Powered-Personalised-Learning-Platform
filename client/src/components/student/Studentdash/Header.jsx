import React, { useState, useEffect } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  IoSearchOutline,
  IoHomeOutline,
  IoBookOutline,
  IoChatbubbleEllipsesOutline,
  IoNotificationsOutline,
  IoMoonOutline,
  IoSunnyOutline,
  IoBookOutline as IoBook2,
} from "react-icons/io5";

const Header = ({ user, toggleSidebar, isDarkMode, toggleDarkMode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className={`shadow-md py-3 px-4 sm:px-6 flex items-center justify-between relative z-20 transition-all duration-300 ${
        isDarkMode
          ? "bg-gray-900 border-b border-gray-700"
          : "bg-white border-b border-gray-200"
      }`}
    >
      <button
        onClick={toggleSidebar}
        className={`lg:hidden focus:outline-none transition-colors duration-200 ${
          isDarkMode
            ? "text-gray-300 hover:text-white"
            : "text-gray-600 hover:text-blue-600"
        }`}
        aria-label="Toggle sidebar"
      >
        <Bars3Icon className="h-7 w-7" />
      </button>

      <div className="relative flex-grow mx-4 sm:mx-10 max-w-xs sm:max-w-md md:max-w-xl">
        <input
          type="text"
          placeholder="Search..."
          className={`w-full pl-10 pr-4 py-2 sm:py-3 rounded-full border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base transition-all duration-300 ${
            isDarkMode
              ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
              : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
          }`}
        />
        <IoSearchOutline
          className={`absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-lg sm:text-xl transition-colors duration-300 ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          }`}
        />
      </div>

      <nav className="flex items-center space-x-4 sm:space-x-6">
        <button
          className={`md:hidden transition-colors duration-200 ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <XMarkIcon className="h-7 w-7" />
          ) : (
            <Bars3Icon className="h-7 w-7" />
          )}
        </button>

        <ul
          className={`hidden md:flex items-center space-x-6 transition-colors duration-300 ${
            isDarkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          {["Home", "Course", "Chatbot"].map((item, index) => (
            <li
              key={item}
              className="animate-fade-in-up"
              style={{ animationDelay: `${0.2 + index * 0.05}s` }}
            >
              <a
                href="#"
                className="flex flex-col items-center group relative hover:text-blue-500 transition-colors duration-200"
              >
                {item === "Home" && (
                  <IoHomeOutline className="text-xl sm:text-2xl" />
                )}
                {item === "Course" && (
                  <IoBookOutline className="text-xl sm:text-2xl" />
                )}
                {item === "Chatbot" && (
                  <IoChatbubbleEllipsesOutline className="text-xl sm:text-2xl" />
                )}
                <span className="text-[10px] sm:text-xs mt-1 font-medium">
                  {item}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center space-x-3 sm:space-x-5 ml-2 sm:ml-8">
          <button
            onClick={toggleDarkMode}
            className={`relative p-2 rounded-full transition-all duration-300 hover:scale-110 ${
              isDarkMode
                ? "text-yellow-400 hover:bg-gray-800 hover:shadow-lg"
                : "text-gray-600 hover:bg-gray-100 hover:shadow-md"
            }`}
            aria-label={
              isDarkMode ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {isDarkMode ? (
              <IoSunnyOutline className="text-xl sm:text-2xl" />
            ) : (
              <IoMoonOutline className="text-xl sm:text-2xl" />
            )}
          </button>

          <button
            className={`relative p-2 rounded-full transition-all duration-300 ${
              isDarkMode
                ? "text-gray-300 hover:bg-gray-800 hover:text-white"
                : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
            }`}
          >
            <IoNotificationsOutline className="text-xl sm:text-2xl" />
            {user.unreadNotifications > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 text-[10px] sm:text-xs font-bold leading-none text-white bg-red-500 rounded-full transform translate-x-1/4 -translate-y-1/4 animate-pulse">
                {user.unreadNotifications}
              </span>
            )}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div
          className={`absolute top-full left-0 w-full shadow-lg flex flex-col items-center py-4 space-y-4 md:hidden transition-all duration-300 ${
            isDarkMode
              ? "bg-gray-900 border-t border-gray-700"
              : "bg-white border-t border-gray-200"
          }`}
        >
          {["Home", "Course", "Chatbot"].map((item) => (
            <a
              key={item}
              href="#"
              className={`flex items-center space-x-2 transition-colors duration-200 ${
                isDarkMode
                  ? "text-gray-300 hover:text-white"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              {item === "Home" && <IoHomeOutline className="text-lg" />}
              {item === "Course" && <IoBookOutline className="text-lg" />}
              {item === "Chatbot" && (
                <IoChatbubbleEllipsesOutline className="text-lg" />
              )}
              <span>{item}</span>
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
