import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import dotenv from 'dotenv';
import process from "process";
dotenv.config();

export default defineConfig({
  define: {
    'process.env': process.env,
  },
  plugins: [react()],
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
