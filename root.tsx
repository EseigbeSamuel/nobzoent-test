import App from "./App";
import { ThemeProvider } from "./src/themes/useTheme";

export default function Root() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}
