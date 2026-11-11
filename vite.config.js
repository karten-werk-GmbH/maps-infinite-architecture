import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rolldownOptions: {
      output: {
        // keep the large libraries in their own chunks: they stay under the
        // chunk size limit and remain cached when only app code changes
        codeSplitting: {
          groups: [
            { name: "ol", test: /[\\/]node_modules[\\/]ol[\\/]/ },
            {
              name: "react",
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
            },
          ],
        },
      },
    },
  },
});
