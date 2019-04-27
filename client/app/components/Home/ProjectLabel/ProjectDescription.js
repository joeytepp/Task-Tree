import React from "react";

import { COLOR_MAP } from "../../../constants";
import ProjectForm from "./ProjectForm";
import Circle from "./Circle";

export default props => (
  <div
    css={{
      display: "grid",
      gridTemplateColumns: "min-content min-content",
      whiteSpace: "pre",
      verticalAlign: "middle",
      border: `solid 1px #00000000`,
      padding: "10px",
      borderRadius: "5px",
      "&:hover": {
        border: `solid 1px ${props.color}`,
        transition: "0.5s"
      }
    }}
  >
    <Circle size="16px" color={COLOR_MAP[props.color]} />
    {props.name}
  </div>
);
