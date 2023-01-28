import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true, // required
    setupFiles: ["vitest-localstorage-mock"],
    mockReset: false,
    environment: "jsdom",
  },
  plugins: [react()],
});
