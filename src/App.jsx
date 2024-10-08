import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import DashBoard from "./pages/DashBoard";
import RootDashBoard from "./pages/root_admin/DashBoard";
import { AuthProvider, useAuth } from "./context/AuthProvider";
import Login from "./pages/Login";
import PageNotFound from "./components/PageNotFound";
import LandingPage from "./LandingPage";

function App() {
  const auth = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("auth") === "true" ? true : false
  );

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <LandingPage
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
              />
            }
          >
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Navigate to={"/dashboard"} />
                ) : (
                  <Login
                    isAuthenticated={isAuthenticated}
                    setIsAuthenticated={setIsAuthenticated}
                  />
                )
              }
            />
            <Route
              path="/dashboard"
              element={isAuthenticated ? <DashBoard /> : <Navigate to={"/"} />}
            />

            <Route
              path="/root-admin/dashboard"
              element={
                isAuthenticated ? <RootDashBoard /> : <Navigate to={"/"} />
              }
            />
            <Route path="*" element={<PageNotFound />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
