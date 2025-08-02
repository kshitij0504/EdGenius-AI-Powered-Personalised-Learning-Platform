import React from "react";
import { IoSparklesOutline, IoPlayCircleOutline } from "react-icons/io5";

const HeroSection = ({ user, onContinue }) => {
  return (
    <div
      className="p-10 rounded-xl shadow-lg flex flex-col md:flex-row items-center justify-between text-[var(--color-edgenius-button-text)] relative overflow-hidden animate-scale-in"
      style={{
        background:
          "linear-gradient(to bottom right, var(--color-edgenius-accent-dark), var(--color-edgenius-accent-medium))",
      }}
    >
      <div
        className="absolute top-0 left-0 w-full h-full opacity-10 bg-no-repeat bg-cover z-0"
        style={{
          backgroundImage:
            "url('https://www.transparenttextures.com/patterns/absurd-pattern.png')",
        }}
      ></div>

      <div className="relative z-10 text-center md:text-left md:w-2/3 mb-6 md:mb-0">
        <h2 className="text-5xl font-extrabold mb-3 leading-tight animate-fade-in-up">
          Hello,{" "}
          <span className="text-[var(--color-edgenius-bg-lightest)]">
            {user.name.split(" ")[0]}!
          </span>
        </h2>
        <p
          className="text-lg mb-4 opacity-90 animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          Your personalized journey to{" "}
          <span className="font-bold italic">"{user.learningGoal}"</span> is
          unfolding. Let's continue shaping your brilliance.
        </p>
        <button
          onClick={onContinue}
          className="bg-[var(--color-edgenius-accent-dark)] text-[var(--color-edgenius-button-text)] px-8 py-4 rounded-full text-lg font-bold shadow-xl flex items-center justify-center group
                     hover:bg-[var(--color-edgenius-accent-dark)] hover:scale-105 transition-all duration-300 ease-out transform animate-fade-in-up"
          style={{ animationDelay: "0.3s", "--tw-bg-opacity": "0.9" }}
        >
          <IoPlayCircleOutline className="text-2xl mr-3 group-hover:scale-110 transition-transform" />
          Continue Learning:{" "}
          <span className="ml-2 font-light">{user.currentLessonTitle}</span>
        </button>
      </div>

      <div className="relative z-10 md:w-1/3 flex justify-center items-center">
        <IoSparklesOutline className="text-[var(--color-edgenius-bg-lightest)] opacity-70 text-[150px] animate-float" />
        <span
          className="absolute text-[var(--color-edgenius-bg-lightest)] text-xl font-bold animate-bounce-subtle"
          style={{ transform: "translateY(10px)" }}
        >
          AI-Powered
        </span>
      </div>
    </div>
  );
};

export default HeroSection;
