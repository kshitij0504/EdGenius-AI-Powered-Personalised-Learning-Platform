// import React from "react";
// import { motion } from "framer-motion";
// import { Target, TestTubeDiagonal, Route } from "lucide-react";

// const VisualStep1 = () => (
//   <div className="w-5/6 p-3 bg-[var(--card-bg)] rounded-lg shadow-inner border border-[var(--border-light)] text-left text-sm text-[var(--color-landing-text-slate)]">
//     I want to master{" "}
//     <span className="font-semibold text-[var(--color-landing-accent-medium)]">
//       React for building enterprise apps...
//     </span>
//   </div>
// );

// const VisualStep2 = () => (
//   <div className="w-full text-left p-2">
//     <p className="text-sm font-bold text-[var(--color-landing-text-navy)] mb-2">
//       What is a React Hook?
//     </p>
//     <div className="space-y-2 text-sm">
//       <div className="p-2 bg-gradient-to-r from-blue-50 to-white rounded-md border border-[var(--color-landing-accent-bright)] text-[var(--color-landing-text-slate)] font-medium">
//         A function to 'hook into' React state...
//       </div>
//       <div className="p-2 bg-[var(--hover-bg-light)] rounded-md text-[var(--color-landing-text-slate)]">
//         A type of lifecycle method...
//       </div>
//     </div>
//   </div>
// );

// const AnimatedPath = () => (
//   <motion.svg
//     width="150"
//     height="80"
//     viewBox="0 0 150 80"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <motion.path
//       d="M10 70 Q 30 10, 75 40 T 140 10"
//       stroke="url(#journey-gradient)"
//       strokeWidth="6"
//       strokeLinecap="round"
//       initial={{ pathLength: 0 }}
//       whileInView={{ pathLength: 1 }}
//       viewport={{ once: true, amount: 0.5 }}
//       transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
//     />
//     <defs>
//       <linearGradient id="journey-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
//         <stop offset="0%" stopColor="var(--color-landing-accent-medium)" />
//         <stop offset="100%" stopColor="var(--color-landing-accent-bright)" />
//       </linearGradient>
//     </defs>
//   </motion.svg>
// );

// const JOURNEY_STEPS = [
//   {
//     icon: Target,
//     title: "Define Your Ambition",
//     description:
//       "Tell Edgenius your learning goal, and our AI analyzes the core concepts you need to learn.",
//     visual: <VisualStep1 />,
//   },
//   {
//     icon: TestTubeDiagonal,
//     title: "AI Skill Assessment",
//     description:
//       "A quick, adaptive quiz instantly identifies your current knowledge gaps and strengths.",
//     visual: <VisualStep2 />,
//   },
//   {
//     icon: Route,
//     title: "Receive Your Path",
//     description:
//       "Get a dynamic curriculum built for you. No more generic content, only what you need to succeed.",
//     visual: <AnimatedPath />,
//   },
// ];

// const containerVariants = {
//   hidden: {},
//   visible: {
//     transition: {
//       staggerChildren: 0.2,
//     },
//   },
// };

// const itemVariants = {
//   hidden: { opacity: 0, y: 50 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.7,
//       ease: "easeOut",
//     },
//   },
// };

// const StepCard = React.memo(({ icon: Icon, title, description, visual }) => {
//   return (
//     <motion.div
//       variants={itemVariants}
//       className="flex flex-col items-center text-center p-6 bg-[var(--card-bg)] backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-xl border border-[var(--border-light)] transition-all duration-300 hover:-translate-y-1"
//     >
//       <div className="mb-5 w-14 h-14 flex items-center justify-center bg-gradient-to-br from-[var(--color-landing-accent-bright)] to-[var(--color-landing-accent-medium)] text-[var(--color-edgenius-button-text)] rounded-full shadow-md">
//         <Icon className="w-7 h-7" />
//       </div>
//       <h3 className="text-2xl font-bold text-[var(--color-landing-text-navy)] mb-3">
//         {title}
//       </h3>
//       <p className="text-base text-[var(--color-landing-text-slate)] mb-6 min-h-[70px] flex-grow">
//         {description}
//       </p>
//       <div className="w-full h-48 bg-[var(--hover-bg-light)] rounded-2xl flex items-center justify-center p-4 border border-[var(--color-landing-accent-bright)]/50 shadow-inner">
//         {visual}
//       </div>
//     </motion.div>
//   );
// });
// StepCard.displayName = "StepCard";

