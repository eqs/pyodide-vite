import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: { exclude: ["pyodide"] },
  plugins: [
    {
      name: "vite-plugin-pyodide",
      generateBundle: async () => {
        const assetsDir = "dist/assets";
        await mkdir(assetsDir, { recursive: true });
        const files = [
          "pyodide-lock.json",
          "pyodide.asm.js",
          "pyodide.asm.wasm",
          "python_stdlib.zip",
        ];
        for (const file of files) {
          await copyFile(
            join("node_modules/pyodide", file),
            join(assetsDir, file),
          );
        }
      },
    },
  ]
})
