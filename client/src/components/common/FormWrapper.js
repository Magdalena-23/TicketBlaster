import React from "react";
import classes from "./FormWrapper.module.css";

function FormWrapper(props) {
  return <form className={classes.form}>{props.children}</form>;
}

export default FormWrapper;
