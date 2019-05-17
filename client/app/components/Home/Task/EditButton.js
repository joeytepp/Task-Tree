import React from "react";

export default props => (
  <button
    onClick={props.onClick}
    css={{
      width: "20px",
      height: "20px",
      background: "none",
      height: "20px",
      background: "white",
      borderRadius: "50%",
      textAlign: "center",
      border: "solid 1px #979797",
      backgroundImage: `url(${props.backgroundImage})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "50% auto",
      "&:hover ": {
        borderColor: "black"
      }
    }}
  />
);
