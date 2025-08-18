// import React from "react";
// import { motion } from "framer-motion";
// // For icons, you'll need to install lucide-react: npm install lucide-react
// import { Star } from "lucide-react";

// // --- Testimonial Data ---
// const testimonials = [
//   {
//     name: "Sarah L.",
//     role: "Software Engineer @ TechCorp",
//     quote:
//       "Edgenius completely changed how I learn new frameworks. The personalized path saved me weeks of sifting through generic tutorials. A true game-changer.",
//     avatar: "https://i.pravatar.cc/150?img=1",
//   },
//   {
//     name: "David Chen",
//     role: "Data Science Student",
//     quote:
//       "The 24/7 AI mentor is incredible. I was stuck on a complex algorithm, and it gave me a clear, step-by-step explanation at 2 AM. I aced my exam because of it.",
//     avatar: "https://i.pravatar.cc/150?img=3",
//   },
//   {
//     name: "Maria Garcia",
//     role: "UX Designer & Team Lead",
//     quote:
//       "As an instructor, the analytics dashboard is invaluable. I can see exactly where my team is struggling and provide targeted support. Onboarding has never been faster.",
//     avatar: "https://i.pravatar.cc/150?img=5",
//   },
//   {
//     name: "Alex Johnson",
//     role: "Aspiring Mobile Developer",
//     quote:
//       "I went from knowing zero Swift to building my first iOS app in a month. The curriculum was perfectly paced and the adaptive quizzes kept me motivated.",
//     avatar: "https://i.pravatar.cc/150?img=7",
//   },
//   {
//     name: "Priya Patel",
//     role: "Product Manager",
//     quote:
//       "We use Edgenius to upskill our entire product team. The platform's ability to create custom learning paths for different roles is simply unmatched.",
//     avatar: "https://i.pravatar.cc/150?img=8",
//   },
// ];

// // --- Reusable Testimonial Card Component ---
// const TestimonialCard = ({ name, role, quote, avatar }) => (
//   <div className="relative flex-shrink-0 w-[400px] h-auto p-8 bg-[var(--card-bg)] rounded-2xl shadow-lg border border-[var(--border-light)] mx-5 flex flex-col">
//     <div className="flex text-yellow-400 mb-4">
//       {[...Array(5)].map((_, i) => (
//         <Star key={i} fill="currentColor" className="w-5 h-5" />
//       ))}
//     </div>
//     <p className="text-base text-[var(--color-landing-text-slate)] leading-relaxed mb-6 flex-grow">
//       "{quote}"
//     </p>
//     <div className="flex items-center">
//       <img
//         src={avatar}
//         alt={name}
//         className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
//         onError={(e) => {
//           e.target.onerror = null;
//           e.target.src = "https://placehold.co/150x150/EBF4FF/34495E?text=User";
//         }}
//       />
//       <div className="ml-4">
//         <h4 className="text-md font-bold text-[var(--color-landing-text-navy)]">
//           {name}
//         </h4>
//         <p className="text-sm text-[var(--color-landing-accent-medium)]">
//           {role}
//         </p>
//       </div>
//     </div>
//   </div>
// );

// // --- Main InfiniteScroll Component ---
// export default function InfiniteTestimonialScroll() {
//   const duplicatedTestimonials = [...testimonials, ...testimonials];

//   const marqueeVariants = {
//     animate: {
//       x: [0, -2150],
//       transition: {
//         x: {
//           repeat: Infinity,
//           repeatType: "loop",
//           duration: 60,
//           ease: "linear",
//         },
//       },
//     },
//   };

//   return (
//     <section className="w-full py-28">
//       <div className="max-w-7xl mx-auto text-center mb-20">
//         <h2 className="text-4xl md:text-5xl font-black text-[var(--color-landing-text-navy)] mb-4">
//           Loved by Learners & Professionals
//         </h2>
//         <p className="text-lg text-[var(--color-landing-text-slate)] max-w-2xl mx-auto">
//           See how Edgenius is empowering individuals and teams to achieve their
//           learning goals faster.
//         </p>
//       </div>
//       <div className="relative w-full overflow-hidden group">
//         <motion.div
//           className="flex py-4"
//           variants={marqueeVariants}
//           animate="animate"
//           whileHover={{ paused: true }}
//         >
//           {duplicatedTestimonials.map((testimonial, index) => (
//             <TestimonialCard key={index} {...testimonial} />
//           ))}
//         </motion.div>

//         {/* Updated gradients to use theme variables */}
//         <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[var(--color-landing-bg-cream)] to-transparent pointer-events-none"></div>
//         <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[var(--color-landing-bg-cream)] to-transparent pointer-events-none"></div>
//       </div>
//     </section>
//   );
// }
import React from "react";
import { motion } from "framer-motion";
// For icons, you'll need to install lucide-react: npm install lucide-react
import { Star } from "lucide-react";

// --- Testimonial Data (No changes needed here) ---
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

// --- Reusable Testimonial Card Component with New Theme ---
const TestimonialCard = ({ name, role, quote, avatar }) => (
  // Using theme-aware classes for background and border
  <div className="relative flex-shrink-0 w-[400px] h-auto p-8 bg-card rounded-2xl shadow-lg border-primary/10 mx-5 flex flex-col">
    {/* Updated star color to match the new theme */}
    <div className="flex text-yellow-400 mb-4">
      {[...Array(5)].map((_, i) => (
        <Star key={i} fill="currentColor" className="w-5 h-5" />
      ))}
    </div>
    {/* Using theme-aware class for quote text */}
    <p className="text-base text-muted-foreground leading-relaxed mb-6 flex-grow">
      "{quote}"
    </p>
    <div className="flex items-center">
      <img
        src={avatar}
        alt={name}
        // Using theme-aware border color that adapts to light/dark mode
        className="w-12 h-12 rounded-full object-cover border-2 border-background shadow-sm"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://placehold.co/150x150/EBF4FF/34495E?text=User";
        }}
      />
      <div className="ml-4">
        {/* Using theme-aware class for name text */}
        <h4 className="text-md font-bold text-foreground">{name}</h4>
        {/* Using the new primary color for the role */}
        <p className="text-sm text-[#1b6fdd] font-semibold">{role}</p>
      </div>
    </div>
  </div>
);

// --- Main InfiniteScroll Component ---
export default function InfiniteTestimonialScroll() {
  // Duplicating the array for a seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  const marqueeVariants = {
    animate: {
      x: [0, -2200], // Adjusted based on card width (400px) + margin (40px) * 5
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
    <section className="w-full py-28 bg-background">
      <div className="max-w-7xl mx-auto text-center mb-20">
        {/* Using theme-aware text colors */}
        <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
          Loved by Learners & Professionals
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          See how Edgenius is empowering individuals and teams to achieve their
          learning goals faster.
        </p>
      </div>
      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex py-4"
          variants={marqueeVariants}
          animate="animate"
          // Pausing on hover is a nice UX touch
          whileHover={{ paused: true }}
        >
          {duplicatedTestimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </motion.div>

        {/* Updated gradients to use theme-aware background color */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-background to-transparent pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-background to-transparent pointer-events-none"></div>
      </div>
    </section>
  );
}
