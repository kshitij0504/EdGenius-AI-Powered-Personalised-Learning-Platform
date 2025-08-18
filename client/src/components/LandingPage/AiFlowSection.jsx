// import React from "react";
// import ReactFlow, { Background, Handle, Position } from "reactflow";
// import "reactflow/dist/style.css";
// import { motion } from "framer-motion";
// import RandomBezierEdge from "./RandomBezierEdge";
// import { Player } from "@lottiefiles/react-lottie-player";
// import animationData from "././../../assets/brainanimation.json";

// const ProblemNode = ({ data }) => (
//   <div className="relative">
//     <motion.div
//       initial={{ opacity: 0, x: -50 }}
//       animate={{ opacity: 1, x: 0 }}
//       transition={{ delay: data.delay, duration: 0.8, ease: "easeOut" }}
//       className="flex items-center space-x-4 p-4"
//     >
//       <div
//         className={`w-14 h-14 ${data.iconBg} rounded-2xl flex items-center justify-center shadow-lg`}
//       >
//         <span className="text-2xl">{data.emoji}</span>
//       </div>
//       <div className="flex-1">
//         <div className="font-bold text-xl text-[var(--color-landing-text-navy)] mb-2">
//           {data.title}
//         </div>
//         <div className="text-sm text-[var(--color-landing-text-slate)] leading-relaxed">
//           {data.description}
//         </div>
//       </div>
//     </motion.div>
//     <Handle
//       type="source"
//       position={Position.Right}
//       style={{
//         background: "var(--color-landing-accent-medium)",
//         border: `2px solid var(--color-landing-bg-cream)`,
//         width: 12,
//         height: 12,
//         right: -6,
//       }}
//     />
//   </div>
// );

// const SolutionNode = ({ data }) => (
//   <div className="relative">
//     <Handle
//       type="target"
//       position={Position.Left}
//       style={{
//         background: "var(--color-landing-accent-medium)",
//         border: `2px solid var(--color-landing-bg-cream)`,
//         width: 12,
//         height: 12,
//         left: -6,
//       }}
//     />
//     <motion.div
//       initial={{ opacity: 0, x: 50 }}
//       animate={{ opacity: 1, x: 0 }}
//       transition={{ delay: data.delay, duration: 0.8, ease: "easeOut" }}
//       className="flex items-center space-x-4 p-4"
//     >
//       <div
//         className={`w-12 h-12 ${data.iconBg} rounded-xl flex items-center justify-center shadow-md`}
//       >
//         <span className="text-xl">{data.emoji}</span>
//       </div>
//       <div className="flex-1">
//         <div className="font-bold text-lg text-[var(--color-landing-text-navy)] mb-1">
//           {data.title}
//         </div>
//         <div className="text-sm text-[var(--color-landing-text-slate)]">
//           {data.description}
//         </div>
//       </div>
//     </motion.div>
//   </div>
// );

// const BrainNode = () => (
//   <div className="relative">
//     <Handle
//       type="target"
//       position={Position.Left}
//       style={{
//         background: "var(--color-landing-accent-medium)",
//         border: `2px solid var(--color-landing-bg-cream)`,
//         width: 14,
//         height: 14,
//         left: -7,
//       }}
//     />
//     <Handle
//       type="source"
//       position={Position.Right}
//       style={{
//         background: "var(--color-landing-accent-medium)",
//         border: `2px solid var(--color-landing-bg-cream)`,
//         width: 14,
//         height: 14,
//         right: -7,
//       }}
//     />
//     <motion.div
//       animate={{ scale: [1, 1.03, 1], rotate: [0, 1.5, 0] }}
//       transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
//       className="flex justify-center items-center"
//     >
//       <Player
//         autoplay
//         loop
//         src={animationData}
//         style={{ height: "300px", width: "250px" }}
//       />
//     </motion.div>
//   </div>
// );
// const nodeTypes = {
//   problemNode: ProblemNode,
//   solutionNode: SolutionNode,
//   brainNode: BrainNode,
// };

