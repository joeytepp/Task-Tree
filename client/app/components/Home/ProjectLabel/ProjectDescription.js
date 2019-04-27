import React, { useContext } from "react";

import { COLOR_MAP } from "../../../constants";
import setEditable from "./setEditable";
import { ProjectsContext } from "../../../context/ProjectsContext";
import Circle from "./Circle";

import pencil from "../../../assets/img/pencil.svg";

export default props => {
  const { setProjects } = useContext(ProjectsContext);

  return (
    <div
      css={{
        display: "grid",
        gridTemplateColumns: "min-content min-content auto",
        textOverflow: "ellipsis",
        overflow: "hidden",
        verticalAlign: "middle",
        border: `solid 1px #00000000`,
        padding: "10px",
        borderRadius: "5px",
        "&:hover": {
          border: `solid 1px ${props.color}`,
          transition: "0.5s",
          "& img": {
            opacity: "1"
          }
        }
      }}
    >
      <Circle size="16px" color={COLOR_MAP[props.color]} />
      <span
        css={{
          display: "block",
          width: "200px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis"
        }}
      >
        {props.name}
      </span>
      <div align="right">
        <span
          css={{
            borderRadius: "5px",
            "&:hover": {
              background: "#D8D8D8"
            }
          }}
          onClick={setEditable(setProjects, props, true)}
        >
          <img
            src={pencil}
            css={{ height: "15px", opacity: "0", marginRight: "5px" }}
          />
        </span>
      </div>
    </div>
  );
};
