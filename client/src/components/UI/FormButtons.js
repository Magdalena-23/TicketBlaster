import React from "react";
import classes from "./FormButtons.module.css";

import { Link } from "react-router-dom";

export function FormButton(props) {
  return <button className={classes["form-button"]}>{props.text}</button>;
}

export function LinkButton(props) {
  return (
    <Link to={props.linkTo}>
      <button className={classes["link-button"]}>{props.text}</button>
    </Link>
  );
}
