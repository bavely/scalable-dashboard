import path from 'path'
import { defineConfig, configDefaults } from 'vitest/config'

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
    testTimeout: 10_000,
    exclude: [...configDefaults.exclude, 'src/tests/e2e/**'],
  },
  // Mock CSS imports
  define: {
    'import.meta.vitest': undefined,
  },
})
