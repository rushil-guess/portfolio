import { Cpu, Bot, Brain, GitBranch } from "lucide-react";
import ProjectCard from "./ProjectCard";
import Reveal from "./Reveal";

const projects = [
  {
    title: "AI Chat Web App",
    description:
      "ChatGPT-style web application built using React, Node.js, Express, MongoDB and Google Gemini API with authentication and chat history.",
    icon: Bot,
    color: "from-blue-500 to-cyan-500",
    technologies: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Gemini API",
    ],
    github: "https://github.com/rushil-guess/ChatBot-App",
    demo: "",
  },
  {
    title: "CPU Scheduling Simulator",
    description:
      "Interactive visualization of FCFS, SJF, Priority and Round Robin scheduling algorithms with Gantt Chart.",
    icon: Cpu,
    color: "from-green-500 to-emerald-500",
    technologies: [
      "React",
      "JavaScript",
      "CSS",
      "Algorithms",
    ],
    github:
      "https://github.com/rushil-guess/Cpu-Scheduling-Simulator",
    demo: "",
  },
  {
    title: "Face Emotion Recognition",
    description:
      "Deep learning application using TensorFlow and OpenCV for real-time facial emotion detection.",
    icon: Brain,
    color: "from-pink-500 to-purple-600",
    technologies: [
      "Python",
      "TensorFlow",
      "OpenCV",
      "CNN",
    ],
    github:
      "https://github.com/rushil-guess/Emotion1",
    demo: "",
  },
  {
    title: "CI/CD Pipeline Automation",
    description:
      "Automated build and deployment pipeline using Jenkins, Git and Linux.",
    icon: GitBranch,
    color: "from-orange-500 to-red-500",
    technologies: [
      "Jenkins",
      "Git",
      "Linux",
      "CI/CD",
    ],
    github: "https://github.com/rushil-guess",
    demo: "",
  },
];

export default function Projects() {
  return (
    <Reveal>

    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-4">
          Projects
        </h2>

        <p className="secondary text-center mb-14">
          Some of my featured software engineering projects.
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          {projects.map((project, index) => (
              <ProjectCard key={index} {...project} />
            ))}
        </div>
      </div>
    </section>
            </Reveal>
  );
}