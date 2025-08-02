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
import { TbBrain } from "react-icons/tb";

const Sidebar = ({
  user,
  unreadNotifications,
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
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
    { name: "Settings", icon: Cog6ToothIcon, href: "#settings" },
    { name: "Help & Support", icon: QuestionMarkCircleIcon, href: "#help" },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-screen w-64 z-40 overflow-y-auto
                  bg-[var(--color-edgenius-accent-dark)] text-[var(--color-edgenius-button-text)]
                  flex flex-col shadow-lg rounded-r-xl
                  transform transition-transform duration-300 ease-in-out
                  ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
                  lg:static lg:translate-x-0 lg:w-64 lg:h-auto lg:rounded-r-xl lg:shadow-lg`}
    >
      <div className="flex items-center justify-between h-20 border-b border-[var(--color-edgenius-text-dark-gray)] px-4">
        <div className="flex items-center space-x-3 group cursor-pointer animate-fade-in-right">
          <TbBrain className="text-[var(--color-edgenius-accent-lightest)] text-4xl group-hover:scale-110 transition-transform duration-300" />
          <h1 className="text-3xl font-extrabold text-[var(--color-edgenius-accent-lighest)]">
            Edgenius
          </h1>
        </div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="lg:hidden text-[var(--color-edgenius-button-text)] hover:text-[var(--color-edgenius-primary)] focus:outline-none"
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
              <a
                href={item.href}
                className="flex items-center p-3 text-lg font-medium rounded-md hover:bg-[var(--color-edgenius-light-blue)] hover:text-white transition-colors duration-200"
                onClick={() => setIsSidebarOpen(true)}
              >
                <item.icon className="h-6 w-6 mr-4" />
                {item.name}
                {item.name === "Notifications" && unreadNotifications > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    {unreadNotifications}
                  </span>
                )}
              </a>
            </li>
          ))}
        </ul>

        {utilityItems.length > 0 && (
          <div className="mt-8 pt-8 border-t border-[var(--color-edgenius-text-dark-gray)]">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-edgenius-text-medium-gray)] mb-4">
              Utility
            </h3>
            <ul className="space-y-2">
              {utilityItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="flex items-center p-3 text-lg font-medium rounded-md hover:bg-[var(--color-edgenius-light-blue)] hover:text-white transition-colors duration-200"
                    onClick={() => setIsSidebarOpen(false)} // Close sidebar on nav item click (mobile)
                  >
                    <item.icon className="h-6 w-6 mr-4" />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
      {user && (
        <div className="flex items-center p-4 border-t border-[var(--color-edgenius-text-dark-gray)]">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-10 h-10 rounded-full border-2 border-[var(--color-edgenius-primary)]"
          />
          <div className="ml-3">
            <p className="text-white text-md font-semibold">{user.name}</p>
            <p className="text-[var(--color-edgenius-text-medium-gray)] text-sm">
              Level {user.level} | {user.xpPoints} XP
            </p>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
