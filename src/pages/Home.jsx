import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Experience from "../components/Experience";
import Footer from "../components/Footer";
import SEO from "../components/SEO";
import LeetCode from "../components/LeetCode";
import { lazy, Suspense } from "react";

export default function Home() {

const GithubStats = lazy(() =>
  import("../components/GithubStats")
);
const CodeChef = lazy(() =>
  import("../components/CodeChef")
);
const Projects = lazy(() =>
  import("../components/Projects")
);
const Contact = lazy(() =>
  import("../components/Contact")
);
const LeetCode = lazy(() =>
  import("../components/LeetCode")
);
  return (
    
        <>
<SEO

title="Rushil Reddy | Full Stack Developer"

description="Portfolio of Rushil Reddy - React, Python, MERN Stack, AI, DevOps"

/>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Suspense
            fallback={<div>Loading...</div>}
            >
            <Projects />
            </Suspense>
      <Suspense
            fallback={<div>Loading...</div>}
            >
            <GithubStats />
            </Suspense>
      <Suspense
            fallback={<div>Loading...</div>}
            >
            <CodeChef />
            </Suspense>
       <Suspense
            fallback={<div>Loading...</div>}
            >
            <LeetCode />
            </Suspense>
      <Suspense
            fallback={<div>Loading...</div>}
            >
            <Contact />
            </Suspense>
      <Footer />
    </>
  );
}