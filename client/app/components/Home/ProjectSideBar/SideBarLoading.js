import React from "react";
import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
0%{ background-position: -468px 0; }
100%{ background-position: 468px 0; }
`;

const LoadingProject = styled.div`
  height: 40px;
  border-radius: 5px;
  margin: 1px;
  animation: ${shimmer} 1.5s linear infinite;
  animation-fill-mode: forwards;
  background: #f6f7f8;
  background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
  background-size: 800px 104px;
`;

export default () => (
  <div>
    {Array(10)
      .fill(null)
      .map((_, i) => (
        <LoadingProject key={i} />
      ))}
  </div>
);
