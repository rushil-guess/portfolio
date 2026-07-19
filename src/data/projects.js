import { Bot, Cpu, Brain, GitBranch } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "AI Chat Web App",
    icon: Bot,
    color: "from-blue-500 to-cyan-500",
    github: "https://github.com/rushil-guess/ChatBot-App",
    demo: "",
    description:
      "ChatGPT-style application using Gemini API with authentication and persistent chat history.",
    technologies: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Gemini API",
    ],
  },
  {
    id: 2,
    title: "CPU Scheduling Simulator",
    icon: Cpu,
    color: "from-green-500 to-emerald-500",
    github:
      "https://github.com/rushil-guess/Cpu-Scheduling-Simulator",
    demo: "",
    description:
      "Operating System scheduling visualizer supporting FCFS, SJF, Priority and Round Robin.",
    technologies: [
      "React",
      "JavaScript",
      "CSS",
    ],
  },
  {
    id: 3,
    title: "Face Emotion Recognition",
    icon: Brain,
    color: "from-pink-500 to-purple-600",
    github: "https://github.com/rushil-guess/Emotion1",
    demo: "",
    description:
      "CNN based emotion recognition using TensorFlow and OpenCV.",
    technologies: [
      "Python",
      "TensorFlow",
      "OpenCV",
    ],
  },
  {
    id: 4,
    title: "CI/CD Pipeline",
    icon: GitBranch,
    color: "from-orange-500 to-red-500",
    github: "https://github.com/rushil-guess",
    demo: "",
    description:
      "Automated deployment using Jenkins, Git and Linux.",
    technologies: [
      "Jenkins",
      "Linux",
      "Git",
    ],
  },
];

export default projects;