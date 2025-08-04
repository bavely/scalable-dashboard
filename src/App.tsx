import { useMemo } from "react";
import AppRoutes from "./routes/AppRoutes";
import {
  ThemeProvider as TailwindThemeProvider,
  useTheme,
} from "@/components/Shared/theme-provider";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";

function App() {
  return (

    <TailwindThemeProvider>
      <MuiThemeWrapper />
    </TailwindThemeProvider>
  );
}

function MuiThemeWrapper() {
  const { theme } = useTheme();

  const currentMode = theme === "system"
    ? (typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light")
    : theme;

  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: currentMode,
          background: { default: currentMode === "dark" ?   "rgba(0,0,0,0.87)"  : "rgba(255,255,255,0.6)" },
          text: { primary: currentMode === "dark" ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.87)" },
        },
      }),
    [currentMode]
  );

  return (
    <MuiThemeProvider theme={muiTheme}>
      <AppRoutes />

    </MuiThemeProvider>
  );
}

export default App;
