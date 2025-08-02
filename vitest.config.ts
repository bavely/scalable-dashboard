import path from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@testing-library/user-event': path.resolve(__dirname, './src/tests/utils/user-event'),
    },
  },
  test: {
    server: {
      deps: {
        inline: ['@mui/x-data-grid'],
      },
    },
    environment: 'jsdom',
    globals: true,
    css: true,
    setupFiles: ['./src/tests/setup.ts'],
  },
  // Mock CSS imports
  define: {
    'import.meta.vitest': undefined,
  },
})
