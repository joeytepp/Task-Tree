import React from "react";
import { Form, Field } from "react-final-form";

import ColorInput from "./ColorInput";
import { COLOR_MAP } from "../../../constants";

import cancel from "../../../assets/img/greyCross.svg";

const colorMutators = {};

Object.keys(COLOR_MAP).forEach(key => {
  colorMutators[key] = (args, state, utils) =>
    utils.changeValue(state, "color", () => key);
});

export default props => (
  <Form
    initialValues={{
      color: props.color,
      name: props.name
    }}
    onSubmit={props.onSubmit}
    mutators={colorMutators}
    render={({ handleSubmit, form: { mutators } }) => (
      <form
        onSubmit={handleSubmit}
        css={{ padding: "0px", margin: "0px", width: "100%" }}
      >
        <div
          css={{
            display: "grid",
            gridTemplateColumns: "min-content min-content auto",
            whiteSpace: "pre",
            verticalAlign: "middle",
            border: `solid 1px #000000`,
            padding: "10px",
            borderRadius: "5px"
          }}
        >
          <Field name="color">
            {({ input }) => (
              <ColorInput {...input} {...props} mutators={mutators} />
            )}
          </Field>
          <Field name="name" type="text">
            {({ input }) => (
              <input
                autoFocus
                type="text"
                css={{
                  border: "none",
                  outline: "none",
                  boxShadow: "none",
                  background: "none",
                  width: "200px",
                  fontSize: "15px"
                }}
                {...input}
              />
            )}
          </Field>
          <img
            align="right"
            src={cancel}
            css={{ height: "15px" }}
            onClick={props.cancel}
          />
        </div>
      </form>
    )}
  />
);
