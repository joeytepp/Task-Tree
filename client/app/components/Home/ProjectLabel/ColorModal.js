import React from "react";
import ReactModal from "react-modal";

import { COLOR_MAP } from "../../../constants";
import Circle from "./Circle";

export default props => (
  <ReactModal
    isOpen={props.showModal}
    css={{
      position: "fixed",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)"
    }}
    style={{
      overlay: {
        backgroundColor: "rgba(0,0,0, 0.5)"
      },
      content: {
        outline: "none"
      }
    }}
    ariaHideApp={false}
    shouldCloseOnEsc
    shouldCloseOnOverlayClick
    onRequestClose={() =>
      props.setState(state => ({ ...state, showModal: false }))
    }
  >
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
      {Object.keys(COLOR_MAP).map((colorKey, i) => (
        <Circle
          key={i}
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
          onClick={() => {
            props.setState({ color: colorKey, showModal: false });
            props.mutators[colorKey]();
          }}
        />
      ))}
    </div>
  </ReactModal>
);
