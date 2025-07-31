import { useState } from "react";
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

const ContactPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

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
      className="flex min-h-screen"
      style={{ backgroundColor: "var(--color-edgenius-background-light)" }}
    >
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <Sidebar
        user={user}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div className="flex-1 p-6 lg:p-8">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="lg:hidden mb-6 p-2 rounded-lg"
          style={{
            backgroundColor: "var(--color-edgenius-purple)",
            color: "white",
          }}
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <span
              className="inline-block text-white text-xs px-4 py-2 rounded-full mb-4 opacity-90 transition-opacity duration-300"
              style={{ backgroundColor: "var(--color-edgenius-purple)" }}
            >
              Get In Touch
            </span>
            <h1
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ color: "var(--color-edgenius-text-primary)" }}
            >
              Contact Us
            </h1>
            <p
              className="text-lg max-w-2xl mx-auto"
              style={{ color: "var(--color-edgenius-text-secondary)" }}
            >
              Have questions about Edgenius? We're here to help you get started
              with our AI-powered personalized learning platform or answer any
              inquiries about your educational journey.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
            <div
              className="p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300"
              style={{ backgroundColor: "white" }}
            >
              <h2
                className="text-2xl font-semibold mb-6"
                style={{ color: "var(--color-edgenius-text-primary)" }}
              >
                Send us a Message
              </h2>
              <div onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--color-edgenius-text-secondary)" }}
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 rounded-lg transition duration-200 focus:outline-none focus:ring-2"
                    style={{
                      border:
                        "2px solid var(--color-edgenius-background-light)",
                      focusRingColor: "var(--color-edgenius-purple)",
                    }}
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--color-edgenius-text-secondary)" }}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 rounded-lg transition duration-200 focus:outline-none focus:ring-2"
                    style={{
                      border:
                        "2px solid var(--color-edgenius-background-light)",
                      focusRingColor: "var(--color-edgenius-purple)",
                    }}
                  />
                </div>
                <div className="mb-8">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--color-edgenius-text-secondary)" }}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us how we can help you with Edgenius..."
                    rows="5"
                    className="w-full px-4 py-3 rounded-lg resize-y transition duration-200 focus:outline-none focus:ring-2"
                    style={{
                      border:
                        "2px solid var(--color-edgenius-background-light)",
                      focusRingColor: "var(--color-edgenius-purple)",
                    }}
                  />
                </div>
                <button
                  onClick={handleSubmit}
                  className="w-full text-white py-3 px-6 rounded-lg font-semibold hover:opacity-90 transition-all duration-300 ease-in-out transform hover:scale-105"
                  style={{
                    backgroundColor: "var(--color-edgenius-accent-dark)",
                  }}
                >
                  Send Message
                </button>
              </div>
            </div>

            <div
              className="p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300"
              style={{ backgroundColor: "white" }}
            >
              <h2
                className="text-2xl font-semibold mb-6"
                style={{ color: "var(--color-edgenius-text-primary)" }}
              >
                Get in Touch
              </h2>

              <div className="space-y-6 mb-8">
                <div className="flex items-center">
                  <div
                    className="p-3 rounded-lg mr-4"
                    style={{
                      backgroundColor: "var(--color-edgenius-background-light)",
                    }}
                  >
                    <Mail
                      className="w-6 h-6"
                      style={{ color: "var(--color-edgenius-accent-medium)" }}
                    />
                  </div>
                  <div>
                    <p
                      className="font-medium mb-1"
                      style={{ color: "var(--color-edgenius-text-primary)" }}
                    >
                      Email Support
                    </p>
                    <a
                      href="mailto:support@edgenius.ai"
                      className="hover:underline transition-colors duration-200"
                      style={{ color: "var(--color-edgenius-accent-dark)" }}
                    >
                      support@edgenius.ai
                    </a>
                  </div>
                </div>

                <div className="flex items-center">
                  <div
                    className="p-3 rounded-lg mr-4"
                    style={{
                      backgroundColor: "var(--color-edgenius-background-light)",
                    }}
                  >
                    <Phone
                      className="w-6 h-6"
                      style={{ color: "var(--color-edgenius-accent-medium)" }}
                    />
                  </div>
                  <div>
                    <p
                      className="font-medium mb-1"
                      style={{ color: "var(--color-edgenius-text-primary)" }}
                    >
                      Phone Support
                    </p>
                    <a
                      href="tel:+15551234567"
                      className="hover:underline transition-colors duration-200"
                      style={{ color: "var(--color-edgenius-accent-dark)" }}
                    >
                      +1 (555) 123-4567
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div
                    className="p-3 rounded-lg mr-4 mt-1"
                    style={{
                      backgroundColor: "var(--color-edgenius-background-light)",
                    }}
                  >
                    <MapPin
                      className="w-6 h-6"
                      style={{ color: "var(--color-edgenius-accent-medium)" }}
                    />
                  </div>
                  <div>
                    <p
                      className="font-medium mb-1"
                      style={{ color: "var(--color-edgenius-text-primary)" }}
                    >
                      Office Address
                    </p>
                    <p
                      style={{ color: "var(--color-edgenius-text-secondary)" }}
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
                className="p-4 rounded-lg mb-8"
                style={{
                  backgroundColor: "var(--color-edgenius-background-light)",
                }}
              >
                <h3
                  className="font-semibold mb-2"
                  style={{ color: "var(--color-edgenius-text-primary)" }}
                >
                  Support Hours
                </h3>
                <p style={{ color: "var(--color-edgenius-text-secondary)" }}>
                  Monday - Friday: 9:00 AM - 6:00 PM
                  <br />
                  Saturday: 10:00 AM - 4:00 PM
                  <br />
                  Sunday: Closed
                </p>
              </div>

              <div>
                <h3
                  className="font-semibold mb-4"
                  style={{ color: "var(--color-edgenius-text-primary)" }}
                >
                  Connect With Us
                </h3>
                <div className="flex space-x-4">
                  {[
                    { Icon: Twitter, href: "#", label: "Twitter" },
                    { Icon: Linkedin, href: "#", label: "LinkedIn" },
                    { Icon: Facebook, href: "#", label: "Facebook" },
                    { Icon: Instagram, href: "#", label: "Instagram" },
                  ].map(({ Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      className="p-3 rounded-lg hover:opacity-80 transition-all duration-200 transform hover:scale-110"
                      style={{
                        backgroundColor:
                          "var(--color-edgenius-background-light)",
                        color: "var(--color-edgenius-accent-medium)",
                      }}
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
      </div>

      <style jsx>{`
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Focus styles for form inputs */
        input:focus,
        textarea:focus {
          ring: 2px solid var(--color-edgenius-purple);
          border-color: var(--color-edgenius-purple);
        }
      `}</style>
    </div>
  );
};

export default ContactPage;
