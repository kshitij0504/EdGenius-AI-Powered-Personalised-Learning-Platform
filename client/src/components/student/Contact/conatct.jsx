import { useState, useEffect } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Twitter,
  Linkedin,
  Facebook,
  Instagram,
  Menu,
  X,
} from "lucide-react";
import Sidebar from "../Studentsidebar/Studentsidebar";
import Header from "../Studentdash/Header";

const ContactPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);

    if (newDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div
      className={`flex min-h-screen transition-all duration-500 ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm lg:hidden z-30 transition-all duration-500"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <Sidebar
        user={user}
        unreadNotifications={user.unreadNotifications}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        isDarkMode={isDarkMode}
      />

      <div className="flex-1 flex flex-col min-h-screen">
        <Header
          user={user}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />

        <main className="flex-1 p-6 lg:p-8 relative overflow-hidden">
          {/* Background decorations */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className={`absolute top-16 right-16 w-48 h-48 rounded-full opacity-10 blur-3xl animate-float ${
                isDarkMode ? "bg-purple-500" : "bg-purple-400"
              }`}
              style={{ animationDelay: "0s" }}
            />
            <div
              className={`absolute bottom-24 left-16 w-36 h-36 rounded-full opacity-15 blur-2xl animate-float ${
                isDarkMode ? "bg-blue-500" : "bg-blue-400"
              }`}
              style={{ animationDelay: "2s" }}
            />
            <div
              className={`absolute top-1/3 left-1/3 w-24 h-24 rounded-full opacity-20 blur-xl animate-float ${
                isDarkMode ? "bg-green-500" : "bg-green-400"
              }`}
              style={{ animationDelay: "1s" }}
            />
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-12 animate-fade-in-up">
              <span className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs px-4 py-2 rounded-full mb-4 opacity-90 transition-opacity duration-300">
                Get In Touch
              </span>
              <h1
                className={`text-4xl md:text-5xl font-bold mb-4 ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Contact Us
              </h1>
              <p
                className={`text-lg max-w-2xl mx-auto ${
                  isDarkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Have questions about Edgenius? We're here to help you get
                started with our AI-powered personalized learning platform or
                answer any inquiries about your educational journey.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
              <div
                className={`p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 animate-slide-in-left ${
                  isDarkMode
                    ? "bg-gray-800 border border-gray-700"
                    : "bg-white border border-gray-200"
                }`}
              >
                <h2
                  className={`text-2xl font-semibold mb-6 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Send us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className={`block text-sm font-medium mb-2 ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className={`w-full px-4 py-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                          : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                      } border-2`}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className={`block text-sm font-medium mb-2 ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email address"
                      className={`w-full px-4 py-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                          : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                      } border-2`}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className={`block text-sm font-medium mb-2 ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us how we can help you with Edgenius..."
                      rows="5"
                      className={`w-full px-4 py-3 rounded-lg resize-y transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                          : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                      } border-2`}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Send Message
                  </button>
                </form>
              </div>

              <div
                className={`p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 animate-slide-in-right ${
                  isDarkMode
                    ? "bg-gray-800 border border-gray-700"
                    : "bg-white border border-gray-200"
                }`}
              >
                <h2
                  className={`text-2xl font-semibold mb-6 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Get in Touch
                </h2>

                <div className="space-y-6 mb-8">
                  <div className="flex items-center group">
                    <div
                      className={`p-3 rounded-lg mr-4 group-hover:scale-110 transition-transform duration-200 ${
                        isDarkMode ? "bg-gray-700" : "bg-blue-50"
                      }`}
                    >
                      <Mail
                        className={`w-6 h-6 ${
                          isDarkMode ? "text-blue-400" : "text-blue-600"
                        }`}
                      />
                    </div>
                    <div>
                      <p
                        className={`font-medium mb-1 ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        Email Support
                      </p>
                      <a
                        href="mailto:support@edgenius.ai"
                        className={`hover:underline transition-colors duration-200 ${
                          isDarkMode
                            ? "text-blue-400 hover:text-blue-300"
                            : "text-blue-600 hover:text-blue-700"
                        }`}
                      >
                        support@edgenius.ai
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center group">
                    <div
                      className={`p-3 rounded-lg mr-4 group-hover:scale-110 transition-transform duration-200 ${
                        isDarkMode ? "bg-gray-700" : "bg-blue-50"
                      }`}
                    >
                      <Phone
                        className={`w-6 h-6 ${
                          isDarkMode ? "text-blue-400" : "text-blue-600"
                        }`}
                      />
                    </div>
                    <div>
                      <p
                        className={`font-medium mb-1 ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        Phone Support
                      </p>
                      <a
                        href="tel:+15551234567"
                        className={`hover:underline transition-colors duration-200 ${
                          isDarkMode
                            ? "text-blue-400 hover:text-blue-300"
                            : "text-blue-600 hover:text-blue-700"
                        }`}
                      >
                        +1 (555) 123-4567
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start group">
                    <div
                      className={`p-3 rounded-lg mr-4 mt-1 group-hover:scale-110 transition-transform duration-200 ${
                        isDarkMode ? "bg-gray-700" : "bg-blue-50"
                      }`}
                    >
                      <MapPin
                        className={`w-6 h-6 ${
                          isDarkMode ? "text-blue-400" : "text-blue-600"
                        }`}
                      />
                    </div>
                    <div>
                      <p
                        className={`font-medium mb-1 ${
                          isDarkMode ? "text-white" : "text-gray-900"
                        }`}
                      >
                        Office Address
                      </p>
                      <p
                        className={
                          isDarkMode ? "text-gray-300" : "text-gray-600"
                        }
                      >
                        123 AI Learning Hub
                        <br />
                        Innovation District
                        <br />
                        Tech City, TC 12345
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className={`p-4 rounded-lg mb-8 ${
                    isDarkMode ? "bg-gray-700" : "bg-blue-50"
                  }`}
                >
                  <h3
                    className={`font-semibold mb-2 ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Support Hours
                  </h3>
                  <p className={isDarkMode ? "text-gray-300" : "text-gray-600"}>
                    Monday - Friday: 9:00 AM - 6:00 PM
                    <br />
                    Saturday: 10:00 AM - 4:00 PM
                    <br />
                    Sunday: Closed
                  </p>
                </div>

                <div>
                  <h3
                    className={`font-semibold mb-4 ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Connect With Us
                  </h3>
                  <div className="flex space-x-4">
                    {[
                      {
                        Icon: Twitter,
                        href: "#",
                        label: "Twitter",
                        color: "hover:bg-blue-500",
                      },
                      {
                        Icon: Linkedin,
                        href: "#",
                        label: "LinkedIn",
                        color: "hover:bg-blue-600",
                      },
                      {
                        Icon: Facebook,
                        href: "#",
                        label: "Facebook",
                        color: "hover:bg-blue-700",
                      },
                      {
                        Icon: Instagram,
                        href: "#",
                        label: "Instagram",
                        color: "hover:bg-pink-500",
                      },
                    ].map(({ Icon, href, label, color }) => (
                      <a
                        key={label}
                        href={href}
                        className={`p-3 rounded-lg transition-all duration-200 transform hover:scale-110 group ${
                          isDarkMode
                            ? "bg-gray-700 text-gray-300 hover:text-white"
                            : "bg-gray-100 text-gray-600 hover:text-white"
                        } ${color}`}
                        aria-label={label}
                      >
                        <Icon className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out 0.2s both;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ContactPage;
