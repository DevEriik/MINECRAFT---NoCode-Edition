import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
  ],
  test: {
    environment: "jsdom", // <-- Esta es la línea que falta para que reconozca "window" y "document"
    globals: true,
    setupFiles: ["./src/setupTests.js"],
  },
});
