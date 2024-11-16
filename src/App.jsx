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
import FilledFormResponses from "./pages/admin/FilledFormResponses";
import FilledFormPreview from "./pages/admin/FilledFormPreview";
import { Roles } from "./Roles";
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
                isAuthenticated && userType === Roles.ADMIN ? (
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
                isAuthenticated && userType === Roles.ADMIN ? (
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
                isAuthenticated && userType === Roles.ADMIN ? (
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
                isAuthenticated && userType === Roles.ADMIN ? (
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
                isAuthenticated && userType === Roles.ADMIN ? (
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
                isAuthenticated && userType === Roles.REPORTING_USER ? (
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
                isAuthenticated && userType === Roles.REPORTING_USER ? (
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
            <Route
              path="/formresponses"
              element={
                isAuthenticated && userType === Roles.ADMIN ? (
                  <FilledFormResponses />
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
              path="/formresponses/:responseId"
              element={
                isAuthenticated && userType === Roles.ADMIN ? (
                  <FilledFormPreview />
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
                isAuthenticated && userType === Roles.GLOBAL_ADMIN ? (
                  <RootDashBoard />
                ) : (
                  <Navigate to={"/"} />
                )
              }
            />
            <Route
              path="user"
              element={
                isAuthenticated && userType === Roles.ADMIN ? (
                  <UserManagement />
                ) : (
                  <Navigate to={"/"} />
                )
              }
            />{" "}
            <Route
              path="location"
              element={
                isAuthenticated && userType === Roles.ADMIN ? (
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
