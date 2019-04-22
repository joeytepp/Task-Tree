import React from "react";
import { Field } from "react-final-form";

import styles from "./FormField.scss";
import errorCross from "../../assets/img/errorCross.svg";

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
          <div className={styles.errorMessage}>
            <img src={errorCross} className={styles.errorCross} />
            <span>{props.error || meta.error}</span>
          </div>
        )}
      </div>
    )}
  </Field>
);
