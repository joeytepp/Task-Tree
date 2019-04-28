import React, { useState } from "react";

import Circle from "./Circle";
import { COLOR_MAP } from "../../../constants";
import ColorModal from "./ColorModal";

export default props => {
  const [state, setState] = useState({
    color: props.color,
    showModal: false
  });

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
      <ColorModal {...state} setState={setState} mutators={props.mutators} />
    </>
  );
};
