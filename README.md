# Scalable Dashboard

A modular user management dashboard built with React and TypeScript. The project showcases a scalable architecture, responsive UI components, and global state persistence.

## Project Goals
- Provide a foundation for building data-driven dashboards.
- Demonstrate clean separation of concerns and component reuse.
- Persist and manage client-side state for user data.

## Tech Stack
- **React 19 + TypeScript** – component-based UI with static typing.
- **Vite** – fast development server and build tooling.
- **Tailwind CSS & MUI** – utility-first styling blended with Material UI components.
- **Radix UI** – accessible UI primitives.
- **Zustand** – lightweight global state management with localStorage persistence, chosen over heavier solutions like Redux for minimal boilerplate.
- **React Hook Form & Zod** – form handling and schema-based validation.
- **Axios** – HTTP client for API communication.

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   ```
4. Preview the production build:
   ```bash
   npm run preview
   ```

## Testing
Run the unit and integration test suite with:
```bash
npm test
```
End-to-end tests have been removed.

## Environment Variables
Vite exposes environment variables prefixed with `VITE_`. Create a `.env` file in the project root to define them as needed:
```env
VITE_API_URL=https://example.com/api
```
The project does not require any environment variables by default.

## Live Hosted Version (Hosted on digital ocean server)
https://scalable-dashboard.pavli-tawfik.com/
