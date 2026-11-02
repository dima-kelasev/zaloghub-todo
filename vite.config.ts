import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages раздаёт проект из подпапки /zaloghub-todo/
  base: '/zaloghub-todo/',
});
