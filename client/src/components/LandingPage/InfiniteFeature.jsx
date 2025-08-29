import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah L.",
    role: "Software Engineer @ TechCorp",
    quote:
      "Edgenius completely changed how I learn new frameworks. The personalized path saved me weeks of sifting through generic tutorials. A true game-changer.",
    avatar: "https://i.pravatar.cc/150?img=1",
  },
  {
    name: "David Chen",
    role: "Data Science Student",
    quote:
      "The 24/7 AI mentor is incredible. I was stuck on a complex algorithm, and it gave me a clear, step-by-step explanation at 2 AM. I aced my exam because of it.",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
  {
    name: "Maria Garcia",
    role: "UX Designer & Team Lead",
    quote:
      "As an instructor, the analytics dashboard is invaluable. I can see exactly where my team is struggling and provide targeted support. Onboarding has never been faster.",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  {
    name: "Alex Johnson",
    role: "Aspiring Mobile Developer",
    quote:
      "I went from knowing zero Swift to building my first iOS app in a month. The curriculum was perfectly paced and the adaptive quizzes kept me motivated.",
    avatar: "https://i.pravatar.cc/150?img=7",
  },
  {
    name: "Priya Patel",
    role: "Product Manager",
    quote:
      "We use Edgenius to upskill our entire product team. The platform's ability to create custom learning paths for different roles is simply unmatched.",
    avatar: "https://i.pravatar.cc/150?img=8",
  },
];

const TestimonialCard = ({ name, role, quote, avatar }) => (
  <div className="relative flex-shrink-0 w-[400px] h-auto p-8 bg-card rounded-2xl shadow-lg border-primary/10 mx-5 flex flex-col">
    <div className="flex text-yellow-400 mb-4">
      {[...Array(5)].map((_, i) => (
        <Star key={i} fill="currentColor" className="w-5 h-5" />
      ))}
    </div>
    <p className="text-base text-muted-foreground leading-relaxed mb-6 flex-grow">
      "{quote}"
    </p>
    <div className="flex items-center">
      <img
        src={avatar}
        alt={name}
        className="w-12 h-12 rounded-full object-cover border-2 border-background shadow-sm"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://placehold.co/150x150/EBF4FF/34495E?text=User";
        }}
      />
      <div className="ml-4">
        <h4 className="text-md font-bold text-foreground">{name}</h4>
        <p className="text-sm text-[#1b6fdd] font-semibold">{role}</p>
      </div>
    </div>
  </div>
);

export default function InfiniteTestimonialScroll({ darkMode }) {
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  const marqueeVariants = {
    animate: {
      x: [0, -2200],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 60,
          ease: "linear",
        },
      },
    },
  };

  return (
    <div
      className={` transition-colors duration-300 ${
        darkMode ? "bg-gray-900" : ""
      }`}
    >
      <section className="w-full py-28">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <h2
            className={`text-4xl md:text-5xl font-black mb-4 transition-colors ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Loved by Learners & Professionals
          </h2>
          <p
            className={`text-lg max-w-2xl mx-auto transition-colors ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            See how Edgenius is empowering individuals and teams to achieve
            their learning goals faster.
          </p>
        </div>
        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex py-4"
            variants={marqueeVariants}
            animate="animate"
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                {...testimonial}
                darkMode={darkMode}
              />
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
