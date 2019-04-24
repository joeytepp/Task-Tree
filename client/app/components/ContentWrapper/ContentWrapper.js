import React from "react";

export default ({ children, maxWidth }) => (
  <div css={{ marginLeft: "auto", marginRight: "auto", maxWidth }}>
    {children}
  </div>
);
