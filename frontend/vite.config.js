import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: parseInt(process.env.PORT) || 5173,
    allowedHosts: ["portfolio-2-iheq.onrender.com"], // ✅ Add here
  },
  preview: {
    host: "0.0.0.0",
    port: parseInt(process.env.PORT) || 4173,
    allowedHosts: ["portfolio-2-iheq.onrender.com"], // keep this too
  },
});
