import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { LoaderContext } from "./context/LoaderProvider.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <LoaderContext>
    <AuthProvider>
      <App />
    </AuthProvider>
  </LoaderContext>
  // </StrictMode>,
);
