import React, { useState } from "react";

import Circle from "./Circle";
import DeleteModal from "../../DeleteModal/DeleteModal";
import { COLOR_MAP } from "../../../constants";
import { DELETE_PROJECT } from "../../../graphql/mutations";

import pencil from "../../../assets/img/pencil.svg";
import cross from "../../../assets/img/errorCross.svg";

export default props => {
  const [showModal, setShowModal] = useState(false);

  const projectColor = COLOR_MAP[props.color];

  return (
    <div
      onClick={props.setCurrentProject}
      css={{
        display: "grid",
        gridTemplateColumns: "min-content 100fr min-content min-content",
        gridRowWidth: "200px",
        textOverflow: "ellipsis",
        overflow: "hidden",
        verticalAlign: "middle",
        fontWeight: props.selected ? "600" : "500",
        border: `solid 1px #00000000`,
        userDrag: "none",
        userSelect: "none",
        padding: "10px",
        borderRadius: "5px",
        color: props.selected ? "white" : "black",
        background: props.selected ? projectColor : "white",
        cursor: "default",
        "&:hover": {
          border: `solid 1px ${props.selected ? "white" : projectColor}`,
          "& img": {
            display: "block",
            height: "15px"
          }
        }
      }}
    >
      <Circle size="16px" color={props.selected ? "white" : projectColor} />
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
      {/* Edit and Delete buttons */}
      {props.id && (
        <div
          css={{
            display: "grid",
            gridTemplateColumns: "min-content min-content"
          }}
        >
          <div
            onClick={props.edit}
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
            onClick={e => {
              e.stopPropagation();
              setShowModal(true);
            }}
            css={{
              marginLeft: "5px",
              marginRight: "5px"
            }}
          >
            <img src={cross} css={{ height: "0px", display: "none" }} />
          </div>
        </div>
      )}
      {/* Modal for deleting projects */}
      <DeleteModal
        showModal={showModal}
        name={props.name}
        onRequestClose={() => setShowModal(false)}
        updateAfterDelete={() => {
          props.resetProject();
          props.delete();
        }}
        mutation={DELETE_PROJECT}
        variables={{ id: props.id }}
      />
    </div>
  );
};
