import React, { useContext } from "react";

import { COLOR_MAP } from "../../../constants";
import Circle from "./Circle";

import pencil from "../../../assets/img/pencil.svg";
import cross from "../../../assets/img/errorCross.svg";

export default props => {
  return (
    <div
      css={{
        display: "grid",
        gridTemplateColumns: "min-content 100fr min-content min-content",
        gridRowWidth: "200px",
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
            display: "block",
            height: "15px"
          }
        }
      }}
    >
      <Circle size="16px" color={COLOR_MAP[props.color]} />
      <span
        css={{
          display: "block",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis"
        }}
      >
        {props.name}
      </span>
      {props.id && (
        <div align="right">
          <div
            css={{
              display: "grid",
              gridTemplateColumns: "min-content min-content"
            }}
          >
            <div
              css={{
                marginLeft: "5px",
                marginRight: "5px",
                borderRadius: "5px",
                "&:hover": {
                  background: "#D8D8D8"
                }
              }}
            >
              <img src={pencil} css={{ height: "15px", display: "none" }} />
            </div>
            <div
              css={{
                marginLeft: "5px",
                marginRight: "5px"
              }}
            >
              <img
                src={cross}
                onClick={props.edit}
                css={{ height: "0px", display: "none" }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
