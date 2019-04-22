import React from "react";
import { Form } from "react-final-form";

import FormField from "../FormField/FormField";
import {
  EMAIL_REGEX,
  NO_EMAIL_PROVIDED,
  NO_PASSWORD_PROVIDED,
  INVALID_EMAIL_PROVIDED,
  INVALID_PASSWORD_PROVIDED
} from "../../constants";

import styles from "./LoginForm.scss";

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

  return props;
};

export default props => (
  <Form
    onSubmit={noop}
    validate={validateForm}
    render={({ submitting }) => {
      const { emailError, passwordError } =
        initialRender && getInitialErrors(props);

      return (
        <form className={styles.logInForm} action="/session" method="post">
          <FormField
            name="email"
            type="email"
            placeholder="Email"
            error={emailError}
          />
          <FormField name="password" type="password" placeholder="Password" />
          <button
            type="submit"
            className={styles.formButton}
            disabled={submitting}
            error={passwordError}
          >
            Log In
          </button>
        </form>
      );
    }}
  />
);
