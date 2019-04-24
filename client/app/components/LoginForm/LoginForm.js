import React from "react";
import { Form } from "react-final-form";

import FormField from "../FormField/FormField";
import Error from "../Error/Error";
import {
  EMAIL_REGEX,
  NO_EMAIL_PROVIDED,
  NO_PASSWORD_PROVIDED,
  INVALID_EMAIL_PROVIDED,
  INVALID_PASSWORD_PROVIDED
} from "../../constants";

let initialRender = true;

const noop = () => {};

const validateForm = ({ email, password }) => {
  const errors = {};

  if (!email) {
    errors.email = NO_EMAIL_PROVIDED;
  }

  if (email && !EMAIL_REGEX.test(email)) {
    errors.email = INVALID_EMAIL_PROVIDED;
  }

  if (!password) {
    errors.password = NO_PASSWORD_PROVIDED;
  }

  if (password && password.length < 8) {
    errors.password = INVALID_PASSWORD_PROVIDED;
  }

  return errors;
};

const getInitialErrors = props => {
  initialRender = false;

  return props.errors;
};

export default props => (
  <Form
    onSubmit={noop}
    validate={validateForm}
    render={({ submitting }) => {
      const initialErrors = initialRender && getInitialErrors(props);

      return (
        <form
          css={{
            background: "white",
            padding: "5px 50px 40px 50px",
            width: "30%",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: "20px",
            borderRadius: "8px",
            border: "solid 1px #979797"
          }}
          action="/session"
          method="post"
        >
          {initialErrors.top && <Error error={initialErrors.top} />}
          <FormField
            name="email"
            type="email"
            placeholder="Email"
            error={initialErrors.email}
          />
          <FormField
            name="password"
            type="password"
            placeholder="Password"
            error={initialErrors.password}
          />
          <button
            type="submit"
            disabled={submitting}
            css={{
              width: "100%",
              fontSize: "15px",
              padding: "7px",
              marginTop: "20px",
              borderRadius: "8px",
              border: "solid 1px black",
              color: "white",
              background: "#a4a3a3",
              "&:hover": {
                transition: "0.5s",
                background: "#6d6d6d"
              },
              "&:focus": {
                transition: "0.5s",
                background: "black"
              }
            }}
          >
            Log In
          </button>
        </form>
      );
    }}
  />
);
