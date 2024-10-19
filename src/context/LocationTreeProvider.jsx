import React, { createContext, useContext, useState } from "react";

const LocationTreeContext = createContext();

export const LocationTreeProvider = ({ children }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [loadFlag, setLoadFlag] = useState(false);
  const [editFlag, setEditFlag] = useState(null);

  return (
    <LocationTreeContext.Provider
      value={{
        selectedLocation,
        setSelectedLocation,
        loadFlag,
        setLoadFlag,
        editFlag,
        setEditFlag,
      }}
    >
      {children}
    </LocationTreeContext.Provider>
  );
};

export const useLocationTree = () => useContext(LocationTreeContext);