// const edgeTypes = {
//   randomBezier: RandomBezierEdge,
// };

// const nodes = [
//   // Problem Nodes
//   {
//     id: "problem1",
//     type: "problemNode",
//     position: { x: 50, y: 100 },
//     data: {
//       title: "Overwhelmed Learners",
//       description: "Generic learning paths lack personalization",
//       emoji: "😵",
//       iconBg:
//         "bg-gradient-to-br from-[var(--color-landing-accent-bright)] to-[var(--color-landing-accent-medium)]",
//       delay: 0.2,
//     },
//     style: {
//       background: "var(--card-bg)",
//       padding: 0,
//       borderRadius: 24,
//       border: "1px solid var(--color-landing-accent-bright)",
//       boxShadow:
//         "0 10px 25px -5px var(--shadow-primary), 0 8px 10px -6px var(--shadow-primary)",
//       minWidth: 380,
//       minHeight: 120,
//     },
//   },
//   {
//     id: "problem2",
//     type: "problemNode",
//     position: { x: 50, y: 280 },
//     data: {
//       title: "No Progress Tracking",
//       description: "Limited insights into learning journey",
//       emoji: "📉",
//       iconBg:
//         "bg-gradient-to-br from-[var(--color-landing-accent-bright)] to-[var(--color-landing-accent-medium)]",
//       delay: 0.4,
//     },
//     style: {
//       background: "var(--card-bg)",
//       padding: 0,
//       borderRadius: 24,
//       border: "1px solid var(--color-landing-accent-bright)",
//       boxShadow:
//         "0 10px 25px -5px var(--shadow-primary), 0 8px 10px -6px var(--shadow-primary)",
//       minWidth: 380,
//       minHeight: 120,
//     },
//   },
//   {
//     id: "problem3",
//     type: "problemNode",
//     position: { x: 50, y: 460 },
//     data: {
//       title: "Stuck Without Help",
//       description: "No instant support when needed most",
//       emoji: "❓",
//       iconBg:
//         "bg-gradient-to-br from-[var(--color-landing-accent-bright)] to-[var(--color-landing-accent-medium)]",
//       delay: 0.6,
//     },
//     style: {
//       background: "var(--card-bg)",
//       padding: 0,
//       borderRadius: 24,
//       border: "1px solid var(--color-landing-accent-bright)",
//       boxShadow:
//         "0 10px 25px -5px var(--shadow-primary), 0 8px 10px -6px var(--shadow-primary)",
//       minWidth: 380,
//       minHeight: 120,
//     },
//   },
//   // Brain Node
//   {
//     id: "brain",
//     type: "brainNode",
//     position: { x: 580, y: 250 },
//     data: {},
//     style: {
//       background: "transparent",
//       padding: 0,
//       border: "none",
//       minWidth: 240,
//       minHeight: 240,
//     },
//   },
//   // Solution Nodes
//   {
//     id: "solution1",
//     type: "solutionNode",
//     position: { x: 950, y: 50 },
//     data: {
//       title: "Personalized Paths",
//       description: "AI-curated curriculum",
//       emoji: "🎯",
//       iconBg:
//         "bg-gradient-to-br from-[var(--color-landing-accent-bright)] to-[var(--color-landing-accent-medium)]",
//       delay: 0.8,
//     },
//     style: {
//       background: "var(--card-bg)",
//       padding: 0,
//       borderRadius: 24,
//       border: "1px solid var(--color-landing-accent-bright)",
//       boxShadow:
//         "0 10px 25px -5px var(--shadow-primary), 0 8px 10px -6px var(--shadow-primary)",
//       minWidth: 380,
//       minHeight: 120,
//     },
//   },

