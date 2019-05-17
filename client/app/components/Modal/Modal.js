import React from "react";
import ReactModal from "react-modal";

export default props => (
  <ReactModal
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
    isOpen={props.showModal}
    ariaHideApp={false}
    shouldCloseOnEsc
    shouldCloseOnOverlayClick
    onRequestClose={props.onRequestClose}
  >
    {props.children}
  </ReactModal>
);
