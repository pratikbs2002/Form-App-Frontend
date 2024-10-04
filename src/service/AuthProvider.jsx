import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState({
    username: "_09cde47d_1246_47d8_b880_712ae0500cf5_nepal_admin",
    password: "admin",
  });

  return (
    <AuthContext.Provider value={{ authData, setAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
