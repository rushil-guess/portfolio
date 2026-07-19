import { useCallback } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

export default function ParticleBackground() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="particles"
      init={particlesInit}
      options={{
        fullScreen: {
          enable: true,
          zIndex: -1,
        },
        background: {
          color: "transparent",
        },
        particles: {
          number: {
            value: 80,
          },
          color: {
            value: "#3b82f6",
          },
          links: {
            enable: true,
            color: "#3b82f6",
            distance: 150,
            opacity: 0.3,
          },
          move: {
            enable: true,
            speed: 2,
          },
          size: {
            value: 2,
          },
          opacity: {
            value: 0.5,
          },
        },
      }}
    />
  );
}