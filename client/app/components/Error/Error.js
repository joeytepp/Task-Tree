import React from "react";

import errorCross from "../../assets/img/errorCross.svg";

export default props => {
  if (!props.error) return <div />;
  return (
    <div css={{ paddingTop: "5px" }}>
      <img
        src={errorCross}
        css={{
          height: "15px",
          marginRight: "5px",
          verticalAlign: "middle"
        }}
      />
      <span>{props.error}</span>
    </div>
  );
};
