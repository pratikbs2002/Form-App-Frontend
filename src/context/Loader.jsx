import React, { useContext, useReducer } from "react";
import { LoaderContext } from "./LoaderContext";
import "./Loader.css";

export default function Loader() {
  const { state } = useContext(LoaderContext);
  return (
    state.loading && (
      <div
        className="loader"
        style={{ fontSize: "200px", marginTop: "100px" }}
      ></div>
    )
  );
}
