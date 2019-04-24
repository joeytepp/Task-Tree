import React from "react";
import { Form, Field } from "react-final-form";

import FormField from "../FormField/FormField.js";
import {
  NAME_REGEX,
  EMAIL_REGEX,
  NO_EMAIL_PROVIDED,
  NO_PASSWORD_PROVIDED,
  NO_LAST_NAME_PROVIDED,
  INVALID_EMAIL_PROVIDED,
  NO_FIRST_NAME_PROVIDED,
  INVALID_PASSWORD_PROVIDED,
  INVALID_LAST_NAME_PROVIDED,
  INVALID_FIRST_NAME_PROVIDED,
  NO_TERMS_OF_SERVICE_PROVIDED
} from "../../constants";

import profileIcon from "../../assets/img/profileIcon.svg";
import Error from "../Error/Error.js";

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

const getInitialErrors = props => {
  initialRender = false;

  return props.errors;
};

let initialRender = true;

export default props => (
  <Form
    onSubmit={noop}
    validate={validateForm}
    render={({ submitting, pristine, hasValidationErrors }) => {
      const initialErrors = initialRender && getInitialErrors(props);
      console.log(initialErrors);
      return (
        <div
          css={{
            background: "white",
            width: "60%",
            marginLeft: "auto",
            marginRight: "auto",
            borderRadius: "8px",
            textAlign: "center",
            padding: "15px",
            marginTop: "10px"
          }}
        >
          <form action="/signup" method="post">
            <img
              src={profileIcon}
              css={{
                borderRadius: "50%",
                background: "#d8d8d8",
                transition: "background 0.5s",
                width: "80px",
                "&:hover": {
                  background: "#737373",
                  transition: "0.5s"
                }
              }}
            />
            {initialErrors.top && <Error error={initialErrors.top} />}
            <div
              css={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gridColumnGap: "10px"
              }}
            >
              <FormField
                name="firstName"
                placeholder="First Name"
                type="text"
                error={initialErrors.firstName}
                grid
              />
              <FormField
                name="lastName"
                placeholder="Last Name"
                type="text"
                error={initialErrors.lastName}
                grid
              />
            </div>
            <FormField
              name="email"
              placeholder="Email"
              type="email"
              error={initialErrors.email}
            />
            <FormField
              name="password"
              placeholder="Password"
              type="password"
              error={initialErrors.password}
            />
            <FormField
              name="termsOfService"
              placeholder="I agree to the terms of service"
              type="checkbox"
              error={initialErrors.termsOfService}
            />
            <button
              type="submit"
              disabled={submitting || pristine || hasValidationErrors}
              css={{
                width: "100%",
                padding: "7px",
                transition: "color 0.5s",
                background: "#a4a3a3",
                border: "solid 1px black",
                borderRadius: "8px",
                marginTop: "20px",
                fontSize: "15px",
                "&:not(:disabled):hover": {
                  background: "#6d6d6d"
                },
                "&:focus": {
                  background: "black"
                },
                "&disabled": {
                  opacity: "70%"
                }
              }}
            >
              Submit
            </button>
          </form>
        </div>
      );
    }}
  />
);
