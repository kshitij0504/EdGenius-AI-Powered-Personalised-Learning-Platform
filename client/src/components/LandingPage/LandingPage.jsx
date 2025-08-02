import { useEffect, useState, useRef } from "react";
import {
  BookOpen,
  Brain,
  Target,
  MessageCircle,
  BarChart3,
  Users,
  Sparkles,
  Zap,
  CheckCircle,
  Shield,
  Star,
  Play,
  ArrowUpRight,
  ArrowDownLeft,
  Home,
  DollarSign,
  User,
} from "lucide-react";
import { motion } from "framer-motion";
import AiFlowSection from "./AiFlowSection";
import JourneySection from "./JourneySection";
import Navbar from "../Navbar.jsx";
import InfiniteFeatureScroll from "./InfiniteFeature";
import InfiniteTestimonialScroll from "./InfiniteFeature";

// PALETTE (High-Contrast Light Theme):
// Cream (Background): #FFFBF0
// Deep Navy (Headlines/Text): #34495E
// Dark Slate (Sub-text): #4A6989
// Medium Blue (Primary Actions): #5585AC
// Bright Blue (Highlights/Gradients): #90C8E8

const FeatureListItem = ({
  icon,
  title,
  description,
  isVisible,
  delay = 0,
}) => {
  return (
    <div
      className={`feature-list-item transform transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-start space-x-5">
        {/* THEME: Icon has a bright gradient background with a white icon for pop */}
        <div className="p-3 rounded-xl bg-gradient-to-br from-[#90C8E8] to-[#5585AC] text-white flex-shrink-0 shadow-lg shadow-[#5585AC]/30">
          {icon}
        </div>
        <div>
          {/* THEME: Text uses high-contrast navy and slate for readability */}
          <h3 className="font-bold text-lg mb-1 text-[#34495E]">{title}</h3>
          <p className="text-[#4A6989] leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
};

const MobilePhone = ({ scrollProgress }) => {
  const yOffset = scrollProgress * 0.1;
  const xRotation = Math.min(scrollProgress * 0.005, 5);
  const yRotation = Math.sin(scrollProgress * 0.0002) * -3;
  const scale = Math.max(1 - scrollProgress * 0.0001, 0.98);

  return (
    <div
      className="relative transition-transform duration-500 ease-out"
      style={{
        transform: `translateY(${yOffset}px) rotateX(${xRotation}deg) rotateY(${yRotation}deg) scale(${scale})`,
        transformStyle: "preserve-3d",
      }}
    >
      <div className="relative w-[480px] h-[920px] mx-auto">
        <div className="absolute inset-0 bg-black/40 rounded-[5.5rem] blur-3xl transform translate-y-12 scale-95"></div>
        <div className="relative w-full h-full bg-gray-900 rounded-[5.5rem] p-4 shadow-2xl border-2 border-gray-700">
          {/* THEME: Screen background remains cream */}
          <div className="w-full h-full bg-[#FFFFFF] rounded-[5rem] relative overflow-hidden flex flex-col">
            <div className="absolute top-5 left-1/2 transform -translate-x-1/2 w-36 h-8 bg-black rounded-full z-20 border border-gray-800"></div>
            {/* THEME: Status bar uses darker text for contrast */}
            <div className="absolute top-4 left-8 right-8 flex justify-between items-center text-[#4A6989] text-sm font-medium z-10">
              <span>9:41</span>
              <div className="flex items-center space-x-2">
                {/* Signal Icon */}
                <svg
                  width="17"
                  height="12"
                  viewBox="0 0 17 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.5 2.5L11.5 0V5L14.5 2.5Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M11 0.5H10C9.4 0.5 9 1 9 1.5V6C9 6.5 9.4 7 10 7H11V0.5Z"
                    fill="currentColor"
                  ></path>
                  <path
                    d="M8.5 2.5H7.5C6.9 2.5 6.5 3 6.5 3.5V6C6.5 6.5 6.9 7 7.5 7H8.5V2.5Z"
                    fill="currentColor"
                    fill-opacity="0.8"
                  ></path>
                  <path
                    d="M6 4H5C4.4 4 4 4.5 4 5V6C4 6.5 4.4 7 5 7H6V4Z"
                    fill="currentColor"
                    fill-opacity="0.6"
                  ></path>
                  <path
                    d="M3.5 5.5H2.5C1.9 5.5 1.5 6 1.5 6.5V7H3.5V5.5Z"
                    fill="currentColor"
                    fill-opacity="0.4"
                  ></path>
                </svg>

                {/* --- Improved Battery Icon (75%) --- */}
                <svg
                  width="25"
                  height="12"
                  viewBox="0 0 25 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Casing */}
                  <rect
                    x="0.5"
                    y="0.5"
                    width="21"
                    height="11"
                    rx="2.67"
                    stroke="currentColor"
                    stroke-width="1"
                  ></rect>
                  {/* Terminal */}
                  <rect
                    x="23"
                    y="3.5"
                    width="1.5"
                    height="5"
                    rx="0.75"
                    fill="currentColor"
                  ></rect>
                  {/* Charge Level Fill (width is 13.5 which is 75% of 18) */}
                  <rect
                    x="2"
                    y="2"
                    width="13.5"
                    height="8"
                    rx="1.33"
                    fill="currentColor"
                  ></rect>
                </svg>
              </div>
            </div>

            <div className="flex-grow pt-20 px-6 pb-24 overflow-y-auto no-scrollbar">
              <div className="text-center mb-6">
                <h2 className="text-[#34495E] text-lg font-semibold">
                  Edgenius AI Assistant
                </h2>
              </div>

              <div className="relative text-center mb-6">
                <div className="absolute -top-4 right-16 w-16 h-16 bg-[#90C8E8] rounded-full blur-xl animate-pulse"></div>
                {/* THEME: Icon uses a bright gradient */}
                <div className="absolute top-0 right-20 w-16 h-16 bg-gradient-to-br from-[#90C8E8] to-[#5585AC] rounded-full shadow-lg flex items-center justify-center transform -rotate-12">
                  {/* Replaced DollarSign with a Chatbot/Robot head icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-bot w-8 h-8 text-white"
                  >
                    <path d="M12 8V4H8" />
                    <path d="M22 13a8 8 0 0 1-8 8H6a8 8 0 0 1-8-8V7a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v2a4 4 0 0 1 4 4v2a4 4 0 0 1 4 4z" />
                  </svg>
                </div>
                <p className="text-[#4A6989] text-sm mb-1">
                  Doubt-Solving Sessions
                </p>
                <h1 className="text-[#34495E] text-7xl font-bold">3</h1>{" "}
                {/* Example: 3 sessions this week */}
              </div>

              <div className="text-center text-[#4A6989] text-sm mb-6">
                Next recommended lesson{" "}
                <span className="text-[#34495E] font-semibold">
                  Feb 24, 2025
                </span>
              </div>

              {/* THEME: Button has a darker, richer gradient */}
              <button className="w-full bg-gradient-to-r from-[#5585AC] to-[#4A6989] text-white py-4 rounded-2xl font-semibold mb-8 hover:brightness-110 transition-all shadow-lg shadow-[#5585AC]/40">
                Talk to Edgenius AI Chatbot
              </button>

              <div>
                <h3 className="text-[#34495E] font-bold text-xl mb-4">
                  AI-Generated Content
                </h3>
                <div className="space-y-3">
                  <div className="bg-white/80 rounded-2xl p-4 flex items-center space-x-4 border border-black/5">
                    <div className="w-10 h-10 bg-[#90C8E8]/30 rounded-lg flex items-center justify-center">
                      {/* Icon for AI quiz */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="lucide lucide-clipboard-check w-5 h-5 text-[#5585AC]"
                      >
                        <path d="M10 17l2 2 4-4" />
                        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                        <path d="M8 2h8v2H8z" />
                      </svg>
                    </div>
                    <div className="flex-grow">
                      <p className="text-[#34495E] font-semibold">
                        Quiz: Data Structures
                      </p>
                      <p className="text-[#4A6989] text-xs">
                        AI-tailored for your level
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[#5585AC] font-semibold">Start Now</p>
                      <p className="text-[#4A6989] text-xs">Feb 12, 2025</p>
                    </div>
                  </div>
                  <div className="bg-white/80 rounded-2xl p-4 flex items-center space-x-4 border border-black/5">
                    <div className="w-10 h-10 bg-[#90C8E8]/30 rounded-lg flex items-center justify-center">
                      {/* Icon for generated lesson */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="lucide lucide-file-text w-5 h-5 text-[#5585AC]"
                      >
                        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" />
                        <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                        <path d="M10 9H8" />
                        <path d="M16 13H8" />
                        <path d="M16 17H8" />
                      </svg>
                    </div>
                    <div className="flex-grow">
                      <p className="text-[#34495E] font-semibold">
                        Lesson: Machine Learning Basics
                      </p>
                      <p className="text-[#4A6989] text-xs">
                        Generated for you
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[#34495E] font-semibold">
                        Read Lesson
                      </p>
                      <p className="text-[#4A6989] text-xs">Jan 28, 2025</p>
                    </div>
                  </div>
                  <div className="bg-white/80 rounded-2xl p-4 flex items-center space-x-4 border border-black/5">
                    <div className="w-10 h-10 bg-[#90C8E8]/30 rounded-lg flex items-center justify-center">
                      {/* Icon for AI curriculum */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="lucide lucide-layout-list w-5 h-5 text-[#5585AC]"
                      >
                        <rect width="7" height="7" x="3" y="3" rx="1" />
                        <rect width="7" height="7" x="3" y="14" rx="1" />
                        <path d="M14 4h7" />
                        <path d="M14 9h7" />
                        <path d="M14 15h7" />
                        <path d="M14 20h7" />
                      </svg>
                    </div>
                    <div className="flex-grow">
                      <p className="text-[#34495E] font-semibold">
                        Personalized Curriculum
                      </p>
                      <p className="text-[#4A6989] text-xs">
                        AI-crafted learning path
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[#5585AC] font-semibold">View Plan</p>
                      <p className="text-[#4A6989] text-xs">Jan 15, 2025</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-24 bg-white/70 backdrop-blur-lg border-t border-black/5 rounded-b-[5rem]">
              <div className="flex justify-around items-center h-full px-6">
                <div className="flex flex-col items-center space-y-1 text-[#4A6989] hover:text-[#34495E] transition-colors cursor-pointer">
                  <Home className="w-6 h-6" />
                  <span className="text-xs font-medium">Dashboard</span>
                </div>
                {/* THEME: Active icon has a dark, high-contrast gradient */}
                <div className="flex flex-col items-center space-y-1 text-white transition-colors p-4 -mt-10 bg-gradient-to-br from-[#4A6989] to-[#34495E] rounded-full shadow-lg shadow-[#34495E]/40 cursor-pointer">
                  {/* Active icon for Chatbot/AI assistance */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-message-square w-7 h-7"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <div className="flex flex-col items-center space-y-1 text-[#4A6989] hover:text-[#34495E] transition-colors cursor-pointer">
                  <User className="w-6 h-6" />
                  <span className="text-xs font-medium">Profile</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const LandingPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [visibleFeatures, setVisibleFeatures] = useState(
    new Array(6).fill(false)
  );
  const featuresRef = useRef([]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -20% 0px",
      threshold: 0.1,
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const index = parseInt(
          entry.target.getAttribute("data-feature-index") || "0"
        );
        if (entry.isIntersecting) {
          setVisibleFeatures((prev) => {
            const newVisible = [...prev];
            newVisible[index] = true;
            return newVisible;
          });
        }
      });
    }, observerOptions);

    featuresRef.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    return () => observer.disconnect();
  }, []);

  const allFeatures = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Personalized Learning Goals",
      description:
        "AI analyzes your skill level and creates custom learning paths tailored to your objectives and pace.",
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI-Powered Assessments",
      description:
        "Dynamic quizzes adapt in real-time to challenge you at the perfect difficulty level.",
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Smart Content Generation",
      description:
        "Auto-generated lessons and examples that match your learning style and preferences.",
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Intelligent AI Mentor",
      description:
        "24/7 AI assistant provides instant answers, guidance, and personalized learning support.",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Advanced Analytics",
      description:
        "Track progress with deep insights to optimize your learning journey and identify strengths.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Collaborative Platform",
      description:
        "Connect with instructors and peers in an interactive, collaborative environment.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFFFFF] relative overflow-x-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-[#90C8E8]/50 to-[#5585AC]/50 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-[#5585AC]/50 to-[#90C8E8]/50 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>
      <Navbar />

      <section className="relative z-10 pt-12 pb-20">
        <div className="container mx-auto px-6b mt-20">
          <div className="relative z-20 text-center mb-32">
            <h1 className="text-[#34495E] text-6xl md:text-8xl font-bold mb-8 leading-tight">
              Transform Your
              <br />
              {/* THEME: Headline gradient is brighter and more vibrant */}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5585AC] to-[#90C8E8]">
                Learning Journey
              </span>
            </h1>
            <p className="text-[#4A6989] text-xl md:text-2xl mb-10 max-w-4xl mx-auto leading-relaxed">
              Experience the future of education with Edgenius - an AI-powered
              platform that creates personalized learning paths, adaptive
              assessments, and intelligent mentoring for accelerated growth.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              {/* THEME: Main CTA has a dark, strong gradient for high contrast */}
              <button className="bg-gradient-to-r from-[#5585AC] to-[#34495E] text-white hover:brightness-110 text-xl px-10 py-5 rounded-2xl font-bold transition-all hover:scale-105 shadow-lg hover:shadow-[#5585AC]/40">
                Start Learning Today
              </button>
              <button className="border-2 border-[#90C8E8] text-[#5585AC] hover:bg-[#90C8E8]/20 text-xl px-10 py-5 rounded-2xl font-bold transition-all hover:scale-105 flex items-center space-x-3 group">
                <Play className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span>Watch Demo</span>
              </button>
            </div>
          </div>

          <div
            className="relative grid grid-cols-1 lg:grid-cols-3 gap-x-12 items-start"
            id="features"
          >
            <div className="lg:text-left mt-50 space-y-16 pt-24">
              {allFeatures.slice(0, 3).map((feature, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    if (el) featuresRef.current[index] = el;
                  }}
                  data-feature-index={index}
                >
                  <FeatureListItem
                    {...feature}
                    isVisible={visibleFeatures[index]}
                    delay={index * 150}
                  />
                </div>
              ))}
            </div>

            <div
              className="lg:col-span-1 sticky top-24 h-[calc(100dvh-6rem)] flex items-center justify-center my-16 lg:my-0"
              style={{ perspective: "2000px" }}
            >
              <MobilePhone scrollProgress={scrollY} />
            </div>

            <div className="space-y-16 mt-50 pt-24">
              {allFeatures.slice(3, 6).map((feature, index) => (
                <div
                  key={index + 3}
                  ref={(el) => {
                    if (el) featuresRef.current[index + 3] = el;
                  }}
                  data-feature-index={index + 3}
                >
                  <FeatureListItem
                    {...feature}
                    isVisible={visibleFeatures[index + 3]}
                    delay={index * 150}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-32 relative z-10">
            <div className="flex items-center justify-center space-x-6 mb-10 flex-wrap gap-6">
              <div className="flex items-center space-x-3 bg-white/70 backdrop-blur-xl rounded-2xl px-6 py-4 border border-black/5 hover:bg-white transition-colors shadow-lg shadow-black/5">
                <div className="w-10 h-10 bg-gradient-to-br from-[#90C8E8] to-[#5585AC] rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-[#34495E] font-bold text-lg">4.9 ★</div>
                  <div className="text-[#4A6989] text-sm">AI Learning</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 bg-white/70 backdrop-blur-xl rounded-2xl px-6 py-4 border border-black/5 hover:bg-white transition-colors shadow-lg shadow-black/5">
                <Zap className="w-8 h-8 text-[#5585AC]" />
                <div>
                  <div className="text-[#34495E] font-bold text-lg">15K+</div>
                  <div className="text-[#4A6989] text-sm">Active Students</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 bg-white/70 backdrop-blur-xl rounded-2xl px-6 py-4 border border-black/5 hover:bg-white transition-colors shadow-lg shadow-black/5">
                <Shield className="w-8 h-8 text-[#5585AC]" />
                <div>
                  <div className="text-[#34495E] font-bold text-lg">
                    Enterprise
                  </div>
                  <div className="text-[#4A6989] text-sm">Ready</div>
                </div>
              </div>
            </div>
            <div className="inline-flex items-center justify-center space-x-8 bg-white backdrop-blur-xl rounded-3xl p-8 flex-wrap gap-6 border border-black/5 shadow-lg shadow-black/5">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-[#5585AC] flex-shrink-0" />
                <span className="text-[#4A6989] font-semibold">
                  No setup required
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-[#5585AC] flex-shrink-0" />
                <span className="text-[#4A6989] font-semibold">
                  AI-powered learning
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-[#5585AC] flex-shrink-0" />
                <span className="text-[#4A6989] font-semibold">
                  Instant progress tracking
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-[#5585AC] flex-shrink-0" />
                <span className="text-[#4A6989] font-semibold">
                  24/7 AI mentoring
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-20 lg:py-32">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-[#34495E]">
              From{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#90C8E8] to-[#5585AC]">
                Problem
              </span>{" "}
              to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5585AC] to-[#90C8E8]">
                Solution
              </span>
            </h2>
            <p className="mt-6 text-xl text-[#4A6989] max-w-3xl mx-auto">
              Our AI engine analyzes learning challenges and delivers
              intelligent, personalized solutions to accelerate growth and
              understanding.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.0, ease: "easeOut", delay: 0.2 }}
            className="p-4 rounded-4xl"
          >
            <AiFlowSection />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.0, ease: "easeOut", delay: 0.2 }}
            className="p-4 rounded-4xl"
          >
            <JourneySection />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.0, ease: "easeOut", delay: 0.2 }}
            className="p-4 rounded-4xl"
          >
            <InfiniteTestimonialScroll />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
