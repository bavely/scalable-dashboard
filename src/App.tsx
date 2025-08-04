import AppRoutes from "./routes/AppRoutes";
import { ThemeProvider } from "@/components/Shared/theme-provider";

function App() {
  return (
    <ThemeProvider>
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
