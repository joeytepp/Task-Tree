import React, { useContext } from "react";

import { COLOR_MAP } from "../../../constants";
import { ColorContext } from "../../../context/ColorContext";

export default ({ children }) => {
  const { color } = useContext(ColorContext);

  return (
    <div
      css={{
        background: `${COLOR_MAP[color]}b4`,
        height: "100vh",
        overflowY: "scroll"
      }}
    >
      {children}
    </div>
  );
};
