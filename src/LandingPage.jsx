import React from "react";
import { Outlet } from "react-router";
import Navbar from "./components/navbar/Navbar";

export default function LandingPage(props) {
  return (
    <>
      <Navbar {...props} />
      <div style={{ paddingTop: "20px" }}>
        <Outlet />
      </div>
    </>
  );
}
