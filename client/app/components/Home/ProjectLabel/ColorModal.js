import React from "react";

import { COLOR_MAP } from "../../../constants";
import Circle from "./Circle";
import Modal from "../../Modal/Modal";

export default props => (
  <Modal {...props}>
    <div
      css={{
        background: "white",
        border: "solid 1px black",
        display: "grid",
        gridTemplateColumns: "min-content min-content min-content min-content",
        padding: "20px",
        borderRadius: "5px"
      }}
    >
      {Object.keys(COLOR_MAP).map(colorKey => (
        <Circle
          key={colorKey}
          size="20px"
          css={{
            margin: "10px",
            border: "solid 1px #00000000",
            "&:hover": {
              border: "solid 1px black",
              boxShadow: "0px 0px 5px black"
            }
          }}
          color={COLOR_MAP[colorKey]}
          onClick={props.onColorChange(colorKey)}
        />
      ))}
    </div>
  </Modal>
);
