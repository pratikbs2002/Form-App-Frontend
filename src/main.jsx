import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { LoaderProvider } from "./context/LoaderProvider.jsx";
import { ThemeProvider } from "./context/ThemeProvider.jsx";
import { LocationTreeProvider } from "./context/LocationTreeProvider.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <LoaderProvider>
    <AuthProvider>
      <ThemeProvider>
        <LocationTreeProvider>
          <App />
        </LocationTreeProvider>
      </ThemeProvider>
    </AuthProvider>
  </LoaderProvider>
  // </StrictMode>,
);
