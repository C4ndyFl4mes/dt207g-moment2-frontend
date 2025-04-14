import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html', // Main entry
        add: 'src/pages/add.html',
        about: 'src/pages/about.html' // Additional pages
      },
    },
  },
});