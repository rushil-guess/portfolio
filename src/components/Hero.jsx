import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import Reveal from "./Reveal";
export default function Hero() {
  return (
    <Reveal>
    <section
      id="home"
      className="min-h-screen flex items-center justify-center"
    >
      <div className="text-center">

        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-xl text-gray-300"
        >
          Hello, I'm
        </motion.h2>

        <motion.h1
          initial={{ scale: .8 }}
          animate={{ scale: 1 }}
          transition={{ duration: .8 }}
          className="text-6xl font-bold mt-3"
        >
          Rushil Reddy
        </motion.h1>

        <div className="text-3xl mt-6 text-blue-500 font-semibold">
          <Typewriter
            words={[
              "Full Stack Developer",
              "Python Developer",
              "React Developer",
              "AI Enthusiast",
              "DevOps Learner",
            ]}
            loop
            cursor
          />
        </div>

        <p className="max-w-3xl mx-auto mt-8 secondary leading-8">
          More About Me

I’m a Computer Science graduate and Full Stack Developer with a passion for building scalable web applications and solving real-world problems through technology. I enjoy working across the entire development stack, from designing intuitive user interfaces to developing robust backend systems and APIs.

        </p>
        <p className="max-w-3xl mx-auto mt-8 secondary leading-8">

       
Beyond web development, I’m actively expanding my knowledge in Artificial Intelligence, Machine Learning, MLOps, and Cloud Computing. I’m exploring how modern AI models are built, deployed, monitored, and scaled in production environments using cloud platforms and DevOps practices. My goal is to combine software engineering with AI to create intelligent, reliable, and impactful applications.
</p>
<p className="max-w-3xl mx-auto mt-8 secondary leading-8">
    
I enjoy competitive programming on platforms like LeetCode and CodeChef, which helps strengthen my problem-solving and algorithmic thinking. I’m also passionate about continuously learning new technologies, contributing to innovative projects, and staying up to date with the latest advancements in software engineering and AI.
</p>
<p className="max-w-3xl mx-auto mt-8 secondary leading-8">

Currently, I’m focused on mastering cloud-native application development, containerization, CI/CD pipelines, and MLOps workflows while building projects that demonstrate practical applications of AI and modern software architecture.
</p>

        <div className="mt-10 flex gap-5 justify-center">
          <a
            href="#projects"
            className="bg-blue-600 px-8 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            View Projects
          </a>

          <a
            href="/resume.pdf"
            download
            className="border border-blue-600 px-8 py-3 rounded-lg hover:bg-blue-600 transition"
          >
            Download Resume
          </a>
        </div>
      </div>
    </section>
    </Reveal>
  );
}