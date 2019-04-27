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

export default Circle;
