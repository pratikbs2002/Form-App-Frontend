import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthProvider";
import "./Navbar.css";
import { GiExitDoor } from "react-icons/gi";
import { Bounce, toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeProvider";
import { FaCircleUser } from "react-icons/fa6";
import ProfileDropdown from "./ProfileDropdown";
import { Roles } from "../../Roles";

export default function Navbar(props) {
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.setItem("auth", false);
    localStorage.setItem("username", "");
    localStorage.setItem("password", "");
    localStorage.setItem("role", "");
    setDropdown(false);

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

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdown(false);
    }
  };

  useEffect(() => {
    if (dropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdown]);

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
              {props.userType === Roles.GLOBAL_ADMIN ? (
                <>
                  <NavLink className="nav-link" to={"/schema"}>
                    <div className="nav-button-value">Schemas</div>
                  </NavLink>
                </>
              ) : (
                <></>
              )}
              {props.userType === Roles.REPORTING_USER ? (
                <>
                  <NavLink className="nav-link" to={"/fillform"}>
                    <div className="nav-button-value">Fill Form</div>
                  </NavLink>
                </>
              ) : (
                <></>
              )}
              {props.userType === Roles.ADMIN ? (
                <>
                  <NavLink className="nav-link" to={"/user"}>
                    <div className="nav-button-value">User</div>
                  </NavLink>

                  <NavLink className="nav-link" to={"/location"}>
                    <div className="nav-button-value">Location</div>
                  </NavLink>

                  <NavLink className="nav-link" to={"/createform"}>
                    <div className="nav-button-value">Create New Form</div>
                  </NavLink>

                  <NavLink className="nav-link" to={"/createdforms"}>
                    <div className="nav-button-value">Created Forms</div>
                  </NavLink>

                  <NavLink className="nav-link" to={"/formresponses"}>
                    <div className="nav-button-value">Form Responses</div>
                  </NavLink>
                </>
              ) : (
                <></>
              )}

              {/* <div onClick={handleLogout} className="logout-button">
                <button>Logout</button>
                <div className="button-icon">
                  <GiExitDoor />
                </div>
              </div> */}
              <div className="profile-button">
                <FaCircleUser
                  className={`user-icon ${dropdown ? "drop-active" : ""}`}
                  onClick={() => setDropdown((prev) => !prev)}
                />

              {dropdown && (
                <ProfileDropdown
                  logoutClick={handleLogout}
                  // setDropdown={setDropdown}
                  toggleTheme={toggleTheme}
                  theme={theme}
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
