import React from 'react';
import { motion } from 'framer-motion';
// For icons, you'll need to install lucide-react: npm install lucide-react
import { Target, TestTubeDiagonal, Route } from 'lucide-react';

// --- Visual Components for each step ---
// Kept separate for clarity and easy swapping.

const VisualStep1 = () => (
    <div className="w-5/6 p-3 bg-white rounded-lg shadow-inner border border-gray-200 text-left text-sm text-[#4A6989]">
        I want to master <span className="font-semibold text-[#5585AC]">React for building enterprise apps...</span>
    </div>
);

const VisualStep2 = () => (
    <div className="w-full text-left p-2">
        <p className="text-sm font-bold text-[#34495E] mb-2">What is a React Hook?</p>
        <div className="space-y-2 text-sm">
            <div className="p-2 bg-gradient-to-r from-blue-50 to-white rounded-md border border-[#90C8E8] text-[#4A6989] font-medium">
                A function to 'hook into' React state...
            </div>
            <div className="p-2 bg-gray-100 rounded-md text-gray-500">A type of lifecycle method...</div>
        </div>
    </div>
);

const AnimatedPath = () => (
    <motion.svg width="150" height="80" viewBox="0 0 150 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.path
            d="M10 70 Q 30 10, 75 40 T 140 10"
            stroke="url(#journey-gradient)"
            strokeWidth="6"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 2, ease: 'easeInOut', delay: 0.5 }}
        />
        <defs>
            <linearGradient id="journey-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#5585AC" />
                <stop offset="100%" stopColor="#90C8E8" />
            </linearGradient>
        </defs>
    </motion.svg>
);


// --- Data-Driven Content ---
// Storing content here makes it easy to update or reorder steps without changing the component logic.
const JOURNEY_STEPS = [
  {
    icon: Target,
    title: "Define Your Ambition",
    description: "Tell Edgenius your learning goal, and our AI analyzes the core concepts you need to learn.",
    visual: <VisualStep1 />,
  },
  {
    icon: TestTubeDiagonal,
    title: "AI Skill Assessment",
    description: "A quick, adaptive quiz instantly identifies your current knowledge gaps and strengths.",
    visual: <VisualStep2 />,
  },
  {
    icon: Route,
    title: "Receive Your Path",
    description: "Get a dynamic curriculum built for you. No more generic content, only what you need to succeed.",
    visual: <AnimatedPath />,
  },
];


// --- Animation Variants ---
// Defined outside components for performance and reusability.
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: 'easeOut',
    },
  },
};


// --- Reusable StepCard Component ---
// Wrapped in React.memo to prevent unnecessary re-renders.
const StepCard = React.memo(({ icon: Icon, title, description, visual }) => {
  return (
    <motion.div
      variants={itemVariants}
      className="flex flex-col items-center text-center p-6 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-xl border border-gray-200/60 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="mb-5 w-14 h-14 flex items-center justify-center bg-gradient-to-br from-[#90C8E8] to-[#5585AC] text-white rounded-full shadow-md">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-2xl font-bold text-[#34495E] mb-3">{title}</h3>
      <p className="text-base text-[#4A6989] mb-6 min-h-[70px] flex-grow">{description}</p>
      <div className="w-full h-48 bg-[#f7faff]/80 rounded-2xl flex items-center justify-center p-4 border border-[#90C8E8]/50 shadow-inner">
        {visual}
      </div>
    </motion.div>
  );
});
StepCard.displayName = 'StepCard'; // For better debugging


// --- Main JourneySection Component ---
export default function JourneySection() {
  return (
    <section className="w-full py-28 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2 
          className="text-4xl md:text-5xl font-black text-[#34495E] mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          Your Personalized Journey Starts Here
        </motion.h2>
        <motion.p 
          className="text-lg text-[#4A6989] max-w-3xl mx-auto mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          From your goals to a tailored curriculum, see how Edgenius crafts the perfect learning experience just for you in three simple, intelligent steps.
        </motion.p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-10"
        >
          {JOURNEY_STEPS.map((step) => (
            <StepCard key={step.title} {...step} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
