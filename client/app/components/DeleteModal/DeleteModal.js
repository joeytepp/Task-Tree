import React from "react";
import ReactModal from "react-modal";
import styled from "styled-components";
import { Mutation } from "react-apollo";

const Button = styled.button`
  padding: 5px;
  border-radius: 5px;
  border: solid 1px black;
  font-size: 15px;
  color: white;
  transition: 0.5s background;
  ${props => `
      background: ${props.color};
      &:hover {
        background: ${props.hoverColor}
      }
      &:focus {
        background: ${props.focusColor}
      }
    `}
`;

export default props => (
  <Mutation mutation={props.mutation}>
    {mutate => (
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
        onRequestClose={props.onRequestClose}
      >
        <div
          css={{
            background: "white",
            border: "solid 1px black",
            display: "grid",
            padding: "20px",
            borderRadius: "5px"
          }}
        >
          <p>Are you sure you want to delete "{props.name}"?</p>
          <div
            css={{
              display: "grid",
              gridTemplateColumns: "min-content min-content",
              gridColumnGap: "5px",
              margin: "0px auto"
            }}
          >
            <Button
              color="#b22222"
              hoverColor="#be4242"
              focusColor="#9b0c0c"
              onClick={() => {
                mutate({ variables: props.variables });
                props.updateAfterDelete();
                props.onRequestClose();
              }}
            >
              Delete
            </Button>
            <Button
              color="#a4a3a3"
              hoverColor="#6d6d6d"
              focusColor="#000000"
              onClick={props.onRequestClose}
            >
              Cancel
            </Button>
          </div>
        </div>
      </ReactModal>
    )}
  </Mutation>
);