//   {
//     id: "solution2",
//     type: "solutionNode",
//     position: { x: 950, y: 170 },
//     data: {
//       title: "Smart Analytics",
//       description: "Progress insights",
//       emoji: "📊",
//       iconBg:
//         "bg-gradient-to-br from-[var(--color-landing-accent-bright)] to-[var(--color-landing-accent-medium)]",
//       delay: 1.0,
//     },
//     style: {
//       background: "var(--card-bg)",
//       padding: 0,
//       borderRadius: 24,
//       border: "1px solid var(--color-landing-accent-bright)",
//       boxShadow:
//         "0 10px 25px -5px var(--shadow-primary), 0 8px 10px -6px var(--shadow-primary)",
//       minWidth: 380,
//       minHeight: 120,
//     },
//   },
//   {
//     id: "solution3",
//     type: "solutionNode",
//     position: { x: 950, y: 290 },
//     data: {
//       title: "24/7 AI Mentor",
//       description: "Instant support",
//       emoji: "🤖",
//       iconBg:
//         "bg-gradient-to-br from-[var(--color-landing-accent-bright)] to-[var(--color-landing-accent-medium)]",
//       delay: 1.2,
//     },
//     style: {
//       background: "var(--card-bg)",
//       padding: 0,
//       borderRadius: 24,
//       border: "1px solid var(--color-landing-accent-bright)",
//       boxShadow:
//         "0 10px 25px -5px var(--shadow-primary), 0 8px 10px -6px var(--shadow-primary)",
//       minWidth: 380,
//       minHeight: 120,
//     },
//   },
//   {
//     id: "solution4",
//     type: "solutionNode",
//     position: { x: 950, y: 410 },
//     data: {
//       title: "Adaptive Quizzes",
//       description: "Smart assessment",
//       emoji: "⚡",
//       iconBg:
//         "bg-gradient-to-br from-[var(--color-landing-accent-bright)] to-[var(--color-landing-accent-medium)]",
//       delay: 1.4,
//     },
//     style: {
//       background: "var(--card-bg)",
//       padding: 0,
//       borderRadius: 24,
//       border: "1px solid var(--color-landing-accent-bright)",
//       boxShadow:
//         "0 10px 25px -5px var(--shadow-primary), 0 8px 10px -6px var(--shadow-primary)",
//       minWidth: 380,
//       minHeight: 120,
//     },
//   },
//   {
//     id: "solution5",
//     type: "solutionNode",
//     position: { x: 950, y: 530 },
//     data: {
//       title: "Intelligent LMS",
//       description: "Content delivery",
//       emoji: "📚",
//       iconBg:
//         "bg-gradient-to-br from-[var(--color-landing-accent-bright)] to-[var(--color-landing-accent-medium)]",
//       delay: 1.6,
//     },
//     style: {
//       background: "var(--card-bg)",
//       padding: 0,
//       borderRadius: 24,
//       border: "1px solid var(--color-landing-accent-bright)",
//       boxShadow:
//         "0 10px 25px -5px var(--shadow-primary), 0 8px 10px -6px var(--shadow-primary)",
//       minWidth: 380,
//       minHeight: 120,
//     },
//   },
// ];

