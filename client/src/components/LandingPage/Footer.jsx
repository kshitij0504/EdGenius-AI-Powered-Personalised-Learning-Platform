import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  ArrowRight,
  Heart,
  Zap,
  Shield,
  Users,
  BookOpen,
  MessageCircle,
  ChevronUp,
} from "lucide-react";

const Footer = ({ darkMode }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerLinks = {
    product: [
      { name: "AI Learning Paths", href: "#" },
      { name: "Smart Assessments", href: "#" },
      { name: "AI Mentor Chat", href: "#" },
      { name: "Analytics Dashboard", href: "#" },
      { name: "Mobile App", href: "#" },
    ],
    company: [
      { name: "About Us", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Press Kit", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Contact", href: "#" },
    ],
    resources: [
      { name: "Help Center", href: "#" },
      { name: "API Documentation", href: "#" },
      { name: "Learning Resources", href: "#" },
      { name: "Community", href: "#" },
      { name: "Status Page", href: "#" },
    ],
    legal: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Cookie Policy", href: "#" },
      { name: "GDPR", href: "#" },
      { name: "Accessibility", href: "#" },
    ],
  };

  const socialLinks = [
    { icon: <Twitter className="w-5 h-5" />, href: "#", name: "Twitter" },
    { icon: <Linkedin className="w-5 h-5" />, href: "#", name: "LinkedIn" },
    { icon: <Github className="w-5 h-5" />, href: "#", name: "GitHub" },
    { icon: <Instagram className="w-5 h-5" />, href: "#", name: "Instagram" },
    { icon: <Youtube className="w-5 h-5" />, href: "#", name: "YouTube" },
  ];

  const stats = [
    {
      icon: <Users className="w-6 h-6" />,
      value: "50K+",
      label: "Active Learners",
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      value: "1M+",
      label: "Lessons Completed",
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      value: "24/7",
      label: "AI Support",
    },
    { icon: <Zap className="w-6 h-6" />, value: "99.9%", label: "Uptime" },
  ];

  return (
    <footer
      className={`relative ${
        darkMode ? "bg-gray-900" : ""
      } transition-colors duration-300`}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-br from-[#1a73e8]/10 to-[#4285f4]/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div
        className={`relative border-b ${
          darkMode ? "border-gray-800" : "border-gray-200"
        }`}
      >
        <div className="container mx-auto py-8">
          <div className="max-w-4xl mx-auto text-center">
            <h3
              className={`text-3xl md:text-4xl font-bold mb-4 ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Stay ahead with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1a73e8] to-[#4285f4]">
                AI-powered learning
              </span>
            </h3>
            <p
              className={`text-lg mb-8 max-w-2xl mx-auto ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Get the latest updates on AI education, learning insights, and
              exclusive features delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <div className="flex-1">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={`w-full px-6 py-4 rounded-xl border ${
                    darkMode
                      ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-[#1a73e8] focus:border-transparent"
                      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-[#1a73e8] focus:border-transparent"
                  } outline-none transition-all`}
                />
              </div>
              <button className="bg-gradient-to-r from-[#1a73e8] to-[#4285f4] text-white px-8 py-4 rounded-xl font-semibold hover:from-[#1557b7] hover:to-[#3367d6] transition-all hover:scale-105 shadow-lg shadow-blue-500/25 flex items-center justify-center space-x-2">
                <span>Subscribe</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            <p
              className={`mt-4 text-sm ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Join 15,000+ learners. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
      <div
        className={`relative z-10 border-b ${
          darkMode ? "border-gray-800" : "border-gray-200"
        }`}
      >
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-[#1a73e8] to-[#4285f4] text-white mb-3 shadow-lg shadow-blue-500/25`}
                >
                  {stat.icon}
                </div>
                <div
                  className={`text-2xl md:text-3xl font-bold mb-1 ${
                    darkMode ? "text-white" : "text-gray-800"
                  }`}
                >
                  {stat.value}
                </div>
                <div
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-[#1a73e8] to-[#4285f4] rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h4
                className={`text-2xl font-bold ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}
              >
                Edgenius
              </h4>
            </div>
            <p
              className={`text-lg mb-6 leading-relaxed ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Revolutionizing education through AI-powered personalized learning
              experiences that adapt to every student's unique journey.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail
                  className={`w-5 h-5 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                />
                <span
                  className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}
                >
                  hello@edgenius.ai
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone
                  className={`w-5 h-5 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                />
                <span
                  className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}
                >
                  +1 (555) 123-4567
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin
                  className={`w-5 h-5 ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                />
                <span
                  className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}
                >
                  San Francisco, CA
                </span>
              </div>
            </div>
          </div>

          <div>
            <h5
              className={`font-bold text-lg mb-4 ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Product
            </h5>
            <ul className="space-y-3">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className={`${
                      darkMode
                        ? "text-gray-300 hover:text-white"
                        : "text-gray-600 hover:text-gray-800"
                    } transition-colors hover:underline`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5
              className={`font-bold text-lg mb-4 ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Company
            </h5>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className={`${
                      darkMode
                        ? "text-gray-300 hover:text-white"
                        : "text-gray-600 hover:text-gray-800"
                    } transition-colors hover:underline`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5
              className={`font-bold text-lg mb-4 ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Resources
            </h5>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className={`${
                      darkMode
                        ? "text-gray-300 hover:text-white"
                        : "text-gray-600 hover:text-gray-800"
                    } transition-colors hover:underline`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5
              className={`font-bold text-lg mb-4 ${
                darkMode ? "text-white" : "text-gray-800"
              }`}
            >
              Legal
            </h5>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className={`${
                      darkMode
                        ? "text-gray-300 hover:text-white"
                        : "text-gray-600 hover:text-gray-800"
                    } transition-colors hover:underline`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className={`border-t ${
            darkMode ? "border-gray-800" : "border-gray-200"
          } pt-8`}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="flex items-center space-x-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.name}
                  className={`w-12 h-12 rounded-xl ${
                    darkMode
                      ? "bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white"
                      : "bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-800 border border-gray-200"
                  } flex items-center justify-center transition-all hover:scale-110 shadow-lg hover:shadow-xl`}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            <button
              onClick={scrollToTop}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl ${
                darkMode
                  ? "bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white border border-gray-700"
                  : "bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-800 border border-gray-200"
              } transition-all hover:scale-105 shadow-lg hover:shadow-xl`}
            >
              <span className="text-sm font-medium">Back to top</span>
              <ChevronUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
