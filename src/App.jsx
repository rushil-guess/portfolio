import Home from "./pages/Home";
import Loader from "./components/Loader";
import ParticleBackground from "./components/ParticleBackground";
import CursorGlow from "./components/CursorGlow";
import ScrollProgress from "./components/ScrollProgress";
import ThemeToggle from "./components/ThemeToggle";
import BackToTop from "./components/BackToTop";

export default function App() {
  return (
    <>
      <Loader />
      <div className="fixed -top-40 -left-40 w-96 h-96 bg-blue-600 rounded-full blur-[180px] opacity-20 -z-10" />

<div className="fixed bottom-0 right-0 w-[450px] h-[450px] bg-purple-600 rounded-full blur-[200px] opacity-20 -z-10" />
      <ParticleBackground />
      <CursorGlow />
      <ScrollProgress />
      <ThemeToggle />
      <BackToTop />
      <Home />
    </>
  );
}