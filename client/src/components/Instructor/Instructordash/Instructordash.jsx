import { useState } from "react";
import Sidebar from "../Instructorsidebar/Instructorsidebar";
import DashboardHome from "./DashboardHome";
import { Bars3Icon } from "@heroicons/react/24/outline";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const user = {
    name: "Dr. Eleanor Vance",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    level: 12,
    xpPoints: 3450,
  };

  return (
    <div className="flex min-h-screen bg-[var(--color-edgenius-background-light)]">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <Sidebar
        user={user}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div className="flex-1 flex flex-col transition-all duration-300 ease-in-out">
        <header className="lg:hidden sticky top-0 bg-[var(--color-edgenius-background-light)] z-20 shadow-md">
          <div className="flex items-center justify-between h-16 px-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 text-[var(--color-edgenius-text-primary)] hover:bg-gray-100 rounded-md transition-colors"
              aria-label="Open sidebar"
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
            <h1 className="text-xl font-bold text-[var(--color-edgenius-text-primary)]">
              Edgenius
            </h1>
            <div className="w-10 h-10"></div> 
          </div>
        </header>

        <main className="flex-1 p-6 md:p-10 transition-all duration-300 ease-in-out">
          <DashboardHome />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
