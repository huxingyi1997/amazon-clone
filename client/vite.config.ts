import { loadEnv } from 'vite';
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

    return {
      test: {
        globals: true, // required
        setupFiles: ["vitest-localstorage-mock"],
        mockReset: false,
        environment: "jsdom",
      },
      plugins: [react()],
      server: {
        proxy: {
          '/api': {
            target: `${env.VITE_REACT_APP_BASE_API}`,
            changeOrigin: true,
            secure: false,
            rewrite: (path) => path.replace(/^\/api/, ''),
          },
        },
      },
    
    }
  }
  
  );
