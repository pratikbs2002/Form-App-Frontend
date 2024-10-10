import React from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthProvider";
import "./Navbar.css";
import { GiExitDoor } from "react-icons/gi";
import { Bounce, toast } from "react-toastify";
import { Link, NavLink } from "react-router-dom";

export default function Navbar(props) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.setItem("auth", false);
    localStorage.setItem("username", "");
    localStorage.setItem("password", "");

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
        <div style={{ fontSize: "20px", fontWeight: 500 }}>FormApp</div>
        <div className="left-section">
          <NavLink
            activeClassName="active-nav-link"
            className="nav-link"
            to={"/schema"}
          >
            <div className="nav-button-value">Schemas</div>
          </NavLink>

          {props.isAuthenticated && (
            <div onClick={handleLogout} className="logout-button">
              <button>Logout</button>
              <div className="button-icon">
                <GiExitDoor />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
