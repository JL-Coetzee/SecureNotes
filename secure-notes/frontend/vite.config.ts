import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";

export default defineConfig(async () => {
  // dynamic import so Vite uses import() instead of require()
  const { default: tsconfigPaths } = await import("vite-tsconfig-paths");

  return {
    plugins: [react(), tsconfigPaths(), svgr()],
    server: {
      port: 5173,
    },
    resolve: {
      alias: {
        "@": "/src",
      },
    },
  };
});
