import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";

export default function ProjectCard({
  title,
  description,
  technologies,
  github,
  demo,
  icon: Icon,
  color,
}) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25 }}
      className="card rounded-2xl overflow-hidden border border-gray-800 shadow-lg"
    >
      <div
        className={`h-48 bg-gradient-to-r ${color} flex items-center justify-center`}
      >
        <Icon size={90} className="text-[var(--text)]" />
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold mb-3">
          {title}
        </h3>

        <p className="secondary leading-7">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mt-5">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 rounded-full bg-blue-600 text-sm"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-4 mt-7">
          <a
            href={github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition"
          >
            <Github size={18} />
            GitHub
          </a>

          {demo && (
            <a
              href={demo}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition"
            >
              <ExternalLink size={18} />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}