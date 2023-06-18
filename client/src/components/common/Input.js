import React from "react";
import classes from "./Input.module.css";

function Input(props) {
  return (
    <div className={classes["input-wrapper"]}>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type={props.type}
        id={props.id}
        onChange={props.onChange}
        value={props.value}
        className={props.error ? classes.invalid : classes.valid}
      />
      {props.error && <span className={classes.error}>{props.error}</span>}
    </div>
  );
}

export default Input;
