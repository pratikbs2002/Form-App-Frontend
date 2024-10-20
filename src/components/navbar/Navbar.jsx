import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthProvider";
import "./Navbar.css";
import { GiExitDoor } from "react-icons/gi";
import { Bounce, toast } from "react-toastify";
import { Link, NavLink } from "react-router-dom";
import { ThemeContext, ThemeProvider } from "../../context/ThemeProvider";

export default function Navbar(props) {
  console.log(props.userType);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.setItem("auth", false);
    localStorage.setItem("username", "");
    localStorage.setItem("password", "");
    localStorage.setItem("role", "");

    toast.success("Logged out successfully", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      theme: "dark",
      transition: Bounce,
      pauseOnHover: false,
    });
    props.setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <>
      <div className="navbar-container">
        <div
          style={{ fontSize: "20px", fontWeight: 500, cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          FormApp
        </div>
        <button
          style={{
            fontSize: "20px",
            fontWeight: 500,
            color: "transparent",
            border: "none",
            backgroundColor: "transparent",
          }}
          onClick={toggleTheme}
          className="logout-button"
        >
          {theme}
        </button>
        <div className="left-section">
          {props.isAuthenticated && (
            <>
              <NavLink
                // activeClassName="active-nav-link"
                className="nav-link"
                to={"/dashboard"}
              >
                <div className="nav-button-value">Dashboard</div>
              </NavLink>
              {props.userType === "global_admin" ? (
                <>
                  <NavLink className="nav-link" to={"/schema"}>
                    <div className="nav-button-value">Schemas</div>
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    // activeClassName="active-nav-link"
                    className="nav-link"
                    to={"/createform"}
                  >
                    <div className="nav-button-value">Create New Form</div>
                  </NavLink>

                  <NavLink
                    // activeClassName="active-nav-link"
                    className="nav-link"
                    to={"/createdforms"}
                  >
                    <div className="nav-button-value">Created Forms</div>
                  </NavLink>

                  <NavLink
                    // activeClassName="active-nav-link"
                    className="nav-link"
                    to={"/fillform"}
                  >
                    <div className="nav-button-value">Fill Form</div>
                  </NavLink>
                  </>
              )}

              {props.userType === "admin" ? (
                <>
                  <NavLink className="nav-link" to={"/user"}>
                    <div className="nav-button-value">User</div>
                  </NavLink>

                  <NavLink className="nav-link" to={"/location"}>
                    <div className="nav-button-value">Location</div>
                  </NavLink>
                </>
              ) : (
                <></>
              )}

              <div onClick={handleLogout} className="logout-button">
                <button>Logout</button>
                <div className="button-icon">
                  <GiExitDoor />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
