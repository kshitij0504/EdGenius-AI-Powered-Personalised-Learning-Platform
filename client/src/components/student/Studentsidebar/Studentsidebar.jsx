import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ChartBarSquareIcon,
  BookOpenIcon,
  AcademicCapIcon,
  DocumentCheckIcon,
  ChatBubbleBottomCenterTextIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
  Bars3Icon,
  XMarkIcon,
  HomeModernIcon,
} from "@heroicons/react/24/outline";
import { LogOut } from "lucide-react";
import { TbBrain } from "react-icons/tb";

const Sidebar = ({
  user,
  unreadNotifications,
  isSidebarOpen,
  setIsSidebarOpen,
  isDarkMode = false,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", icon: HomeModernIcon, href: "/studentdash" },
    { name: "My Progress", icon: ChartBarSquareIcon, href: "/myprogress" },
    { name: "My Courses", icon: BookOpenIcon, href: "/mycourse" },
    { name: "All Courses", icon: AcademicCapIcon, href: "/allcourses" },
    { name: "Certificates", icon: DocumentCheckIcon, href: "/mycertificates" },
    {
      name: "Contact Form",
      icon: ChatBubbleBottomCenterTextIcon,
      href: "/contact",
    },
  ];

  const utilityItems = [
    { name: "Settings", icon: Cog6ToothIcon, href: "/settings" },
    { name: "Help & Support", icon: QuestionMarkCircleIcon, href: "/help" },
    { name: "Logout", icon: LogOut, href: "/", isLogout: true },
  ];

  const isActive = (href) => location.pathname === href;

  const handleLogout = () => {
    // Add your logout logic here (clear tokens, etc.)
    // For example:
    // localStorage.removeItem('token');
    // sessionStorage.clear();
    navigate("/");
    setIsSidebarOpen(false);
  };

  const handleNavClick = (item) => {
    if (item.isLogout) {
      handleLogout();
    } else {
      setIsSidebarOpen(false);
    }
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-screen w-64 z-40 flex flex-col shadow-xl border-r
                  transform transition-all duration-300 ease-out
                  ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
                  lg:static lg:translate-x-0 lg:w-64 lg:h-screen
                  ${
                    isDarkMode
                      ? "bg-gray-900 text-gray-100 border-gray-700"
                      : "bg-white text-gray-800 border-gray-200"
                  }`}
    >
      {/* Header */}
      <div
        className={`flex items-center justify-between h-20 px-6 border-b flex-shrink-0 transition-colors duration-300 ${
          isDarkMode ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <div className="flex items-center space-x-3 cursor-pointer">
          <div
            className={`p-2 rounded-xl transition-all duration-300 ${
              isDarkMode
                ? "bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg"
                : "bg-gradient-to-br from-blue-500 to-blue-600 shadow-md"
            }`}
          >
            <TbBrain className="text-white text-2xl" />
          </div>
          <h1
            className={`text-2xl font-bold transition-colors duration-300 ${
              isDarkMode
                ? "text-white bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent"
                : "text-gray-900 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent"
            }`}
          >
            Edgenius
          </h1>
        </div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={`lg:hidden p-2 rounded-lg transition-all duration-200 ${
            isDarkMode
              ? "hover:bg-gray-800 text-gray-300 hover:text-white hover:shadow-lg"
              : "hover:bg-gray-100 text-gray-600 hover:text-gray-900 hover:shadow-md"
          }`}
          aria-label="Toggle sidebar"
        >
          {isSidebarOpen ? (
            <XMarkIcon className="h-5 w-5" />
          ) : (
            <Bars3Icon className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Navigation - Scrollable Area */}
      <nav className="flex-1 px-4 py-6 overflow-y-auto min-h-0">
        <ul className="space-y-2">
          {navItems.map((item, index) => (
            <li
              key={item.name}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Link
                to={item.href}
                className={`group flex items-center p-3 text-sm font-medium rounded-xl transition-all duration-200 transform hover:scale-[1.02]
                  ${
                    isActive(item.href)
                      ? isDarkMode
                        ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-900/30"
                        : "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 shadow-md shadow-blue-200/50"
                      : isDarkMode
                      ? "hover:bg-gray-800 text-gray-300 hover:text-white hover:shadow-lg hover:shadow-gray-900/20"
                      : "hover:bg-blue-50 text-gray-700 hover:text-blue-600 hover:shadow-sm hover:shadow-blue-100/50"
                  }`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <div
                  className={`p-1 rounded-lg mr-3 transition-all duration-200 ${
                    isActive(item.href)
                      ? isDarkMode
                        ? "bg-white/20"
                        : "bg-white/80"
                      : isDarkMode
                      ? "group-hover:bg-blue-600/30"
                      : "group-hover:bg-blue-100"
                  }`}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                </div>
                <span className="truncate">{item.name}</span>
                {item.name === "Notifications" && unreadNotifications > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full min-w-[20px] text-center animate-pulse shadow-lg">
                    {unreadNotifications > 99 ? "99+" : unreadNotifications}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>

        {utilityItems.length > 0 && (
          <div
            className={`mt-8 pt-6 border-t transition-colors duration-300 ${
              isDarkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <h3
              className={`text-xs font-semibold uppercase tracking-wider mb-4 transition-colors duration-300 ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Utility
            </h3>
            <ul className="space-y-2">
              {utilityItems.map((item, index) => (
                <li
                  key={item.name}
                  className="animate-fade-in-up"
                  style={{
                    animationDelay: `${(navItems.length + index) * 0.1}s`,
                  }}
                >
                  {item.isLogout ? (
                    <button
                      onClick={() => handleNavClick(item)}
                      className={`group flex items-center p-3 text-sm font-medium rounded-xl transition-all duration-200 transform hover:scale-[1.02] w-full text-left
                        ${
                          isDarkMode
                            ? "hover:bg-red-800 text-gray-300 hover:text-white hover:shadow-lg hover:shadow-red-900/20"
                            : "hover:bg-red-50 text-gray-700 hover:text-red-600 hover:shadow-sm hover:shadow-red-100/50"
                        }`}
                    >
                      <div
                        className={`p-1 rounded-lg mr-3 transition-all duration-200 ${
                          isDarkMode
                            ? "group-hover:bg-red-600/30"
                            : "group-hover:bg-red-100"
                        }`}
                      >
                        <item.icon className="h-5 w-5 flex-shrink-0" />
                      </div>
                      <span className="truncate">{item.name}</span>
                    </button>
                  ) : (
                    <Link
                      to={item.href}
                      className={`group flex items-center p-3 text-sm font-medium rounded-xl transition-all duration-200 transform hover:scale-[1.02]
                        ${
                          isActive(item.href)
                            ? isDarkMode
                              ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-900/30"
                              : "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 shadow-md shadow-blue-200/50"
                            : isDarkMode
                            ? "hover:bg-gray-800 text-gray-300 hover:text-white hover:shadow-lg hover:shadow-gray-900/20"
                            : "hover:bg-blue-50 text-gray-700 hover:text-blue-600 hover:shadow-sm hover:shadow-blue-100/50"
                        }`}
                      onClick={() => handleNavClick(item)}
                    >
                      <div
                        className={`p-1 rounded-lg mr-3 transition-all duration-200 ${
                          isActive(item.href)
                            ? isDarkMode
                              ? "bg-white/20"
                              : "bg-white/80"
                            : isDarkMode
                            ? "group-hover:bg-blue-600/30"
                            : "group-hover:bg-blue-100"
                        }`}
                      >
                        <item.icon className="h-5 w-5 flex-shrink-0" />
                      </div>
                      <span className="truncate">{item.name}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      {/* User Profile - Fixed at Bottom */}
      {user && (
        <div
          className={`flex items-center p-4 border-t flex-shrink-0 transition-all duration-300 ${
            isDarkMode
              ? "border-gray-700 bg-gradient-to-r from-gray-800/50 to-gray-900/50"
              : "border-gray-200 bg-gradient-to-r from-gray-50/50 to-blue-50/30"
          }`}
        >
          <div className="relative">
            <img
              src={user.avatar}
              alt={user.name}
              className={`w-12 h-12 rounded-full object-cover shadow-lg transition-all duration-300 ${
                isDarkMode
                  ? "ring-2 ring-blue-500/70"
                  : "ring-2 ring-blue-400/70"
              }`}
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-md animate-pulse"></div>
          </div>
          <div className="ml-3 flex-1 min-w-0">
            <p
              className={`font-semibold truncate transition-colors duration-300 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {user.name}
            </p>
            <div className="flex items-center space-x-2 text-sm mt-1">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                  isDarkMode
                    ? "bg-gradient-to-r from-blue-900/60 to-blue-800/60 text-blue-200 border border-blue-700/50 shadow-lg"
                    : "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border border-blue-300/50 shadow-md"
                }`}
              >
                Level {user.level}
              </span>
              <span
                className={`font-medium transition-colors duration-300 ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {user.xpPoints} XP
              </span>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
