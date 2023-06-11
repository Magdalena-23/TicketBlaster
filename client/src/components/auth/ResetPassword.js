import React from "react";
import classes from "./ResetPassword.module.css";
import FormWrapper from "../UI/FormWrapper";
import Input from "../UI/Input";
import { LinkButton, FormButton } from "../UI/FormButtons";

function ResetPassword() {
  return (
    <FormWrapper>
      <h1>Reset Password</h1>
      <Input type="password" id="password" label="Password" />
      <Input type="password" id="confirm-password" label="Re-type password" />
      <div className={classes.spacing}>
        <FormButton className={classes["form-button"]} text="Reset Password" />
        <LinkButton linkTo="/login" text="Back to login" />
      </div>
    </FormWrapper>
  );
}

export default ResetPassword;
