import React, { useContext, useReducer } from "react";
import "./Loader.css";
import { LoaderContext } from "./LoaderContext";

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
