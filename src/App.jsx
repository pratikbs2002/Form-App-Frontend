import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import DashBoard from "./pages/DashBoard";
import { AuthProvider } from "./service/AuthProvider";

function App() {
  return (
    <>
      <AuthProvider>
        <DashBoard />
      </AuthProvider>
    </>
  );
}

export default App;