// export default function JourneySection() {
//   return (
//     <section className="w-full py-28 px-4 sm:px-8">
//       <div className="max-w-7xl mx-auto text-center">
//         <motion.h2
//           className="text-4xl md:text-5xl font-black text-[var(--color-landing-text-navy)] mb-4"
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, amount: 0.5 }}
//           transition={{ duration: 0.6 }}
//         >
//           Your Personalized Journey Starts Here
//         </motion.h2>
//         <motion.p
//           className="text-lg text-[var(--color-landing-text-slate)] max-w-3xl mx-auto mb-20"
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, amount: 0.5 }}
//           transition={{ duration: 0.6, delay: 0.1 }}
//         >
//           From your goals to a tailored curriculum, see how Edgenius crafts the
//           perfect learning experience just for you in three simple, intelligent
//           steps.
//         </motion.p>

//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.2 }}
//           className="grid grid-cols-1 lg:grid-cols-3 gap-10"
//         >
//           {JOURNEY_STEPS.map((step) => (
//             <StepCard key={step.title} {...step} />
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// }
import React from "react";
import { motion } from "framer-motion";
import { Target, TestTubeDiagonal, Route } from "lucide-react";

// Visual components updated with the new color theme
const VisualStep1 = () => (
  <div className="w-5/6 p-3 bg-card rounded-lg shadow-inner border border-primary/20 text-left text-sm text-muted-foreground">
    I want to master{" "}
    <span className="font-semibold text-[#1b6fdd]">
      React for building enterprise apps...
    </span>
  </div>
);

const VisualStep2 = () => (
  <div className="w-full text-left p-2">
    <p className="text-sm font-bold text-foreground mb-2">
      What is a React Hook?
    </p>
    <div className="space-y-2 text-sm">
      <div className="p-2 bg-primary/10 rounded-md border border-[#1b6fdd] text-foreground font-medium">
        A function to 'hook into' React state...
      </div>
      <div className="p-2 bg-muted rounded-md text-muted-foreground">
        A type of lifecycle method...
      </div>
    </div>
  </div>
);

const AnimatedPath = () => (
  <motion.svg
    width="150"
    height="80"
    viewBox="0 0 150 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <motion.path
      d="M10 70 Q 30 10, 75 40 T 140 10"
      stroke="url(#journey-gradient-themed)"
      strokeWidth="6"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
    />
    <defs>
      <linearGradient
        id="journey-gradient-themed"
        x1="0%"
        y1="0%"
        x2="100%"
        y2="0%"
      >
        <stop offset="0%" stopColor="#1b6fdd" />
        <stop offset="100%" stopColor="#60a5fa" />
      </linearGradient>
    </defs>
  </motion.svg>
);

const JOURNEY_STEPS = [
  {
    icon: Target,
    title: "Define Your Ambition",
    description:
      "Tell Edgenius your learning goal, and our AI analyzes the core concepts you need to learn.",
    visual: <VisualStep1 />,
  },
  {
    icon: TestTubeDiagonal,
    title: "AI Skill Assessment",
    description:
      "A quick, adaptive quiz instantly identifies your current knowledge gaps and strengths.",
    visual: <VisualStep2 />,
  },
  {
    icon: Route,
    title: "Receive Your Path",
    description:
      "Get a dynamic curriculum built for you. No more generic content, only what you need to succeed.",
    visual: <AnimatedPath />,
  },
];

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
      ease: "easeOut",
    },
  },
};

// Main components refactored to use theme-aware classes and the new colors
const StepCard = React.memo(({ icon: Icon, title, description, visual }) => {
  return (
    <motion.div
      variants={itemVariants}
      className="flex flex-col items-center text-center p-6 bg-card backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      <div className="mb-5 w-14 h-14 flex items-center justify-center bg-gradient-to-br from-#3b87eb to-[#1b6fdd] text-primary-foreground rounded-full shadow-md">
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-2xl font-bold text-foreground mb-3">{title}</h3>
      <p className="text-base text-muted-foreground mb-6 min-h-[70px] flex-grow">
        {description}
      </p>
      <div className="w-full h-48 bg-background rounded-2xl flex items-center justify-center p-4 border border-[#1b6fdd]/50 shadow-inner">
        {visual}
      </div>
    </motion.div>
  );
});
StepCard.displayName = "StepCard";

export default function JourneySection() {
  return (
    <section className="w-full py-28 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-black text-foreground mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          Your Personalized Journey Starts Here
        </motion.h2>
        <motion.p
          className="text-lg text-muted-foreground max-w-3xl mx-auto mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          From your goals to a tailored curriculum, see how Edgenius crafts the
          perfect learning experience just for you in three simple, intelligent
          steps.
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
