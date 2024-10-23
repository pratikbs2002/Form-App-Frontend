import { useEffect, useState } from "react";
import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";

import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import DashBoard from "./pages/DashBoard";
import RootDashBoard from "./pages/root_admin/DashBoard";
import { AuthProvider, useAuth } from "./context/AuthProvider";
import Login from "./pages/Login";
import PageNotFound from "./components/PageNotFound";
import LandingPage from "./LandingPage";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";
import LocationSidebar from "./components/LocationSidebar";
import UserForm from "./pages/admin/UserForm";
import FormContainer from "./pages/admin/FormContainer";
import CreatedFormsContainer from "./pages/admin/CreatedForms";
import FormPreview from "./pages/admin/FormPreview";
import FormEdit from "./pages/admin/FormEdit";
import FormFillList from "./pages/admin/FormFillList";
import FormFill from "./pages/admin/FormFill";
import UserManagement from "./pages/admin/UserManagement";
function App() {
  const auth = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("auth") === "true" ? true : false
  );
  const [userType, setUserType] = useState(
    localStorage.getItem("auth") === "true" ? localStorage.getItem("role") : ""
  );
  useEffect(() => {
    setUserType(
      localStorage.getItem("auth") === "true"
        ? localStorage.getItem("role")
        : ""
    );
  }, [isAuthenticated]);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <LandingPage
                userType={userType}
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
              path="/createform"
              element={
                isAuthenticated && userType === "admin" ? (
                  <FormContainer />
                ) : (
                  <>
                    <h3>Authentication Error</h3>
                    <p>Some error happened</p>
                    <p>
                      You need to be a country admin to access this page.
                      <p>
                        <Link to="/">Go back</Link>
                      </p>
                    </p>
                  </>
                )
              }
            />
            <Route
              path="/createdforms"
              element={
                isAuthenticated && userType === "admin" ? (
                  <CreatedFormsContainer />
                ) : (
                  <>
                    <h3>Authentication Error</h3>
                    <p>Some error happened</p>
                    <p>
                      You need to be a country admin to access this page.
                      <p>
                        <Link to="/">Go back</Link>
                      </p>
                    </p>
                  </>
                )
              }
            />
            <Route
              path="/formpreview/:formId"
              element={
                isAuthenticated && userType === "admin" ? (
                  <FormPreview />
                ) : (
                  <>
                    <h3>Authentication Error</h3>
                    <p>Some error happened</p>
                    <p>
                      You need to be a country admin to access this page.
                      <p>
                        <Link to="/">Go back</Link>
                      </p>
                    </p>
                  </>
                )
              }
            />
            <Route
              path="/editform/:formId"
              element={
                isAuthenticated && userType === "admin" ? (
                  <FormEdit />
                ) : (
                  <>
                    <h3>Authentication Error</h3>
                    <p>Some error happened</p>
                    <p>
                      You need to be a country admin to access this page.
                      <p>
                        <Link to="/">Go back</Link>
                      </p>
                    </p>
                  </>
                )
              }
            />
            <Route
              path="/editform/:formId"
              element={
                isAuthenticated && userType === "admin" ? (
                  <FormEdit />
                ) : (
                  <>
                    <h3>Authentication Error</h3>
                    <p>Some error happened</p>
                    <p>
                      You need to be a country admin to access this page.
                      <p>
                        <Link to="/">Go back</Link>
                      </p>
                    </p>
                  </>
                )
              }
            />
            <Route
              path="/fillform"
              element={
                isAuthenticated && userType === "admin" ? (
                  <FormFillList />
                ) : (
                  <>
                    <h3>Authentication Error</h3>
                    <p>Some error happened</p>
                    <p>
                      You need to be a country admin to access this page.
                      <p>
                        <Link to="/">Go back</Link>
                      </p>
                    </p>
                  </>
                )
              }
            />
            <Route
              path="/fillform/:formId"
              element={
                isAuthenticated && userType === "admin" ? (
                  <FormFill />
                ) : (
                  <>
                    <h3>Authentication Error</h3>
                    <p>Some error happened</p>
                    <p>
                      You need to be a country admin to access this page.
                      <p>
                        <Link to="/">Go back</Link>
                      </p>
                    </p>
                  </>
                )
              }
            />
            {/* <Route
              path="/root-admin/dashboard"
              element={
                isAuthenticated ? <RootDashBoard /> : <Navigate to={"/"} />
              }
            /> */}
            <Route
              path="schema"
              element={
                isAuthenticated && userType === "global_admin" ? (
                  <RootDashBoard />
                ) : (
                  <Navigate to={"/"} />
                )
              }
            />
            <Route
              path="user"
              element={
                isAuthenticated && userType === "admin" ? (
                  <UserManagement />
                ) : (
                  <Navigate to={"/"} />
                )
              }
            />{" "}
            <Route
              path="location"
              element={
                isAuthenticated && userType === "admin" ? (
                  <LocationSidebar />
                ) : (
                  <Navigate to={"/"} />
                )
              }
            />
            <Route path="*" element={<PageNotFound />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
