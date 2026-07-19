import { motion } from "framer-motion";
import Reveal from "./Reveal";

export default function About() {
  return (
    <Reveal>

    <section id="about">

      <motion.h2
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity:0,y:40 }}
        className="text-5xl font-bold mb-10"
      >
        About Me
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-12">

        <div>

          <img
            src="/profile.png"
            alt="Rushil"
            className="rounded-2xl shadow-xl"
          />

        </div>

        <div>

          <p className="secondary leading-8">

            I'm Rushil Reddy Gujjula, a Computer Science Engineering
            student passionate about Full Stack Development,
            Artificial Intelligence and DevOps.

          </p>

          <br />

          <p className="secondary leading-8">

            During my internship at Novegrapix,
            I developed MERN applications,
            integrated Mapbox APIs and optimized backend services.

          </p>

          <br />

          <p className="secondary leading-8">

            I enjoy solving challenging programming problems,
            learning new technologies and contributing
            to innovative software products.

          </p>

        </div>

      </div>

    </section>
   </Reveal>
  );
}