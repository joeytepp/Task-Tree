import React from "react";
import { Field } from "react-final-form";

import Error from "../Error/Error";

import styles from "./FormField.scss";

export default props => (
  <Field name={props.name} type={props.type}>
    {({ input, meta }) => (
      <div className={styles.formField}>
        {props.type !== "checkbox" && (
          <label className={styles.formLabel}>{props.placeholder}</label>
        )}
        <input
          {...input}
          type={props.type}
          placeholder={props.placeholder}
          className={styles.formInput}
        />
        {props.type === "checkbox" && (
          <label className={styles.formLabel}>{props.placeholder}</label>
        )}
        {(props.error || (meta.error && meta.touched)) && (
          <Error error={props.error || meta.error} />
        )}
      </div>
    )}
  </Field>
);
