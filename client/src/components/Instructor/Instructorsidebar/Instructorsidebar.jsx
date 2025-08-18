import { NavLink, useLocation } from "react-router-dom";
import {
  BookOpenIcon,
  AcademicCapIcon,
  Cog6ToothIcon,
  ChatBubbleBottomCenterTextIcon,
  Bars3Icon,
  XMarkIcon,
  HomeModernIcon,
} from "@heroicons/react/24/outline";
import { TbBrain } from "react-icons/tb";

const Sidebar = ({ user, isSidebarOpen, setIsSidebarOpen }) => {
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", icon: HomeModernIcon, href: "/Instructordash" },
    { name: "My Courses", icon: BookOpenIcon, href: "/instructor/courses" },
    {
      name: "Enrolled Students",
      icon: AcademicCapIcon,
      href: "/instructor/students",
    },
  ];

  const utilityItems = [
    { name: "Settings", icon: Cog6ToothIcon, href: "/settings" },
    {
      name: "Contact Form",
      icon: ChatBubbleBottomCenterTextIcon,
      href: "/contact",
    },
  ];

  const handleNavClick = () => {
    setIsSidebarOpen(false);
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-screen w-64 z-40 overflow-y-auto
                  bg-[var(--color-edgenius-accent-dark)] text-[var(--color-edgenius-button-text)]
                  flex flex-col shadow-lg
                  transform transition-transform duration-300 ease-in-out
                  ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
                  lg:static lg:translate-x-0 lg:w-64 lg:h-auto lg:shadow-lg`}
    >
      <div className="flex items-center justify-between h-20 border-b border-[var(--color-edgenius-accent-medium)] px-4">
        <div className="flex items-center space-x-3 group cursor-pointer">
          <TbBrain className="text-[var(--color-edgenius-accent-light)] text-4xl group-hover:scale-110 transition-transform duration-300 drop-shadow-lg" />
          <h1 className="text-3xl font-extrabold text-[var(--color-edgenius-button-text)]">
            Edgenius
          </h1>
        </div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="lg:hidden text-[var(--color-edgenius-button-text)] hover:text-[var(--color-edgenius-accent-light)] focus:outline-none"
          aria-label="Toggle sidebar"
        >
          {isSidebarOpen ? (
            <XMarkIcon className="h-7 w-7" />
          ) : (
            <Bars3Icon className="h-7 w-7" />
          )}
        </button>
      </div>

      <nav className="flex-1 px-4 py-6 overflow-y-auto">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.href}
                onClick={handleNavClick}
                className={({ isActive }) =>
                  `flex items-center p-3 text-lg font-medium rounded-xl transition-all duration-200
                   ${
                     isActive
                       ? "bg-[var(--color-edgenius-accent-light)] text-[var(--color-edgenius-text-primary)] shadow-lg transform scale-105"
                       : "hover:bg-[var(--color-edgenius-accent-medium)] hover:text-[var(--color-edgenius-button-text)]"
                   }`
                }
              >
                <item.icon className="h-6 w-6 mr-4" />
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {utilityItems.length > 0 && (
          <div className="mt-8 pt-8 border-t border-[var(--color-edgenius-accent-medium)]">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-edgenius-accent-light)] mb-4">
              Utility
            </h3>
            <ul className="space-y-2">
              {utilityItems.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.href}
                    onClick={handleNavClick}
                    className={({ isActive }) =>
                      `flex items-center p-3 text-lg font-medium rounded-xl transition-all duration-200
                       ${
                         isActive
                           ? "bg-[var(--color-edgenius-accent-light)] text-[var(--color-edgenius-text-primary)] shadow-lg transform scale-105"
                           : "hover:bg-[var(--color-edgenius-accent-medium)] hover:text-[var(--color-edgenius-button-text)]"
                       }`
                    }
                  >
                    <item.icon className="h-6 w-6 mr-4" />
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      {user && (
        <div className="flex items-center p-4 border-t border-[var(--color-edgenius-accent-medium)] bg-[var(--color-edgenius-accent-medium)]/30">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-12 h-12 rounded-full border-2 border-[var(--color-edgenius-accent-light)] shadow-lg"
          />
          <div className="ml-3">
            <p className="text-[var(--color-edgenius-button-text)] text-md font-semibold">
              {user.name}
            </p>
            <p className="text-[var(--color-edgenius-accent-light)] text-sm">
              Level {user.level} | {user.xpPoints} XP
            </p>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
