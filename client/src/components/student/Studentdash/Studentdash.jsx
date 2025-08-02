import Header from "./Header";
import React, { useState } from "react";
import HeroSection from "./Herosection";
import LearningMilestones from "./Milestone";
import Sidebar from "../Studentsidebar/Studentsidebar";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const user = {
    name: "Aisha Sharma",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    learningGoal: "Become a Full-stack Web Developer",
    currentCourseSlug: "react-hooks-context",
    currentLessonTitle: "Mastering State with useState",
    lessonProgress: 75,
    diagnosticTaken: true,
    upcomingQuiz: "React Fundamentals Quiz",
    unreadNotifications: 2,
    xpPoints: 1250,
    level: 7,
  };

  const milestones = [
    {
      id: 1,
      title: "React Hooks Certification",
      achieved: true,
      date: "2025-06-15",
    },
    {
      id: 2,
      title: "Python Fundamentals Badge",
      achieved: true,
      date: "2025-05-20",
    },
    {
      id: 3,
      title: "Completed 50 Lessons",
      achieved: false,
      target: 50,
      current: 42,
    },
  ];

  const handleContinueLesson = () => {
    alert(`Navigating to lesson: ${user.currentLessonTitle}`);
  };

  return (
    <div className="flex min-h-screen bg-[var(--color-edgenius-background-light)]">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      <Sidebar
        user={user}
        unreadNotifications={user.unreadNotifications}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div className="flex-1 flex flex-col">
        {" "}
        <Header user={user} />
        <main className="flex-1 container mx-auto px-4 py-10">
          <HeroSection user={user} onContinue={handleContinueLesson} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-12">
            <div className="lg:col-span-2 space-y-10">
              <LearningMilestones
                milestones={milestones}
                xpPoints={user.xpPoints}
                level={user.level}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
