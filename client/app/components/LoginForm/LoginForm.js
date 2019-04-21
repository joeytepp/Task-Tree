import React from "react";
import { Form, Field } from "react-final-form";

import { EMAIL_REGEX } from "../../constants";
import styles from "./LoginForm.scss";
import errorCross from "../../assets/img/errorCross.svg";

const noop = () => {};

const validateForm = ({ email, password }) => {
  const errors = {};

  if (email && !EMAIL_REGEX.test(email)) {
    errors.email = "Please provide a valid email address.";
  }

  if (password && password.length < 8) {
    errors.password = "Password must be at least 8 characters in length.";
  }

  return errors;
};

export default () => (
  <Form
    onSubmit={noop}
    validate={validateForm}
    render={({ form, submitting, pristine, values }) => {
      return (
        <form className={styles.logInForm} action="/session" method="post">
          <Field name="email">
            {({ input, meta }) => (
              <div>
                <label className={styles.formLabel}>Email</label>
                <input
                  {...input}
                  type="email"
                  placeholder="Email"
                  className={styles.formInput}
                />
                {meta.error && meta.touched && (
                  <span>
                    <img src={errorCross} width="20px" />
                    {meta.error}
                  </span>
                )}
              </div>
            )}
          </Field>
          <Field name="password">
            {({ input, meta }) => (
              <div>
                <label className={styles.formLabel}>Password</label>
                <input
                  {...input}
                  type="password"
                  placeholder="Password"
                  className={styles.formInput}
                />
              </div>
            )}
          </Field>
          <button
            type="submit"
            className={styles.formButton}
            disabled={submitting}
          >
            Log In
          </button>
        </form>
      );
    }}
  />
);
