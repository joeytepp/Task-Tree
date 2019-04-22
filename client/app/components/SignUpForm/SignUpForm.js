import React from "react";
import { Form, Field } from "react-final-form";

import FormField from "../FormField/FormField.js";
import {
  NAME_REGEX,
  EMAIL_REGEX,
  NO_EMAIL_PROVIDED,
  NO_PASSWORD_PROVIDED,
  INVALID_EMAIL_PROVIDED,
  INVALID_PASSWORD_PROVIDED,
  NO_FIRST_NAME_PROVIDED,
  INVALID_FIRST_NAME_PROVIDED,
  NO_LAST_NAME_PROVIDED,
  INVALID_LAST_NAME_PROVIDED,
  NO_TERMS_OF_SERVICE_PROVIDED
} from "../../constants";

import styles from "./SignUpForm.scss";
import profileIcon from "../../assets/img/profileIcon.svg";

const noop = () => {};

const validateForm = ({
  email,
  password,
  firstName,
  lastName,
  termsOfService
}) => {
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

  if (!firstName) {
    errors.firstName = NO_FIRST_NAME_PROVIDED;
  }

  if (firstName && !NAME_REGEX.test(firstName)) {
    errors.firstName = INVALID_FIRST_NAME_PROVIDED;
  }

  if (!lastName) {
    errors.lastName = NO_LAST_NAME_PROVIDED;
  }

  if (lastName && !NAME_REGEX.test(lastName)) {
    errors.lastName = INVALID_LAST_NAME_PROVIDED;
  }

  if (!termsOfService) {
    errors.termsOfService = NO_TERMS_OF_SERVICE_PROVIDED;
  }

  return errors;
};

export default props => (
  <Form
    onSubmit={noop}
    validate={validateForm}
    render={({ submitting, pristine, hasValidationErrors }) => {
      return (
        <div className={styles.root}>
          <form action="/signup" method="post">
            <img src={profileIcon} className={styles.profileIcon} />
            <div className={styles.formGrid}>
              <FormField
                name="firstName"
                placeholder="First Name"
                type="text"
                grid
              />
              <FormField
                name="lastName"
                placeholder="Last Name"
                type="text"
                grid
              />
            </div>
            <FormField name="email" placeholder="Email" type="email" />
            <FormField name="password" placeholder="Password" type="password" />
            <FormField
              name="termsOfService"
              placeholder="I agree to the terms of service"
              type="checkbox"
            />
            <button
              className={styles.submitButton}
              type="submit"
              disabled={submitting || pristine || hasValidationErrors}
            >
              Submit
            </button>
          </form>
        </div>
      );
    }}
  />
);
