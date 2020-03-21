import React from "react";
import { Field } from "react-final-form";

import Error from "../Error/Error";

import { css } from "styled-components";

const formLabelStyle = css({
  fontFamily: "Cabin",
  fontSize: "15px",
  color: "#424242",
  letterSpacing: 0,
  paddingBottom: "2px"
});

export default props => (
  <Field name={props.name} type={props.type}>
    {({ input, meta }) => (
      <div
        css={{
          marginTop: "15px",
          textAlign: "left"
        }}
      >
        {props.type !== "checkbox" && (
          <label className={formLabelStyle}>{props.placeholder}</label>
        )}
        <input
          {...input}
          type={props.type}
          placeholder={props.placeholder}
          css={{
            width: "100%",
            fontSize: "15px",
            padding: "7px",
            color: "#424242",
            borderRadius: "8px",
            marginTop: "2px",
            border: "solid 1px #979797",
            "&[type='checkbox']": {
              width: "auto",
              marginRight: "5px"
            }
          }}
        />
        {props.type === "checkbox" && (
          <label className={formLabelStyle}>{props.placeholder}</label>
        )}
        {(props.error || (meta.error && meta.touched)) && (
          <Error error={props.error || meta.error} />
        )}
      </div>
    )}
  </Field>
);
