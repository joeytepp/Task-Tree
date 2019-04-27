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
      <input
        {...props.input}
        name="color"
        value={state.color}
        type="hidden"
        onChange={e => console.log(e)}
      />
      <Circle
        size="16px"
        color={COLOR_MAP[state.color]}
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