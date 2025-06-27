import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      "localhost",
      // "3715-2400-adc5-1dd-4000-50a2-cc3e-3a79-c037.ngrok-free.app",
      "c4c5-2400-adc5-1dd-4000-f41e-1ce1-5da5-f55f.ngrok-free.app",
    ],
  },
});
