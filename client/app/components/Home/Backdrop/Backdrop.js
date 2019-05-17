import React, { useContext } from "react";

import { COLOR_MAP } from "../../../constants";
import { ColorContext } from "../../../context/ColorContext";

export default ({ children }) => {
  const { color } = useContext(ColorContext);

  return (
    <div
      css={{
        background: `${COLOR_MAP[color]}b4`,
        transition: "background 0.2s",
        height: "100vh",
        overflowY: "scroll"
      }}
    >
      {children}
    </div>
  );
};
