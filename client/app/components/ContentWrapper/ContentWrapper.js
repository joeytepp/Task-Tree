import React from "react";

export default ({ children, maxWidth }) => (
  <div style={{ marginLeft: "auto", marginRight: "auto", maxWidth }}>
    {children}
  </div>
);
