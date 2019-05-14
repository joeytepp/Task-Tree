import React from "react";

export default props => (
  <svg
    css={{ verticalAlign: "middle", padding: "5px" }}
    width={props.size}
    height={props.size}
    viewBox="0 0 200 200"
  >
    <g
      id="Page-3"
      stroke="none"
      stroke-width="1"
      fill="none"
      fill-rule="evenodd"
    >
      <circle id="Oval" fill={props.color} cx="100" cy="100" r="100" />
      <rect
        id="Rectangle"
        stroke="#FFFFFF"
        fill="#FFFFFF"
        transform="translate(62.173359, 123.779960) rotate(45.000000) translate(-62.173359, -123.779960) "
        x="32.1733585"
        y="109.27996"
        width="60"
        height="29"
        rx="3"
      />
      <rect
        id="Rectangle"
        stroke="#FFFFFF"
        fill="#FFFFFF"
        transform="translate(112.961941, 99.568542) rotate(135.000000) translate(-112.961941, -99.568542) "
        x="48.4619408"
        y="85.0685425"
        width="129"
        height="29"
        rx="3"
      />
    </g>
  </svg>
);
