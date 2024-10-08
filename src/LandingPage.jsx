import React from "react";
import { Outlet } from "react-router";
import Navbar from "./components/Navbar";

export default function LandingPage(props) {
  return (
    <>
      <Navbar {...props} />
      <Outlet />
    </>
  );
}
