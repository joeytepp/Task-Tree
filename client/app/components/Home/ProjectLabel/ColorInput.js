import React, { useState, useContext } from "react";

import { ColorContext } from "../../../context/ColorContext";
import { ProjectsContext } from "../../../context/ProjectsContext";
import Circle from "./Circle";
import ColorModal from "./ColorModal";
import { COLOR_MAP } from "../../../constants";

export default props => {
  const [state, setState] = useState({
    color: props.color,
    showModal: false
  });

  const { setColor } = useContext(ColorContext);
  const { currentProject } = useContext(ProjectsContext);
  return (
    <>
      <input {...props.input} name="color" value={state.color} type="hidden" />
      <Circle
        size="16px"
        color={COLOR_MAP[state.color]}
        css={{
          border: "solid 1px #00000000",
          "&:hover": {
            borderColor: "white"
          }
        }}
        onClick={() =>
          setState(state => ({
            ...state,
            showModal: !state.showModal
          }))
        }
      />
      <ColorModal
        {...state}
        onRequestClose={() =>
          setState(state => ({ ...state, showModal: false }))
        }
        onColorChange={colorKey => () => {
          setState({ color: colorKey, showModal: false });
          props.mutators[colorKey]();
          if (currentProject && currentProject.name === props.name)
            setColor(colorKey);
        }}
      />
    </>
  );
};
