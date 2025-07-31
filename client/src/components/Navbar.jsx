import React, { useState } from "react";
import { Menu, X, ChevronDown, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "My Goals", href: "#my-goals" },
    { name: "My Lessons", href: "#my-lessons" },
    { name: "My Quizzes", href: "#my-quizzes" },
    { name: "AI Mentor", href: "#ai-mentor" },
    { name: "About Edgenius", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  const linkVariants = {
    hover: { scale: 1.05, color: "#749BC2" },
    tap: { scale: 0.95 },
  };

  const primaryButtonVariants = {
    hover: {
      scale: 1.03,
      backgroundColor: "#6b92b9",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    },
    tap: { scale: 0.97 },
  };

  const secondaryButtonVariants = {
    hover: {
      scale: 1.03,
      borderColor: "#749BC2",
      color: "#749BC2",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.05)",
    },
    tap: { scale: 0.97 },
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
      },
    },
  };

  const mobileMenuItemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <>
      <style>
        {`
        :root {
          --color-edgenius-light-cream: #FFFBDE;
          --color-edgenius-light-blue: #91C8E4;
          --color-edgenius-medium-blue: #749BC2;
          --color-edgenius-dark-blue: #4682A9;
        }

        .bg-edgenius-light-cream { background-color: var(--color-edgenius-light-cream); }
        .text-edgenius-light-cream { color: var(--color-edgenius-light-cream); }
        .border-edgenius-light-cream { border-color: var(--color-edgenius-light-cream); }

        .bg-edgenius-light-blue { background-color: var(--color-edgenius-light-blue); }
        .text-edgenius-light-blue { color: var(--color-edgenius-light-blue); }
        .border-edgenius-light-blue { border-color: var(--color-edgenius-light-blue); }
        .focus\\:ring-edgenius-light-blue:focus { --tw-ring-color: var(--color-edgenius-light-blue); }
        .group-hover\\:text-edgenius-light-blue:hover { color: var(--color-edgenius-light-blue); }
        .scrollbar-thumb-edgenius-light-blue::-webkit-scrollbar-thumb { background-color: var(--color-edgenius-light-blue); }

        .bg-edgenius-medium-blue { background-color: var(--color-edgenius-medium-blue); }
        .text-edgenius-medium-blue { color: var(--color-edgenius-medium-blue); }
        .border-edgenius-medium-blue { border-color: var(--color-edgenius-medium-blue); }
        .hover\\:bg-edgenius-medium-blue:hover { background-color: var(--color-edgenius-medium-blue); }
        .focus\\:ring-edgenius-medium-blue:focus { --tw-ring-color: var(--color-edgenius-medium-blue); }
        .group-hover\\:text-edgenius-medium-blue:hover { color: var(--color-edgenius-medium-blue); }

        .bg-edgenius-dark-blue { background-color: var(--color-edgenius-dark-blue); }
        .text-edgenius-dark-blue { color: var(--color-edgenius-dark-blue); }
        .border-edgenius-dark-blue { border-color: var(--color-edgenius-dark-blue); }
        .hover\\:bg-edgenius-dark-blue:hover { background-color: var(--color-edgenius-dark-blue); }

        .navbar-container {
          position: sticky;
          top: 1rem;
          z-index: 50;
          margin-left: auto;
          margin-right: auto;
          max-width: 90%;
          width: 100%;
          background-color: white;
          border-radius: 9999px;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          background-color: rgba(255, 255, 255, 0.8);
        }

        @media (min-width: 768px) {
          .navbar-container {
            max-width: 70rem;
          }
        }
        `}
      </style>

      <nav className="navbar-container">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <motion.div
            className="flex items-center space-x-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
          >
            <span className="text-2xl font-bold text-[#4682A9]">EdGenius</span>
          </motion.div>

          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.slice(0, 5).map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="text-[#4682A9] flex items-center group font-medium"
                variants={linkVariants}
                whileHover="hover"
                whileTap="tap"
              >
                {link.name}
                {link.name === "Features" ||
                link.name === "Solutions" ||
                link.name === "Resources" ||
                link.name === "Pricing" ? (
                  <ChevronDown className="w-4 h-4 ml-1 text-[#749BC2] group-hover:text-[#91C8E4] transition-transform duration-200 group-hover:rotate-180" />
                ) : null}
              </motion.a>
            ))}
            <motion.a
              href="/signup"
              className="px-6 py-2 bg-[#4682A9] text-white rounded-full font-medium flex items-center space-x-2 transition-all duration-300"
              variants={primaryButtonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <span>Start Learning</span>
              <ArrowUpRight className="w-4 h-4" />
            </motion.a>
          </div>

          <div className="md:hidden">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none p-2 rounded-full bg-edgenius-light-cream"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isOpen ? (
                <X className="w-6 h-6 text-[#4682A9]" />
              ) : (
                <Menu className="w-6 h-6 text-[#4682A9]" />
              )}
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden px-4 pb-4 space-y-2 bg-white rounded-b-xl shadow-lg"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={mobileMenuVariants}
            >
              {navLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="block text-[#4682A9] py-2 px-3 rounded-md hover:bg-[#FFFBDE] transition"
                  variants={mobileMenuItemVariants}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </motion.a>
              ))}
              {/* I've changed this from a button to an anchor tag and added an href */}
              <motion.a
                href="/signin"
                className="block w-full text-center px-4 py-2 bg-[#4682A9] text-white rounded-md hover:bg-[#749BC2] transition"
                variants={mobileMenuItemVariants}
                onClick={() => setIsOpen(false)}
              >
                Login
              </motion.a>
              {/* I've also changed the Sign Up button to a link */}
              <motion.a
                href="/signup"
                className="block w-full text-center px-4 py-2 bg-[#91C8E4] text-white rounded-md hover:bg-[#749BC2] transition flex items-center justify-center space-x-2"
                variants={mobileMenuItemVariants}
                onClick={() => setIsOpen(false)}
              >
                <span>Sign Up</span>
                <ArrowUpRight className="w-4 h-4" />
              </motion.a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;
