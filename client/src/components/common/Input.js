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
        className={props.className}
      />
    </div>
  );
}

export default Input;