// const edges = [
//   // NOTE: Replaced 'randomBezier' with 'smoothstep' as the custom component was not provided.
//   // Themed the stroke colors to match the design.
//   {
//     id: "p1-brain",
//     source: "problem1",
//     target: "brain",
//     type: "randomBezier",
//     animated: true,
//     style: { stroke: "#90C8E8", strokeWidth: 3, opacity: 0.8 },
//   },
//   {
//     id: "p2-brain",
//     source: "problem2",
//     target: "brain",
//     type: "randomBezier",
//     animated: true,
//     style: { stroke: "#90C8E8", strokeWidth: 3, opacity: 0.8 },
//   },
//   {
//     id: "p3-brain",
//     source: "problem3",
//     target: "brain",
//     type: "randomBezier",
//     animated: true,
//     style: { stroke: "#90C8E8", strokeWidth: 3, opacity: 0.8 },
//   },
//   {
//     id: "brain-s1",
//     source: "brain",
//     target: "solution1",
//     type: "randomBezier",
//     animated: true,
//     style: { stroke: "#5585AC", strokeWidth: 3, opacity: 0.8 },
//   },
//   {
//     id: "brain-s2",
//     source: "brain",
//     target: "solution2",
//     type: "randomBezier",
//     animated: true,
//     style: { stroke: "#5585AC", strokeWidth: 3, opacity: 0.8 },
//   },
//   {
//     id: "brain-s3",
//     source: "brain",
//     target: "solution3",
//     type: "randomBezier",
//     animated: true,
//     style: { stroke: "#5585AC", strokeWidth: 3, opacity: 0.8 },
//   },
//   {
//     id: "brain-s4",
//     source: "brain",
//     target: "solution4",
//     type: "randomBezier",
//     animated: true,
//     style: { stroke: "#5585AC", strokeWidth: 3, opacity: 0.8 },
//   },
//   {
//     id: "brain-s5",
//     source: "brain",
//     target: "solution5",
//     type: "randomBezier",
//     animated: true,
//     style: { stroke: "#5585AC", strokeWidth: 3, opacity: 0.8 },
//   },
// ];

// // --- Main Component ---

// export default function AiFlowSection() {
//   return (
//     <div className="w-full h-[90vh] max-h-[950px] relative overflow-hidden rounded-3xl">
//       <ReactFlow
//         nodes={nodes}
//         edges={edges}
//         nodeTypes={nodeTypes}
//         fitView
//         // --- Interaction Disabled for a "Steady" View ---
//         panOnDrag={false}
//         zoomOnScroll={false}
//         nodesDraggable={false}
//         nodesConnectable={false}
//         elementsSelectable={false}
//         proOptions={{ hideAttribution: true }} // Hides the "React Flow" attribution
//         style={{ background: "transparent" }}
//         fitViewOptions={{ padding: 0.1, minZoom: 0.4, maxZoom: 1.2 }}
//       >
//         <Background
//           variant="dots"
//           gap={80}
//           size={1.5}
//           color="#90C8E8"
//           style={{ opacity: 0.5 }}
//         />
//       </ReactFlow>
//     </div>
//   );
// }
import React from "react";
import ReactFlow, { Background, Handle, Position } from "reactflow";
import "reactflow/dist/style.css";
import { motion } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";

// Assuming these components exist from your project structure
import RandomBezierEdge from "./RandomBezierEdge";
import animationData from "././../../assets/brainanimation.json";

// --- Custom Node Components with Multi-Color Theming ---

const ProblemNode = ({ data }) => (
  <div className="relative">
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: data.delay, duration: 0.8, ease: "easeOut" }}
      className="flex items-center space-x-4 p-4"
    >
      <div
        className={`w-14 h-14 ${data.iconBg} rounded-2xl flex items-center justify-center shadow-lg`}
      >
        <span className="text-2xl">{data.emoji}</span>
      </div>
      <div>
        <div className="font-bold text-xl text-foreground mb-2">
          {data.title}
        </div>
        <div className="text-sm text-muted-foreground leading-relaxed">
          {data.description}
        </div>
      </div>
    </motion.div>
    <Handle
      type="source"
      position={Position.Right}
      style={{
        background: data.handleColor,
        border: `2px solid hsl(var(--card))`,
        width: 12,
        height: 12,
        right: -6,
      }}
    />
  </div>
);

const SolutionNode = ({ data }) => (
  <div className="relative">
    <Handle
      type="target"
      position={Position.Left}
      style={{
        background: data.handleColor,
        border: `2px solid hsl(var(--card))`,
        width: 12,
        height: 12,
        left: -6,
      }}
    />
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: data.delay, duration: 0.8, ease: "easeOut" }}
      className="flex items-center space-x-4 p-4"
    >
      <div
        className={`w-12 h-12 ${data.iconBg} rounded-xl flex items-center justify-center shadow-md`}
      >
        <span className="text-xl">{data.emoji}</span>
      </div>
      <div>
        <div className="font-bold text-lg text-foreground mb-1">
          {data.title}
        </div>
        <div className="text-sm text-muted-foreground">{data.description}</div>
      </div>
    </motion.div>
  </div>
);

