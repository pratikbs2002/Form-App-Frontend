import React, { createContext, useReducer } from "react";

const LoaderContext = createContext();

const initialState = {
  loading: false,
};

function reducer(state, action) {
  switch (action) {
    case true:
      return { loading: true };
    case false:
      return { loading: false };
    default:
      throw new Error("error");
  }
}

const LoaderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <LoaderContext.Provider value={{ state, dispatch }}>
      {children}
    </LoaderContext.Provider>
  );
};  

export { LoaderContext, LoaderProvider };
