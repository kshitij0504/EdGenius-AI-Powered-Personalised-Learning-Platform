import {
  IoRibbonOutline,
  IoGiftOutline,
  IoFlashOutline,
  IoTrendingUpOutline,
} from "react-icons/io5";

const MilestoneCard = ({ milestone, index }) => {
  const isAchieved = milestone.achieved;
  const progress = milestone.achieved
    ? 100
    : (milestone.current / milestone.target) * 100;

  return (
    <div
      className={`relative p-5 rounded-lg shadow-sm border ${
        isAchieved
          ? "bg-[rgba(145,200,228,0.5)] border-[var(--color-edgenius-accent-medium)]"
          : "bg-[var(--color-edgenius-bg-lightest)] border-[var(--color-edgenius-accent-light)]"
      } animate-fade-in-up`}
      style={{ animationDelay: `${0.1 + index * 0.08}s` }}
    >
      <div className="flex items-center mb-3">
        <IoRibbonOutline
          className={`text-3xl mr-3 ${
            isAchieved
              ? "text-[var(--color-edgenius-accent-dark)]"
              : "text-[var(--color-edgenius-accent-medium)]"
          }`}
        />
        <h4 className="text-lg font-semibold text-[var(--color-edgenius-text-primary)]">
          {milestone.title}
        </h4>
      </div>
      {isAchieved ? (
        <p className="text-sm text-[var(--color-edgenius-text-secondary)]">
          Achieved on: {milestone.date}
        </p>
      ) : (
        <>
          <p className="text-sm text-[var(--color-edgenius-text-secondary)]">
            Progress: {milestone.current} / {milestone.target}
          </p>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
            <div
              className="h-1.5 rounded-full animate-progress-fill"
              style={{
                width: `${progress}%`,
                backgroundColor: "var(--color-edgenius-accent-medium)",
                "--progress-width": `${progress}%`,
              }}
            ></div>
          </div>
        </>
      )}
      {isAchieved && (
        <span className="absolute top-3 right-3 text-[var(--color-edgenius-accent-dark)] text-opacity-80">
          🏆
        </span>
      )}
    </div>
  );
};

const LearningMilestones = ({ milestones, xpPoints, level }) => {
  return (
    <section className="bg-white p-8 rounded-xl shadow-lg animate-fade-in-up">
      <h3 className="text-3xl font-extrabold text-[var(--color-edgenius-accent-dark)] mb-7 flex items-center">
        <IoTrendingUpOutline className="text-[var(--color-edgenius-accent-medium)] mr-3 text-4xl animate-bounce-subtle" />
        Learning Milestones
      </h3>

      <div className="flex justify-between items-center bg-[rgba(145,200,228,0.3)] p-5 rounded-lg mb-6 shadow-inner animate-scale-in">
        <div className="text-center">
          <p className="text-[var(--color-edgenius-text-secondary)] text-sm">
            XP Points
          </p>
          <p className="text-3xl font-bold text-[var(--color-edgenius-accent-dark)] mt-1 animate-pulse-small-once">
            {xpPoints}
          </p>
        </div>
        <div className="text-center">
          <p className="text-[var(--color-edgenius-text-secondary)] text-sm">
            Current Level
          </p>
          <p className="text-3xl font-bold text-[var(--color-edgenius-accent-dark)] mt-1 animate-pulse-small-once">
            {level}
          </p>
        </div>
        <button className="bg-[var(--color-edgenius-accent-medium)] text-[var(--color-edgenius-button-text)] px-6 py-3 rounded-full font-bold text-sm shadow-md flex items-center hover:bg-[var(--color-edgenius-accent-dark)] transition-all duration-300">
          <IoGiftOutline className="mr-2 text-xl" /> Rewards
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {milestones.map((milestone, index) => (
          <MilestoneCard
            key={milestone.id}
            milestone={milestone}
            index={index}
          />
        ))}
        {milestones.length === 0 && (
          <p className="text-center text-[var(--color-edgenius-text-secondary)] col-span-full py-4">
            No milestones set yet. Keep learning to unlock them!
          </p>
        )}
      </div>
    </section>
  );
};

export default LearningMilestones;