const BrainNode = () => (
  <div className="relative">
    <Handle
      type="target"
      position={Position.Left}
      style={{
        background: "#1a73e8",
        border: `2px solid hsl(var(--background))`,
        width: 14,
        height: 14,
        left: -7,
      }}
    />
    <Handle
      type="source"
      position={Position.Right}
      style={{
        background: "#1a73e8",
        border: `2px solid hsl(var(--background))`,
        width: 14,
        height: 14,
        right: -7,
      }}
    />
    <motion.div
      animate={{ scale: [1, 1.03, 1] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      className="flex justify-center items-center"
    >
      <Player
        autoplay
        loop
        src={animationData}
        style={{ height: "300px", width: "250px" }}
      />
    </motion.div>
  </div>
);

const nodeTypes = {
  problemNode: ProblemNode,
  solutionNode: SolutionNode,
  brainNode: BrainNode,
};

const edgeTypes = {
  randomBezier: RandomBezierEdge,
};

// Colorful schemes that complement your #1a73e8 theme
const colorSchemes = {
  primary: {
    iconBg: "bg-gradient-to-br from-blue-400 to-[#1a73e8]",
    handleColor: "#1a73e8",
    borderColor: "#1a73e8",
    shadowColor: "rgba(26, 115, 232, 0.2)",
    edgeColor: "#1a73e8",
  },
  complementary: {
    iconBg: "bg-gradient-to-br from-orange-400 to-orange-600",
    handleColor: "#ea580c",
    borderColor: "#ea580c",
    shadowColor: "rgba(234, 88, 12, 0.2)",
    edgeColor: "#ea580c",
  },
  analogous: {
    iconBg: "bg-gradient-to-br from-cyan-400 to-cyan-600",
    handleColor: "#0891b2",
    borderColor: "#0891b2",
    shadowColor: "rgba(8, 145, 178, 0.2)",
    edgeColor: "#0891b2",
  },
  triadic: {
    iconBg: "bg-gradient-to-br from-emerald-400 to-emerald-600",
    handleColor: "#059669",
    borderColor: "#059669",
    shadowColor: "rgba(5, 150, 105, 0.2)",
    edgeColor: "#059669",
  },
  accent: {
    iconBg: "bg-gradient-to-br from-violet-400 to-violet-600",
    handleColor: "#7c3aed",
    borderColor: "#7c3aed",
    shadowColor: "rgba(124, 58, 237, 0.2)",
    edgeColor: "#7c3aed",
  },
};

const nodes = [
  // Problem Nodes with different colors
  {
    id: "problem1",
    type: "problemNode",
    position: { x: 50, y: 100 },
    data: {
      title: "Overwhelmed Learners",
      description: "Generic learning paths lack personalization",
      emoji: "😵",
      iconBg: colorSchemes.complementary.iconBg,
      handleColor: colorSchemes.complementary.handleColor,
      delay: 0.2,
    },
    style: {
      background: "hsl(var(--card))",
      padding: 0,
      borderRadius: 24,
      border: `1px solid ${colorSchemes.complementary.borderColor}`,
      boxShadow: `0 10px 25px -5px ${colorSchemes.complementary.shadowColor}, 0 8px 10px -6px ${colorSchemes.complementary.shadowColor}`,
      width: 380,
    },
  },
  {
    id: "problem2",
    type: "problemNode",
    position: { x: 50, y: 280 },
    data: {
      title: "No Progress Tracking",
      description: "Limited insights into learning journey",
      emoji: "📉",
      iconBg: colorSchemes.analogous.iconBg,
      handleColor: colorSchemes.analogous.handleColor,
      delay: 0.4,
    },
    style: {
      background: "hsl(var(--card))",
      padding: 0,
      borderRadius: 24,
      border: `1px solid ${colorSchemes.analogous.borderColor}`,
      boxShadow: `0 10px 25px -5px ${colorSchemes.analogous.shadowColor}, 0 8px 10px -6px ${colorSchemes.analogous.shadowColor}`,
      width: 380,
    },
  },
  {
    id: "problem3",
    type: "problemNode",
    position: { x: 50, y: 460 },
    data: {
      title: "Stuck Without Help",
      description: "No instant support when needed most",
      emoji: "❓",
      iconBg: colorSchemes.triadic.iconBg,
      handleColor: colorSchemes.triadic.handleColor,
      delay: 0.6,
    },
    style: {
      background: "hsl(var(--card))",
      padding: 0,
      borderRadius: 24,
      border: `1px solid ${colorSchemes.triadic.borderColor}`,
      boxShadow: `0 10px 25px -5px ${colorSchemes.triadic.shadowColor}, 0 8px 10px -6px ${colorSchemes.triadic.shadowColor}`,
      width: 380,
    },
  },

  // Brain Node
  {
    id: "brain",
    type: "brainNode",
    position: { x: 580, y: 250 },
    style: {
      background: "transparent",
      padding: 0,
      border: "none",
      width: 240,
    },
  },

  // Solution Nodes with different colors
  {
    id: "solution1",
    type: "solutionNode",
    position: { x: 950, y: 50 },
    data: {
      title: "Personalized Paths",
      description: "AI-curated curriculum",
      emoji: "🎯",
      delay: 0.8,
      iconBg: colorSchemes.complementary.iconBg,
      handleColor: colorSchemes.complementary.handleColor,
    },
    style: {
      background: "hsl(var(--card))",
      padding: 0,
      borderRadius: 24,
      border: `1px solid ${colorSchemes.complementary.borderColor}`,
      boxShadow: `0 10px 25px -5px ${colorSchemes.complementary.shadowColor}, 0 8px 10px -6px ${colorSchemes.complementary.shadowColor}`,
      width: 380,
    },
  },
  {
    id: "solution2",
    type: "solutionNode",
    position: { x: 950, y: 170 },
    data: {
      title: "Smart Analytics",
      description: "Progress insights",
      emoji: "📊",
      delay: 1.0,
      iconBg: colorSchemes.primary.iconBg,
      handleColor: colorSchemes.primary.handleColor,
    },
    style: {
      background: "hsl(var(--card))",
      padding: 0,
      borderRadius: 24,
      border: `1px solid ${colorSchemes.primary.borderColor}`,
      boxShadow: `0 10px 25px -5px ${colorSchemes.primary.shadowColor}, 0 8px 10px -6px ${colorSchemes.primary.shadowColor}`,
      width: 380,
    },
  },
  {
    id: "solution3",
    type: "solutionNode",
    position: { x: 950, y: 290 },
    data: {
      title: "24/7 AI Mentor",
      description: "Instant support",
      emoji: "🤖",
      delay: 1.2,
      iconBg: colorSchemes.analogous.iconBg,
      handleColor: colorSchemes.analogous.handleColor,
    },
    style: {
      background: "hsl(var(--card))",
      padding: 0,
      borderRadius: 24,
      border: `1px solid ${colorSchemes.analogous.borderColor}`,
      boxShadow: `0 10px 25px -5px ${colorSchemes.analogous.shadowColor}, 0 8px 10px -6px ${colorSchemes.analogous.shadowColor}`,
      width: 380,
    },
  },
  {
    id: "solution4",
    type: "solutionNode",
    position: { x: 950, y: 410 },
    data: {
      title: "Adaptive Quizzes",
      description: "Smart assessment",
      emoji: "⚡",
      delay: 1.4,
      iconBg: colorSchemes.triadic.iconBg,
      handleColor: colorSchemes.triadic.handleColor,
    },
    style: {
      background: "hsl(var(--card))",
      padding: 0,
      borderRadius: 24,
      border: `1px solid ${colorSchemes.triadic.borderColor}`,
      boxShadow: `0 10px 25px -5px ${colorSchemes.triadic.shadowColor}, 0 8px 10px -6px ${colorSchemes.triadic.shadowColor}`,
      width: 380,
    },
  },
  {
    id: "solution5",
    type: "solutionNode",
    position: { x: 950, y: 530 },
    data: {
      title: "Intelligent LMS",
      description: "Content delivery",
      emoji: "📚",
      delay: 1.6,
      iconBg: colorSchemes.accent.iconBg,
      handleColor: colorSchemes.accent.handleColor,
    },
    style: {
      background: "hsl(var(--card))",
      padding: 0,
      borderRadius: 24,
      border: `1px solid ${colorSchemes.accent.borderColor}`,
      boxShadow: `0 10px 25px -5px ${colorSchemes.accent.shadowColor}, 0 8px 10px -6px ${colorSchemes.accent.shadowColor}`,
      width: 380,
    },
  },
];

const edges = [
  // Edges from Problems to Brain with matching colors
  {
    id: "p1-brain",
    source: "problem1",
    target: "brain",
    type: "randomBezier",
    animated: true,
    style: {
      stroke: colorSchemes.complementary.edgeColor,
      strokeWidth: 3,
      opacity: 0.7,
    },
  },
  {
    id: "p2-brain",
    source: "problem2",
    target: "brain",
    type: "randomBezier",
    animated: true,
    style: {
      stroke: colorSchemes.analogous.edgeColor,
      strokeWidth: 3,
      opacity: 0.7,
    },
  },
  {
    id: "p3-brain",
    source: "problem3",
    target: "brain",
    type: "randomBezier",
    animated: true,
    style: {
      stroke: colorSchemes.triadic.edgeColor,
      strokeWidth: 3,
      opacity: 0.7,
    },
  },

  // Edges from Brain to Solutions with matching colors
  {
    id: "brain-s1",
    source: "brain",
    target: "solution1",
    type: "randomBezier",
    animated: true,
    style: {
      stroke: colorSchemes.complementary.edgeColor,
      strokeWidth: 3,
      opacity: 0.9,
    },
  },
  {
    id: "brain-s2",
    source: "brain",
    target: "solution2",
    type: "randomBezier",
    animated: true,
    style: {
      stroke: colorSchemes.primary.edgeColor,
      strokeWidth: 3,
      opacity: 0.9,
    },
  },
  {
    id: "brain-s3",
    source: "brain",
    target: "solution3",
    type: "randomBezier",
    animated: true,
    style: {
      stroke: colorSchemes.analogous.edgeColor,
      strokeWidth: 3,
      opacity: 0.9,
    },
  },
  {
    id: "brain-s4",
    source: "brain",
    target: "solution4",
    type: "randomBezier",
    animated: true,
    style: {
      stroke: colorSchemes.triadic.edgeColor,
      strokeWidth: 3,
      opacity: 0.9,
    },
  },
  {
    id: "brain-s5",
    source: "brain",
    target: "solution5",
    type: "randomBezier",
    animated: true,
    style: {
      stroke: colorSchemes.accent.edgeColor,
      strokeWidth: 3,
      opacity: 0.9,
    },
  },
];

// --- Main Component ---

export default function AiFlowSection() {
  return (
    <div className="w-full h-[90vh] max-h-[950px] relative overflow-hidden rounded-3xl bg-background">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        panOnDrag={false}
        zoomOnScroll={false}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        proOptions={{ hideAttribution: true }}
        style={{ background: "transparent" }}
        fitViewOptions={{ padding: 0.1, minZoom: 0.4, maxZoom: 1.2 }}
      >
        <Background
          variant="dots"
          gap={80}
          size={1.5}
          className="text-blue-500/30 dark:text-blue-400/20"
        />
      </ReactFlow>
    </div>
  );
}
