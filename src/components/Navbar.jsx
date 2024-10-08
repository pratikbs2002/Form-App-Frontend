import React from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthProvider";

export default function Navbar(props) {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.setItem("auth", false);
    localStorage.setItem("username", "");
    localStorage.setItem("password", "");
    navigate("/");
    props.setIsAuthenticated(false);
  };

  return (
    <>
      {props.isAuthenticated && (
        <div
          style={{ backgroundColor: "white", height: "40px", padding: "10px" }}
        >
          <button style={{ float: "right" }} onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </>
  );
}
