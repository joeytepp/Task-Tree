import React from "react";
import styled from "styled-components";

const Circle = styled.div`
  border-radius: 50%;
  margin: 2px;
  margin-right: 5px;
  vertical-align: middle;
  ${props => `
    width: ${props.size};
    height: ${props.size};
    background: ${props.color};
  `};
`;
export default props => (
  <div
    css={{
      display: "grid",
      gridTemplateColumns: "min-content min-content",
      whiteSpace: "pre",
      verticalAlign: "middle",
      border: `solid 1px #00000000`,
      padding: "10px",
      borderRadius: "5px",
      "&:hover": {
        border: `solid 1px ${props.color}`
      }
    }}
  >
    <Circle size="16px" color={props.color} />
    {props.name}
  </div>
);
