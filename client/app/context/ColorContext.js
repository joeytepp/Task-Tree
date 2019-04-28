import React, { createContext, useState } from "react";

export const ColorContext = createContext("RED");

export const ColorContextProvider = ({ children }) => {
  const [color, setColor] = useState("RED");

  return (
    <ColorContext.Provider value={{ color, setColor }}>
      {children}
    </ColorContext.Provider>
  );
};
